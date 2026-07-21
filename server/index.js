import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const PORT = process.env.PORT || 5000;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "Saif";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Saif@78";
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "change-this-token-in-render";
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "*";
const DATA_DIR = path.join(__dirname, "data");
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings.json");
const CLIENT_DIST = path.resolve(__dirname, "../Client/dist");

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", CLIENT_ORIGIN);
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(BOOKINGS_FILE);
  } catch {
    await fs.writeFile(BOOKINGS_FILE, "[]\n", "utf8");
  }
}

async function readBookings() {
  await ensureStore();
  const raw = await fs.readFile(BOOKINGS_FILE, "utf8");
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeBookings(bookings) {
  await ensureStore();
  await fs.writeFile(BOOKINGS_FILE, `${JSON.stringify(bookings, null, 2)}\n`, "utf8");
}

function validateBooking(booking, bookings) {
  if (!booking.customerName?.trim()) return "Customer Name cannot be empty.";
  if (!/^\d{10}$/.test(booking.contactNumber || "")) return "Contact Number must be exactly 10 digits.";
  if (!booking.bookingDate) return "Booking Date is required.";
  if (!booking.timeSlot) return "Time Slot is required.";

  const duplicate = bookings.some(
    (item) => item.bookingDate === booking.bookingDate && item.timeSlot === booking.timeSlot && item.id !== booking.id
  );
  if (duplicate) return "This slot is already booked.";
  return null;
}

function requireAdmin(req, res, next) {
  const header = req.get("Authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ message: "Admin login required." });
  }
  next();
}

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body || {};
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return res.json({ ok: true, token: ADMIN_TOKEN });
  }
  return res.status(401).json({ ok: false, message: "Invalid admin credentials." });
});

app.get("/api/bookings", async (req, res, next) => {
  try {
    const bookings = await readBookings();
    res.json(bookings);
  } catch (error) {
    next(error);
  }
});

app.post("/api/bookings", requireAdmin, async (req, res, next) => {
  try {
    const bookings = await readBookings();
    const booking = {
      ...req.body,
      customerName: req.body.customerName?.trim() || "",
      contactNumber: req.body.contactNumber?.trim() || "",
      notes: req.body.notes?.trim() || "",
      amountPaid: Number(req.body.amountPaid || 0),
      bookingStatus: req.body.bookingStatus || "Confirmed",
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    const error = validateBooking(booking, bookings);
    if (error) return res.status(400).json({ message: error });

    const nextBookings = [...bookings, booking];
    await writeBookings(nextBookings);
    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
});

app.put("/api/bookings/:id", requireAdmin, async (req, res, next) => {
  try {
    const bookings = await readBookings();
    const current = bookings.find((item) => item.id === req.params.id);
    if (!current) return res.status(404).json({ message: "Booking not found." });

    const booking = {
      ...current,
      ...req.body,
      id: req.params.id,
      customerName: req.body.customerName?.trim() || "",
      contactNumber: req.body.contactNumber?.trim() || "",
      notes: req.body.notes?.trim() || "",
      amountPaid: Number(req.body.amountPaid || 0),
      bookingStatus: req.body.bookingStatus || "Confirmed",
    };
    const error = validateBooking(booking, bookings);
    if (error) return res.status(400).json({ message: error });

    const nextBookings = bookings.map((item) => (item.id === req.params.id ? booking : item));
    await writeBookings(nextBookings);
    res.json(booking);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/bookings/:id", requireAdmin, async (req, res, next) => {
  try {
    const bookings = await readBookings();
    const nextBookings = bookings.filter((item) => item.id !== req.params.id);
    if (nextBookings.length === bookings.length) return res.status(404).json({ message: "Booking not found." });

    await writeBookings(nextBookings);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

app.use(express.static(CLIENT_DIST));
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(CLIENT_DIST, "index.html"));
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Server error. Please try again." });
});

app.listen(PORT, () => {
  console.log(`Turf backend running on port ${PORT}`);
});
