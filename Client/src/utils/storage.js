
const THEME_KEY = "rcm_turf_theme";
const ADMIN_TOKEN_KEY = "rcm_turf_admin_token";

export const storage = {
  getTheme: () => localStorage.getItem(THEME_KEY) || "dark",
  setTheme: (theme) => localStorage.setItem(THEME_KEY, theme),
  getAdminToken: () => localStorage.getItem(ADMIN_TOKEN_KEY) || "",
  setAdminToken: (token) => localStorage.setItem(ADMIN_TOKEN_KEY, token || ""),
  clearAdminToken: () => localStorage.removeItem(ADMIN_TOKEN_KEY),
};
