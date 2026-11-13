/**
 * Content for the surgeon profile page (/dr-mario-reyes-serrano).
 *
 * License, education, training, hospital privileges, memberships and languages
 * come from the surgeon's public Florida Department of Health practitioner
 * profile (license ME94353, read 2026-11-13). That profile lists no certification
 * from a specialty board recognized by the Florida Board of Medicine, so this
 * page does not use the words "board-certified". Do not add them back without a
 * certificate naming the certifying board.
 */

export const SURGEON_SLUG = "dr-mario-reyes-serrano";
export const SURGEON_NAME = "Dr. Mario Reyes-Serrano";
export const SURGEON_IMAGE = "/Dr-Mario-Reyes-Cosmetic Surgeon-miami.webp";

/** Procedure slugs shown under "Areas of focus", grouped by category. */
export const SURGEON_FOCUS: { category: "body" | "breast" | "face"; slugs: string[] }[] = [
  { category: "body", slugs: ["brazilian-butt-lift", "lipo-360", "tummy-tuck", "mommy-makeover"] },
  { category: "breast", slugs: ["breast-augmentation", "breast-lift", "breast-reduction"] },
  { category: "face", slugs: ["rhinoplasty", "facelift", "eyelid-surgery"] },
];

export interface SurgeonContent {
  metaTitle: string;
  metaDescription: string;
  home: string;
  eyebrow: string;
  role: string;
  imageAlt: string;
  aboutHeading: string;
  bio: string[];
  credentialsHeading: string;
  credentials: string[];
  membershipsHeading: string;
  memberships: string[];
  educationHeading: string;
  education: string[];
  licensesHeading: string;
  licenses: string[];
  languagesHeading: string;
  languages: string[];
  focusHeading: string;
  focusIntro: string;
  focusCategories: Record<"body" | "breast" | "face", string>;
  allProcedures: string;
  consultHeading: string;
  consultIntro: string;
  consultSteps: { title: string; body: string }[];
  consultNote: string;
  bookConsultation: string;
  call: string;
}

