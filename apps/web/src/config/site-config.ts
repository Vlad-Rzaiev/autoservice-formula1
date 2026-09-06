const address = 'ul. Jagiellońska 1, 85-005 Bydgoszcz';
const googleMapsUrl =
  'https://www.google.com/maps/search/?api=1&query=Jagiellońska+1+Bydgoszcz';

export const siteConfig = {
  phone: {
    display: '+48 777 777 777',
    href: 'tel:+48777777777',
  },
  address: {
    display: address,
    googleMapsUrl,
  },
  email: {
    display: 'Autoservice F1',
    href: 'mailto:autoservice-f1@gmail.com',
  },
  url: {
    development: 'http://localhost:3000',
    production: 'https://autoservice-formula1.vercel.app',
  },
} as const;
