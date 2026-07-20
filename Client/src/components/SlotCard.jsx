export default function SlotCard({ slot, status, booking, onClick, active }) {
  const isBooked = status === "booked";
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl border p-4 text-left transition ${active ? "border-emerald-400/60" : "border-white/10"} ${isBooked ? "bg-rose-500/10" : "bg-emerald-500/10"}`}
    >
      <div className="flex items-center justify-between">
        <p className="font-semibold text-white">{slot}</p>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isBooked ? "bg-rose-500/20 text-rose-300" : "bg-emerald-500/20 text-emerald-300"}`}>
          {isBooked ? "Booked" : "Available"}
        </span>
      </div>
      {isBooked && booking?.customerName ? (
        <p className="mt-2 text-sm font-medium text-rose-100">Booked by {booking.customerName}</p>
      ) : null}
    </button>
  );
}
