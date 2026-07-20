export default function FilterBar({ statusFilter, onStatusChange, sortOrder, onSortChange }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">
      <select value={statusFilter} onChange={(event) => onStatusChange(event.target.value)} className="rounded-2xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white">
        <option value="All">All Status</option>
        <option value="Confirmed">Confirmed</option>
        <option value="Pending">Pending</option>
      </select>
      <select value={sortOrder} onChange={(event) => onSortChange(event.target.value)} className="rounded-2xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white">
        <option value="desc">Newest First</option>
        <option value="asc">Oldest First</option>
      </select>
    </div>
  );
}
