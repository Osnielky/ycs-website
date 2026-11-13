/**
 * Published prices of other Miami-area clinics, for /miami-cosmetic-surgery-prices-compared.
 *
 * RULES FOR EDITING THIS FILE
 * - Every figure must be stated in text on the clinic's own website, on the page
 *   given as `source`, on the date in `CHECKED_ON`. No third-party sources, no
 *   prices read from images, no figures a page gives as a market average.
 * - Rows are facts about named businesses. If a price cannot be confirmed on the
 *   source page, delete the row; do not estimate.
 * - When re-checking, update `CHECKED_ON` and every changed row together.
 * - Our own prices are not stored here: they come from procedures.ts.
 *
 * Raw research and the re-check log are in docs/competitor-research/.
 */

export const CHECKED_ON = "2026-11-13";

export interface Clinic {
  name: string;
  area: string;
  website: string;
}

export const clinics = {
  alluring: { name: "Alluring Plastic Surgery", area: "Miami", website: "https://alluringplasticsurgery.com/" },
  avana: { name: "Avana Plastic Surgery", area: "Miami", website: "https://www.avanaplasticsurgery.com/" },
  cg: { name: "CG Cosmetic Surgery", area: "Miami", website: "https://www.cgcosmetic.com/" },
  dolls: { name: "Dolls Plastic Surgery", area: "Aventura", website: "https://dollsplasticsurgery.com/" },
  mia: { name: "Mia Aesthetics", area: "Miami", website: "https://miaaesthetics.com/locations/miami/" },
  spring: { name: "Spring Plastic Surgery", area: "Miami", website: "https://springplasticsurgery.com/" },
  svelta: { name: "Svelta Plastic Surgery", area: "Miami", website: "https://sveltaplasticsurgery.com/" },
  xiluet: { name: "Xiluet Aesthetic Surgery", area: "Miami", website: "https://xiluetaestheticsurgery.com/" },
} satisfies Record<string, Clinic>;

export type ClinicId = keyof typeof clinics;

export interface PriceRow {
  clinic: ClinicId;
  /** "from" = the clinic's stated starting price; "range" = a stated range; "average" = a stated average. */
  kind: "from" | "range" | "average";
  low: number;
  high?: number;
  /** What the clinic's page says about the price, paraphrased. Omit when the page says nothing more. */
  note?: { en: string; es: string };
  source: string;
}

export interface ComparedProcedure {
  /** Slug in procedures.ts. */
  slug: string;
  /** Short reading of the table, written for a patient. */
  summary: { en: string; es: string };
  rows: PriceRow[];
}

const MIA_NOTE = {
  en: "Company-wide starting price; the page notes that pricing varies by surgeon.",
  es: "Precio inicial de toda la cadena; la página indica que el precio varía según el cirujano.",
};

