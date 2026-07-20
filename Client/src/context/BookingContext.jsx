
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { storage } from "../utils/storage";
import { cleanupBookings } from "../utils/dateUtils";
import { validateBooking } from "../utils/bookingUtils";

const BookingContext = createContext();
export const useBookingContext = () => useContext(BookingContext);

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(storage.getBookings());
  const [isAdmin, setIsAdmin] = useState(storage.getAdminAuth());

  useEffect(() => {
    const cleaned = cleanupBookings(storage.getBookings());
    setBookings(cleaned);
    storage.setBookings(cleaned);
  }, []);

  useEffect(() => {
    storage.setBookings(bookings);
  }, [bookings]);

  const loginAdmin = (username, password) => {
    const ok = username === "Saif" && password === "Saif@78";
    setIsAdmin(ok);
    storage.setAdminAuth(ok);
    return ok;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    storage.setAdminAuth(false);
  };

  const addBooking = (booking) => {
    const error = validateBooking(booking, bookings);
    if (error) return { ok: false, message: error };
    const newBooking = {
      ...booking,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setBookings((prev) => [...prev, newBooking]);
    return { ok: true, message: "Booking Created Successfully." };
  };

  const updateBooking = (booking) => {
    const error = validateBooking(booking, bookings);
    if (error) return { ok: false, message: error };
    setBookings((prev) => prev.map((b) => (b.id === booking.id ? booking : b)));
    return { ok: true, message: "Booking Updated Successfully." };
  };

  const deleteBooking = (id) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
    return { ok: true, message: "Booking Deleted Successfully." };
  };

  const value = useMemo(
    () => ({
      bookings,
      isAdmin,
      loginAdmin,
      logoutAdmin,
      addBooking,
      updateBooking,
      deleteBooking,
      setBookings,
    }),
    [bookings, isAdmin]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}