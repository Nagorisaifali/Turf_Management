
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { storage } from "../utils/storage";
import { api } from "../utils/api";

const BookingContext = createContext();
export const useBookingContext = () => useContext(BookingContext);

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);
  const [adminToken, setAdminToken] = useState(storage.getAdminToken());
  const [isLoading, setIsLoading] = useState(true);
  const isAdmin = Boolean(adminToken);

  useEffect(() => {
    refreshBookings();
  }, []);

  const refreshBookings = async () => {
    setIsLoading(true);
    try {
      const data = await api.getBookings();
      setBookings(data);
    } catch {
      setBookings([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loginAdmin = async (username, password) => {
    const result = await api.loginAdmin({ username, password });
    setAdminToken(result.token);
    storage.setAdminToken(result.token);
    return true;
  };

  const logoutAdmin = () => {
    setAdminToken("");
    storage.clearAdminToken();
  };

  const addBooking = async (booking) => {
    try {
      const created = await api.createBooking(booking, adminToken);
      setBookings((prev) => [...prev, created]);
      return { ok: true, message: "Booking Created Successfully." };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  };

  const updateBooking = async (booking) => {
    try {
      const updated = await api.updateBooking(booking, adminToken);
      setBookings((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
      return { ok: true, message: "Booking Updated Successfully." };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  };

  const deleteBooking = async (id) => {
    try {
      await api.deleteBooking(id, adminToken);
      setBookings((prev) => prev.filter((b) => b.id !== id));
      return { ok: true, message: "Booking Deleted Successfully." };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  };

  const value = useMemo(
    () => ({
      bookings,
      isAdmin,
      isLoading,
      loginAdmin,
      logoutAdmin,
      addBooking,
      updateBooking,
      deleteBooking,
      setBookings,
      refreshBookings,
    }),
    [bookings, isAdmin, isLoading, adminToken]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}
