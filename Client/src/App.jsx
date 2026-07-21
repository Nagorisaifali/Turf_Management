import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Availability from "./pages/Availability";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Bookings from "./pages/Bookings";
import { BookingProvider, useBookingContext } from "./context/BookingContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";

function ProtectedAdminRoute({ children }) {
  const { isAdmin, isLoading } = useBookingContext();
  if (isLoading) return <div className="py-16 text-center text-slate-300">Loading...</div>;
  return isAdmin ? children : <Navigate to="/admin" replace />;
}

function AppShell() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.14),_transparent_35%),linear-gradient(135deg,_#020617,_#111827_60%,_#052e16)] text-slate-100">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/availability" element={<Availability />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/dashboard" element={<ProtectedAdminRoute><Dashboard /></ProtectedAdminRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BookingProvider>
          <BrowserRouter>
            <AppShell />
          </BrowserRouter>
        </BookingProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
