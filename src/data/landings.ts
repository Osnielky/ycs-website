export interface LandingOffer {
  headline: string;
  subtext?: string;
  ctaLabel?: string;
}

export interface LandingTransformation {
  label: string;
  before: string;
  during?: string;
  after: string;
  note?: string;
}

export interface LandingEducationType {
  name: string;
  description: string;
}

export interface LandingEducation {
  title: string;
  body: string;
  combinedTitle: string;
  combinedBody: string;
  typesTitle: string;
  types: LandingEducationType[];
}

export interface LandingProcessSection {
  heading: string;
  body: string;
  image?: string; // reserved for future supporting imagery
}

export interface LandingCandidacy {
  heading: string;
  intro: string;
  qualifies: string[];
}

export interface LandingTimelineStage {
  stage: string;
  detail: string;
}

export interface LandingPricingTier {
  name: string;
  price: string; // display string, e.g. "Starting at $3,000"
  priceValue: number; // numeric minimum, used for structured data
  bestFor: string;
}

export interface LandingPricing {
  heading: string;
  intro: string;
  tiers: LandingPricingTier[];
  factorsTitle: string;
  factors: string[];
  financingNote?: string;
  disclaimer: string;
}

export interface LandingFaq {
  q: string;
  a: string;
}

export interface LandingLocaleContent {
  heroImage?: string;
  heroImageMobile?: string;
  intro: string;
  offer?: LandingOffer;
  transformationsHeading: string;
  transformationsIntro?: string;
  education?: LandingEducation;
  transformations: LandingTransformation[];
  processHeading?: string;
  process: LandingProcessSection[];
  pricing?: LandingPricing;
  candidacy: LandingCandidacy;
  timelineHeading: string;
  timeline: LandingTimelineStage[];
  faqs?: LandingFaq[];
}

export interface LandingContent extends LandingLocaleContent {
  es: LandingLocaleContent;
}

// Fixed UI chrome (not editorial body copy), localized.
export const landingLabels: Record<
  string,
  { before: string; during: string; after: string; placeholder: string; defaultCta: string; phone: string }
> = {
  en: {
    before: "Before",
    during: "During",
    after: "After",
    placeholder: "Photo coming soon",
    defaultCta: "Book Free Consultation",
    phone: "(305) 218-3513",
  },
  es: {
    before: "Antes",
    during: "Durante",
    after: "Después",
    placeholder: "Foto próximamente",
    defaultCta: "Reserva tu Consulta Gratis",
    phone: "(305) 218-3513",
  },
};

