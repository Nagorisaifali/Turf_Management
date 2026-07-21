const API_URL = (import.meta.env.VITE_API_URL || "https://tur-fmanagement.onrender.com/api").replace(/\/$/, "");

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
      ...options.headers,
    },
    ...options,  
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message || "Request failed.");
  }
  return data;
}

export const api = {
  loginAdmin: (credentials) =>
    request("/admin/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),
  getBookings: () => request("/bookings"),
  createBooking: (booking, token) =>
    request("/bookings", {
      method: "POST",
      token,
      body: JSON.stringify(booking),
    }),
  updateBooking: (booking, token) =>
    request(`/bookings/${booking.id}`, {
      method: "PUT",
      token,
      body: JSON.stringify(booking),
    }),
  deleteBooking: (id, token) =>
    request(`/bookings/${id}`, {
      method: "DELETE",
      token,
    }),
};
