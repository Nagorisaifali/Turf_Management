import { FiPhone, FiMapPin, FiClock } from "react-icons/fi";

export default function Contact() {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-4 shadow-2xl shadow-black/20 sm:p-6">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Contact</p>
        <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Get in touch with RCM Turf</h1>
        <div className="mt-6 space-y-4 text-sm text-slate-300 sm:text-base">
          <div className="flex items-center gap-3"><FiPhone className="text-emerald-400" /> <span>+91 78690 43178</span></div>
          <div className="flex items-center gap-3"><FiMapPin className="text-emerald-400" /> <span>RCM Turf, Mahidpur, Transport Nagar Road</span></div>
          <div className="flex items-center gap-3"><FiClock className="text-emerald-400" /> <span>Open 24/7 for bookings</span></div>
        </div>
        <a href="https://wa.me/917869043178" className="mt-6 inline-flex rounded-full bg-emerald-500 px-4 py-3 font-semibold text-slate-950">WhatsApp Now</a>
      </div>
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-4 shadow-2xl shadow-black/20 sm:p-6">
        <iframe
          title="RCM Turf Map"
          src="https://www.google.com/maps?q=FMH5%2B98X%2C%20Tajpura%2C%20Transport%20Nagar%2C%20Mahidpur%2C%20Madhya%20Pradesh%20456443&z=14&output=embed"
          className="h-72 w-full rounded-[1.3rem] border-0 sm:h-80"
        />
      </div>
    </div>
  );
}
