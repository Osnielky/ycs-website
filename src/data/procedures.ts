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
  es?: {
    name: string;
    description: string;
    benefits: string[];
    tagline?: string;
    recovery?: string;
  };
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
    es: {
      name: "Abdominoplastia",
      tagline: "Recupera tu contorno",
      description: "La abdominoplastia elimina el exceso de piel y grasa del abdomen mientras fortalece los músculos subyacentes, creando un perfil más firme y liso.",
      benefits: [
        "Perfil abdominal más plano y tonificado",
        "Músculos centrales fortalecidos",
        "Eliminación de estrías bajo el ombligo",
        "Resultados duraderos con estilo de vida saludable",
      ],
      recovery: "4–6 semanas",
    },
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
    es: {
      name: "Liposucción",
      tagline: "Esculpe tu silueta",
      description: "Las técnicas avanzadas de liposucción eliminan depósitos de grasa resistentes a la dieta y el ejercicio, remodelando y refinando sus contornos naturales.",
      benefits: [
        "Reducción de grasa localizada",
        "Contornos corporales refinados",
        "Mejora de las proporciones corporales",
        "Técnicas mínimamente invasivas disponibles",
      ],
      recovery: "2–4 semanas",
    },
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
    es: {
      name: "Aumento de Glúteos (BBL)",
      tagline: "Curvas realzadas",
      description: "El BBL combina liposucción estratégica con transferencia de grasa para realzar el volumen y la forma, creando curvas naturales y hermosas.",
      benefits: [
        "Realce de volumen de aspecto natural",
        "Utiliza su propio tejido adiposo",
        "Mejor proporción cintura-cadera",
        "Doble beneficio: liposucción + aumento",
      ],
      recovery: "3–6 semanas",
    },
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
    es: {
      name: "Mommy Makeover",
      tagline: "Redescúbrete",
      description: "Una combinación personalizada de procedimientos — típicamente de senos, abdomen y contorneado — diseñada para restaurar su cuerpo y confianza previos al embarazo.",
      benefits: [
        "Restauración corporal integral",
        "Personalizado según sus objetivos",
        "Período de recuperación único",
        "Resultados dramáticos y transformadores",
      ],
      recovery: "4–8 semanas",
    },
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
    es: {
      name: "Contorneado Corporal",
      tagline: "Define tu figura",
      description: "Después de una pérdida de peso significativa o como procedimiento independiente, el contorneado corporal elimina el exceso de piel y tensa el tejido restante para una apariencia refinada y segura.",
      benefits: [
        "Eliminación del exceso de piel",
        "Mejora de la textura de la piel",
        "Mejora de las proporciones corporales",
        "Mayor confianza tras la pérdida de peso",
      ],
      recovery: "4–6 semanas",
    },
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
    es: {
      name: "Aumento de Senos",
      tagline: "Belleza natural, amplificada",
      description: "Usando implantes de silicona o solución salina, o transferencia de grasa, realzamos el volumen y la forma de los senos para lograr resultados hermosos, proporcionados y de apariencia natural.",
      benefits: [
        "Mayor volumen y plenitud de los senos",
        "Mejor simetría",
        "Aspecto y sensación natural con silicona",
        "Resultados duraderos",
      ],
      recovery: "2–4 semanas",
    },
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
    es: {
      name: "Levantamiento de Senos",
      tagline: "Restaura tu perfil",
      description: "Una mastopexia eleva y remoldea los senos caídos eliminando el exceso de piel y reposicionando el tejido mamario para un contorno más juvenil y elevado.",
      benefits: [
        "Posición mamaria elevada y juvenil",
        "Mejor forma de los senos",
        "Complejo areola-pezón reposicionado",
        "Se puede combinar con aumento",
      ],
      recovery: "2–4 semanas",
    },
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
    es: {
      name: "Reducción de Senos",
      tagline: "Comodidad y confianza",
      description: "La cirugía de reducción mamaria elimina el exceso de tejido y piel para lograr un tamaño más proporcional a su figura, aliviando las molestias y mejorando la calidad de vida.",
      benefits: [
        "Alivio del dolor de cuello, espalda y hombros",
        "Figura más proporcionada",
        "Mayor actividad física",
        "Mejor autoimagen",
      ],
      recovery: "3–4 semanas",
    },
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
    es: {
      name: "Rinoplastia",
      tagline: "Armonía en cada rasgo",
      description: "La cirugía de remodelación nasal refina el tamaño, forma y proporción de la nariz para crear armonía facial, ya sea para mejora estética o funcional.",
      benefits: [
        "Mejor simetría nasal",
        "Mejor equilibrio facial",
        "Corrección de problemas respiratorios",
        "Refinamiento de apariencia natural",
      ],
      recovery: "2–3 semanas visible, 1 año final",
    },
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
    es: {
      name: "Lifting Facial",
      tagline: "Retrocede el tiempo",
      description: "Una ritidectomía trata la piel flácida, las arrugas profundas y la pérdida de volumen facial para restaurar una apariencia naturalmente juvenil y renovada.",
      benefits: [
        "Reducción de pliegues faciales profundos",
        "Línea de mandíbula y cuello más firme",
        "Tejidos faciales reposicionados",
        "Apariencia juvenil y descansada",
      ],
      recovery: "2–3 semanas",
    },
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
    es: {
      name: "Cirugía de Párpados",
      tagline: "Ojos que cautivan",
      description: "La blefaroplastia elimina el exceso de piel y grasa de los párpados superiores y/o inferiores, creando una apariencia ocular más alerta, juvenil y renovada.",
      benefits: [
        "Ojos más brillantes y abiertos",
        "Reducción de bolsas y hinchazón",
        "Mejor visión si el colgamiento era obstructivo",
        "Cicatrización mínima",
      ],
      recovery: "1–2 semanas",
    },
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
    es: {
      name: "Lifting de Cuello",
      tagline: "Elegancia refinada",
      description: "Un lifting de cuello elimina el exceso de piel, bandas y grasa bajo el mentón para restaurar un contorno de cuello y mandíbula limpio y juvenil.",
      benefits: [
        "Línea de mandíbula definida",
        "Eliminación del cuello de pavo",
        "Grasa excedente eliminada",
        "Músculos del cuello tonificados",
      ],
      recovery: "2–3 semanas",
    },
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
    es: {
      name: "Botox y Rellenos",
      tagline: "Rejuvenece sin cirugía",
      description: "Neurotoxinas y rellenos dérmicos administrados con precisión suavizan líneas, restauran volumen y esculpen los contornos faciales para un resultado naturalmente renovado.",
      benefits: [
        "Resultados inmediatos",
        "Sin tiempo de recuperación",
        "Arrugas y líneas suavizadas",
        "Volumen facial restaurado",
      ],
      recovery: "Sin tiempo de recuperación",
    },
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
    es: {
      name: "Resurfacing con Láser",
      tagline: "Revela una piel radiante",
      description: "Los tratamientos láser avanzados abordan irregularidades de textura, daño solar, cicatrices y signos de envejecimiento, revelando una piel más suave y luminosa.",
      benefits: [
        "Mejor textura de la piel",
        "Daño solar reducido",
        "Cicatrices minimizadas",
        "Producción de colágeno estimulada",
      ],
      recovery: "3–7 días",
    },
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
    es: {
      name: "Microagujas",
      tagline: "Renueva desde adentro",
      description: "La terapia de inducción de colágeno estimula el proceso de reparación natural de la piel, mejorando el tono, la textura y la firmeza con un tiempo de inactividad mínimo.",
      benefits: [
        "Líneas finas reducidas",
        "Tono de piel mejorado",
        "Poros minimizados",
        "Estimulación natural de colágeno",
      ],
      recovery: "1–2 días",
    },
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
    es: {
      name: "Lipo 360",
      tagline: "Escultura de 360°",
      description: "El Lipo 360 trabaja todo el midsección — abdomen, flancos, espalda y cintura — para crear una silueta dramáticamente más delgada y contorneada desde todos los ángulos.",
      benefits: [
        "Transformación completa de 360° del midsección",
        "Cintura definida desde todos los ángulos",
        "Eliminación de grasa en áreas difíciles",
        "Resultados dramáticos y duraderos",
      ],
      recovery: "2–4 semanas",
    },
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
    es: {
      name: "Lifting de Brazos y Muslos",
      tagline: "Firma y tonifica",
      description: "Un lifting de brazos o muslos elimina el exceso de piel flácida causada por la pérdida de peso o el envejecimiento, restaurando una apariencia más firme y tonificada.",
      benefits: [
        "Eliminación del exceso de piel colgante",
        "Contornos más suaves y tonificados",
        "Mejor comodidad y movilidad",
        "Resultados duraderos con peso estable",
      ],
      recovery: "2–4 semanas",
    },
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
    es: {
      name: "Marcación Abdominal",
      tagline: "Definición esculpida",
      description: "La marcación abdominal usa liposucción de precisión para eliminar grasa selectivamente alrededor de los grupos musculares naturales, revelando una definición de six-pack que no se logra solo con ejercicio.",
      benefits: [
        "Definición visible de six-pack",
        "Resultado atlético de apariencia natural",
        "Cicatrización mínima",
        "Eliminación permanente de grasa",
      ],
      recovery: "2–3 semanas",
    },
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
    es: {
      name: "Ginecomastia",
      tagline: "Un pecho más plano y masculino",
      description: "La cirugía de reducción mamaria masculina elimina el exceso de tejido glandular y grasa del pecho, creando un contorno más plano, firme y masculino.",
      benefits: [
        "Pecho más plano y definido",
        "Mayor confianza corporal",
        "Resultados permanentes",
        "Cicatrización mínima visible",
      ],
      recovery: "2–3 semanas",
    },
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
    es: {
      name: "Otoplastia",
      tagline: "Orejas en equilibrio perfecto",
      description: "La cirugía de remodelación de orejas corrige orejas prominentes o asimétricas reposicionando y remodelando el cartílago para una apariencia más equilibrada y natural.",
      benefits: [
        "Posición y forma de orejas corregidas",
        "Mejor simetría facial",
        "Resultados duraderos",
        "Adecuado para adolescentes y adultos",
      ],
      recovery: "1–2 semanas",
    },
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
    es: {
      name: "Bichectomía",
      tagline: "Pómulos esculpidos",
      description: "La extracción de grasa bucal reduce la plenitud en las mejillas eliminando la bolsa de grasa bucal, creando un contorno facial más delgado y definido con pómulos prominentes.",
      benefits: [
        "Perfil facial más delgado",
        "Pómulos definidos",
        "Mínimamente invasivo — sin incisiones externas",
        "Resultados permanentes",
      ],
      recovery: "1–2 semanas",
    },
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
