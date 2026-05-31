export interface Procedure {
  id: string;
  slug: string;
  name: string;
  category: "body" | "breast" | "face" | "medspa";
  tagline: string;
  description: string;
  benefits: string[];
  recovery: string;
  icon: string;
  featured: boolean;
  imagePosition?: string;
}

export const procedures: Procedure[] = [
  // Body
  {
    id: "tummy-tuck",
    slug: "tummy-tuck",
    name: "Tummy Tuck",
    category: "body",
    tagline: "Reclaim your contour",
    description:
      "An abdominoplasty removes excess skin and fat from the abdomen while tightening the underlying muscles, creating a firmer, smoother profile.",
    benefits: [
      "Flatter, toned abdominal profile",
      "Tightened core muscles",
      "Removal of stretch marks below the navel",
      "Long-lasting results with healthy lifestyle",
    ],
    recovery: "4–6 weeks",
    icon: "✦",
    featured: true,
  },
  {
    id: "liposuction",
    slug: "liposuction",
    name: "Liposuction",
    category: "body",
    tagline: "Sculpt your silhouette",
    description:
      "Advanced liposuction techniques precisely remove stubborn fat deposits resistant to diet and exercise, reshaping and refining your natural contours.",
    benefits: [
      "Targeted fat reduction",
      "Refined body contours",
      "Improved body proportions",
      "Minimally invasive techniques available",
    ],
    recovery: "2–4 weeks",
    icon: "◆",
    featured: true,
  },
  {
    id: "brazilian-butt-lift",
    slug: "brazilian-butt-lift",
    name: "Brazilian Butt Lift",
    category: "body",
    tagline: "Curves, elevated",
    description:
      "The BBL combines strategic liposuction with fat transfer to enhance volume and shape, creating natural-looking, beautiful curves.",
    benefits: [
      "Natural-looking volume enhancement",
      "Uses your own fat tissue",
      "Improved waist-to-hip ratio",
      "Dual benefit: liposuction + augmentation",
    ],
    recovery: "3–6 weeks",
    icon: "❖",
    featured: true,
    imagePosition: "center bottom",
  },
  {
    id: "mommy-makeover",
    slug: "mommy-makeover",
    name: "Mommy Makeover",
    category: "body",
    tagline: "Rediscover yourself",
    description:
      "A customized combination of procedures — typically breast, abdominal, and contouring — designed to restore your pre-pregnancy body and confidence.",
    benefits: [
      "Comprehensive body restoration",
      "Customized to your goals",
      "Single recovery period",
      "Dramatic, transformative results",
    ],
    recovery: "4–8 weeks",
    icon: "✧",
    featured: false,
  },
  {
    id: "body-contouring",
    slug: "body-contouring",
    name: "Body Contouring",
    category: "body",
    tagline: "Define your form",
    description:
      "After significant weight loss or as a standalone procedure, body contouring removes excess skin and tightens remaining tissue for a refined, confident appearance.",
    benefits: [
      "Removal of excess skin",
      "Improved skin texture",
      "Enhanced body proportions",
      "Boosted confidence after weight loss",
    ],
    recovery: "4–6 weeks",
    icon: "✦",
    featured: false,
  },
  // Breast
  {
    id: "breast-augmentation",
    slug: "breast-augmentation",
    name: "Breast Augmentation",
    category: "breast",
    tagline: "Natural beauty, amplified",
    description:
      "Using silicone or saline implants, or fat transfer, we enhance breast volume and shape to achieve beautifully proportionate, natural-feeling results.",
    benefits: [
      "Increased breast volume and fullness",
      "Improved symmetry",
      "Natural look and feel with silicone",
      "Long-lasting results",
    ],
    recovery: "2–4 weeks",
    icon: "◈",
    featured: true,
  },
  {
    id: "breast-lift",
    slug: "breast-lift",
    name: "Breast Lift",
    category: "breast",
    tagline: "Restore your profile",
    description:
      "A mastopexy raises and reshapes sagging breasts by removing excess skin and repositioning breast tissue for a more youthful, uplifted contour.",
    benefits: [
      "Elevated, youthful breast position",
      "Improved breast shape",
      "Repositioned nipple-areola complex",
      "Can be combined with augmentation",
    ],
    recovery: "2–4 weeks",
    icon: "◇",
    featured: true,
  },
  {
    id: "breast-reduction",
    slug: "breast-reduction",
    name: "Breast Reduction",
    category: "breast",
    tagline: "Comfort meets confidence",
    description:
      "Breast reduction surgery removes excess breast tissue and skin to achieve a size more proportionate to your frame, relieving discomfort and improving quality of life.",
    benefits: [
      "Relief from neck, back, and shoulder pain",
      "More proportionate figure",
      "Increased physical activity",
      "Improved self-image",
    ],
    recovery: "3–4 weeks",
    icon: "◉",
    featured: false,
  },
  // Face
  {
    id: "rhinoplasty",
    slug: "rhinoplasty",
    name: "Rhinoplasty",
    category: "face",
    tagline: "Harmony in every feature",
    description:
      "Nose reshaping surgery refines the size, shape, and proportion of the nose to create facial harmony, whether for cosmetic enhancement or functional improvement.",
    benefits: [
      "Improved nasal symmetry",
      "Better facial balance",
      "Corrected breathing issues",
      "Natural-looking refinement",
    ],
    recovery: "2–3 weeks visible, 1 year final",
    icon: "✦",
    featured: true,
  },
  {
    id: "facelift",
    slug: "facelift",
    name: "Facelift",
    category: "face",
    tagline: "Turn back the clock",
    description:
      "A rhytidectomy addresses sagging skin, deep wrinkles, and loss of facial volume to restore a naturally youthful, refreshed appearance.",
    benefits: [
      "Reduction of deep facial folds",
      "Tightened jawline and neck",
      "Repositioned facial tissues",
      "Youthful, rested appearance",
    ],
    recovery: "2–3 weeks",
    icon: "◆",
    featured: true,
  },
  {
    id: "eyelid-surgery",
    slug: "eyelid-surgery",
    name: "Eyelid Surgery",
    category: "face",
    tagline: "Eyes that captivate",
    description:
      "Blepharoplasty removes excess skin and fat from the upper and/or lower eyelids, creating a more alert, youthful, and refreshed eye appearance.",
    benefits: [
      "Brighter, more open eyes",
      "Reduced puffiness and bags",
      "Improved vision if drooping was obstructive",
      "Minimal scarring",
    ],
    recovery: "1–2 weeks",
    icon: "❖",
    featured: true,
  },
  {
    id: "neck-lift",
    slug: "neck-lift",
    name: "Neck Lift",
    category: "face",
    tagline: "Refined elegance",
    description:
      "A neck lift eliminates excess skin, banding, and fat under the chin to restore a clean, youthful neck and jawline contour.",
    benefits: [
      "Defined jawline",
      "Eliminated turkey neck",
      "Removed excess fat",
      "Tightened neck muscles",
    ],
    recovery: "2–3 weeks",
    icon: "✧",
    featured: false,
  },
  // MedSpa
  {
    id: "botox-fillers",
    slug: "botox-fillers",
    name: "Botox & Fillers",
    category: "medspa",
    tagline: "Refresh without surgery",
    description:
      "Expertly administered neurotoxins and dermal fillers soften lines, restore volume, and sculpt facial contours for a naturally refreshed result.",
    benefits: [
      "Immediate results",
      "No downtime",
      "Softened wrinkles and lines",
      "Restored facial volume",
    ],
    recovery: "No downtime",
    icon: "◈",
    featured: true,
  },
  {
    id: "laser-resurfacing",
    slug: "laser-resurfacing",
    name: "Laser Resurfacing",
    category: "medspa",
    tagline: "Reveal radiant skin",
    description:
      "Advanced laser treatments address texture irregularities, sun damage, scars, and signs of aging, revealing smoother, more luminous skin.",
    benefits: [
      "Improved skin texture",
      "Reduced sun damage",
      "Minimized scars",
      "Stimulated collagen production",
    ],
    recovery: "3–7 days",
    icon: "◇",
    featured: true,
  },
  {
    id: "microneedling",
    slug: "microneedling",
    name: "Microneedling",
    category: "medspa",
    tagline: "Renew from within",
    description:
      "Collagen induction therapy stimulates the skin's natural repair process, improving tone, texture, and firmness with minimal downtime.",
    benefits: [
      "Reduced fine lines",
      "Improved skin tone",
      "Minimized pores",
      "Natural collagen stimulation",
    ],
    recovery: "1–2 days",
    icon: "◉",
    featured: false,
  },
  // Body (additional)
  {
    id: "lipo-360",
    slug: "lipo-360",
    name: "Lipo 360",
    category: "body",
    tagline: "Full-circumference sculpting",
    description:
      "Lipo 360 targets the entire midsection — abdomen, flanks, back, and waist — to create a dramatically slimmer, contoured silhouette from every angle.",
    benefits: [
      "Complete 360° midsection transformation",
      "Defined waistline from all angles",
      "Targeted fat removal in hard-to-slim areas",
      "Dramatic, long-lasting results",
    ],
    recovery: "2–4 weeks",
    icon: "◆",
    featured: true,
  },
  {
    id: "arm-thigh-lift",
    slug: "arm-thigh-lift",
    name: "Arm & Thigh Lift",
    category: "body",
    tagline: "Tighten and tone",
    description:
      "An arm or thigh lift removes excess, sagging skin caused by weight loss or aging, restoring a firmer, more toned appearance to the upper arms and legs.",
    benefits: [
      "Removal of excess, drooping skin",
      "Smoother, toned contours",
      "Improved comfort and mobility",
      "Long-lasting results with stable weight",
    ],
    recovery: "2–4 weeks",
    icon: "✦",
    featured: false,
  },
  {
    id: "abdominal-etching",
    slug: "abdominal-etching",
    name: "Abdominal Etching",
    category: "body",
    tagline: "Sculpted definition",
    description:
      "Abdominal etching uses precision liposuction to selectively remove fat around the natural muscle groups, revealing six-pack definition you can't get from the gym alone.",
    benefits: [
      "Visible six-pack definition",
      "Natural-looking athletic result",
      "Minimal scarring",
      "Permanent fat removal",
    ],
    recovery: "2–3 weeks",
    icon: "✧",
    featured: false,
    imagePosition: "center 60%",
  },
  // Breast (additional)
  {
    id: "gynecomastia",
    slug: "gynecomastia",
    name: "Gynecomastia",
    category: "breast",
    tagline: "A flatter, masculine chest",
    description:
      "Male breast reduction surgery removes excess glandular tissue and fat from the chest, creating a flatter, firmer, more masculine contour.",
    benefits: [
      "Flatter, defined chest",
      "Improved body confidence",
      "Permanent results",
      "Minimal visible scarring",
    ],
    recovery: "2–3 weeks",
    icon: "◈",
    featured: false,
  },
  // Face (additional)
  {
    id: "otoplasty",
    slug: "otoplasty",
    name: "Otoplasty",
    category: "face",
    tagline: "Ears in perfect balance",
    description:
      "Ear reshaping surgery corrects prominent or asymmetrical ears by repositioning and reshaping the cartilage for a more balanced, natural appearance.",
    benefits: [
      "Corrected ear position and shape",
      "Improved facial symmetry",
      "Lasting results",
      "Suitable for teens and adults",
    ],
    recovery: "1–2 weeks",
    icon: "◇",
    featured: false,
  },
  {
    id: "bichectomy",
    slug: "bichectomy",
    name: "Bichectomy",
    category: "face",
    tagline: "Sculpted cheekbones",
    description:
      "Buccal fat removal reduces fullness in the cheeks by removing the buccal fat pad, creating a slimmer, more defined facial contour and prominent cheekbones.",
    benefits: [
      "Slimmer facial profile",
      "Defined cheekbones",
      "Minimally invasive — no external incisions",
      "Permanent results",
    ],
    recovery: "1–2 weeks",
    icon: "◉",
    featured: false,
  },
];

