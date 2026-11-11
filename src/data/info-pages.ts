/**
 * Content for the standalone information pages: financing, out-of-town patients,
 * privacy policy and SMS terms. Rendered by src/app/[locale]/(site)/[info]/page.tsx.
 *
 * The privacy policy and SMS terms are carried over from the clinic's previous
 * website. Treat them as legal text: change the wording only with the clinic's sign-off.
 */

export interface InfoLink {
  label: string;
  href: string;
}

export interface InfoSection {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
  links?: InfoLink[];
}

export interface InfoFaq {
  q: string;
  a: string;
}

export interface InfoPageContent {
  /** Small label above the title */
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro?: string;
  sections: InfoSection[];
  faqsHeading?: string;
  faqs?: InfoFaq[];
}

export interface InfoPage {
  slug: string;
  /** Legal pages are plain documents: no sales call-to-action, lower sitemap priority. */
  kind: "marketing" | "legal";
  en: InfoPageContent;
  es: InfoPageContent;
}

const PHONE = "(305) 218-3513";
const ADDRESS = "1255 W 46th St, Suite #6 & 7A, Hialeah, FL 33012";

const procedureLinksEn: InfoLink[] = [
  { label: "Brazilian Butt Lift", href: "/procedures/brazilian-butt-lift" },
  { label: "Lipo 360", href: "/procedures/lipo-360" },
  { label: "Tummy Tuck", href: "/procedures/tummy-tuck" },
  { label: "Mommy Makeover", href: "/procedures/mommy-makeover" },
  { label: "Breast Augmentation", href: "/procedures/breast-augmentation" },
  { label: "Facelift", href: "/procedures/facelift" },
  { label: "All procedures", href: "/procedures" },
];

const procedureLinksEs: InfoLink[] = [
  { label: "Aumento de Glúteos (BBL)", href: "/procedures/brazilian-butt-lift" },
  { label: "Lipo 360", href: "/procedures/lipo-360" },
  { label: "Abdominoplastia", href: "/procedures/tummy-tuck" },
  { label: "Mommy Makeover", href: "/procedures/mommy-makeover" },
  { label: "Aumento de Senos", href: "/procedures/breast-augmentation" },
  { label: "Lifting Facial", href: "/procedures/facelift" },
  { label: "Todos los procedimientos", href: "/procedures" },
];

// ─── Financing ───────────────────────────────────────────────────────────────