export const comparedProcedures: ComparedProcedure[] = [
  {
    slug: "brazilian-butt-lift",
    summary: {
      en: "Six of the clinics we checked publish a starting price for a BBL, from $3,800 to $5,500. One of them adds that most of its patients end up paying between $5,500 and $10,000, which is a useful reminder that a starting price is the floor, not the typical bill. What is included also differs: one clinic lists a garment and BBL pillow, another says the garment and massages are extra.",
      es: "Seis de las clínicas que revisamos publican un precio inicial para el BBL, entre $3,800 y $5,500. Una de ellas agrega que la mayoría de sus pacientes termina pagando entre $5,500 y $10,000, un buen recordatorio de que el precio inicial es el piso y no la cuenta habitual. Lo que incluye también cambia: una clínica menciona la faja y la almohada para BBL, y otra indica que la faja y los masajes se pagan aparte.",
    },
    rows: [
      {
        clinic: "avana",
        kind: "from",
        low: 3800,
        note: {
          en: "Final price depends on the amount of liposuction and fat transfer.",
          es: "El precio final depende de la cantidad de liposucción y de grasa transferida.",
        },
        source: "https://www.avanaplasticsurgery.com/brazilian-butt-lift-miami",
      },
      { clinic: "xiluet", kind: "from", low: 3999, source: "https://xiluetaestheticsurgery.com/brazilian-butt-lift/" },
      {
        clinic: "mia",
        kind: "from",
        low: 4300,
        note: MIA_NOTE,
        source: "https://miaaesthetics.com/cosmetic-plastic-surgery/body/brazilian-butt-lift-bbl/",
      },
      {
        clinic: "cg",
        kind: "from",
        low: 4500,
        note: {
          en: "Cash price. The page says the compression garment and post-op massages are not included.",
          es: "Precio en efectivo. La página indica que la faja y los masajes posoperatorios no están incluidos.",
        },
        source: "https://www.cgcosmetic.com/brazilian-butt-lift-miami-fat-transfer/",
      },
      {
        clinic: "svelta",
        kind: "from",
        low: 4500,
        note: {
          en: "Standalone BBL; combination packages are listed from $7,500.",
          es: "BBL por separado; los paquetes combinados aparecen desde $7,500.",
        },
        source: "https://sveltaplasticsurgery.com/brazilian-butt-lift-miami/",
      },
      {
        clinic: "alluring",
        kind: "from",
        low: 5500,
        note: {
          en: "The page says most patients pay $5,500 to $10,000, and lists consultations, surgeon, anesthesia, facility, garment, BBL pillow and follow-up visits as included.",
          es: "La página indica que la mayoría de los pacientes paga entre $5,500 y $10,000, e incluye consultas, cirujano, anestesia, instalación, faja, almohada para BBL y visitas de seguimiento.",
        },
        source: "https://alluringplasticsurgery.com/procedures/brazilian-butt-lift-bbl-miami",
      },
    ],
  },
  {
    slug: "lipo-360",
    summary: {
      en: "Published starting prices for Lipo 360 sit close together, between $3,000 and $4,000. The spread comes later: one clinic says most of its cases land between $3,000 and $8,000, depending on the technique and how much is treated.",
      es: "Los precios iniciales publicados para la Lipo 360 son parecidos, entre $3,000 y $4,000. La diferencia aparece después: una clínica indica que la mayoría de sus casos queda entre $3,000 y $8,000, según la técnica y la extensión del tratamiento.",
    },
    rows: [
      {
        clinic: "avana",
        kind: "from",
        low: 3000,
        note: {
          en: "Depends on patient size, number of areas and whether fat is transferred.",
          es: "Depende de la talla del paciente, el número de áreas y si se transfiere grasa.",
        },
        source: "https://www.avanaplasticsurgery.com/lipo-360-miami",
      },
      {
        clinic: "cg",
        kind: "from",
        low: 3000,
        note: { en: "The page says anesthesia is included.", es: "La página indica que la anestesia está incluida." },
        source: "https://www.cgcosmetic.com/lipo-360-miami/",
      },
      {
        clinic: "svelta",
        kind: "from",
        low: 3000,
        note: {
          en: "The page says most cases fall between $3,000 and $8,000.",
          es: "La página indica que la mayoría de los casos queda entre $3,000 y $8,000.",
        },
        source: "https://sveltaplasticsurgery.com/lipo-360/",
      },
      { clinic: "alluring", kind: "from", low: 4000, source: "https://alluringplasticsurgery.com/procedures/liposuction-miami" },
    ],
  },
  {
    slug: "tummy-tuck",
    summary: {
      en: "Tummy tuck prices depend heavily on the type. The lowest published figure here, $3,000, is for a mini tummy tuck, and that clinic lists a full tummy tuck from $4,500. When you compare, make sure both quotes are for the same operation and ask whether muscle repair is part of it.",
      es: "El precio de la abdominoplastia depende mucho del tipo. La cifra publicada más baja de esta lista, $3,000, corresponde a una mini abdominoplastia, y esa clínica publica la abdominoplastia completa desde $4,500. Al comparar, confirme que ambas cotizaciones sean por la misma operación y pregunte si incluyen la reparación muscular.",
    },
    rows: [
      {
        clinic: "alluring",
        kind: "from",
        low: 3000,
        note: {
          en: "Mini tummy tuck from $3,000; full from $4,500; extended from $5,500. The page says the mini price does not include muscle repair.",
          es: "Mini abdominoplastia desde $3,000; completa desde $4,500; extendida desde $5,500. La página indica que el precio de la mini no incluye la reparación muscular.",
        },
        source: "https://alluringplasticsurgery.com/procedures/tummy-tuck-miami",
      },
      {
        clinic: "svelta",
        kind: "from",
        low: 3900,
        note: {
          en: "Standalone tummy tuck. The page says the surgical suite and anesthesia team are covered by the quoted price.",
          es: "Abdominoplastia por separado. La página indica que el quirófano y el equipo de anestesia están cubiertos por el precio cotizado.",
        },
        source: "https://sveltaplasticsurgery.com/tummy-tuck-miami/",
      },
      {
        clinic: "cg",
        kind: "from",
        low: 4500,
        note: {
          en: "Final price varies with the extent of surgery, muscle repair and added liposuction.",
          es: "El precio final varía según la extensión de la cirugía, la reparación muscular y la liposucción adicional.",
        },
        source: "https://www.cgcosmetic.com/tummy-tuck-surgery/",
      },
      {
        clinic: "mia",
        kind: "from",
        low: 4600,
        note: MIA_NOTE,
        source: "https://miaaesthetics.com/cosmetic-plastic-surgery/body/tummy-tuck/",
      },
    ],
  },
  {
    slug: "mommy-makeover",
    summary: {
      en: "A mommy makeover is a combination, so the starting price only means something once you know which procedures it covers. Two clinics say their entry price is a tummy tuck plus one breast procedure. Adding liposuction or a BBL moves the figure up quickly: one clinic lists $9,500 and $12,000 for those combinations.",
      es: "El mommy makeover es una combinación, así que el precio inicial solo dice algo cuando se sabe qué procedimientos cubre. Dos clínicas indican que su precio de entrada corresponde a una abdominoplastia más un procedimiento de senos. Al agregar liposucción o BBL, la cifra sube rápido: una clínica publica $9,500 y $12,000 para esas combinaciones.",
    },
    rows: [
      {
        clinic: "avana",
        kind: "from",
        low: 5675,
        note: {
          en: "For a tummy tuck plus one breast procedure (lift, reduction or augmentation).",
          es: "Por una abdominoplastia más un procedimiento de senos (levantamiento, reducción o aumento).",
        },
        source: "https://www.avanaplasticsurgery.com/mommy-makeover-miami",
      },
      {
        clinic: "mia",
        kind: "from",
        low: 6399,
        note: MIA_NOTE,
        source: "https://miaaesthetics.com/cosmetic-plastic-surgery/body/mommy-makeover/",
      },
      { clinic: "spring", kind: "from", low: 6500, source: "https://springplasticsurgery.com/mommy-makeover/" },
      {
        clinic: "svelta",
        kind: "from",
        low: 6500,
        note: {
          en: "For a tummy tuck plus a breast procedure; with liposuction from $9,500; with a BBL from $12,000.",
          es: "Por una abdominoplastia más un procedimiento de senos; con liposucción desde $9,500; con BBL desde $12,000.",
        },
        source: "https://sveltaplasticsurgery.com/mommy-makeover-miami/",
      },
      { clinic: "xiluet", kind: "from", low: 6999, source: "https://xiluetaestheticsurgery.com/mommy-makeover/" },
      {
        clinic: "cg",
        kind: "from",
        low: 8000,
        note: {
          en: "The page lists surgeon, facility, anesthesia, implants when used, and follow-up visits as included.",
          es: "La página incluye cirujano, instalación, anestesia, implantes cuando se usan y visitas de seguimiento.",
        },
        source: "https://www.cgcosmetic.com/mommy-makeover-miami/",
      },
    ],
  },
  {
    slug: "breast-augmentation",
    summary: {
      en: "The implant type explains most of the difference in breast augmentation prices. The lowest published figure, $2,500, is for saline implants paid in full, and the same clinic lists silicone from $3,000. Ask every clinic which implant its starting price refers to.",
      es: "El tipo de implante explica la mayor parte de la diferencia en los precios del aumento de senos. La cifra publicada más baja, $2,500, corresponde a implantes salinos con pago completo, y la misma clínica publica los de silicona desde $3,000. Pregunte en cada clínica a qué implante se refiere su precio inicial.",
    },
    rows: [
      {
        clinic: "cg",
        kind: "from",
        low: 2500,
        note: {
          en: "Saline implants, when paid in full; silicone from $3,000.",
          es: "Implantes salinos, con pago completo; silicona desde $3,000.",
        },
        source: "https://www.cgcosmetic.com/breast-augmentation-miami/",
      },
      {
        clinic: "svelta",
        kind: "from",
        low: 2800,
        note: {
          en: "The page gives a typical range of $2,800 to $12,000 depending on implant and technique.",
          es: "La página da un rango habitual de $2,800 a $12,000 según el implante y la técnica.",
        },
        source: "https://sveltaplasticsurgery.com/breast-augmentation-miami/",
      },
      {
        clinic: "avana",
        kind: "from",
        low: 3000,
        note: { en: "Final price depends on implant type.", es: "El precio final depende del tipo de implante." },
        source: "https://www.avanaplasticsurgery.com/breast-augmentation-miami",
      },
      {
        clinic: "mia",
        kind: "from",
        low: 3300,
        note: MIA_NOTE,
        source: "https://miaaesthetics.com/cosmetic-plastic-surgery/breast/augmentation-implants/",
      },
      {
        clinic: "alluring",
        kind: "from",
        low: 3500,
        note: { en: "Saline from $3,500; silicone from $4,500.", es: "Salinos desde $3,500; silicona desde $4,500." },
        source: "https://alluringplasticsurgery.com/procedures/breast-augmentation-miami",
      },
    ],
  },
  {
    slug: "breast-lift",
    summary: {
      en: "The four clinics that publish a breast lift price start between $4,500 and $5,000. The main thing to check is whether a figure is for the lift alone or for a lift with implants: two of the pages price both under the same heading.",
      es: "Las cuatro clínicas que publican un precio para el levantamiento de senos comienzan entre $4,500 y $5,000. Lo principal es confirmar si la cifra corresponde solo al levantamiento o al levantamiento con implantes: dos de las páginas publican ambos bajo el mismo título.",
    },
    rows: [
      {
        clinic: "svelta",
        kind: "from",
        low: 4500,
        note: {
          en: "Range shown as $4,500 to $7,000; a lift with implants is quoted individually.",
          es: "Rango publicado de $4,500 a $7,000; el levantamiento con implantes se cotiza de forma individual.",
        },
        source: "https://sveltaplasticsurgery.com/breast-lift-miami/",
      },
      {
        clinic: "mia",
        kind: "from",
        low: 4600,
        note: MIA_NOTE,
        source: "https://miaaesthetics.com/cosmetic-plastic-surgery/breast/lift/",
      },
      {
        clinic: "alluring",
        kind: "from",
        low: 5000,
        note: {
          en: "Without implants; with saline implants $6,000; with silicone $7,000.",
          es: "Sin implantes; con implantes salinos $6,000; con silicona $7,000.",
        },
        source: "https://alluringplasticsurgery.com/procedures/breast-lift-miami",
      },
      {
        clinic: "cg",
        kind: "from",
        low: 5000,
        note: {
          en: "Packages with or without implants; the page lists surgeon, facility, anesthesia and follow-up visits as included.",
          es: "Paquetes con o sin implantes; la página incluye cirujano, instalación, anestesia y visitas de seguimiento.",
        },
        source: "https://www.cgcosmetic.com/breast-lift-miami/",
      },
    ],
  },
  {
    slug: "rhinoplasty",
    summary: {
      en: "Rhinoplasty has the widest ranges on this page. Starting prices run from $6,000 to $8,600, and two clinics publish upper figures of $15,000 for complex or revision cases. A first-time rhinoplasty and a revision are different operations, so say which one you need when you ask for a quote.",
      es: "La rinoplastia tiene los rangos más amplios de esta página. Los precios iniciales van de $6,000 a $8,600, y dos clínicas publican cifras de hasta $15,000 para casos complejos o de revisión. Una primera rinoplastia y una revisión son operaciones distintas, así que indique cuál necesita al pedir una cotización.",
    },
    rows: [
      {
        clinic: "dolls",
        kind: "range",
        low: 6000,
        high: 15000,
        note: {
          en: "The page lists surgeon, anesthesia, facility and post-operative care as included.",
          es: "La página incluye cirujano, anestesia, instalación y cuidado posoperatorio.",
        },
        source: "https://dollsplasticsurgery.com/procedures/rhinoplasty/",
      },
      {
        clinic: "cg",
        kind: "from",
        low: 6500,
        note: {
          en: "Final price depends on complexity and whether it is a first or revision surgery.",
          es: "El precio final depende de la complejidad y de si es una primera cirugía o una revisión.",
        },
        source: "https://www.cgcosmetic.com/rhinoplasty-miami/",
      },
      {
        clinic: "svelta",
        kind: "from",
        low: 6500,
        note: {
          en: "Range of $6,500 to $15,000; complex or revision cases $8,500 to $15,000.",
          es: "Rango de $6,500 a $15,000; casos complejos o de revisión de $8,500 a $15,000.",
        },
        source: "https://sveltaplasticsurgery.com/rhinoplasty/",
      },
      {
        clinic: "mia",
        kind: "from",
        low: 8600,
        note: MIA_NOTE,
        source: "https://miaaesthetics.com/cosmetic-plastic-surgery/face/nose-job-rhinoplasty/",
      },
    ],
  },
  {
    slug: "eyelid-surgery",
    summary: {
      en: "Published eyelid surgery prices start at $3,000 at two clinics and go above $4,000 at two others. Upper lids, lower lids or both make a real difference, and most pages do not say which one the figure refers to.",
      es: "Los precios publicados para la cirugía de párpados comienzan en $3,000 en dos clínicas y superan los $4,000 en otras dos. Operar los párpados superiores, los inferiores o ambos cambia mucho el precio, y la mayoría de las páginas no aclara a cuál se refiere la cifra.",
    },
    rows: [
      { clinic: "spring", kind: "from", low: 3000, source: "https://springplasticsurgery.com/face-procedures/" },
      { clinic: "svelta", kind: "range", low: 3000, high: 4000, source: "https://sveltaplasticsurgery.com/eyelid-surgery/" },
      {
        clinic: "mia",
        kind: "from",
        low: 4300,
        note: MIA_NOTE,
        source: "https://miaaesthetics.com/cosmetic-plastic-surgery/face/eyelid-lift-blepharoplasty/",
      },
      {
        clinic: "avana",
        kind: "average",
        low: 4650,
        note: {
          en: "Stated as an average; varies with anesthesia type and upper or lower lids.",
          es: "Publicado como promedio; varía según el tipo de anestesia y si son párpados superiores o inferiores.",
        },
        source: "https://www.avanaplasticsurgery.com/eyelid-surgery-miami",
      },
    ],
  },
  {
    slug: "facelift",
    summary: {
      en: "Facelift prices differ more than any other procedure here, from a $5,000 starting price to ranges that begin at $12,000. Much of that gap is the technique: a mini facelift and a deep plane facelift are priced very differently, so compare the same type.",
      es: "Los precios del lifting facial varían más que los de cualquier otro procedimiento de esta página, desde un precio inicial de $5,000 hasta rangos que comienzan en $12,000. Gran parte de esa diferencia es la técnica: un mini lifting y un lifting de plano profundo tienen precios muy distintos, así que compare el mismo tipo.",
    },
    rows: [
      {
        clinic: "cg",
        kind: "from",
        low: 5000,
        note: {
          en: "Final price varies with the type of facelift and combined procedures.",
          es: "El precio final varía según el tipo de lifting y los procedimientos combinados.",
        },
        source: "https://www.cgcosmetic.com/face-lift-surgery/",
      },
      { clinic: "svelta", kind: "range", low: 12000, high: 18000, source: "https://sveltaplasticsurgery.com/facelift/" },
      {
        clinic: "mia",
        kind: "from",
        low: 12900,
        note: MIA_NOTE,
        source: "https://miaaesthetics.com/cosmetic-plastic-surgery/face/facelift/",
      },
    ],
  },
];
