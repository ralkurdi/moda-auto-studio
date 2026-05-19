export const VEHICLE_TIERS = {
  coupe: {
    label: "Coupe / small sedan",
    multiplier: 0.85,
    ex: "911, M2, GR86, Civic Type R",
  },
  sedan: {
    label: "Sedan",
    multiplier: 1.0,
    ex: "M5, RS6, Model 3, Taycan",
  },
  suv: {
    label: "SUV / crossover",
    multiplier: 1.2,
    ex: "X5, Cayenne, Model Y, RS Q8",
  },
  truck: {
    label: "Large SUV / truck",
    multiplier: 1.4,
    ex: "G-Wagon, Cybertruck, Range Rover",
  },
  exotic: {
    label: "Exotic / specialty",
    multiplier: 1.55,
    ex: "Huracán, GT3, McLaren, SF90",
  },
};

export const SERVICE_CATALOG = [
  {
    id: "wrap-full",
    category: "Vinyl",
    title: "Full color-change wrap",
    time: "5–7 days",
    base: [3500, 8000],
    tagline: "Premium cast vinyl. Wrapped edges. Tucked seams.",
    materials: ["3M 2080 cast film", "Avery Dennison SW900", "KPMF iridescent"],
    warranty: "10-year material · 2-year install",
    detail:
      "Panel-by-panel installation with full disassembly of badges, handles, and trims. Available in satin, gloss, matte, chrome, and color-shift finishes.",
  },
  {
    id: "ppf-front",
    category: "PPF",
    title: "Paint Protection Film · Full Front",
    time: "2 days",
    base: [1750, 3000],
    tagline: "Bumper, hood, fenders, mirrors. The high-impact zones.",
    materials: ["3M Pro Series PPF", "XPEL Ultimate Plus 10", "SunTek Reaction"],
    warranty: "10-year self-healing · transferable",
    detail:
      "Self-healing 8-mil urethane film with hydrophobic top-coat. Yellowing-resistant. Track package available with rocker and A-pillar coverage.",
  },
  {
    id: "ppf-full",
    category: "PPF",
    title: "Paint Protection Film · Full Body",
    time: "6–8 days",
    base: [7500, 10000],
    tagline: "Every painted panel. Total protection.",
    materials: ["3M Pro Series PPF", "XPEL Ultimate Plus 10", "STEK Dynoshield"],
    warranty: "10-year manufacturer warranty · VIN-registered",
    detail:
      "Complete coverage including rockers, lower doors, and A-pillars. Computer-cut for perfect panel fit. Photographed daily for warranty record.",
  },
  {
    id: "tint-full",
    category: "Tint",
    title: "Ceramic Tint · Full Vehicle",
    time: "3–4 hours",
    base: [350, 800],
    tagline: "3M Ceramic IR. The standard the industry copies.",
    materials: ["3M Ceramic IR", "3M Crystalline series"],
    warranty: "10-year manufacturer warranty",
    detail:
      "Multi-layer nano-ceramic film. Blocks up to 95% IR heat and 99.9% UV. Available 5%–70% VLT. Will not interfere with GPS, phone, or radio signals.",
  },
  {
    id: "tint-front",
    category: "Tint",
    title: "Ceramic Tint · 2 Front Windows",
    time: "45 min",
    base: [120, 120],
    tagline: "The legal complement. Match what's already there.",
    materials: ["3M Ceramic IR"],
    warranty: "10-year manufacturer warranty",
    detail:
      "Pairs with factory rear tint or existing back-window film. California law requires 70%+ VLT on front doors — we install the legal complement.",
  },
  {
    id: "tint-sides-back",
    category: "Tint",
    title: "Ceramic Tint · Sides & Back",
    time: "2 hours",
    base: [500, 500],
    tagline: "Privacy where it matters most.",
    materials: ["3M Ceramic IR"],
    warranty: "10-year manufacturer warranty",
    detail:
      "Rear doors, quarter glass, and rear windshield in matched VLT. Heat-shaped for the rear curve — no creases, no purpling, no bubbling.",
  },
  {
    id: "tint-windshield",
    category: "Tint",
    title: "Windshield Tint Add-On",
    time: "30 min",
    base: [125, 200],
    tagline: "The IR layer the rest of your tint deserves.",
    materials: ["3M Ceramic IR (70% VLT)"],
    warranty: "10-year manufacturer warranty",
    detail:
      "Clear ceramic film at 70% VLT — fully street-legal in California. Rejects up to 95% of infrared heat through the largest window on your car.",
  },
  {
    id: "ceramic5",
    category: "Ceramic",
    title: "Ceramic Coating · 5-Year",
    time: "2 days",
    base: [800, 1800],
    tagline: "9H glass-hard finish. The depth of glass.",
    materials: ["Gtechniq Crystal Serum", "CQuartz UK 3.0", "IGL Kenzo"],
    warranty: "5-year manufacturer-backed",
    detail:
      "Two-layer SiO2 coating preceded by single-stage paint correction. Hydrophobic, chemical-resistant, UV-stable. Boosts gloss noticeably on dark colors.",
  },
  {
    id: "correction",
    category: "Correction",
    title: "Paint Correction · 2-Stage",
    time: "1–2 days",
    base: [800, 1400],
    tagline: "Cut, refine, finish. Swirl-free under any light.",
    materials: [
      "Rupes BigFoot polishers",
      "Lake Country Microfiber",
      "Menzerna 3-step compound",
    ],
    warranty: "Pre-coating prep — backed by ceramic",
    detail:
      "Compound + polish to remove swirl marks, oxidation, holograms, and light scratches. Required prep step before any ceramic coating.",
  },
];

export const BUNDLES = [
  {
    id: "sig",
    name: "Signature Protection",
    services: ["ppf-front", "ceramic5", "tint-full"],
    discount: 0.15,
    badge: "Most popular",
    desc: "Full front PPF, 5-year ceramic, and full ceramic tint.",
  },
  {
    id: "con",
    name: "Concours Package",
    services: ["ppf-full", "ceramic5", "tint-full"],
    discount: 0.18,
    badge: "Best value",
    desc:
      "Full-body PPF, 5-year ceramic, and full ceramic tint. Total protection.",
  },
  {
    id: "wrp",
    name: "Wrap & Protect",
    services: ["wrap-full", "ceramic5"],
    discount: 0.12,
    badge: "Wrap pairing",
    desc: "Full color change with ceramic over the wrap for longer life.",
  },
];

export const tierPrice = (svc, tier) => {
  const m = VEHICLE_TIERS[tier]?.multiplier || 1;
  const [lo, hi] = svc.base;
  return [
    Math.round((lo * m) / 50) * 50,
    Math.round((hi * m) / 50) * 50,
  ];
};