const financing: InfoPage = {
  slug: "financing",
  kind: "marketing",
  en: {
    eyebrow: "Payment Options",
    title: "Plastic Surgery Financing in Miami",
    metaTitle: "Plastic Surgery Financing in Miami",
    metaDescription:
      "Finance your cosmetic surgery in Miami with monthly payments through our financing partners. Free consultation and written quote first. Call (305) 218-3513.",
    intro:
      "Cost should not be the only reason you keep postponing a procedure you have thought about for years. Your Cosmetic Surgery & SPA in Hialeah works with third-party financing companies, so patients from Miami and across South Florida can spread the cost of surgery into monthly payments.",
    sections: [
      {
        heading: "How Financing Works",
        list: [
          "Start with a free consultation. Your surgeon confirms which procedure is right for you and you receive a quote for your personalized plan.",
          "Apply with one of our financing partners. You can apply on your own or ask our patient coordinators to walk you through it.",
          "The lender reviews your application and shows you the payment options you qualify for.",
          "Choose the plan that fits your budget, then schedule your procedure.",
        ],
      },
      {
        heading: "Our Financing Partners",
        paragraphs: [
          "ALPHAEON CREDIT is a credit card for health, beauty and wellness care. It offers a range of monthly payment options, including special financing offers for applicants who qualify.",
          "United Credit connects applicants with loan offers from multiple lenders, with payment terms designed for a range of credit profiles.",
          "Approval, credit limits, interest rates and repayment terms are decided by the financing company, not by our clinic. Read the lender's terms carefully before you accept an offer, and ask us if anything is unclear.",
        ],
      },
      {
        heading: "What You Can Finance",
        paragraphs: [
          "Financing can be used for the surgical and med spa procedures we offer, including combined procedures. Published price ranges for each procedure are on its page.",
        ],
        links: procedureLinksEn,
      },
      {
        heading: "Other Ways to Pay",
        paragraphs: [
          "We also accept cash and major credit cards. If you would like to combine payment methods, ask our coordinators what is possible when you receive your quote.",
        ],
      },
    ],
    faqsHeading: "Financing Questions",
    faqs: [
      {
        q: "Will applying for financing affect my credit score?",
        a: "It depends on the lender. Some partners let you see the offers you may qualify for without affecting your credit score, while a final application can involve a credit check. The lender tells you which applies before you submit.",
      },
      {
        q: "Do I need a quote before I apply?",
        a: "We recommend it. Your free consultation gives you the price of your personalized plan, so you know how much you actually need to finance before you apply.",
      },
      {
        q: "Can I finance only part of my procedure?",
        a: "In many cases, yes. Tell our coordinators how much you would like to pay up front and they will explain the options available with each partner.",
      },
      {
        q: "What if I am not approved?",
        a: "Each financing company has its own criteria, so not being approved by one does not mean you will be declined by another. Our coordinators can go over the alternatives with you.",
      },
    ],
  },
  es: {
    eyebrow: "Opciones de Pago",
    title: "Financiamiento de Cirugía Plástica en Miami",
    metaTitle: "Financiamiento de Cirugía Plástica en Miami",
    metaDescription:
      "Financie su cirugía estética en Miami con pagos mensuales a través de nuestras compañías de financiamiento. Consulta gratuita primero. Llame al (305) 218-3513.",
    intro:
      "El costo no debería ser la única razón para seguir posponiendo un procedimiento en el que ha pensado durante años. Your Cosmetic Surgery & SPA, en Hialeah, trabaja con compañías de financiamiento externas para que pacientes de Miami y de todo el sur de Florida puedan dividir el costo de su cirugía en pagos mensuales.",
    sections: [
      {
        heading: "Cómo Funciona el Financiamiento",
        list: [
          "Comience con una consulta gratuita. Su cirujano confirma qué procedimiento es el adecuado para usted y usted recibe una cotización de su plan personalizado.",
          "Solicite el financiamiento con una de nuestras compañías asociadas. Puede hacerlo por su cuenta o pedir a nuestros coordinadores de pacientes que le guíen.",
          "La compañía revisa su solicitud y le muestra las opciones de pago para las que califica.",
          "Elija el plan que se ajuste a su presupuesto y programe su procedimiento.",
        ],
      },
      {
        heading: "Nuestras Compañías de Financiamiento",
        paragraphs: [
          "ALPHAEON CREDIT es una tarjeta de crédito para servicios de salud, belleza y bienestar. Ofrece distintas opciones de pago mensual, incluidas ofertas especiales de financiamiento para los solicitantes que califican.",
          "United Credit conecta a los solicitantes con ofertas de préstamo de varias entidades, con plazos de pago pensados para distintos perfiles de crédito.",
          "La aprobación, los límites de crédito, las tasas de interés y los plazos los decide la compañía de financiamiento, no nuestra clínica. Lea con atención los términos antes de aceptar una oferta y pregúntenos si algo no queda claro.",
        ],
      },
      {
        heading: "Qué Puede Financiar",
        paragraphs: [
          "El financiamiento puede utilizarse para los procedimientos quirúrgicos y de spa médico que ofrecemos, incluidos los procedimientos combinados. Los rangos de precio publicados de cada procedimiento están en su página.",
        ],
        links: procedureLinksEs,
      },
      {
        heading: "Otras Formas de Pago",
        paragraphs: [
          "También aceptamos efectivo y las principales tarjetas de crédito. Si desea combinar formas de pago, pregunte a nuestros coordinadores qué es posible cuando reciba su cotización.",
        ],
      },
    ],
    faqsHeading: "Preguntas sobre Financiamiento",
    faqs: [
      {
        q: "¿Solicitar financiamiento afecta mi puntaje de crédito?",
        a: "Depende de la compañía. Algunas permiten ver las ofertas para las que podría calificar sin afectar su puntaje de crédito, mientras que la solicitud final puede implicar una verificación de crédito. La compañía le indica cuál es el caso antes de enviar la solicitud.",
      },
      {
        q: "¿Necesito una cotización antes de solicitarlo?",
        a: "Lo recomendamos. En su consulta gratuita recibe el precio de su plan personalizado, de modo que sabe cuánto necesita financiar antes de presentar la solicitud.",
      },
      {
        q: "¿Puedo financiar solo una parte de mi procedimiento?",
        a: "En muchos casos, sí. Indique a nuestros coordinadores cuánto desea pagar por adelantado y ellos le explicarán las opciones disponibles con cada compañía.",
      },
      {
        q: "¿Qué pasa si no me aprueban?",
        a: "Cada compañía de financiamiento tiene sus propios criterios, por lo que no ser aprobado por una no significa que otra vaya a rechazarle. Nuestros coordinadores pueden revisar las alternativas con usted.",
      },
    ],
  },
};

// ─── Out-of-town patients ────────────────────────────────────────────────────

