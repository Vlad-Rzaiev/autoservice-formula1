const address = "ul. Jagiellońska 1, 85-005 Bydgoszcz";

export const siteConfig = {
  phone: {
    display: "+48 777 777 777",
    href: "tel:+48777777777",
  },
  address: {
    display: address,
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Jagiellońska+1+Bydgoszcz",
  },
} as const;
