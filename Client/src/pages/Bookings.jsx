import { useBookingContext } from "../context/BookingContext";

export default function Bookings() {
  const { bookings } = useBookingContext();

  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/20">
      <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Booking Overview</p>
      <h1 className="mt-2 text-3xl font-semibold text-white">Live bookings snapshot</h1>
      <div className="mt-6 grid gap-3">
        {bookings.length ? bookings.map((booking) => (
          <div key={booking.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold text-white">{booking.customerName}</p>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${booking.bookingStatus === "Pending" ? "bg-amber-500/20 text-amber-300" : "bg-emerald-500/20 text-emerald-300"}`}>
                {booking.bookingStatus}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-400">{booking.bookingDate} • {booking.timeSlot}</p>
          </div>
        )) : <p className="text-slate-400">No bookings have been created yet.</p>}
      </div>
    </div>
  );
}