const FACELIFT_LANDING: LandingContent = {
  heroImage: "/procedures/face_lift/face_lift_miami_Real_patientfl_hero_section.webp",
  heroImageMobile: "/procedures/face_lift/face_lift_miami_Real_patientfl_mobile.webp",
  intro:
    "A facelift — medically known as a rhytidectomy — is the gold standard for restoring a naturally youthful, rested look to the face and neck. At Your Cosmetic Surgery & SPA in Miami, our board-certified surgeons use advanced deep-plane techniques that reposition the deeper facial tissues, not just tighten skin, for results that look like you — only years younger. Below you can see real transformations, understand exactly how the procedure works step by step, and find out whether you qualify for a free consultation.",
  offer: {
    headline: "Limited-Time: $1,000 Off Your Facelift This Month",
    subtext: "Plus a complimentary skin-rejuvenation treatment with every facelift booked this month.",
    ctaLabel: "Claim This Offer",
  },
  transformationsHeading: "Real Patient Transformations",
  transformationsIntro:
    "Every face ages differently. These before, during, and after results show the natural, balanced rejuvenation our deep-plane technique delivers — never a pulled or windswept look.",
  education: {
    title: "What Is a Facelift?",
    body:
      "A facelift, medically known as a rhytidectomy, is a surgical procedure that restores a smoother, more youthful contour to the lower face and neck. Rather than simply stretching the skin, modern techniques lift and reposition the deeper muscle and connective-tissue layer (the SMAS), then re-drape the skin without tension. The result softens jowls, deepened folds, and loose neck skin while keeping your features unmistakably your own.",
    combinedTitle: "What It Can Be Combined With",
    combinedBody:
      "A facelift is often paired with complementary procedures for a fully balanced rejuvenation. The most common combinations are a neck lift to redefine the jawline, eyelid surgery (blepharoplasty) to brighten tired eyes, a brow lift to raise a heavy forehead, and fat transfer or skin resurfacing to restore lost volume and refine skin quality. Your surgeon tailors the plan to your anatomy and goals during your consultation.",
    typesTitle: "Different Facelift Options",
    types: [
      {
        name: "Mini Facelift",
        description:
          "A more accelerated version of a traditional facelift that targets a smaller area — primarily the cheeks and jowls — with a shorter treatment time and faster recovery. Some areas, such as the forehead, are left untreated. It is an intricate procedure that demands the highest level of precision and technical expertise.",
      },
      {
        name: "Mid-Facelift",
        description:
          "Targets the area between the lower eyelids and the mouth, addressing sagging cheeks, deep nasolabial folds, and other midface signs of aging. Less invasive than a full facelift but more extensive than a mini, it lifts the soft tissues of the cheeks to restore volume and definition, typically with a shorter recovery than a full lift.",
      },
      {
        name: "Lower Facelift",
        description:
          "Tightens the jowls and eliminates a double chin for a defined jawline and a firmer, smoother neck. It offers lower cost and invasiveness than a full facelift, minimal scarring, and a meaningful reduction in the signs of aging along the jaw and neck.",
      },
      {
        name: "Deep Plane Facelift",
        description:
          "The most comprehensive option, repositioning not only the skin but also the deeper tissues and muscles of the face for longer-lasting, more dramatic results that can last up to 10 years. Unlike a mini facelift, it addresses the entire face — forehead, mid-face, and neck.",
      },
    ],
  },
  transformations: [
    {
      label: "Case 1 — Female, 58",
      before: "/before-after/facelift-1-before.webp",
      during: "/before-after/facelift-1-during.webp",
      after: "/before-after/facelift-1-after.webp",
      note: "Deep-plane facelift with neck lift. Result shown at 3 months.",
    },
    {
      label: "Case 2 — Male, 64",
      before: "/before-after/facelift-2-before.webp",
      during: "/before-after/facelift-2-during.webp",
      after: "/before-after/facelift-2-after.webp",
      note: "Facelift combined with upper and lower eyelid rejuvenation. Result at 6 months.",
    },
    {
      label: "Case 3 — Male, 52",
      before: "/before-after/facelift-3-before.webp",
      during: "/before-after/facelift-3-during.webp",
      after: "/before-after/facelift-3-after.webp",
      note: "Male facelift and neck contouring. Result at 4 months.",
    },
  ],
  processHeading: "How Your Facelift Works, Step by Step",
  process: [
    {
      heading: "Is a Facelift Right for You?",
      body:
        "The best facelift candidates are in good overall health, non-smokers (or willing to quit), and bothered by sagging skin, deep folds around the mouth, jowls, or a loose neckline. A facelift does not stop the aging process — it resets the clock, and your results are easy to maintain with good skincare and sun protection.\n\nDuring your free consultation, your surgeon evaluates your skin elasticity, bone structure, and personal goals, then tells you honestly whether a facelift, a less invasive option, or a combination will serve you best.",
    },
    {
      heading: "Your Personalized Surgical Plan",
      body:
        "No two faces age the same way, so we never use a one-size-fits-all approach. Your surgeon designs a plan around your unique anatomy — often pairing the facelift with a neck lift, eyelid surgery, or fat transfer for a fully balanced result. You will know exactly what to expect, including incisions discreetly hidden along the hairline and the natural creases of the ear, before you ever schedule surgery.",
    },
    {
      heading: "The Deep-Plane Difference",
      body:
        "Older facelift techniques simply pulled the skin tight, which is what created the unnatural windblown look people fear. Our surgeons use the modern deep-plane technique, repositioning the deeper muscle and connective-tissue layer (the SMAS) and releasing the ligaments that cause sagging. This lifts the face as a unit — restoring youthful volume in the cheeks and a clean jawline while the skin is simply re-draped, never over-tightened.",
    },
    {
      heading: "Comfort, Safety, and Anesthesia",
      body:
        "Your facelift is performed in our fully accredited surgical facility under the care of a board-certified anesthesia provider. Most facelifts take three to five hours depending on the areas treated. You go home the same day with a dedicated nurse coordinator who walks you through every step of aftercare and stays reachable throughout your recovery.",
    },
    {
      heading: "Results That Last",
      body:
        "A facelift turns back the clock roughly ten years, and because the deeper tissues are repositioned, the results are long-lasting — typically a decade or more. You will continue to age naturally, but you will always look younger than you would have without the procedure. Pairing your facelift with our medical-grade skincare and non-surgical treatments keeps your results looking fresh for years to come.",
    },
  ],
  pricing: {
    heading: "How Much Does a Facelift Cost in Miami?",
    intro:
      "At Your Cosmetic Surgery & SPA, facelift pricing is transparent and tailored to the technique that fits your face. Below are the starting prices for each facelift type in Miami. Your exact quote — including any combined procedures — is confirmed during your free consultation.",
    tiers: [
      {
        name: "Mini Facelift",
        price: "Starting at $3,000",
        priceValue: 3000,
        bestFor: "Early jowls and mild cheek sagging, with the fastest recovery.",
      },
      {
        name: "Lower Facelift",
        price: "Starting at $3,500",
        priceValue: 3500,
        bestFor: "A defined jawline and a firmer neck, with minimal scarring.",
      },
      {
        name: "Mid-Facelift",
        price: "Starting at $4,000",
        priceValue: 4000,
        bestFor: "Sagging cheeks and deep nasolabial folds in the midface.",
      },
      {
        name: "Deep Plane Facelift",
        price: "Starting at $5,000",
        priceValue: 5000,
        bestFor: "Comprehensive, longest-lasting rejuvenation of the full face and neck.",
      },
    ],
    factorsTitle: "What Affects Your Facelift Price",
    factors: [
      "The facelift technique chosen and the number of areas treated",
      "Procedures combined with your facelift, such as a neck lift, eyelid surgery, or fat transfer",
      "Anesthesia and accredited surgical-facility fees",
      "Surgeon time and the complexity of your individual anatomy",
      "Pre-operative testing and post-operative care included in your plan",
    ],
    financingNote:
      "Flexible financing and monthly payment plans are available, so you can move forward with a plan that fits your budget.",
    disclaimer:
      "Prices shown are starting points and may vary based on your personalized plan. Your final, all-inclusive quote is provided in writing at your free consultation — with no pressure and no obligation.",
  },
  candidacy: {
    heading: "See If You Qualify — Free Consultation",
    intro:
      "The only way to know if a facelift is right for you is a one-on-one evaluation with a board-certified surgeon. Your consultation is completely free, with no pressure and no obligation. You likely qualify if you:",
    qualifies: [
      "Are bothered by sagging skin, jowls, or deep folds around the mouth and jaw",
      "Have a loose or banded neckline you would like tightened",
      "Are in good general health and a non-smoker (or willing to quit before surgery)",
      "Have realistic goals and want natural, not overdone, results",
      "Want long-lasting rejuvenation rather than a temporary fix",
    ],
  },
  timelineHeading: "Your Recovery, Week by Week",
  timeline: [
    {
      stage: "Days 1–3",
      detail:
        "Rest at home with your head elevated. Mild swelling and bruising are normal. Your nurse coordinator checks in daily, and most patients stay comfortable with mild prescribed or over-the-counter medication.",
    },
    {
      stage: "Week 1",
      detail:
        "Sutures and any drains are removed at your first follow-up. Swelling begins to subside and many patients feel ready to be up and about at home.",
    },
    {
      stage: "Weeks 2–3",
      detail:
        "Most visible bruising fades and patients return to work and light social activities. You can typically resume light exercise such as walking.",
    },
    {
      stage: "Weeks 4–6",
      detail:
        "Residual swelling continues to resolve and incision lines begin to fade. You can gradually return to your full exercise routine.",
    },
    {
      stage: "3–6 Months",
      detail:
        "Final results settle in: a refreshed, naturally youthful face and neck. Incisions continue to mature until they are virtually undetectable.",
    },
  ],
  faqs: [
    {
      q: "How much does a facelift cost in Miami?",
      a: "At Your Cosmetic Surgery & SPA, facelifts start at $3,000 for a mini facelift, $3,500 for a lower facelift, $4,000 for a mid-facelift, and $5,000 for a deep plane facelift. Your final price depends on the technique chosen, any combined procedures, and your individual anatomy. You receive an exact, all-inclusive written quote at your free consultation.",
    },
    {
      q: "Does the facelift price include anesthesia and facility fees?",
      a: "Your personalized quote spells out exactly what is included, such as the surgeon's fee, anesthesia by a board-certified provider, and the accredited surgical-facility fee. Because every plan is different, we confirm your complete, all-inclusive price in writing at your free consultation so there are no surprises.",
    },
    {
      q: "Do you offer financing for a facelift?",
      a: "Yes. We offer flexible financing and monthly payment plans so you can move forward with the facelift that is right for you while keeping payments manageable. Our team reviews your options with you during your consultation.",
    },
  ],
  es: {
    heroImage: "/procedures/face_lift/face_lift_miami_Real_patientfl_hero_section.webp",
    heroImageMobile: "/procedures/face_lift/face_lift_miami_Real_patientfl_mobile.webp",
    intro:
      "Un lifting facial — conocido médicamente como ritidectomía — es el estándar de oro para restaurar un aspecto naturalmente joven y descansado en el rostro y el cuello. En Your Cosmetic Surgery & SPA en Miami, nuestros cirujanos certificados utilizan técnicas avanzadas de plano profundo que reposicionan los tejidos faciales más profundos, no solo tensan la piel, para lograr resultados que se ven como usted — solo que años más joven. A continuación puede ver transformaciones reales, comprender exactamente cómo funciona el procedimiento paso a paso y descubrir si califica para una consulta gratuita.",
    offer: {
      headline: "Por Tiempo Limitado: $1,000 de Descuento en tu Lifting Facial este Mes",
      subtext: "Además, un tratamiento de rejuvenecimiento de la piel de cortesía con cada lifting reservado este mes.",
      ctaLabel: "Aprovecha la Oferta",
    },
    transformationsHeading: "Transformaciones Reales de Pacientes",
    transformationsIntro:
      "Cada rostro envejece de forma diferente. Estos resultados de antes, durante y después muestran el rejuvenecimiento natural y equilibrado que ofrece nuestra técnica de plano profundo — nunca un aspecto estirado o artificial.",
    education: {
      title: "¿Qué Es un Lifting Facial?",
      body:
        "Un lifting facial, conocido médicamente como ritidectomía, es un procedimiento quirúrgico que restaura un contorno más suave y juvenil en la parte inferior del rostro y el cuello. En lugar de simplemente estirar la piel, las técnicas modernas elevan y reposicionan la capa profunda de músculo y tejido conectivo (el SMAS) y luego redistribuyen la piel sin tensión. El resultado suaviza la flacidez, los pliegues marcados y la piel suelta del cuello, manteniendo sus rasgos inconfundiblemente suyos.",
      combinedTitle: "Con Qué Se Puede Combinar",
      combinedBody:
        "Un lifting facial suele combinarse con procedimientos complementarios para lograr un rejuvenecimiento totalmente equilibrado. Las combinaciones más comunes son un lifting de cuello para redefinir la mandíbula, cirugía de párpados (blefaroplastia) para iluminar la mirada, un lifting de cejas para elevar una frente pesada, y transferencia de grasa o tratamientos de la piel para restaurar el volumen y refinar su calidad. Su cirujano adapta el plan a su anatomía y objetivos durante la consulta.",
      typesTitle: "Diferentes Opciones de Lifting Facial",
      types: [
        {
          name: "Mini Lifting Facial",
          description:
            "Una versión más acelerada del lifting tradicional que trata un área más pequeña — principalmente las mejillas y la papada — con un tiempo de tratamiento más corto y una recuperación más rápida. Algunas zonas, como la frente, no se tratan. Es un procedimiento minucioso que exige el más alto nivel de precisión y experiencia técnica.",
        },
        {
          name: "Lifting Facial Medio",
          description:
            "Trata el área entre los párpados inferiores y la boca, abordando las mejillas caídas, los pliegues nasolabiales profundos y otros signos de envejecimiento de la zona media. Menos invasivo que un lifting completo pero más extenso que un mini, eleva los tejidos blandos de las mejillas para restaurar el volumen y la definición, normalmente con una recuperación más corta que la de un lifting completo.",
        },
        {
          name: "Lifting Facial Inferior",
          description:
            "Tensa la papada y elimina el mentón doble para lograr una mandíbula definida y un cuello más firme y suave. Ofrece menor costo e invasividad que un lifting completo, cicatrices mínimas y una reducción notable de los signos de envejecimiento en la mandíbula y el cuello.",
        },
        {
          name: "Lifting Facial de Plano Profundo",
          description:
            "La opción más completa, que reposiciona no solo la piel sino también los tejidos y músculos profundos del rostro para obtener resultados más duraderos y notables que pueden durar hasta 10 años. A diferencia de un mini lifting, trata todo el rostro: frente, zona media y cuello.",
        },
      ],
    },
    transformations: [
      {
        label: "Caso 1 — Mujer, 58",
        before: "/before-after/facelift-1-before.webp",
        during: "/before-after/facelift-1-during.webp",
        after: "/before-after/facelift-1-after.webp",
        note: "Lifting facial de plano profundo con lifting de cuello. Resultado a los 3 meses.",
      },
      {
        label: "Caso 2 — Hombre, 64",
        before: "/before-after/facelift-2-before.webp",
        during: "/before-after/facelift-2-during.webp",
        after: "/before-after/facelift-2-after.webp",
        note: "Lifting facial combinado con rejuvenecimiento de párpados superiores e inferiores. Resultado a los 6 meses.",
      },
      {
        label: "Caso 3 — Hombre, 52",
        before: "/before-after/facelift-3-before.webp",
        during: "/before-after/facelift-3-during.webp",
        after: "/before-after/facelift-3-after.webp",
        note: "Lifting facial masculino y contorneado de cuello. Resultado a los 4 meses.",
      },
    ],
    processHeading: "Cómo Funciona tu Lifting Facial, Paso a Paso",
    process: [
      {
        heading: "¿Es un Lifting Facial Adecuado para Usted?",
        body:
          "Los mejores candidatos para un lifting facial gozan de buena salud general, no fuman (o están dispuestos a dejarlo) y les molesta la piel flácida, los pliegues profundos alrededor de la boca, las papadas o un cuello suelto. Un lifting facial no detiene el envejecimiento — reinicia el reloj, y sus resultados son fáciles de mantener con un buen cuidado de la piel y protección solar.\n\nDurante su consulta gratuita, su cirujano evalúa la elasticidad de su piel, su estructura ósea y sus objetivos personales, y luego le dice con honestidad si un lifting facial, una opción menos invasiva o una combinación le conviene más.",
      },
      {
        heading: "Su Plan Quirúrgico Personalizado",
        body:
          "No hay dos rostros que envejezcan igual, por eso nunca usamos un enfoque único. Su cirujano diseña un plan en torno a su anatomía — a menudo combinando el lifting facial con un lifting de cuello, cirugía de párpados o transferencia de grasa para un resultado totalmente equilibrado. Sabrá exactamente qué esperar, incluida la ubicación de las incisiones ocultas discretamente a lo largo del cabello y los pliegues naturales de la oreja, antes de programar la cirugía.",
      },
      {
        heading: "La Diferencia del Plano Profundo",
        body:
          "Las técnicas antiguas de lifting simplemente estiraban la piel, que es lo que creaba el aspecto artificial que la gente teme. Nuestros cirujanos usan la técnica moderna de plano profundo, reposicionando la capa más profunda de músculo y tejido conectivo (el SMAS) y liberando los ligamentos que causan la flacidez. Esto eleva el rostro como una unidad — restaurando el volumen juvenil de las mejillas y una línea de mandíbula limpia, mientras la piel solo se reacomoda, nunca se tensa en exceso.",
      },
      {
        heading: "Comodidad, Seguridad y Anestesia",
        body:
          "Su lifting facial se realiza en nuestra instalación quirúrgica totalmente acreditada bajo el cuidado de un proveedor de anestesia certificado. La mayoría de los liftings toman de tres a cinco horas según las áreas tratadas. Regresa a casa el mismo día con una enfermera coordinadora dedicada que le guía en cada paso del cuidado posoperatorio y permanece disponible durante toda su recuperación.",
      },
      {
        heading: "Resultados que Perduran",
        body:
          "Un lifting facial retrasa el reloj unos diez años y, como los tejidos profundos se reposicionan, los resultados son duraderos — normalmente una década o más. Seguirá envejeciendo de forma natural, pero siempre se verá más joven de lo que se vería sin el procedimiento. Combinar su lifting con nuestro cuidado de la piel de grado médico y tratamientos no quirúrgicos mantiene sus resultados frescos durante años.",
      },
    ],
    pricing: {
      heading: "¿Cuánto Cuesta un Lifting Facial en Miami?",
      intro:
        "En Your Cosmetic Surgery & SPA, el precio del lifting facial es transparente y se adapta a la técnica más adecuada para su rostro. A continuación se muestran los precios iniciales de cada tipo de lifting facial en Miami. Su cotización exacta — incluidos los procedimientos combinados — se confirma durante su consulta gratuita.",
      tiers: [
        {
          name: "Mini Lifting Facial",
          price: "Desde $3,000",
          priceValue: 3000,
          bestFor: "Papada incipiente y flacidez leve de las mejillas, con la recuperación más rápida.",
        },
        {
          name: "Lifting Facial Inferior",
          price: "Desde $3,500",
          priceValue: 3500,
          bestFor: "Una mandíbula definida y un cuello más firme, con cicatrices mínimas.",
        },
        {
          name: "Lifting Facial Medio",
          price: "Desde $4,000",
          priceValue: 4000,
          bestFor: "Mejillas caídas y pliegues nasolabiales profundos en la zona media.",
        },
        {
          name: "Lifting Facial de Plano Profundo",
          price: "Desde $5,000",
          priceValue: 5000,
          bestFor: "Rejuvenecimiento integral y más duradero de todo el rostro y el cuello.",
        },
      ],
      factorsTitle: "Qué Influye en el Precio de su Lifting Facial",
      factors: [
        "La técnica de lifting elegida y la cantidad de áreas tratadas",
        "Los procedimientos combinados con su lifting, como un lifting de cuello, cirugía de párpados o transferencia de grasa",
        "Los honorarios de anestesia y de la instalación quirúrgica acreditada",
        "El tiempo quirúrgico y la complejidad de su anatomía individual",
        "Los estudios preoperatorios y el cuidado posoperatorio incluidos en su plan",
      ],
      financingNote:
        "Ofrecemos financiamiento flexible y planes de pago mensuales para que pueda avanzar con un plan que se ajuste a su presupuesto.",
      disclaimer:
        "Los precios mostrados son puntos de partida y pueden variar según su plan personalizado. Su cotización final, todo incluido, se entrega por escrito en su consulta gratuita — sin presión y sin compromiso.",
    },
    candidacy: {
      heading: "Descubra si Califica — Consulta Gratuita",
      intro:
        "La única forma de saber si un lifting facial es adecuado para usted es una evaluación personalizada con un cirujano certificado. Su consulta es completamente gratuita, sin presión y sin compromiso. Probablemente califique si usted:",
      qualifies: [
        "Le molesta la piel flácida, las papadas o los pliegues profundos alrededor de la boca y la mandíbula",
        "Tiene un cuello suelto o con bandas que le gustaría tensar",
        "Goza de buena salud general y no fuma (o está dispuesto a dejarlo antes de la cirugía)",
        "Tiene objetivos realistas y desea resultados naturales, no exagerados",
        "Quiere un rejuvenecimiento duradero en lugar de una solución temporal",
      ],
    },
    timelineHeading: "Su Recuperación, Semana a Semana",
    timeline: [
      {
        stage: "Días 1–3",
        detail:
          "Descanse en casa con la cabeza elevada. La hinchazón y los moretones leves son normales. Su enfermera coordinadora le contacta a diario y la mayoría de los pacientes se mantienen cómodos con medicación leve recetada o de venta libre.",
      },
      {
        stage: "Semana 1",
        detail:
          "Los puntos y cualquier drenaje se retiran en su primera revisión. La hinchazón comienza a disminuir y muchos pacientes se sienten listos para moverse por la casa.",
      },
      {
        stage: "Semanas 2–3",
        detail:
          "La mayoría de los moretones visibles desaparecen y los pacientes vuelven al trabajo y a actividades sociales ligeras. Por lo general puede reanudar ejercicio ligero como caminar.",
      },
      {
        stage: "Semanas 4–6",
        detail:
          "La hinchazón residual sigue resolviéndose y las líneas de incisión comienzan a desvanecerse. Puede volver gradualmente a su rutina completa de ejercicio.",
      },
      {
        stage: "3–6 Meses",
        detail:
          "Los resultados finales se asientan: un rostro y cuello renovados y naturalmente jóvenes. Las incisiones siguen madurando hasta volverse prácticamente indetectables.",
      },
    ],
    faqs: [
      {
        q: "¿Cuánto cuesta un lifting facial en Miami?",
        a: "En Your Cosmetic Surgery & SPA, los liftings faciales comienzan desde $3,000 para un mini lifting, $3,500 para un lifting inferior, $4,000 para un lifting medio y $5,000 para un lifting de plano profundo. Su precio final depende de la técnica elegida, los procedimientos combinados y su anatomía individual. Recibe una cotización exacta y por escrito en su consulta gratuita.",
      },
      {
        q: "¿El precio del lifting facial incluye la anestesia y los honorarios de la instalación?",
        a: "Su cotización personalizada detalla exactamente qué incluye, como los honorarios del cirujano, la anestesia por un proveedor certificado y los honorarios de la instalación quirúrgica acreditada. Como cada plan es diferente, confirmamos su precio completo, todo incluido, por escrito en su consulta gratuita para que no haya sorpresas.",
      },
      {
        q: "¿Ofrecen financiamiento para un lifting facial?",
        a: "Sí. Ofrecemos financiamiento flexible y planes de pago mensuales para que pueda avanzar con el lifting facial adecuado para usted manteniendo pagos manejables. Nuestro equipo revisa sus opciones con usted durante la consulta.",
      },
    ],
  },
};

export const landings: Record<string, LandingContent> = {
  facelift: FACELIFT_LANDING,
};

export function getLanding(slug: string, locale: string): LandingLocaleContent | null {
  const entry = landings[slug];
  if (!entry) return null;
  return locale === "es" ? entry.es : entry;
}