const outOfTown: InfoPage = {
  slug: "out-of-town-patients",
  kind: "marketing",
  en: {
    eyebrow: "Traveling for Surgery",
    title: "Out-of-Town Patients",
    metaTitle: "Out-of-Town Patients: Surgery in Miami",
    metaDescription:
      "Traveling to Miami for cosmetic surgery? How to plan your trip to Your Cosmetic Surgery & SPA in Hialeah: consultation, airports, lodging and recovery.",
    intro:
      "Many of our patients travel to South Florida for their procedure. Planning the details in advance makes the trip smoother and helps you avoid delays on the day of surgery. Here is how to prepare for your visit to Your Cosmetic Surgery & SPA in Hialeah, just outside Miami.",
    sections: [
      {
        heading: "Before You Travel",
        list: [
          "Contact our team before you book anything, so we can confirm we are able to accommodate your procedure and your dates.",
          "Start with a free consultation. You can request a call or a virtual appointment from any procedure page on this site.",
          "Ask which medical tests or clearances you need, and complete them before your trip when possible.",
          "Plan to arrive at least one day before your surgery.",
        ],
      },
      {
        heading: "Getting Here",
        paragraphs: [
          `Our office is at ${ADDRESS}. The two closest airports are:`,
        ],
        list: [
          "Miami International Airport (MIA) — 2100 NW 42nd Ave, Miami, FL 33142",
          "Fort Lauderdale-Hollywood International Airport (FLL) — 100 Terminal Dr, Fort Lauderdale, FL 33315",
        ],
      },
      {
        heading: "Where to Stay",
        paragraphs: [
          "These hotels are in the Miami airport and Doral area, a short drive from our office. We are not affiliated with them; please book directly and compare options before you decide.",
        ],
        list: [
          "Hilton Garden Inn Miami Airport West — 3550 NW 74th Ave, Miami, FL 33122",
          "Hampton Inn Miami-Airport West — 3620 NW 79th Ave, Doral, FL 33166",
          "Courtyard by Marriott Miami Airport West/Doral — 3929 NW 79th Ave, Miami, FL 33166",
          "Candlewood Suites Miami Intl Airport — 5911 NW 36th St, Miami, FL 33166",
        ],
      },
      {
        heading: "Nearby Pharmacies",
        list: [
          "CVS Pharmacy — 3750 NW 87th Ave Ste B, Doral, FL 33178",
          "Walgreens — 9675 NW 41st St, Doral, FL 33178",
          "SMP Pharmacy Solutions — 7500 NW 26th St, Miami, FL 33122",
        ],
      },
      {
        heading: "Recovery and Going Home",
        paragraphs: [
          "After your procedure you will need to rest and avoid strenuous activity and heavy lifting for a few weeks. Your surgeon gives you written instructions for your recovery.",
          "How long you should stay in the area depends on your procedure and on how you are healing. You will need to attend your post-operative appointments, and long flights or drives soon after surgery can increase the risk of blood clots. Do not book your return trip until your surgeon has told you when it is safe to travel.",
          "Bring a responsible adult who can stay with you, at least for the first days after surgery.",
        ],
      },
      {
        heading: "Planning Your Budget",
        paragraphs: [
          "Remember to include flights, lodging, meals and local transportation alongside the cost of your procedure. Financing is available for the procedure itself.",
        ],
        links: [
          { label: "Financing options", href: "/financing" },
          { label: "Procedures and prices", href: "/procedures" },
          { label: "Contact us", href: "/contact" },
        ],
      },
    ],
    faqsHeading: "Travel Questions",
    faqs: [
      {
        q: "Can I have my consultation before I travel?",
        a: "Yes. Consultations are free, and you can request a phone call or a virtual appointment so you can speak with our team before making any travel plans.",
      },
      {
        q: "Do you help with lodging?",
        a: "We can answer your questions about nearby hotels and what to look for in a place to recover. You make and pay for your own reservation.",
      },
      {
        q: "How soon can I fly home after surgery?",
        a: "It depends on the procedure and on your recovery. Your surgeon will tell you when you can travel, so wait for that guidance before booking a return flight.",
      },
      {
        q: "Do I need someone to come with me?",
        a: "We strongly recommend it. You will need a responsible adult to take you home from surgery and to help you during the first days of recovery.",
      },
    ],
  },
  es: {
    eyebrow: "Viajar para su Cirugía",
    title: "Pacientes de Fuera de la Ciudad",
    metaTitle: "Pacientes de Fuera de la Ciudad: Cirugía en Miami",
    metaDescription:
      "¿Viaja a Miami para una cirugía estética? Cómo planificar su visita a Your Cosmetic Surgery & SPA en Hialeah: consulta, aeropuertos, hospedaje y recuperación.",
    intro:
      "Muchos de nuestros pacientes viajan al sur de Florida para su procedimiento. Planificar los detalles con anticipación hace el viaje más sencillo y le ayuda a evitar retrasos el día de la cirugía. Así puede prepararse para su visita a Your Cosmetic Surgery & SPA en Hialeah, a las afueras de Miami.",
    sections: [
      {
        heading: "Antes de Viajar",
        list: [
          "Comuníquese con nuestro equipo antes de reservar, para confirmar que podemos atender su procedimiento en las fechas que desea.",
          "Comience con una consulta gratuita. Puede solicitar una llamada o una cita virtual desde cualquier página de procedimiento de este sitio.",
          "Pregunte qué exámenes o autorizaciones médicas necesita y, cuando sea posible, complételos antes de su viaje.",
          "Planifique llegar al menos un día antes de su cirugía.",
        ],
      },
      {
        heading: "Cómo Llegar",
        paragraphs: [
          `Nuestra oficina está en ${ADDRESS}. Los dos aeropuertos más cercanos son:`,
        ],
        list: [
          "Aeropuerto Internacional de Miami (MIA) — 2100 NW 42nd Ave, Miami, FL 33142",
          "Aeropuerto Internacional de Fort Lauderdale-Hollywood (FLL) — 100 Terminal Dr, Fort Lauderdale, FL 33315",
        ],
      },
      {
        heading: "Dónde Hospedarse",
        paragraphs: [
          "Estos hoteles están en la zona del aeropuerto de Miami y Doral, a poca distancia en auto de nuestra oficina. No tenemos afiliación con ellos; reserve directamente y compare opciones antes de decidir.",
        ],
        list: [
          "Hilton Garden Inn Miami Airport West — 3550 NW 74th Ave, Miami, FL 33122",
          "Hampton Inn Miami-Airport West — 3620 NW 79th Ave, Doral, FL 33166",
          "Courtyard by Marriott Miami Airport West/Doral — 3929 NW 79th Ave, Miami, FL 33166",
          "Candlewood Suites Miami Intl Airport — 5911 NW 36th St, Miami, FL 33166",
        ],
      },
      {
        heading: "Farmacias Cercanas",
        list: [
          "CVS Pharmacy — 3750 NW 87th Ave Ste B, Doral, FL 33178",
          "Walgreens — 9675 NW 41st St, Doral, FL 33178",
          "SMP Pharmacy Solutions — 7500 NW 26th St, Miami, FL 33122",
        ],
      },
      {
        heading: "Recuperación y Regreso a Casa",
        paragraphs: [
          "Después de su procedimiento deberá descansar y evitar la actividad intensa y levantar objetos pesados durante algunas semanas. Su cirujano le entrega instrucciones escritas para su recuperación.",
          "El tiempo que debe permanecer en la zona depende de su procedimiento y de cómo evolucione su recuperación. Deberá asistir a sus citas postoperatorias, y los vuelos o trayectos largos poco después de una cirugía pueden aumentar el riesgo de coágulos de sangre. No reserve su viaje de regreso hasta que su cirujano le indique cuándo es seguro viajar.",
          "Venga con un adulto responsable que pueda quedarse con usted, al menos durante los primeros días después de la cirugía.",
        ],
      },
      {
        heading: "Planifique su Presupuesto",
        paragraphs: [
          "Recuerde incluir vuelos, hospedaje, comidas y transporte local además del costo de su procedimiento. Hay financiamiento disponible para el procedimiento.",
        ],
        links: [
          { label: "Opciones de financiamiento", href: "/financing" },
          { label: "Procedimientos y precios", href: "/procedures" },
          { label: "Contáctenos", href: "/contact" },
        ],
      },
    ],
    faqsHeading: "Preguntas sobre el Viaje",
    faqs: [
      {
        q: "¿Puedo tener mi consulta antes de viajar?",
        a: "Sí. Las consultas son gratuitas y puede solicitar una llamada o una cita virtual para hablar con nuestro equipo antes de hacer planes de viaje.",
      },
      {
        q: "¿Ayudan con el hospedaje?",
        a: "Podemos responder sus preguntas sobre hoteles cercanos y qué buscar en un lugar para recuperarse. Usted hace y paga su propia reserva.",
      },
      {
        q: "¿Cuándo puedo volar a casa después de la cirugía?",
        a: "Depende del procedimiento y de su recuperación. Su cirujano le dirá cuándo puede viajar, así que espere esa indicación antes de reservar su vuelo de regreso.",
      },
      {
        q: "¿Necesito que alguien me acompañe?",
        a: "Lo recomendamos encarecidamente. Necesitará un adulto responsable que le lleve a casa después de la cirugía y le ayude durante los primeros días de recuperación.",
      },
    ],
  },
};

