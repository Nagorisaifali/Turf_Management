import { motion } from "framer-motion";
import Hero from "../components/Hero";
import Widgets from "../components/Widgets";
import GalleryGrid from "../components/GalleryGrid";

const features = [
  { title: "Night Lighting", description: "Train and play late with bright turf lights." },
  { title: "Parking", description: "Dedicated parking space for teams and visitors." },
  { title: "Changing Room", description: "Clean and comfortable changing facilities." },
  { title: "Drinking Water", description: "Fresh drinking water available round the clock." },
  { title: "Washroom", description: "Spacious washroom and sanitation facilities." },
  { title: "Cafe", description: "Refreshments and snacks available on-site." },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <Hero />
      <Widgets />
      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-[1.6rem] border border-white/10 bg-slate-900/70 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Why choose us</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Modern Sports Venue</h2>
          <p className="mt-3 text-slate-300">RCM Turf Cricket is built for smooth, comfortable, and stress-free slot reservations for every match and practice session.</p>
          <div className="mt-6 grid gap-3">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <p className="font-semibold text-white">{feature.title}</p>
                <p className="text-sm text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-[1.6rem] border border-white/10 bg-slate-900/70 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Gallery preview</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">A premium cricket venue in motion</h2>
          <div className="mt-6">
            <GalleryGrid />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
