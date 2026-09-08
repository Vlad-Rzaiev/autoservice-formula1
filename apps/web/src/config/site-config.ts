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
  embedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2394.284662992229!2d18.0156577769566!3d53.12303539140839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4703139474c0907f%3A0x4732c7295d1f07ba!2sJagiello%C5%84ska%201%2C%2085-005%20Bydgoszcz!5e0!3m2!1suk!2spl!4v1788884794860!5m2!1suk!2spl',
} as const;
