import { useClock } from "../hooks/useClock";
import { FiClock, FiMapPin, FiTarget } from "react-icons/fi";

export default function Widgets() {
  const now = useClock();

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="rounded-[1.3rem] border border-white/10 bg-slate-900/70 p-4">
        <div className="flex items-center gap-2 text-emerald-300"><FiClock /> Current Time</div>
        <p className="mt-3 text-2xl font-semibold text-white">{now.toLocaleTimeString()}</p>
      </div>
      <div className="rounded-[1.3rem] border border-white/10 bg-slate-900/70 p-4">
        <div className="flex items-center gap-2 text-emerald-300"><FiMapPin /> Venue</div>
        <p className="mt-3 text-lg font-semibold text-white">Near City Center • Parking Available</p>
      </div>
      <div className="rounded-[1.3rem] border border-white/10 bg-slate-900/70 p-4">
        <div className="flex items-center gap-2 text-emerald-300"><FiTarget /> Next Match</div>
        <p className="mt-3 text-lg font-semibold text-white">Evening League • 6:00 PM</p>
      </div>
    </div>
  );
}
