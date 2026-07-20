export default function About() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/20">
      <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">About RCM Turf Cricket</p>
      <h1 className="mt-2 text-3xl font-semibold text-white">A premium venue built for great matches</h1>
      <p className="mt-4 text-slate-300">RCM Turf Cricket combines a polished booking experience with professional turf facilities, making it easier for players, teams, and coaches to reserve time without stress.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          ["Flexible Booking", "Reserve days and time slots instantly."],
          ["Modern Facilities", "Night lighting, parking, changing room, and cafe."],
          ["Trusted by Teams", "A smooth experience for frequent players and clubs."],
        ].map(([title, text]) => (
          <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm text-slate-400">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
