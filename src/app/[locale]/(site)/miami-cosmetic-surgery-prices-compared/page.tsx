import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight, Check, ExternalLink, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { alternatesFor, openGraph, ogImage, canonicalUrl } from "@/lib/seo";
import { procedures } from "@/data/procedures";
import { CHECKED_ON, clinics, comparedProcedures, type PriceRow } from "@/data/price-comparison";
import { formatDate } from "@/lib/blog";

interface Props {
  params: Promise<{ locale: string }>;
}

const PATH = "/miami-cosmetic-surgery-prices-compared";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

const copy = {
  en: {
    metaTitle: "Miami Cosmetic Surgery Prices Compared (2026)",
    metaDescription:
      "BBL, Lipo 360, tummy tuck, breast and face surgery: the prices Miami clinics publish on their own websites, side by side, with sources and what each includes.",
    home: "Home",
    crumb: "Price Comparison",
    eyebrow: "Miami Price Guide",
    title: "Miami Cosmetic Surgery Prices, Compared",
    lead: "Shopping for surgery in Miami means reading a lot of \"starting at\" prices that are hard to line up. We did the reading for you: these are the prices Miami-area clinics publish on their own websites, next to ours, with a link to every source.",
    checked: "Prices checked on",
    heroCta: "Get My Exact Quote",
    heroCall: "Call (305) 218-3513",
    readTitle: "How to Read These Tables",
    read: [
      "Every figure is quoted from the clinic's own website on the date shown. We did not use directories, forums or social media.",
      "\"From\" means the clinic's advertised starting price. It is the lowest figure a patient might be quoted, not what most patients pay.",
      "The notes say what each clinic's page states about the price. If a note is empty, the page gave no more detail.",
      "Our own row shows our published range. Your exact figure comes from a free consultation.",
    ],
    jump: "Jump to a procedure",
    pricesIn: (name: string) => `${name} Prices in Miami`,
    colClinic: "Clinic",
    colPrice: "Published price",
    colNote: "What the clinic's page says",
    colSource: "Source",
    tableCaption: (name: string) => `Published prices for ${name} at Miami-area clinics`,
    from: "From",
    average: "average",
    us: "Your Cosmetic Surgery & SPA",
    usArea: "Hialeah",
    usNote: "Our published range. Your quote explains what it covers.",
    ourPage: "Our page",
    view: "View",
    sectionCta: (name: string) => `Want a real number for your ${name}? Your consultation is free.`,
    sectionCtaButton: "Book Free Consultation",
    sectionCtaLink: (name: string) => `Read about ${name}`,
    whyTitle: "Why the Price You Are Quoted Is Rarely the Starting Price",
    why: [
      "A starting price describes the simplest version of an operation on the patient who needs the least. Most people are not that patient. The number moves with how much is treated, which technique is used, how long you are under anesthesia and whether procedures are combined.",
      "That does not make a low starting price dishonest, and it does not make a high one better. It means the published figure is where the conversation begins. The figure that matters is the quote you are given after an examination, and what that quote covers.",
    ],
    askTitle: "Six Questions That Make Two Quotes Comparable",
    askIntro: "Take these to every consultation, including ours. Two quotes can only be compared when the answers match.",
    ask: [
      "Which exact procedure and technique is this quote for?",
      "Does it cover the surgeon, the anesthesia and the facility?",
      "Are garments, medications, lab tests and follow-up visits covered, or billed separately?",
      "Who performs the surgery, and where is it performed?",
      "What happens to the price if the plan changes on the day of surgery?",
      "How long is the quote valid, and what are the deposit and cancellation terms?",
    ],
    askCta: "Bring this list to a free consultation with our team in Hialeah.",
    methodTitle: "How We Collected These Prices",
    method: [
      "We read the public website of each clinic and recorded a price only when the page stated it in text, for that clinic, for that procedure. Figures a page presented as a Miami or national average were left out, and so were prices shown only in images.",
      "Where a clinic's own pages showed different prices for the same procedure, we left that procedure out for that clinic. Clinics that publish no prices do not appear.",
      "Prices change and promotions end. Always confirm the current price with the clinic itself. If you represent a clinic listed here and a figure is out of date, email info@ycosmeticsurgery.com and we will correct it.",
      "Clinic names belong to their owners and are used only to identify them. We are not affiliated with any other clinic on this page, and nothing here is a statement about the quality of their work.",
    ],
    faqTitle: "Common Questions",
    faqs: [
      {
        q: "Which Miami clinic is the cheapest for cosmetic surgery?",
        a: "It depends on the procedure and on what the price covers. The tables on this page show the published starting prices side by side, but a starting price is not a final price. The fair comparison is between two quotes for the same procedure that cover the same things.",
      },
      {
        q: "Why are your prices shown as a range?",
        a: "Because we publish a range instead of a single starting figure. Where you land in that range depends on your surgical plan, which is set at a free consultation.",
      },
      {
        q: "Is a lower price a sign of lower quality?",
        a: "Not by itself, and a higher price is not proof of quality. Ask who performs the surgery, what their training is, where the operation takes place and who gives the anesthesia. Those answers matter more than the number.",
      },
      {
        q: "Can I finance my procedure?",
        a: "Yes, financing is available at our clinic, and our team can go over the options once you have your quote.",
      },
      {
        q: "How often is this page updated?",
        a: "The date at the top shows when every price was last checked. Prices can change at any time, so confirm the current figure with the clinic before you decide.",
      },
    ],
    finalTitle: "Ready for Your Own Number?",
    finalBody: "A published price is a starting point. In a free, private consultation you get a quote for your plan and time to ask every question on this page.",
    finalButton: "Book Free Consultation",
    disclaimer:
      "Information on this page is general and is not medical advice. Every surgical procedure carries risks, and suitability is confirmed at an in-person consultation.",
  },
  es: {
    metaTitle: "Precios de Cirugía Cosmética en Miami, Comparados (2026)",
    metaDescription:
      "BBL, Lipo 360, abdominoplastia, senos y rostro: los precios que las clínicas de Miami publican en sus sitios web, lado a lado, con fuentes y lo que incluye cada uno.",
    home: "Inicio",
    crumb: "Comparación de Precios",
    eyebrow: "Guía de Precios en Miami",
    title: "Precios de Cirugía Cosmética en Miami, Comparados",
    lead: "Buscar una cirugía en Miami significa leer muchos precios \"desde\" que son difíciles de comparar. Hicimos esa lectura por usted: estos son los precios que las clínicas del área de Miami publican en sus propios sitios web, junto a los nuestros, con un enlace a cada fuente.",
    checked: "Precios revisados el",
    heroCta: "Obtener Mi Cotización",
    heroCall: "Llamar al (305) 218-3513",
    readTitle: "Cómo Leer Estas Tablas",
    read: [
      "Cada cifra proviene del sitio web de la propia clínica en la fecha indicada. No usamos directorios, foros ni redes sociales.",
      "\"Desde\" es el precio inicial que anuncia la clínica. Es la cifra más baja que podría recibir un paciente, no lo que paga la mayoría.",
      "Las notas indican lo que la página de cada clínica dice sobre el precio. Si no hay nota, la página no daba más detalle.",
      "Nuestra fila muestra nuestro rango publicado. Su cifra exacta se define en una consulta gratuita.",
    ],
    jump: "Ir a un procedimiento",
    pricesIn: (name: string) => `Precios de ${name} en Miami`,
    colClinic: "Clínica",
    colPrice: "Precio publicado",
    colNote: "Lo que dice la página de la clínica",
    colSource: "Fuente",
    tableCaption: (name: string) => `Precios publicados de ${name} en clínicas del área de Miami`,
    from: "Desde",
    average: "promedio",
    us: "Your Cosmetic Surgery & SPA",
    usArea: "Hialeah",
    usNote: "Nuestro rango publicado. Su cotización explica lo que cubre.",
    ourPage: "Nuestra página",
    view: "Ver",
    sectionCta: (name: string) => `¿Quiere una cifra real para su ${name}? Su consulta es gratuita.`,
    sectionCtaButton: "Reservar Consulta Gratis",
    sectionCtaLink: (name: string) => `Leer sobre ${name}`,
    whyTitle: "Por Qué el Precio Que Le Cotizan Casi Nunca Es el Precio Inicial",
    why: [
      "Un precio inicial describe la versión más sencilla de una operación en el paciente que menos necesita. La mayoría de las personas no es ese paciente. La cifra cambia según cuánto se trata, qué técnica se usa, cuánto tiempo dura la anestesia y si se combinan procedimientos.",
      "Eso no hace deshonesto un precio inicial bajo, ni mejor uno alto. Significa que la cifra publicada es donde comienza la conversación. La cifra que importa es la cotización que recibe después de un examen, y lo que esa cotización cubre.",
    ],
    askTitle: "Seis Preguntas Para Comparar Dos Cotizaciones",
    askIntro: "Llévelas a cada consulta, incluida la nuestra. Dos cotizaciones solo se pueden comparar cuando las respuestas coinciden.",
    ask: [
      "¿Para qué procedimiento y técnica exactos es esta cotización?",
      "¿Cubre al cirujano, la anestesia y la instalación?",
      "¿Las fajas, los medicamentos, los análisis y las visitas de seguimiento están cubiertos o se cobran aparte?",
      "¿Quién realiza la cirugía y dónde se realiza?",
      "¿Qué pasa con el precio si el plan cambia el día de la cirugía?",
      "¿Por cuánto tiempo es válida la cotización y cuáles son las condiciones de depósito y cancelación?",
    ],
    askCta: "Traiga esta lista a una consulta gratuita con nuestro equipo en Hialeah.",
    methodTitle: "Cómo Reunimos Estos Precios",
    method: [
      "Leímos el sitio web público de cada clínica y registramos un precio solo cuando la página lo indicaba en texto, para esa clínica y para ese procedimiento. Dejamos fuera las cifras que una página presentaba como promedio de Miami o nacional, y también los precios que aparecían solo en imágenes.",
      "Cuando las páginas de una misma clínica mostraban precios distintos para el mismo procedimiento, omitimos ese procedimiento para esa clínica. Las clínicas que no publican precios no aparecen.",
      "Los precios cambian y las promociones terminan. Confirme siempre el precio actual con la propia clínica. Si usted representa a una clínica de esta lista y una cifra está desactualizada, escriba a info@ycosmeticsurgery.com y la corregiremos.",
      "Los nombres de las clínicas pertenecen a sus dueños y se usan solo para identificarlas. No tenemos relación con ninguna otra clínica de esta página, y nada de lo aquí publicado es una opinión sobre la calidad de su trabajo.",
    ],
    faqTitle: "Preguntas Frecuentes",
    faqs: [
      {
        q: "¿Cuál es la clínica más económica de Miami para cirugía cosmética?",
        a: "Depende del procedimiento y de lo que cubre el precio. Las tablas de esta página muestran lado a lado los precios iniciales publicados, pero un precio inicial no es un precio final. La comparación justa es entre dos cotizaciones por el mismo procedimiento que cubran lo mismo.",
      },
      {
        q: "¿Por qué sus precios aparecen como un rango?",
        a: "Porque publicamos un rango en lugar de una sola cifra inicial. El punto del rango que le corresponde depende de su plan quirúrgico, que se define en una consulta gratuita.",
      },
      {
        q: "¿Un precio más bajo significa menor calidad?",
        a: "No por sí solo, y un precio más alto tampoco es prueba de calidad. Pregunte quién realiza la cirugía, cuál es su formación, dónde se hace la operación y quién administra la anestesia. Esas respuestas importan más que la cifra.",
      },
      {
        q: "¿Puedo financiar mi procedimiento?",
        a: "Sí, en nuestra clínica hay financiamiento disponible y nuestro equipo puede explicarle las opciones cuando tenga su cotización.",
      },
      {
        q: "¿Con qué frecuencia se actualiza esta página?",
        a: "La fecha al inicio indica cuándo se revisó cada precio por última vez. Los precios pueden cambiar en cualquier momento, así que confirme la cifra actual con la clínica antes de decidir.",
      },
    ],
    finalTitle: "¿Listo Para Conocer Su Propia Cifra?",
    finalBody: "Un precio publicado es un punto de partida. En una consulta gratuita y privada recibe una cotización para su plan y tiempo para hacer todas las preguntas de esta página.",
    finalButton: "Reservar Consulta Gratis",
    disclaimer:
      "La información de esta página es general y no constituye un consejo médico. Todo procedimiento quirúrgico conlleva riesgos y la idoneidad se confirma en una consulta en persona.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = locale === "es" ? copy.es : copy.en;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: alternatesFor(PATH, locale),
    openGraph: openGraph({
      path: PATH,
      locale,
      title: `${c.metaTitle} | Your Cosmetic Surgery & SPA`,
      description: c.metaDescription,
      image: ogImage(c.title),
    }),
  };
}

