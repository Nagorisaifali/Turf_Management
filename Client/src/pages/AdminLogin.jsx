import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../context/BookingContext";
import { useToast } from "../context/ToastContext";

export default function AdminLogin() {
  const { loginAdmin } = useBookingContext();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    const ok = loginAdmin(form.username, form.password);
    if (ok) {
      showToast("Admin login successful.");
      navigate("/dashboard");
    } else {
      showToast("Invalid admin credentials.");
    }
  };

  return (
    <div className="mx-auto flex max-w-md flex-col rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/30">
      <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Admin Access</p>
      <h1 className="mt-3 text-3xl font-semibold text-white">Secure Login</h1>
      <p className="mt-2 text-slate-400">Enter the admin credentials to manage bookings.</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white" placeholder="Username" />
        <input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white" placeholder="Password" />
        <button className="w-full rounded-full bg-emerald-500 px-4 py-3 font-semibold text-slate-950">Login</button>
      </form>
      {/* <p className="mt-4 text-sm text-slate-400">Demo: admin / admin123</p> */}
    </div>
  );
}
