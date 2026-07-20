export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/70 px-4 py-8 text-sm text-slate-400 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-emerald-400">RCM Turf Cricket</p>
          <p>Premium turf booking experience with smart scheduling in your pocket.</p>
        </div>
        <div className="flex gap-4">
          <a href="/availability" className="hover:text-white">Availability</a>
          <a href="/contact" className="hover:text-white">Contact</a>
          <a href="/admin" className="hover:text-white">Admin</a>
        </div>
      </div>
    </footer>
  );
}
