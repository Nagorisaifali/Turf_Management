import {
  addDays,
  addMonths,
  differenceInMinutes,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfDay,
} from "date-fns";

export const timeSlots = [
  "6 AM - 7 AM",
  "7 AM - 8 AM",
  "8 AM - 9 AM",
  "9 AM - 10 AM",
  "10 AM - 11 AM",
  "11 AM - 12 PM",
  "12 PM - 1 PM",
  "1 PM - 2 PM",
  "2 PM - 3 PM",
  "3 PM - 4 PM",
  "4 PM - 5 PM",
  "5 PM - 6 PM",
  "6 PM - 7 PM",
  "7 PM - 8 PM",
  "8 PM - 9 PM",
  "9 PM - 10 PM",
  "10 PM - 11 PM",
  "11 PM - 12 AM",
];

export const formatDate = (date) => format(new Date(date), "yyyy-MM-dd");
export const prettyDate = (date) => format(new Date(date), "dd MMM yyyy");
export const dayLabel = (date) => format(new Date(date), "EEE");
export const isPastDate = (date) => isBefore(startOfDay(new Date(date)), startOfDay(new Date()));
export const isCurrentMonth = (date) => isSameMonth(new Date(date), new Date());

export const cleanupBookings = (bookings) => {
  const now = new Date();
  return bookings.filter((booking) => {
    try {
      const date = parseISO(booking.bookingDate);
      return isSameMonth(date, now) && !isBefore(startOfDay(date), startOfDay(now));
    } catch {
      return false;
    }
  });
};

export const countBookingsForDate = (bookings, date) => bookings.filter((item) => item.bookingDate === date).length;

export const nextBookingCountdown = (bookings) => {
  const future = bookings
    .filter((item) => !isBefore(parseISO(item.bookingDate), startOfDay(new Date())))
    .sort((a, b) => new Date(a.bookingDate) - new Date(b.bookingDate));
  if (!future.length) return null;
  return differenceInMinutes(new Date(future[0].bookingDate), new Date());
};

export const isSameBookingDay = (a, b) => isSameDay(parseISO(a), parseISO(b));

export const moveDate = (date, amount) => addDays(new Date(date), amount);
export const moveMonth = (date, amount) => addMonths(new Date(date), amount);