export const categoryLabels: Record<string, string> = {
  body: "Body",
  breast: "Breast",
  face: "Face",
  medspa: "MedSpa",
};

export const categoryGradients: Record<string, string> = {
  body: "proc-body",
  breast: "proc-breast",
  face: "proc-face",
  medspa: "proc-medspa",
};

export const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    procedure: "Breast Augmentation",
    rating: 5,
    text: "From my first consultation to my final follow-up, the care I received was exceptional. The results look completely natural and I finally feel confident in my own skin. I couldn't be happier.",
  },
  {
    id: 2,
    name: "Jennifer L.",
    procedure: "Tummy Tuck",
    rating: 5,
    text: "After having three kids, I wanted my body back. The team at YCS listened to everything I wanted and delivered beyond my expectations. The recovery support was incredible — I never felt alone.",
  },
  {
    id: 3,
    name: "Maria R.",
    procedure: "Rhinoplasty",
    rating: 5,
    text: "I was nervous for years about getting a rhinoplasty. The surgeon took the time to truly understand my concerns and goals. The result is so natural that people just say I look like a better version of myself.",
  },
  {
    id: 4,
    name: "Christine D.",
    procedure: "Facelift",
    rating: 5,
    text: "I look ten years younger and feel absolutely wonderful. The whole experience was professional, warm, and reassuring at every step. The results are natural and stunning — exactly what I asked for.",
  },
  {
    id: 5,
    name: "Amanda T.",
    procedure: "Mommy Makeover",
    rating: 5,
    text: "The mommy makeover changed my life. I feel like myself again after years of feeling uncomfortable in my body. The team was compassionate and the results exceeded everything I hoped for.",
  },
  {
    id: 6,
    name: "Rebecca K.",
    procedure: "Botox & Fillers",
    rating: 5,
    text: "I've been coming for fillers and Botox for two years now. The results are always natural — no frozen looks, no over-filling. Just a refreshed, younger version of me. I recommend them to everyone.",
  },
];
