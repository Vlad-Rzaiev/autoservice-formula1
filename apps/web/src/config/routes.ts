export const routes = {
  home: "/",
  login: "/login",
  forgotPassword: "/forgot-password",
  register: "/register",
  booking: "/booking",
  services: "/services",

  service: (slug: string) => `/services/${encodeURIComponent(slug)}`,

  dashboard: "/dashboard",
  clients: "/dashboard/clients",
  client: (id: string) => `/dashboard/clients/${encodeURIComponent(id)}`,
} as const;
