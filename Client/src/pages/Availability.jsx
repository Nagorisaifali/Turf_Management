import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import CalendarView from "../components/CalendarView";
import SlotCard from "../components/SlotCard";
import { useBookingContext } from "../context/BookingContext";
import { formatDate, moveMonth, prettyDate, timeSlots } from "../utils/dateUtils";
import { getSlotBooking, getSlotStatus } from "../utils/bookingUtils";

export default function Availability() {
  const { bookings } = useBookingContext();
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const displayDate = useMemo(() => new Date(selectedDate), [selectedDate]);
  const monthLabel = `${displayDate.toLocaleString("default", { month: "long" })} ${displayDate.getFullYear()}`;

  const slotData = useMemo(
    () =>
      timeSlots.map((slot) => ({
        slot,
        booking: getSlotBooking(bookings, selectedDate, slot),
        status: getSlotStatus(bookings, selectedDate, slot),
      })),
    [bookings, selectedDate]
  );

  const handleDateSelect = (isoDate) => {
    setSelectedDate(isoDate);
    setCurrentMonth(new Date(isoDate));
  };

  const handleMonthChange = (direction) => {
    const next = moveMonth(currentMonth, direction);
    setCurrentMonth(next);
  };

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-4 shadow-2xl shadow-black/20 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Availability</p>
            <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Check turf slots across the month</h1>
            <p className="mt-2 text-sm text-slate-400 sm:text-base">Visitors can only view availability. Admin controls all booking changes.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => handleMonthChange(-1)} className="rounded-full border border-white/10 px-3 py-2 text-sm text-white">←</button>
            <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300">{monthLabel}</div>
            <button onClick={() => handleMonthChange(1)} className="rounded-full border border-white/10 px-3 py-2 text-sm text-white">→</button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <CalendarView selectedDate={selectedDate} onSelect={handleDateSelect} bookings={bookings} />
        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="rounded-[1.7rem] border border-white/10 bg-slate-900/70 p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Selected Date</p>
              <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">{prettyDate(selectedDate)}</h2>
            </div>
            <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-300">
              {slotData.filter((slot) => slot.status === "booked").length} booked
            </div>
          </div>
          <div className="mt-6 grid gap-3">
            {slotData.map((item) => (
              <SlotCard key={item.slot} slot={item.slot} status={item.status} booking={item.booking} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
