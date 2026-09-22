/* Site-wide configuration */
export const site = {
  name: "Tibb-a-Unani",
  tagline: "Ancient Hikmat, Pure Healing",
  sub: "Herbal & Unani Remedies",
  /* Client's real number (international format for wa.me) */
  phone: "+92 322 6644422",
  whatsapp: "923226644422",
  email: "info@tibb-a-unani.com",
  address: "Islamabad, Pakistan",
  hours: "Mon – Sat · 10:00 am – 8:00 pm",
  domain: "tibb-a-unani.com",
  announcements: [
    "Welcome! Your journey to pure, natural healing starts here",
    "The Wisdom of Unani Tibb — 100% Natural & Lab Tested",
    "Cash on Delivery available all over Pakistan",
  ],
};

export const waLink = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
