import { useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import { motion } from "framer-motion";
import DashboardCards from "../components/DashboardCards";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import BookingCard from "../components/BookingCard";
import Modal from "../components/Modal";
import { useBookingContext } from "../context/BookingContext";
import { useToast } from "../context/ToastContext";
import { filterBookings, getStats } from "../utils/bookingUtils";
import { formatDate, prettyDate, timeSlots } from "../utils/dateUtils";

const defaultForm = {
  customerName: "",
  contactNumber: "",
  bookingDate: formatDate(new Date()),
  timeSlot: timeSlots[0],
  amountPaid: "",
  bookingStatus: "Confirmed",
  notes: "",
};

export default function Dashboard() {
  const { bookings, addBooking, updateBooking, deleteBooking } = useBookingContext();
  const { showToast } = useToast();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [pendingBooking, setPendingBooking] = useState(null);

  const filteredBookings = useMemo(() => filterBookings(bookings, { search, statusFilter, sortOrder }), [bookings, search, statusFilter, sortOrder]);
  const stats = useMemo(() => getStats(bookings, formatDate(new Date())), [bookings]);

  const openCreate = () => {
    setEditingBooking(null);
    setForm(defaultForm);
    setIsFormOpen(true);
  };

  const openEdit = (booking) => {
    setEditingBooking(booking);
    setForm({
      customerName: booking.customerName,
      contactNumber: booking.contactNumber,
      bookingDate: booking.bookingDate,
      timeSlot: booking.timeSlot,
      amountPaid: booking.amountPaid,
      bookingStatus: booking.bookingStatus,
      notes: booking.notes,
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      ...form,
      amountPaid: Number(form.amountPaid || 0),
      bookingStatus: form.bookingStatus,
      customerName: form.customerName.trim(),
      contactNumber: form.contactNumber.trim(),
      notes: form.notes.trim(),
    };
    setPendingBooking(payload);
    setConfirmOpen(true);
    setIsFormOpen(false);
  };

  const confirmSave = () => {
    const result = editingBooking
      ? updateBooking({ ...pendingBooking, id: editingBooking.id, createdAt: editingBooking.createdAt })
      : addBooking({ ...pendingBooking, createdAt: new Date().toISOString() });
    showToast(result.message);
    if (result.ok) {
      setConfirmOpen(false);
      setPendingBooking(null);
      setEditingBooking(null);
      setForm(defaultForm);
    }
  };

  const handleDelete = (id) => {
    const result = deleteBooking(id);
    showToast(result.message);
  };

  const exportPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("RCM Turf Cricket Booking Report", 14, 16);
    doc.setFontSize(11);
    filteredBookings.forEach((booking, index) => {
      const y = 30 + index * 18;
      doc.text(`${index + 1}. ${booking.customerName} | ${booking.contactNumber} | ${booking.bookingDate} | ${booking.timeSlot} | ${booking.bookingStatus}`, 14, y);
    });
    doc.save("rcm-turf-bookings.pdf");
  };

  const printToday = () => window.print();

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/20">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Admin Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Welcome, admin</h1>
            <p className="mt-2 text-slate-400">Manage bookings, view revenue, and export reports in seconds.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={openCreate} className="rounded-full bg-emerald-500 px-4 py-2 font-semibold text-slate-950">Create Booking</button>
            <button onClick={exportPdf} className="rounded-full border border-white/10 bg-white/10 px-4 py-2 font-semibold text-white">Export PDF</button>
            <button onClick={printToday} className="rounded-full border border-white/10 bg-white/10 px-4 py-2 font-semibold text-white">Print Today</button>
          </div>
        </div>
      </div>

      <DashboardCards stats={stats} />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.7rem] border border-white/10 bg-slate-900/70 p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Search & Filter</p>
              <h2 className="text-2xl font-semibold text-white">Booking Directory</h2>
            </div>
            <FilterBar statusFilter={statusFilter} onStatusChange={setStatusFilter} sortOrder={sortOrder} onSortChange={setSortOrder} />
          </div>
          <div className="mt-4">
            <SearchBar value={search} onChange={setSearch} placeholder="Search by customer, phone or date" />
          </div>
          <div className="mt-6 grid gap-4">
            {filteredBookings.length ? filteredBookings.map((booking) => (
              <motion.div key={booking.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <BookingCard booking={booking} onEdit={openEdit} onDelete={handleDelete} />
              </motion.div>
            )) : <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-slate-400">No bookings available for the selected filters.</div>}
          </div>
        </div>
        <div className="rounded-[1.7rem] border border-white/10 bg-slate-900/70 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Today</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{prettyDate(formatDate(new Date()))}</h2>
          <div className="mt-6 space-y-3">
            {bookings.filter((booking) => booking.bookingDate === formatDate(new Date())).length ? bookings.filter((booking) => booking.bookingDate === formatDate(new Date())).map((booking) => (
              <div key={booking.id} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <p className="font-semibold text-white">{booking.customerName}</p>
                <p className="text-sm text-slate-400">{booking.timeSlot} • {booking.bookingStatus}</p>
              </div>
            )) : <p className="text-slate-400">No bookings scheduled today.</p>}
          </div>
        </div>
      </div>

      <Modal open={isFormOpen} title={editingBooking ? "Edit Booking" : "Create Booking"} onClose={() => setIsFormOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <input required value={form.customerName} onChange={(event) => setForm({ ...form, customerName: event.target.value })} className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white" placeholder="Customer Name" />
            <input required value={form.contactNumber} onChange={(event) => setForm({ ...form, contactNumber: event.target.value })} className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white" placeholder="Contact Number" />
            <input required type="date" value={form.bookingDate} onChange={(event) => setForm({ ...form, bookingDate: event.target.value })} className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white" />
            <select value={form.timeSlot} onChange={(event) => setForm({ ...form, timeSlot: event.target.value })} className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white">
              {timeSlots.map((slot) => <option key={slot} value={slot}>{slot}</option>)}
            </select>
            <input type="number" value={form.amountPaid} onChange={(event) => setForm({ ...form, amountPaid: event.target.value })} className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white" placeholder="Amount Paid" />
            <select value={form.bookingStatus} onChange={(event) => setForm({ ...form, bookingStatus: event.target.value })} className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white">
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <textarea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} className="min-h-24 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white" placeholder="Notes" />
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setIsFormOpen(false)} className="rounded-full border border-white/10 px-4 py-2 text-white">Cancel</button>
            <button type="submit" className="rounded-full bg-emerald-500 px-4 py-2 font-semibold text-slate-950">Save Booking</button>
          </div>
        </form>
      </Modal>

      <Modal open={confirmOpen} title="Confirm Booking" onClose={() => setConfirmOpen(false)} actions={[
        <button key="cancel" type="button" onClick={() => setConfirmOpen(false)} className="rounded-full border border-white/10 px-4 py-2 text-white">Cancel</button>,
        <button key="save" type="button" onClick={confirmSave} className="rounded-full bg-emerald-500 px-4 py-2 font-semibold text-slate-950">Confirm</button>,
      ]}>
        <p className="text-slate-300">Save this booking for {pendingBooking?.customerName || "the selected customer"} on {pendingBooking?.bookingDate} at {pendingBooking?.timeSlot}?</p>
      </Modal>
    </div>
  );
}
