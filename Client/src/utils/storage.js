
const BOOKINGS_KEY = "rcm_turf_bookings";
const THEME_KEY = "rcm_turf_theme";
const ADMIN_KEY = "rcm_turf_admin_auth";

export const storage = {
  getBookings: () => JSON.parse(localStorage.getItem(BOOKINGS_KEY) || "[]"),
  setBookings: (bookings) => localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings)),
  getTheme: () => localStorage.getItem(THEME_KEY) || "dark",
  setTheme: (theme) => localStorage.setItem(THEME_KEY, theme),
  getAdminAuth: () => localStorage.getItem(ADMIN_KEY) === "true",
  setAdminAuth: (value) => localStorage.setItem(ADMIN_KEY, value ? "true" : "false"),
};