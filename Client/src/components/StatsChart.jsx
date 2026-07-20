export default function StatsChart({ bookings }) {
  const counts = bookings.reduce((acc, item) => {
    acc[item.bookingStatus] = (acc[item.bookingStatus] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="rounded-[1.4rem] border border-white/10 bg-slate-900/70 p-4">
      <h3 className="text-lg font-semibold text-white">Status Overview</h3>
      <div className="mt-4 space-y-3">
        {Object.entries(counts).map(([label, value]) => (
          <div key={label}>
            <div className="mb-1 flex items-center justify-between text-sm text-slate-400">
              <span>{label}</span>
              <span>{value}</span>
            </div>
            <div className="h-2 rounded-full bg-slate-800">
              <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${Math.min(100, value * 20)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
