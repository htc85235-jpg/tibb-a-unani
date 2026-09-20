/* Site-wide configuration — DUMMY values, replace with client's real details */
export const site = {
  name: "Tibb-a-Unani",
  tagline: "Ancient Hikmat, Pure Healing",
  sub: "Herbal & Unani Remedies",
  /* DUMMY phone + WhatsApp — replace with client's number (international format for wa.me) */
  phone: "0300 1234567",
  whatsapp: "923001234567",
  email: "info@tibb-a-unani.com",
  address: "Shop #12, Herbal Market, Saddar, Rawalpindi, Pakistan",
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
