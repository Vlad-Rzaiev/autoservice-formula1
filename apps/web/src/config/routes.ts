export const routes = {
  marketing: {
    home: '/',
    booking: '/booking',
    services: '/services',
    service: (slug: string) => `/services/${encodeURIComponent(slug)}`,
    specialists: '/specialists',
    specialist: (id: string) => `/specialists/${encodeURIComponent(id)}`,
  },

  auth: {
    login: '/login',
    forgotPassword: '/forgot-password',
    register: '/register',
  },

  dashboard: {
    home: '/dashboard',

    clients: {
      list: '/dashboard/clients',
      detail: (id: string) => `/dashboard/clients/${encodeURIComponent(id)}`,
    },

    cars: {
      list: '/dashboard/cars',
      detail: (id: string) => `/dashboard/cars/${encodeURIComponent(id)}`,
    },

    repairs: {
      list: '/dashboard/repairs',
      detail: (id: string) => `/dashboard/repairs/${encodeURIComponent(id)}`,
    },

    appointments: {
      list: '/dashboard/appointments',
      detail: (id: string) =>
        `/dashboard/appointments/${encodeURIComponent(id)}`,
    },
  },
} as const;
