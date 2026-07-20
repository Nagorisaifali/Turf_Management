import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { useBookingContext } from "../context/BookingContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/availability", label: "Availability" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/admin", label: "Admin" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { isAdmin, logoutAdmin } = useBookingContext();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <NavLink to="/" className="text-lg font-semibold uppercase tracking-[0.2em] text-emerald-400">
            RCM Turf
          </NavLink>

          <nav className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${isActive ? "text-emerald-400" : "text-slate-300 hover:text-white"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {isAdmin ? (
              <button onClick={logoutAdmin} className="hidden rounded-full border border-emerald-500/40 px-3 py-2 text-sm text-emerald-300 sm:block">
                Logout
              </button>
            ) : null}
            
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="rounded-full border border-white/10 bg-white/10 p-2 text-slate-100 md:hidden"
              aria-label="Toggle navigation"
            >
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {open ? (
          <div className="mt-3 rounded-[1.2rem] border border-white/10 bg-slate-900/90 p-3 shadow-xl shadow-black/20 md:hidden">
            <nav className="flex flex-col gap-2">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-3 py-2 text-sm font-medium transition ${isActive ? "bg-emerald-500/15 text-emerald-300" : "text-slate-300 hover:bg-white/10 hover:text-white"}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
