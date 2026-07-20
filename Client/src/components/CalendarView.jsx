import Calendar from "react-calendar";
import { formatDate, isPastDate } from "../utils/dateUtils";
import { countBookingsForDate } from "../utils/dateUtils";

export default function CalendarView({ selectedDate, onSelect, bookings }) {
  const handleDateChange = (date) => onSelect(formatDate(date));

  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-4 shadow-2xl shadow-black/20">
      <Calendar
        onChange={handleDateChange}
        value={new Date(selectedDate)}
        tileDisabled={({ date }) => isPastDate(formatDate(date))}
        tileClassName={({ date, view }) => {
          if (view !== "month") return "";
          const iso = formatDate(date);
          const booked = countBookingsForDate(bookings, iso);
          if (booked > 0) return "bg-rose-500/20 text-rose-200";
          return "bg-emerald-500/15 text-emerald-200";
        }}
      />
    </div>
  );
}