export const surgeon: Record<"en" | "es", SurgeonContent> = {
  en: {
    metaTitle: "Dr. Mario Reyes-Serrano, Cosmetic Surgeon in Miami",
    metaDescription:
      "Meet Dr. Mario Reyes-Serrano, cosmetic surgeon at Your Cosmetic Surgery & SPA in Hialeah. Florida-licensed physician since 2005. Free consultations.",
    home: "Home",
    eyebrow: "Your Cosmetic Surgery & SPA · Hialeah, Florida",
    role: "Cosmetic Surgeon",
    imageAlt: "Dr. Mario Reyes-Serrano, cosmetic surgeon in Miami",
    aboutHeading: "About Dr. Reyes-Serrano",
    bio: [
      "Dr. Mario Reyes-Serrano is a cosmetic surgeon and a Florida-licensed physician since 2005. He leads the surgical team at Your Cosmetic Surgery & SPA in Hialeah, caring for patients from Miami, the rest of South Florida and out of town.",
      "He earned his medical degree at the University of Havana and went on to complete a residency in surgery and a fellowship in plastic surgery at Calixto García Hospital in Havana, followed by further training in breast surgery.",
      "His practice covers body contouring, breast surgery and facial procedures. His approach is to plan each operation around the patient's own anatomy and goals, aiming for results that look natural and in proportion.",
      "Every patient starts with a free, private consultation. It is the moment to ask questions, understand the options and their risks, and decide without pressure whether surgery is right for you.",
    ],
    credentialsHeading: "Credentials and Experience",
    credentials: [
      "Licensed medical doctor in Florida since 2005",
      "Lead surgeon at Your Cosmetic Surgery & SPA",
      "Staff privileges at Larkin Community Hospital, Miami",
    ],
    membershipsHeading: "Professional Memberships",
    memberships: [
      "American Academy of Cosmetic Surgery",
      "American Society of Abdominal Surgeons",
      "American Medical Association",
    ],
    educationHeading: "Education and Training",
    education: [
      "Doctor of Medicine, University of Havana (1970)",
      "Residency in surgery, Calixto García Hospital, Havana (1973 – 1976)",
      "Fellowship in plastic surgery, Calixto García Hospital, Havana (1976 – 1978)",
      "Additional training in breast surgery, Havana (1988 – 1989)",
    ],
    licensesHeading: "License",
    licenses: [
      "Florida medical license ME94353, active. You can verify it on the Florida Department of Health license lookup.",
    ],
    languagesHeading: "Languages",
    languages: ["English", "Spanish"],
    focusHeading: "Areas of Focus",
    focusIntro:
      "These are the procedures patients most often ask Dr. Reyes-Serrano about. Each page explains the technique options, cost, recovery and candidacy.",
    focusCategories: { body: "Body", breast: "Breast", face: "Face" },
    allProcedures: "See all procedures",
    consultHeading: "What to Expect at Your Consultation",
    consultIntro: "A consultation is a conversation, not a commitment. It usually covers four things.",
    consultSteps: [
      {
        title: "Your goals",
        body: "You explain what you would like to change and what result you have in mind.",
      },
      {
        title: "Your health",
        body: "Your medical history, medications and previous surgeries are reviewed to confirm that surgery is safe for you.",
      },
      {
        title: "Your options",
        body: "After an examination, you hear which techniques fit your case, what recovery involves and what the risks are.",
      },
      {
        title: "Your quote",
        body: "You receive a quote that explains what it covers, and you can ask about financing.",
      },
    ],
    consultNote:
      "Every surgical procedure carries risks, and results vary from person to person. Whether a procedure is suitable for you is confirmed at an in-person consultation.",
    bookConsultation: "Book Free Consultation",
    call: "Call (305) 218-3513",
  },
  es: {
    metaTitle: "Dr. Mario Reyes-Serrano, Cirujano Cosmético en Miami",
    metaDescription:
      "Conozca al Dr. Mario Reyes-Serrano, cirujano cosmético de Your Cosmetic Surgery & SPA en Hialeah. Médico con licencia de la Florida desde 2005. Consultas gratis.",
    home: "Inicio",
    eyebrow: "Your Cosmetic Surgery & SPA · Hialeah, Florida",
    role: "Cirujano Cosmético",
    imageAlt: "Dr. Mario Reyes-Serrano, cirujano cosmético en Miami",
    aboutHeading: "Sobre el Dr. Reyes-Serrano",
    bio: [
      "El Dr. Mario Reyes-Serrano es cirujano cosmético y médico con licencia de la Florida desde 2005. Dirige el equipo quirúrgico de Your Cosmetic Surgery & SPA en Hialeah, donde atiende a pacientes de Miami, del resto del sur de la Florida y de fuera de la ciudad.",
      "Obtuvo su título de médico en la Universidad de La Habana y luego completó una residencia en cirugía y una especialización en cirugía plástica en el Hospital Calixto García de La Habana, seguidas de formación adicional en cirugía de mama.",
      "Su práctica abarca el contorno corporal, la cirugía de senos y los procedimientos faciales. Su enfoque consiste en planificar cada operación según la anatomía y los objetivos de cada paciente, buscando resultados naturales y proporcionados.",
      "Cada paciente comienza con una consulta gratuita y privada. Es el momento de hacer preguntas, entender las opciones y sus riesgos, y decidir sin presión si la cirugía es adecuada para usted.",
    ],
    credentialsHeading: "Credenciales y Experiencia",
    credentials: [
      "Médico con licencia de la Florida desde 2005",
      "Cirujano principal de Your Cosmetic Surgery & SPA",
      "Privilegios hospitalarios en Larkin Community Hospital, Miami",
    ],
    membershipsHeading: "Membresías Profesionales",
    memberships: [
      "American Academy of Cosmetic Surgery",
      "American Society of Abdominal Surgeons",
      "American Medical Association",
    ],
    educationHeading: "Educación y Formación",
    education: [
      "Doctor en Medicina, Universidad de La Habana (1970)",
      "Residencia en cirugía, Hospital Calixto García, La Habana (1973 – 1976)",
      "Especialización en cirugía plástica, Hospital Calixto García, La Habana (1976 – 1978)",
      "Formación adicional en cirugía de mama, La Habana (1988 – 1989)",
    ],
    licensesHeading: "Licencia",
    licenses: [
      "Licencia médica de la Florida ME94353, activa. Puede verificarla en el buscador de licencias del Departamento de Salud de la Florida.",
    ],
    languagesHeading: "Idiomas",
    languages: ["Inglés", "Español"],
    focusHeading: "Áreas de Enfoque",
    focusIntro:
      "Estos son los procedimientos por los que los pacientes consultan con más frecuencia al Dr. Reyes-Serrano. Cada página explica las técnicas, el costo, la recuperación y quién es candidato.",
    focusCategories: { body: "Cuerpo", breast: "Senos", face: "Rostro" },
    allProcedures: "Ver todos los procedimientos",
    consultHeading: "Qué Esperar en Su Consulta",
    consultIntro: "Una consulta es una conversación, no un compromiso. Normalmente cubre cuatro puntos.",
    consultSteps: [
      {
        title: "Sus objetivos",
        body: "Usted explica qué le gustaría cambiar y qué resultado tiene en mente.",
      },
      {
        title: "Su salud",
        body: "Se revisan su historial médico, sus medicamentos y sus cirugías anteriores para confirmar que la cirugía es segura para usted.",
      },
      {
        title: "Sus opciones",
        body: "Después de un examen, se le explica qué técnicas se ajustan a su caso, cómo es la recuperación y cuáles son los riesgos.",
      },
      {
        title: "Su presupuesto",
        body: "Recibe un presupuesto que explica lo que cubre y puede preguntar por el financiamiento.",
      },
    ],
    consultNote:
      "Todo procedimiento quirúrgico conlleva riesgos y los resultados varían de una persona a otra. La idoneidad de un procedimiento para usted se confirma en una consulta en persona.",
    bookConsultation: "Reservar Consulta Gratis",
    call: "Llamar al (305) 218-3513",
  },
};