// ─── Privacy policy (carried over from the previous site) ────────────────────

const privacy: InfoPage = {
  slug: "privacy-policy",
  kind: "legal",
  en: {
    eyebrow: "Effective Date: 01/01/2025",
    title: "Privacy Policy",
    metaTitle: "Privacy Policy",
    metaDescription:
      "How Your Cosmetic Surgery & SPA collects, uses, shares and protects your personal and health information, and how to exercise your privacy rights.",
    intro:
      "Your Cosmetic Surgery & SPA (“we,” “our,” or “us”) is committed to protecting the privacy and security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or interact with us. By using our website or services, you agree to the terms of this Privacy Policy. If you do not agree, please discontinue use of our services.",
    sections: [
      {
        heading: "1. Information We Collect",
        paragraphs: ["We may collect the following types of information from and about you:"],
        list: [
          "Health Information: Medical or health-related information you provide, in accordance with the Health Insurance Portability and Accountability Act (HIPAA).",
          "Personal Identifiable Information (PII): Name, email address, phone number, mailing address, medical history, and information provided during forms or appointment scheduling.",
          "Non-Personal Information: Browser type, operating system, IP address, and usage data collected during your visit to our website.",
        ],
      },
      {
        heading: "2. How We Use Your Information",
        paragraphs: ["We use the information we collect for the following purposes:"],
        list: [
          "To provide cosmetic and medical services or other services you request.",
          "To communicate with you about appointments, consultations, or follow-up care.",
          "To improve our website, services, and customer experience.",
          "To comply with legal obligations, including health regulations and HIPAA.",
          "To process payments and insurance claims, where applicable.",
        ],
      },
      {
        heading: "3. How We Share Your Information",
        paragraphs: ["We do not sell or rent your personal information. However, we may disclose your information:"],
        list: [
          "With Your Consent: When you expressly provide consent.",
          "To Medical Providers: Healthcare professionals involved in your care or treatment.",
          "To Service Providers: Trusted third-party vendors who assist with operational or marketing activities.",
          "For Legal Obligations: To comply with legal processes or protect rights, property, or safety.",
        ],
      },
      {
        heading: "4. Data Security",
        paragraphs: [
          "We use industry-standard security measures, including encryption, secure socket layers (SSL), and firewalls, to protect your data. While we strive to safeguard your information, no transmission or storage method is completely secure.",
        ],
      },
      {
        heading: "5. Your Rights",
        paragraphs: ["You have the following rights regarding your data:"],
        list: [
          "Access: Request access to personal data we hold about you.",
          "Correction: Request corrections to inaccurate or incomplete data.",
          "Deletion: Request the deletion of personal data, subject to legal exceptions.",
          "Restrict Processing: Ask us to stop processing your data under specific circumstances.",
          "Data Portability: Request transfer of your data to another party.",
          `To exercise these rights, contact us at ${PHONE}.`,
        ],
      },
      {
        heading: "6. Cookies and Tracking Technologies",
        paragraphs: [
          "We use cookies to enhance website functionality and user experience. Adjust your browser settings to disable cookies, but note some website features may not function properly.",
          "We use Google Analytics to understand how visitors use this website, such as the pages viewed, the type of device and the approximate location. The details you enter in our forms are not sent to Google Analytics.",
        ],
      },
      {
        heading: "7. Children’s Privacy",
        paragraphs: [
          "Our services are not intended for individuals under 13 years of age. If we become aware of data collected from children under 13, we will delete it promptly.",
        ],
      },
      {
        heading: "8. Opt-In Messaging",
        paragraphs: [
          "By providing your phone number or email, you consent to receive automated and non-automated messages, including marketing messages, from Your Cosmetic Surgery & SPA.",
        ],
        list: [
          "Message & Data Rates: Message and data rates may apply based on your carrier.",
          "Message Frequency: You may receive up to one message per week.",
        ],
      },
      {
        heading: "9. Opt-Out Messaging",
        paragraphs: ["To stop receiving messages, you can:"],
        list: [
          "Text Message Opt-Out: Reply “STOP” to any message sent by us.",
          `Phone Opt-Out: Call ${PHONE} to request removal from communications.`,
          "When opting out, you will receive a confirmation message indicating no further messages will be sent.",
        ],
      },
      {
        heading: "10. Help Messaging",
        paragraphs: [`For assistance, text “HELP” to ${PHONE} or contact:`],
        list: [
          `Phone: ${PHONE}`,
          "Email: info@ycosmeticsurgery.com",
          "Support Website: https://ycosmeticsurgery.com/",
        ],
      },
      {
        heading: "11. Changes to This Policy",
        paragraphs: [
          "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Any updates will be posted here with the updated “Effective Date.”",
        ],
      },
      {
        heading: "12. Contact Us",
        paragraphs: [
          `For questions or concerns, contact us: Your Cosmetic Surgery & SPA. Phone: ${PHONE}. Email: info@ycosmeticsurgery.com.`,
          "SMS opt-in or phone numbers for the purpose of SMS are not being shared with any third party and affiliate company for marketing purposes.",
        ],
        links: [{ label: "SMS Terms and Conditions", href: "/terms" }],
      },
    ],
  },
  es: {
    eyebrow: "Fecha de vigencia: 01/01/2025",
    title: "Política de Privacidad",
    metaTitle: "Política de Privacidad",
    metaDescription:
      "Cómo Your Cosmetic Surgery & SPA recopila, utiliza, comparte y protege su información personal y de salud, y cómo ejercer sus derechos de privacidad.",
    intro:
      "Your Cosmetic Surgery & SPA (“nosotros” o “nuestro”) se compromete a proteger la privacidad y la seguridad de su información personal. Esta Política de Privacidad explica cómo recopilamos, utilizamos, divulgamos y protegemos su información cuando visita nuestro sitio web o interactúa con nosotros. Al utilizar nuestro sitio web o nuestros servicios, usted acepta los términos de esta Política de Privacidad. Si no está de acuerdo, le pedimos que deje de utilizar nuestros servicios. Esta es una traducción de cortesía; en caso de discrepancia, prevalece la versión en inglés.",
    sections: [
      {
        heading: "1. Información que Recopilamos",
        paragraphs: ["Podemos recopilar los siguientes tipos de información suya y sobre usted:"],
        list: [
          "Información de salud: Información médica o relacionada con la salud que usted proporciona, de conformidad con la Ley de Portabilidad y Responsabilidad de Seguros de Salud (HIPAA).",
          "Información de identificación personal (PII): Nombre, correo electrónico, número de teléfono, dirección postal, historial médico e información proporcionada en formularios o al programar citas.",
          "Información no personal: Tipo de navegador, sistema operativo, dirección IP y datos de uso recopilados durante su visita a nuestro sitio web.",
        ],
      },
      {
        heading: "2. Cómo Utilizamos su Información",
        paragraphs: ["Utilizamos la información que recopilamos para los siguientes fines:"],
        list: [
          "Prestar servicios cosméticos y médicos u otros servicios que usted solicite.",
          "Comunicarnos con usted sobre citas, consultas o atención de seguimiento.",
          "Mejorar nuestro sitio web, nuestros servicios y la experiencia del cliente.",
          "Cumplir con obligaciones legales, incluidas las normas de salud y HIPAA.",
          "Procesar pagos y reclamaciones de seguros, cuando corresponda.",
        ],
      },
      {
        heading: "3. Cómo Compartimos su Información",
        paragraphs: ["No vendemos ni alquilamos su información personal. Sin embargo, podemos divulgar su información:"],
        list: [
          "Con su consentimiento: Cuando usted lo otorga expresamente.",
          "A proveedores médicos: Profesionales de la salud que participan en su atención o tratamiento.",
          "A proveedores de servicios: Terceros de confianza que ayudan en actividades operativas o de mercadeo.",
          "Por obligaciones legales: Para cumplir con procesos legales o proteger derechos, bienes o la seguridad.",
        ],
      },
      {
        heading: "4. Seguridad de los Datos",
        paragraphs: [
          "Utilizamos medidas de seguridad estándar de la industria, incluidos el cifrado, las capas de conexión segura (SSL) y los cortafuegos, para proteger sus datos. Aunque nos esforzamos por proteger su información, ningún método de transmisión o almacenamiento es completamente seguro.",
        ],
      },
      {
        heading: "5. Sus Derechos",
        paragraphs: ["Usted tiene los siguientes derechos sobre sus datos:"],
        list: [
          "Acceso: Solicitar acceso a los datos personales que tenemos sobre usted.",
          "Corrección: Solicitar la corrección de datos inexactos o incompletos.",
          "Eliminación: Solicitar la eliminación de datos personales, con las excepciones que establece la ley.",
          "Restricción del tratamiento: Pedirnos que dejemos de tratar sus datos en circunstancias específicas.",
          "Portabilidad de datos: Solicitar la transferencia de sus datos a otra parte.",
          `Para ejercer estos derechos, comuníquese con nosotros al ${PHONE}.`,
        ],
      },
      {
        heading: "6. Cookies y Tecnologías de Seguimiento",
        paragraphs: [
          "Utilizamos cookies para mejorar el funcionamiento del sitio web y la experiencia del usuario. Puede ajustar la configuración de su navegador para desactivar las cookies, pero tenga en cuenta que algunas funciones del sitio podrían no funcionar correctamente.",
          "Utilizamos Google Analytics para entender cómo los visitantes usan este sitio web, por ejemplo las páginas vistas, el tipo de dispositivo y la ubicación aproximada. Los datos que usted escribe en nuestros formularios no se envían a Google Analytics.",
        ],
      },
      {
        heading: "7. Privacidad de los Menores",
        paragraphs: [
          "Nuestros servicios no están dirigidos a personas menores de 13 años. Si tenemos conocimiento de datos recopilados de menores de 13 años, los eliminaremos de inmediato.",
        ],
      },
      {
        heading: "8. Consentimiento para Mensajes",
        paragraphs: [
          "Al proporcionar su número de teléfono o correo electrónico, usted acepta recibir mensajes automatizados y no automatizados, incluidos mensajes de mercadeo, de Your Cosmetic Surgery & SPA.",
        ],
        list: [
          "Tarifas de mensajes y datos: Pueden aplicarse tarifas de mensajes y datos según su operador.",
          "Frecuencia de los mensajes: Puede recibir hasta un mensaje por semana.",
        ],
      },
      {
        heading: "9. Cancelación de Mensajes",
        paragraphs: ["Para dejar de recibir mensajes, usted puede:"],
        list: [
          "Por mensaje de texto: Responder “STOP” a cualquier mensaje que le enviemos.",
          `Por teléfono: Llamar al ${PHONE} para solicitar que se le excluya de las comunicaciones.`,
          "Al cancelar, recibirá un mensaje de confirmación indicando que no se le enviarán más mensajes.",
        ],
      },
      {
        heading: "10. Ayuda",
        paragraphs: [`Para obtener ayuda, envíe “HELP” por mensaje de texto al ${PHONE} o comuníquese con:`],
        list: [
          `Teléfono: ${PHONE}`,
          "Correo electrónico: info@ycosmeticsurgery.com",
          "Sitio web de soporte: https://ycosmeticsurgery.com/",
        ],
      },
      {
        heading: "11. Cambios a esta Política",
        paragraphs: [
          "Podemos actualizar esta Política de Privacidad ocasionalmente para reflejar cambios en nuestras prácticas o en los requisitos legales. Toda actualización se publicará aquí con la “Fecha de vigencia” actualizada.",
        ],
      },
      {
        heading: "12. Contáctenos",
        paragraphs: [
          `Si tiene preguntas o inquietudes, comuníquese con nosotros: Your Cosmetic Surgery & SPA. Teléfono: ${PHONE}. Correo electrónico: info@ycosmeticsurgery.com.`,
          "El consentimiento para SMS y los números de teléfono proporcionados para SMS no se comparten con terceros ni con compañías afiliadas con fines de mercadeo.",
        ],
        links: [{ label: "Términos y Condiciones de SMS", href: "/terms" }],
      },
    ],
  },
};

