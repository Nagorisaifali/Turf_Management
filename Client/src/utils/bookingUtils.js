
import { timeSlots } from "./dateUtils";

export const validateBooking = (booking, bookings) => {
  if (!booking.customerName?.trim()) return "Customer Name cannot be empty.";
  if (!/^\d{10}$/.test(booking.contactNumber)) return "Contact Number must be exactly 10 digits.";
  if (!booking.bookingDate) return "Booking Date is required.";
  if (!booking.timeSlot) return "Time Slot is required.";

  const duplicate = bookings.some(
    (b) => b.bookingDate === booking.bookingDate && b.timeSlot === booking.timeSlot && b.id !== booking.id
  );
  if (duplicate) return "This slot is already booked.";
  return null;
};

export const getSlotStatus = (bookings, date, slot) => {
  const found = bookings.find((b) => b.bookingDate === date && b.timeSlot === slot);
  return found ? "booked" : "available";
};

export const getSlotBooking = (bookings, date, slot) =>
  bookings.find((b) => b.bookingDate === date && b.timeSlot === slot) || null;

export const getStats = (bookings, todayISO) => {
  const todayBookings = bookings.filter((b) => b.bookingDate === todayISO);
  const revenue = bookings.reduce((sum, b) => sum + (Number(b.amountPaid) || 0), 0);
  const todayRevenue = todayBookings.reduce((sum, b) => sum + (Number(b.amountPaid) || 0), 0);
  return {
    totalBookings: bookings.length,
    revenue,
    todayRevenue,
    availableSlots: timeSlots.length * 30 - bookings.length,
    bookedSlots: bookings.length,
  };
};

export const filterBookings = (bookings, { search, statusFilter, sortOrder }) => {
  let data = [...bookings];

  if (search) {
    const s = search.toLowerCase();
    data = data.filter(
      (b) =>
        b.customerName.toLowerCase().includes(s) ||
        b.contactNumber.includes(search) ||
        b.bookingDate.includes(search)
    );
  }

  if (statusFilter && statusFilter !== "All") {
    data = data.filter((b) => b.bookingStatus === statusFilter);
  }

  data.sort((a, b) =>
    sortOrder === "asc"
      ? new Date(a.bookingDate) - new Date(b.bookingDate)
      : new Date(b.bookingDate) - new Date(a.bookingDate)
  );

  return data;
};
