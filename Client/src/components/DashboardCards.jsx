export default function DashboardCards({ stats }) {
  const cards = [
    { label: "Total Bookings", value: stats.totalBookings, accent: "text-emerald-300" },
    { label: "Revenue", value: `₹${stats.revenue}`, accent: "text-cyan-300" },
    { label: "Today Revenue", value: `₹${stats.todayRevenue}`, accent: "text-amber-300" },
    { label: "Available Slots", value: stats.availableSlots, accent: "text-slate-300" },
    { label: "Booked Slots", value: stats.bookedSlots, accent: "text-rose-300" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => (
        <div key={card.label} className="rounded-[1.3rem] border border-white/10 bg-slate-900/70 p-4 shadow-lg shadow-black/20">
          <p className="text-sm text-slate-400">{card.label}</p>
          <p className={`mt-2 text-2xl font-semibold ${card.accent}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
}
