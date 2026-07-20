import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiMapPin } from "react-icons/fi";

export default function Hero() {
  return (
    <section className="grid gap-8 rounded-[2rem] border border-emerald-400/20 bg-slate-900/60 p-4 shadow-2xl shadow-emerald-950/30 sm:p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /> Premium Turf Experience
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
            RCM Turf Cricket
          </h1>
          <p className="max-w-2xl text-base text-slate-300 sm:text-lg">
            Book your cricket turf in minutes with a polished, modern booking experience designed for players, teams, and admins alike.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/availability" className="rounded-full bg-emerald-500 px-5 py-3 text-center font-semibold text-slate-950 transition hover:bg-emerald-400">
            View Availability
          </Link>
          <Link to="/contact" className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-center font-semibold text-white transition hover:bg-white/20">
            Contact Us
          </Link>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
          <span className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
            <FiMapPin /> 24/7 access • Night lighting
          </span>
          <span className="rounded-full bg-white/10 px-3 py-2">Parking • Changing room</span>
        </div>
      </div>
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-emerald-500/20 to-slate-800 p-4 sm:p-6">
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
            <p className="text-sm text-emerald-300">Today&apos;s Status</p>
            <p className="text-2xl font-bold text-white sm:text-3xl">Fast & Flexible</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Night Lighting", "Available"],
              ["Parking", "Secure"],
              ["Cafe", "On-site"],
              ["Washroom", "Clean"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <p className="text-sm text-slate-400">{label}</p>
                <p className="mt-1 text-lg font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
          <button className="flex items-center gap-2 text-emerald-300">
            Explore venue <FiArrowRight />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
