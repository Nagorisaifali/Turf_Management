export default function Toast({ message }) {
  return (
    <div className="rounded-2xl border border-emerald-500/30 bg-slate-950/95 px-4 py-3 text-sm font-medium text-emerald-300 shadow-2xl">
      {message}
    </div>
  );
}