function priceLabel(row: PriceRow, c: (typeof copy)["en"] | (typeof copy)["es"]): string {
  if (row.kind === "range" && row.high) return `${usd(row.low)} – ${usd(row.high)}`;
  if (row.kind === "average") return `${usd(row.low)} (${c.average})`;
  return `${c.from} ${usd(row.low)}`;
}

export default async function PriceComparisonPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale === "es" ? "es" : "en";
  const c = copy[lang];
  const url = canonicalUrl(PATH, locale);
  const checked = formatDate(CHECKED_ON, locale);

  const sections = comparedProcedures.flatMap((cp) => {
    const proc = procedures.find((p) => p.slug === cp.slug);
    if (!proc?.priceRange) return [];
    return [{ ...cp, name: (lang === "es" && proc.es?.name) || proc.name, ours: proc.priceRange }];
  });

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: c.metaTitle,
      description: c.metaDescription,
      inLanguage: lang,
      dateModified: CHECKED_ON,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: c.home, item: canonicalUrl("", locale) },
        { "@type": "ListItem", position: 2, name: c.crumb, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: c.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  const primaryBtn =
    "inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-navy-dark font-semibold text-sm tracking-[0.12em] uppercase px-7 py-3.5 rounded-full transition-colors";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative bg-navy pt-36 pb-16 md:pb-20 overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 hero-pattern opacity-40" />
        <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-white/65 text-xs tracking-wider mb-6">
            <Link href="/" className="hover:text-gold transition-colors">{c.home}</Link>
            <span aria-hidden="true">/</span>
            <span className="text-gold">{c.crumb}</span>
          </nav>
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">{c.eyebrow}</p>
          <h1 className="font-heading text-5xl md:text-6xl text-white font-light leading-tight mb-6 text-balance">{c.title}</h1>
          <p className="text-white/75 text-lg leading-relaxed mb-4">{c.lead}</p>
          <p className="text-white/65 text-sm mb-8">
            {c.checked} <time dateTime={CHECKED_ON}>{checked}</time>
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Link href="/contact" className={primaryBtn}>
              {c.heroCta} <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <a href="tel:+13052183513" className="inline-flex items-center gap-2 text-white hover:text-gold text-sm tracking-wider transition-colors">
              <Phone size={15} aria-hidden="true" /> {c.heroCall}
            </a>
          </div>
        </div>
      </section>

      <div className="bg-cream">
        <div className="max-w-4xl mx-auto px-6 py-14 md:py-20">
          {/* How to read */}
          <aside className="bg-white border border-cream-dark border-l-4 border-l-gold rounded-xl p-6 md:p-7 mb-10">
            <h2 className="text-gold-deep text-xs tracking-[0.3em] uppercase font-semibold mb-4">{c.readTitle}</h2>
            <ul className="space-y-3">
              {c.read.map((item) => (
                <li key={item} className="flex items-start gap-3 text-navy/80 leading-relaxed">
                  <Check size={18} aria-hidden="true" className="text-gold-deep mt-1 shrink-0" />
                  <span className="min-w-0 break-words">{item}</span>
                </li>
              ))}
            </ul>
          </aside>

          {/* Jump links */}
          <nav aria-label={c.jump} className="mb-14">
            <p className="text-navy/65 text-xs tracking-[0.25em] uppercase mb-3">{c.jump}</p>
            <ul className="flex flex-wrap gap-2.5">
              {sections.map((s) => (
                <li key={s.slug}>
                  <a
                    href={`#${s.slug}`}
                    className="inline-flex bg-white border border-cream-dark hover:border-gold text-navy text-sm px-4 py-2 rounded-full transition-colors"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Per-procedure tables */}
          <div className="space-y-16">
            {sections.map((s) => (
              <section key={s.slug} id={s.slug} className="scroll-mt-28">
                <span className="gold-divider mb-4" />
                <h2 className="font-heading text-3xl md:text-4xl text-navy font-light mb-4 text-balance">{c.pricesIn(s.name)}</h2>
                <p className="text-navy/75 leading-relaxed mb-6">{s.summary[lang]}</p>

                <div
                  className="overflow-x-auto rounded-xl border border-cream-dark bg-white"
                  role="region"
                  aria-label={c.tableCaption(s.name)}
                  tabIndex={0}
                >
                  <table className="w-full min-w-[40rem] text-left text-sm">
                    <caption className="sr-only">{c.tableCaption(s.name)}</caption>
                    <thead>
                      <tr className="bg-navy text-white">
                        <th scope="col" className="px-4 py-3 font-semibold">{c.colClinic}</th>
                        <th scope="col" className="px-4 py-3 font-semibold">{c.colPrice}</th>
                        <th scope="col" className="px-4 py-3 font-semibold">{c.colNote}</th>
                        <th scope="col" className="px-4 py-3 font-semibold">{c.colSource}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="align-top bg-gold/10">
                        <th scope="row" className="px-4 py-4 font-semibold text-navy">
                          {c.us}
                          <span className="block text-navy/60 text-xs font-normal mt-0.5">{c.usArea}</span>
                        </th>
                        <td className="px-4 py-4 text-navy font-semibold tabular-nums whitespace-nowrap">
                          {usd(s.ours.min)} – {usd(s.ours.max)}
                        </td>
                        <td className="px-4 py-4 text-navy/75 leading-relaxed">{c.usNote}</td>
                        <td className="px-4 py-4">
                          <Link href={`/procedures/${s.slug}`} className="text-navy underline underline-offset-4 decoration-gold hover:text-gold-deep transition-colors">
                            {c.ourPage}
                          </Link>
                        </td>
                      </tr>
                      {s.rows.map((row) => {
                        const clinic = clinics[row.clinic];
                        return (
                          <tr key={row.clinic} className="border-t border-cream-dark align-top">
                            <th scope="row" className="px-4 py-4 font-semibold text-navy">
                              {clinic.name}
                              <span className="block text-navy/60 text-xs font-normal mt-0.5">{clinic.area}</span>
                            </th>
                            <td className="px-4 py-4 text-navy tabular-nums whitespace-nowrap">{priceLabel(row, c)}</td>
                            <td className="px-4 py-4 text-navy/75 leading-relaxed">{row.note ? row.note[lang] : "–"}</td>
                            <td className="px-4 py-4">
                              <a
                                href={row.source}
                                target="_blank"
                                rel="nofollow noopener noreferrer"
                                className="inline-flex items-center gap-1 text-navy underline underline-offset-4 decoration-gold hover:text-gold-deep transition-colors"
                                aria-label={`${c.colSource}: ${clinic.name}`}
                              >
                                {c.view} <ExternalLink size={13} aria-hidden="true" />
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 bg-navy rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                  <p className="text-white text-lg font-heading leading-snug">{c.sectionCta(s.name)}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 shrink-0">
                    <Link href="/contact" className={primaryBtn}>{c.sectionCtaButton}</Link>
                    <Link href={`/procedures/${s.slug}`} className="inline-flex items-center gap-1.5 text-gold-light hover:text-gold text-sm underline underline-offset-4 transition-colors">
                      {c.sectionCtaLink(s.name)} <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* Why prices differ */}
          <section className="mt-20">
            <span className="gold-divider mb-4" />
            <h2 className="font-heading text-3xl md:text-4xl text-navy font-light mb-4 text-balance">{c.whyTitle}</h2>
            {c.why.map((p) => (
              <p key={p} className="text-navy/75 leading-relaxed mb-4">{p}</p>
            ))}
          </section>

          {/* Questions to ask */}
          <section className="mt-14">
            <span className="gold-divider mb-4" />
            <h2 className="font-heading text-3xl md:text-4xl text-navy font-light mb-4 text-balance">{c.askTitle}</h2>
            <p className="text-navy/75 leading-relaxed mb-5">{c.askIntro}</p>
            <ol className="space-y-3 mb-7">
              {c.ask.map((q, i) => (
                <li key={q} className="flex items-start gap-4 bg-white border border-cream-dark rounded-xl p-4 text-navy/85 leading-relaxed">
                  <span aria-hidden="true" className="font-heading text-2xl text-gold-deep leading-none tabular-nums mt-0.5">{i + 1}</span>
                  <span className="min-w-0 break-words">{q}</span>
                </li>
              ))}
            </ol>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-white text-sm font-semibold tracking-[0.12em] uppercase px-7 py-3.5 rounded-full transition-colors"
              >
                {c.sectionCtaButton}
              </Link>
              <p className="text-navy/70 text-sm">{c.askCta}</p>
            </div>
          </section>

          {/* Method */}
          <section className="mt-14">
            <span className="gold-divider mb-4" />
            <h2 className="font-heading text-3xl md:text-4xl text-navy font-light mb-4">{c.methodTitle}</h2>
            {c.method.map((p) => (
              <p key={p} className="text-navy/75 leading-relaxed mb-4">{p}</p>
            ))}
          </section>

          {/* FAQs */}
          <section className="mt-14">
            <span className="gold-divider mb-4" />
            <h2 className="font-heading text-3xl md:text-4xl text-navy font-light mb-6">{c.faqTitle}</h2>
            <div className="space-y-3">
              {c.faqs.map((f) => (
                <details key={f.q} className="group bg-white rounded-xl border border-cream-dark">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 text-navy font-medium">
                    {f.q}
                    <span aria-hidden="true" className="text-gold-deep text-xl leading-none transition-transform group-open:rotate-45 motion-reduce:transition-none">+</span>
                  </summary>
                  <p className="px-5 pb-5 text-navy/75 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          <p className="mt-12 pt-6 border-t border-cream-dark text-navy/65 text-sm leading-relaxed">{c.disclaimer}</p>
        </div>
      </div>

      {/* Final call to action */}
      <section className="py-16 bg-navy relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 hero-pattern opacity-30" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <span className="gold-divider mx-auto mb-5" />
          <h2 className="font-heading text-4xl md:text-5xl text-white font-light mb-3 text-balance">{c.finalTitle}</h2>
          <p className="text-white/70 mb-8">{c.finalBody}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className={primaryBtn.replace("px-7 py-3.5", "px-8 py-4")}>{c.finalButton}</Link>
            <a href="tel:+13052183513" className="inline-flex items-center gap-2 text-white hover:text-gold text-sm tracking-wider transition-colors">
              <Phone size={15} aria-hidden="true" /> {c.heroCall}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