// ─── SMS terms and conditions (carried over from the previous site) ──────────

const terms: InfoPage = {
  slug: "terms",
  kind: "legal",
  en: {
    eyebrow: "SMS Messaging",
    title: "Terms and Conditions",
    metaTitle: "SMS Terms and Conditions",
    metaDescription:
      "Terms and conditions for text messages from Your Cosmetic Surgery & SPA: what we send, message frequency, costs, and how to opt out or get help.",
    intro:
      "Your Cosmetic Surgery & SPA (“we,” “our,” or “us”) provides an SMS service to offer users convenient and timely communication based on their preferences and requests.",
    sections: [
      {
        heading: "Program Description",
        paragraphs: ["Our SMS service is designed to enhance your experience by providing:"],
        list: [
          "Account notifications: Stay updated with real-time alerts about your account activity.",
          "Delivery notifications: Stay informed every step of the way.",
          "Marketing: Receive exclusive promotions, special offers, and updates on new products or services.",
          "Customer care: Get important updates, support responses, and assistance reminders.",
        ],
      },
      {
        heading: "Frequency",
        paragraphs: [
          "We respect your communication preferences. SMS messages will only be sent when you explicitly request to receive them or when you initiate a conversation via SMS. The frequency of messages will vary based on the nature of your requests and the information being provided.",
        ],
      },
      {
        heading: "Opt-Out",
        paragraphs: [
          "You have full control over your participation in our SMS service. To stop receiving messages at any time, reply to any message with the word “STOP.” You will receive a confirmation SMS verifying your successful un-subscription. After this confirmation, you will no longer receive SMS messages from Your Cosmetic Surgery & SPA. If you wish to rejoin the service, simply sign up again using the original method you used to subscribe.",
        ],
      },
      {
        heading: "Help",
        paragraphs: [
          `For assistance with our SMS service, reply to any message with the keyword “HELP” for additional information or instructions. Alternatively, you can contact us directly at ${PHONE} or via email for immediate support.`,
        ],
      },
      {
        heading: "Interruption",
        paragraphs: [
          "While we strive to provide a reliable SMS communication service, there may be occasions where messages are delayed or not delivered due to network issues or unforeseen circumstances. Please note that wireless carriers are not responsible for these delays or undelivered messages.",
        ],
      },
      {
        heading: "Cost",
        paragraphs: [
          "Standard message and data rates may apply to SMS messages sent by us to you, as well as messages you send to Your Cosmetic Surgery & SPA. These costs are determined by your wireless provider and are part of your mobile phone plan. For questions regarding your text or data plan, please contact your wireless provider directly.",
        ],
      },
      {
        heading: "Privacy",
        paragraphs: [
          `We are committed to safeguarding your privacy. For detailed information on how we collect, use, and protect your personal information, please review our Privacy Policy or contact us at ${PHONE}. By using our SMS service, you agree to these Terms and Conditions. If you have any questions or concerns, please contact us directly.`,
        ],
        links: [{ label: "Privacy Policy", href: "/privacy-policy" }],
      },
      {
        heading: "1. SMS Consent Communication",
        paragraphs: [
          "By providing your phone number and opting in, you consent to receive SMS (text) messages from us for customer care, marketing, delivery notifications and account notifications.",
        ],
        list: [
          "Message frequency may vary.",
          "Message and data rates may apply.",
          "Your consent is not a condition of any purchase.",
          "You can opt out at any time by texting “STOP” to unsubscribe, or text “HELP” for assistance.",
          `For more information, please call ${PHONE}.`,
        ],
      },
      {
        heading: "2. Types of SMS Communications",
        paragraphs: [
          "If consent has been given to receive text messages from Your Cosmetic Surgery & SPA, messages may be received related to the following:",
        ],
        list: [
          "Appointment reminders",
          "Follow-up messages",
          "Billing inquiries",
          "Promotions or offers (if applicable)",
        ],
      },
      {
        heading: "3. Message Frequency",
        paragraphs: [
          "Message frequency may vary depending on the type of communication. You may receive up to 2 SMS messages per week regarding your appointments or account status.",
        ],
      },
      {
        heading: "4. Potential Fees for SMS Messaging",
        paragraphs: [
          "Standard message and data rates may apply, depending on the carrier’s pricing plan. These fees may vary if the message is sent domestically or internationally.",
        ],
      },
      {
        heading: "5. Opt-In Method",
        paragraphs: ["Opt-in to receive SMS messages from Your Cosmetic Surgery & SPA can be done in the following ways:"],
        list: ["Verbally, during a conversation", "By submitting an online form"],
      },
      {
        heading: "6. Opt-Out Method",
        paragraphs: [
          "Opting out of receiving SMS messages can be done at any time by replying “STOP” to any SMS message received. Alternatively, direct contact can be made to request removal from the messaging list.",
        ],
      },
      {
        heading: "7. Help",
        paragraphs: [
          `For any issues, reply with the keyword HELP. Alternatively, help can be obtained directly from us at ${PHONE}. If SMS messages are not desired, the SMS consent box on forms can be left unchecked.`,
        ],
      },
      {
        heading: "8. Standard Messaging Disclosures",
        list: [
          "Message and data rates may apply.",
          "Opt out at any time by texting “STOP.”",
          "For assistance, text “HELP” or visit our Privacy Policy and Terms and Conditions pages.",
          "Message frequency may vary.",
        ],
      },
    ],
  },
  es: {
    eyebrow: "Mensajes SMS",
    title: "Términos y Condiciones",
    metaTitle: "Términos y Condiciones de SMS",
    metaDescription:
      "Términos y condiciones de los mensajes de texto de Your Cosmetic Surgery & SPA: qué enviamos, frecuencia, costos y cómo cancelar o pedir ayuda.",
    intro:
      "Your Cosmetic Surgery & SPA (“nosotros” o “nuestro”) ofrece un servicio de SMS para brindar a los usuarios una comunicación conveniente y oportuna según sus preferencias y solicitudes. Esta es una traducción de cortesía; en caso de discrepancia, prevalece la versión en inglés.",
    sections: [
      {
        heading: "Descripción del Programa",
        paragraphs: ["Nuestro servicio de SMS está diseñado para mejorar su experiencia mediante:"],
        list: [
          "Notificaciones de cuenta: Manténgase al día con alertas en tiempo real sobre la actividad de su cuenta.",
          "Notificaciones de entrega: Manténgase informado en cada paso.",
          "Mercadeo: Reciba promociones exclusivas, ofertas especiales y novedades sobre productos o servicios.",
          "Atención al cliente: Reciba actualizaciones importantes, respuestas de soporte y recordatorios.",
        ],
      },
      {
        heading: "Frecuencia",
        paragraphs: [
          "Respetamos sus preferencias de comunicación. Los mensajes SMS solo se enviarán cuando usted solicite expresamente recibirlos o cuando usted inicie una conversación por SMS. La frecuencia de los mensajes variará según la naturaleza de sus solicitudes y la información proporcionada.",
        ],
      },
      {
        heading: "Cancelación",
        paragraphs: [
          "Usted tiene control total sobre su participación en nuestro servicio de SMS. Para dejar de recibir mensajes en cualquier momento, responda a cualquier mensaje con la palabra “STOP”. Recibirá un SMS de confirmación de que su cancelación se realizó correctamente. Después de esta confirmación, no recibirá más mensajes SMS de Your Cosmetic Surgery & SPA. Si desea volver al servicio, simplemente regístrese de nuevo por el mismo método que utilizó para suscribirse.",
        ],
      },
      {
        heading: "Ayuda",
        paragraphs: [
          `Para obtener ayuda con nuestro servicio de SMS, responda a cualquier mensaje con la palabra clave “HELP” para recibir más información o instrucciones. También puede comunicarse directamente con nosotros al ${PHONE} o por correo electrónico.`,
        ],
      },
      {
        heading: "Interrupciones",
        paragraphs: [
          "Aunque nos esforzamos por ofrecer un servicio de SMS confiable, en ocasiones los mensajes pueden retrasarse o no entregarse debido a problemas de red o circunstancias imprevistas. Tenga en cuenta que los operadores de telefonía no son responsables de estos retrasos ni de los mensajes no entregados.",
        ],
      },
      {
        heading: "Costo",
        paragraphs: [
          "Pueden aplicarse tarifas estándar de mensajes y datos a los SMS que le enviamos, así como a los mensajes que usted envíe a Your Cosmetic Surgery & SPA. Estos costos los determina su operador y forman parte de su plan de telefonía móvil. Si tiene preguntas sobre su plan de mensajes o datos, comuníquese directamente con su operador.",
        ],
      },
      {
        heading: "Privacidad",
        paragraphs: [
          `Nos comprometemos a proteger su privacidad. Para obtener información detallada sobre cómo recopilamos, utilizamos y protegemos su información personal, consulte nuestra Política de Privacidad o comuníquese con nosotros al ${PHONE}. Al utilizar nuestro servicio de SMS, usted acepta estos Términos y Condiciones. Si tiene preguntas o inquietudes, comuníquese directamente con nosotros.`,
        ],
        links: [{ label: "Política de Privacidad", href: "/privacy-policy" }],
      },
      {
        heading: "1. Consentimiento para Comunicaciones por SMS",
        paragraphs: [
          "Al proporcionar su número de teléfono y aceptar, usted consiente recibir mensajes SMS (de texto) de nuestra parte para atención al cliente, mercadeo, notificaciones de entrega y notificaciones de cuenta.",
        ],
        list: [
          "La frecuencia de los mensajes puede variar.",
          "Pueden aplicarse tarifas de mensajes y datos.",
          "Su consentimiento no es condición para ninguna compra.",
          "Puede cancelar en cualquier momento enviando “STOP”, o enviar “HELP” para obtener ayuda.",
          `Para más información, llame al ${PHONE}.`,
        ],
      },
      {
        heading: "2. Tipos de Comunicaciones por SMS",
        paragraphs: [
          "Si ha dado su consentimiento para recibir mensajes de texto de Your Cosmetic Surgery & SPA, puede recibir mensajes relacionados con lo siguiente:",
        ],
        list: [
          "Recordatorios de citas",
          "Mensajes de seguimiento",
          "Consultas de facturación",
          "Promociones u ofertas (si corresponde)",
        ],
      },
      {
        heading: "3. Frecuencia de los Mensajes",
        paragraphs: [
          "La frecuencia de los mensajes puede variar según el tipo de comunicación. Puede recibir hasta 2 mensajes SMS por semana sobre sus citas o el estado de su cuenta.",
        ],
      },
      {
        heading: "4. Posibles Cargos por Mensajes SMS",
        paragraphs: [
          "Pueden aplicarse tarifas estándar de mensajes y datos, según el plan de su operador. Estos cargos pueden variar si el mensaje se envía dentro del país o internacionalmente.",
        ],
      },
      {
        heading: "5. Método de Suscripción",
        paragraphs: ["Puede aceptar recibir mensajes SMS de Your Cosmetic Surgery & SPA de las siguientes formas:"],
        list: ["Verbalmente, durante una conversación", "Enviando un formulario en línea"],
      },
      {
        heading: "6. Método de Cancelación",
        paragraphs: [
          "Puede dejar de recibir mensajes SMS en cualquier momento respondiendo “STOP” a cualquier SMS recibido. También puede comunicarse directamente con nosotros para solicitar que se le elimine de la lista de mensajes.",
        ],
      },
      {
        heading: "7. Ayuda",
        paragraphs: [
          `Ante cualquier problema, responda con la palabra clave HELP. También puede obtener ayuda directamente de nosotros al ${PHONE}. Si no desea recibir mensajes SMS, puede dejar sin marcar la casilla de consentimiento de SMS en los formularios.`,
        ],
      },
      {
        heading: "8. Avisos Estándar de Mensajería",
        list: [
          "Pueden aplicarse tarifas de mensajes y datos.",
          "Cancele en cualquier momento enviando “STOP”.",
          "Para obtener ayuda, envíe “HELP” o visite nuestras páginas de Política de Privacidad y Términos y Condiciones.",
          "La frecuencia de los mensajes puede variar.",
        ],
      },
    ],
  },
};

export const infoPages: InfoPage[] = [financing, outOfTown, privacy, terms];

export function getInfoPage(slug: string): InfoPage | undefined {
  return infoPages.find((p) => p.slug === slug);
}
