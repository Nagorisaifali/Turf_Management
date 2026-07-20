import GalleryGrid from "../components/GalleryGrid";

export default function Gallery() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/20">
      <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Gallery</p>
      <h1 className="mt-2 text-3xl font-semibold text-white">Explore the turf atmosphere</h1>
      <p className="mt-2 text-slate-400">Immersive cricket visuals and venue highlights crafted for a premium experience.</p>
      <div className="mt-6">
        <GalleryGrid />
      </div>
    </div>
  );
}
