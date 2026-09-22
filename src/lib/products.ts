/* DUMMY product catalog — first 5 items use the client's supplied product
   pictures & names; items 6-10 are numbered placeholders. Names, prices,
   descriptions & details will be replaced with the client's real data later.
   All copy is original placeholder text. */

export type Product = {
  slug: string;
  name: string;
  urdu: string;
  category: string; // Majoon | Khamira | Sharbat | Roghan | Habbe | Capsule
  size: string;
  price: number;
  compareAt?: number;
  img: string;
  rating: number;
  reviews: number;
  sold24: number; // dummy "sold in last 24 hours"
  viewing: number; // dummy "viewing right now"
  inStock: boolean;
  bestseller?: boolean;
  fresh?: boolean; // New Arrivals tab
  short: string;
  description: string[];
  benefits: string[];
  dosage: string;
  pairWith: string[]; // slugs for "Pairs well with"
};

export const CATEGORIES = ["Majoon", "Khamira", "Sharbat", "Roghan", "Habbe", "Capsule"];

export const products: Product[] = [
  {
    slug: "majoon-e-shahi",
    name: "Joint Sukoon Oil",
    urdu: "",
    category: "Majoon",
    size: "250 g",
    price: 3500,
    compareAt: 4200,
    img: "/images/joint-sukoon-oil.jpg",
    rating: 4.8,
    reviews: 612,
    sold24: 38,
    viewing: 25,
    inStock: true,
    bestseller: true,
    fresh: false,
    short: "A rich classical majoon prepared with honey, dry fruits and warming herbs for daily strength and vitality.",
    description: [
      "Majoon-e-Shahi is a traditional Unani confection made slowly in small batches. Pure honey is blended with a base of almonds, pistachios and selected warming herbs to create a smooth, energy-dense paste that has been a household trusted remedy for generations.",
      "Every batch is lab tested for purity and contains no artificial colors, no chemicals and no habit-forming ingredients — only time-tested natural goodness prepared the classical way.",
    ],
    benefits: [
      "Supports natural energy and daily vitality",
      "Nourishes the body with honey and dry fruits",
      "Prepared with classical Unani methods",
      "100% natural — free from chemicals",
    ],
    dosage: "Half teaspoon once or twice daily with warm milk, or as directed by your Hakeem.",
    pairWith: ["roghan-baadam-shirin", "khamira-gilo-himalayi"],
  },
  {
    slug: "majoon-muqavvi-dimagh",
    name: "Prozon Premium Prostate Support",
    urdu: "",
    category: "Majoon",
    size: "200 g",
    price: 3200,
    img: "/images/prozon-prostate-support.jpg",
    rating: 4.9,
    reviews: 284,
    sold24: 21,
    viewing: 17,
    inStock: true,
    bestseller: true,
    fresh: false,
    short: "Brain and nerve tonic majoon with cooling herbs traditionally used for focus, memory and mental calm.",
    description: [
      "A gentle brain tonic prepared from herbs classically associated with mental clarity — including brahmi-like cooling agents and nerve-soothing botanicals folded into a honey base.",
      "It is traditionally taken by students and professionals during demanding periods of study or work, and by elders to support steady memory and restful sleep.",
    ],
    benefits: [
      "Traditionally used to support memory and focus",
      "Soothes the nerves and supports calm sleep",
      "Honey-based, gentle on the stomach",
      "No chemicals or artificial additives",
    ],
    dosage: "One teaspoon at bedtime with warm milk, or as directed by your Hakeem.",
    pairWith: ["itrifal-ustukhuddus", "roghan-baadam-shirin"],
  },
  {
    slug: "majoon-jograj-guggul",
    name: "Men's Vitality Support",
    urdu: "",
    category: "Majoon",
    size: "200 g",
    price: 1950,
    compareAt: 2400,
    img: "/images/mens-vitality-support.jpg",
    rating: 4.6,
    reviews: 176,
    sold24: 12,
    viewing: 9,
    inStock: true,
    fresh: false,
    short: "Classical guggul-based majoon traditionally taken for joint comfort, flexibility and healthy metabolism.",
    description: [
      "Jograj Guggul is a respected classical preparation combining purified guggul with warming digestive herbs. It has a long history of use for joint comfort and stiffness, especially in changing weather.",
      "Our batch is prepared with purified guggul only — never raw — and is lab tested for heavy metals before packing.",
    ],
    benefits: [
      "Traditionally used for joint comfort and flexibility",
      "Supports healthy metabolism",
      "Purified, lab-tested guggul",
      "Free from chemicals and fillers",
    ],
    dosage: "One teaspoon daily after dinner with lukewarm water, or as directed by your Hakeem.",
    pairWith: ["roghan-babchi", "khamira-abresham"],
  },
  {
    slug: "khamira-gilo-himalayi",
    name: "Donkey Oil & Golden Capsule",
    urdu: "",
    category: "Khamira",
    size: "150 g",
    price: 2800,
    compareAt: 3400,
    img: "/images/donkey-oil-golden-capsule.jpg",
    rating: 4.9,
    reviews: 398,
    sold24: 27,
    viewing: 19,
    inStock: true,
    bestseller: true,
    fresh: false,
    short: "Heart-friendly khamira of gilo (Tinospora) prepared over slow fire — a beloved summer tonic for the whole family.",
    description: [
      "Khamira Gilo Himalayi is prepared from fresh gilo extract, carefully cooked down and kneaded into a soft semisolid khamira. In classical Unani practice it is regarded as a heart and general strength tonic.",
      "It is equally valued during seasonal change, when families traditionally take a small daily dose to keep fevers and fatigue at arm's length.",
    ],
    benefits: [
      "Classical heart and strength tonic",
      "Supports the body during seasonal change",
      "Prepared from fresh gilo extract",
      "Gentle enough for regular family use",
    ],
    dosage: "One teaspoon morning and evening with water or milk, or as directed by your Hakeem.",
    pairWith: ["majoon-e-shahi", "sharbat-faulad"],
  },
  {
    slug: "khamira-abresham",
    name: "Pine Height",
    urdu: "",
    category: "Khamira",
    size: "150 g",
    price: 2400,
    img: "/images/pine-height.jpg",
    rating: 4.8,
    reviews: 221,
    sold24: 15,
    viewing: 11,
    inStock: true,
    fresh: true,
    short: "Silk-protein khamira traditionally used as a heart tonic and for general weakness after illness.",
    description: [
      "Khamira Abresham takes its name from abresham (silk cocoon), a prized classical ingredient. Slow-cooked with cardamom and rose, it is traditionally given to strengthen the heart and rebuild strength after fevers or long illness.",
      "A small daily dose is a time-honoured way to restore appetite and healthy weight naturally.",
    ],
    benefits: [
      "Traditional heart tonic with silk protein",
      "Helps rebuild strength after illness",
      "Supports healthy appetite",
      "Aromatic, pleasant-tasting khamira",
    ],
    dosage: "One teaspoon twice daily, or as directed by your Hakeem.",
    pairWith: ["sharbat-bazoori-motadil", "majoon-e-shahi"],
  },
  {
    slug: "sharbat-faulad",
    name: "Product 6",
    urdu: "",
    category: "Sharbat",
    size: "500 ml",
    price: 1800,
    img: "/images/p_syrup.png",
    rating: 4.6,
    reviews: 189,
    sold24: 18,
    viewing: 13,
    inStock: true,
    fresh: true,
    short: "Iron-rich herbal syrup traditionally used to support healthy blood, color and daily energy.",
    description: [
      "Sharbat Faulad is a classical iron syrup prepared from herbal iron (faulad) processed the Unani way — purified, ground and infused with aromatic digestives so it stays gentle on the stomach.",
      "It is traditionally taken in recovery periods, during weakness, and by women needing natural blood support.",
    ],
    benefits: [
      "Traditional herbal iron tonic",
      "Supports healthy blood and natural color",
      "Gentle on digestion — no constipation",
      "Pleasant taste, easy to take daily",
    ],
    dosage: "Two tablespoons daily after lunch, or as directed by your Hakeem.",
    pairWith: ["khamira-gilo-himalayi", "majoon-e-shahi"],
  },
  {
    slug: "sharbat-bazoori-motadil",
    name: "Product 7",
    urdu: "",
    category: "Sharbat",
    size: "500 ml",
    price: 2100,
    compareAt: 2500,
    img: "/images/p_syrup.png",
    rating: 4.7,
    reviews: 298,
    sold24: 22,
    viewing: 15,
    inStock: true,
    bestseller: true,
    fresh: false,
    short: "Cooling liver tonic sharbat with bazoori seeds — the classical choice for liver heat and summer fatigue.",
    description: [
      "Bazoori Motadil is a balanced (motadil) liver sharbat built around cooling bazoori seeds and delicate aromatic herbs. Classical physicians reached for it whenever the liver was hot, the temper short and the body tired.",
      "Taken chilled in summer, it is a family favourite for keeping the liver calm and the mood even.",
    ],
    benefits: [
      "Classical cooling liver tonic",
      "Eases liver heat and summer fatigue",
      "Supports calm, even mood",
      "Delicious served chilled",
    ],
    dosage: "Two tablespoons with water morning and evening, or as directed by your Hakeem.",
    pairWith: ["sharbat-faulad", "khamira-abresham"],
  },
  {
    slug: "roghan-babchi",
    name: "Product 8",
    urdu: "",
    category: "Roghan",
    size: "50 ml",
    price: 1450,
    img: "/images/p_oil.png",
    rating: 4.7,
    reviews: 241,
    sold24: 16,
    viewing: 21,
    inStock: true,
    fresh: false,
    short: "Classical babchi seed oil traditionally massaged on the skin to support even tone and natural colour.",
    description: [
      "Roghan Babchi is prepared by infusing babchi seeds — one of the most respected herbs in Unani dermatology — into a nourishing oil base under gentle heat.",
      "Applied locally with a light massage, it has long been used for skin tone, spots and dryness. A patch test is recommended before first use.",
    ],
    benefits: [
      "Traditional oil for skin tone and spots",
      "Supports naturally even, healthy skin",
      "Prepared from pure babchi seeds",
      "Light, fast-absorbing base oil",
    ],
    dosage: "Apply a few drops on affected skin twice daily with gentle massage, or as directed by your Hakeem.",
    pairWith: ["majoon-jograj-guggul", "roghan-baadam-shirin"],
  },
  {
    slug: "roghan-baadam-shirin",
    name: "Product 9",
    urdu: "",
    category: "Roghan",
    size: "100 ml",
    price: 1200,
    img: "/images/p_oil.png",
    rating: 4.8,
    reviews: 356,
    sold24: 30,
    viewing: 23,
    inStock: true,
    bestseller: true,
    fresh: false,
    short: "Pure sweet almond oil — the family classic for brain, hair, skin and gentle daily nourishment.",
    description: [
      "Cold-pressed from sweet almonds (baadam shirin), this clear golden oil is one of the most loved household oils in Unani tradition — a spoonful for the brain and body, a few drops for hair and skin.",
      "It is 100% pure with nothing added: no fragrance, no mineral oil, no preservatives.",
    ],
    benefits: [
      "100% pure cold-pressed sweet almond oil",
      "Traditionally taken for brain and body strength",
      "Excellent for hair, scalp and soft skin",
      "Safe for the whole family",
    ],
    dosage: "Half teaspoon daily for adults; a few drops for hair and skin as needed.",
    pairWith: ["majoon-e-shahi", "majoon-muqavvi-dimagh"],
  },
  {
    slug: "habbe-mumsik",
    name: "Product 10",
    urdu: "",
    category: "Habbe",
    size: "20 pills",
    price: 2200,
    compareAt: 2650,
    img: "/images/p_pills.png",
    rating: 4.8,
    reviews: 517,
    sold24: 34,
    viewing: 27,
    inStock: true,
    bestseller: true,
    fresh: false,
    short: "Classical herbal pills traditionally taken for male strength, stamina and confidence — discreet ordering.",
    description: [
      "Habbe Mumsik Titraje is one of the most prescribed classical compounds for male sexual health. Small pills of warming herbs are taken over a course of days, gently building strength rather than forcing it.",
      "Each pill is made from pure herbs — no modern pharmaceuticals — and is packed discreetly with plain, unmarked outer packaging.",
    ],
    benefits: [
      "Classical support for male strength and stamina",
      "Herbal course — no pharmaceutical drugs",
      "Builds gradually, dose by dose",
      "Discreet, unmarked packaging",
    ],
    dosage: "One pill at bedtime with warm milk on the days directed by your Hakeem.",
    pairWith: ["majoon-e-shahi", "roghan-baadam-shirin"],
  },
];

export const bySlug = (slug: string) => products.find((p) => p.slug === slug);
export const prevNext = (slug: string) => {
  const i = products.findIndex((p) => p.slug === slug);
  return { prev: products[(i - 1 + products.length) % products.length], next: products[(i + 1) % products.length] };
};
export const bestsellers = () => products.filter((p) => p.bestseller);
export const hotProducts = () => [...products].sort((a, b) => b.sold24 - a.sold24).slice(0, 8);
export const freshProducts = () => products.filter((p) => p.fresh);
export const saleProducts = () => products.filter((p) => p.compareAt);
export const alsoBought = (p: Product) =>
  products.filter((x) => x.slug !== p.slug && x.category === p.category)
    .concat(products.filter((x) => x.slug !== p.slug && x.category !== p.category))
    .slice(0, 4);
export const related = (p: Product) => p.pairWith.map(bySlug).filter(Boolean) as Product[];
