import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function BookingCard({ booking, onEdit, onDelete }) {
  return (
    <div className="rounded-[1.2rem] border border-white/10 bg-slate-900/70 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold text-white">{booking.customerName}</p>
          <p className="text-sm text-slate-400">{booking.contactNumber}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${booking.bookingStatus === "Pending" ? "bg-amber-500/20 text-amber-300" : "bg-emerald-500/20 text-emerald-300"}`}>
          {booking.bookingStatus}
        </span>
      </div>
      <div className="mt-4 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
        <p><span className="text-slate-400">Date:</span> {booking.bookingDate}</p>
        <p><span className="text-slate-400">Slot:</span> {booking.timeSlot}</p>
        <p><span className="text-slate-400">Amount:</span> ₹{booking.amountPaid || 0}</p>
        <p><span className="text-slate-400">Notes:</span> {booking.notes || "—"}</p>
      </div>
      <div className="mt-4 flex gap-2">
        <button onClick={() => onEdit(booking)} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm text-white">
          <FiEdit2 /> Edit
        </button>
        <button onClick={() => onDelete(booking.id)} className="flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
          <FiTrash2 /> Delete
        </button>
      </div>
    </div>
  );
}
