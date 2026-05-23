import { ShieldCheck, Award, Users, HeartHandshake } from "lucide-react";

const credentials = [
  {
    icon: ShieldCheck,
    title: "Board Certified",
    desc: "American Board of Plastic Surgery (ABPS) certified surgeons with subspecialty training in aesthetic procedures.",
  },
  {
    icon: Award,
    title: "Accredited Facility",
    desc: "Our surgical center is AAAHC-accredited, meeting the highest standards for patient safety and care quality.",
  },
  {
    icon: Users,
    title: "ASPS Members",
    desc: "Active members of the American Society of Plastic Surgeons, committed to ethical practice and continuing education.",
  },
  {
    icon: HeartHandshake,
    title: "Lifetime Care",
    desc: "We don't just perform surgery — we build relationships. 24/7 support and comprehensive follow-up care included.",
  },
];

const mediaLogos = [
  { name: "Vogue", style: "font-heading text-lg italic" },
  { name: "Harper's Bazaar", style: "font-sans text-xs tracking-widest uppercase" },
  { name: "Allure", style: "font-heading text-lg" },
  { name: "People", style: "font-sans text-sm font-bold" },
  { name: "RealSelf", style: "font-sans text-sm tracking-wider" },
];

const ratings = [
  { platform: "Google", score: "4.9", reviews: "312 reviews" },
  { platform: "RealSelf", score: "4.8", reviews: "180 reviews" },
  { platform: "Healthgrades", score: "5.0", reviews: "94 reviews" },
  { platform: "Vitals", score: "4.9", reviews: "67 reviews" },
];

export default function TrustSignals() {
  return (
    <section className="py-24 bg-cream-dark" id="trust">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="gold-divider mx-auto mb-5" />
          <h2 className="font-heading text-5xl md:text-6xl text-navy font-light mb-4">
            Why Miami Chooses Us
          </h2>
          <p className="text-navy/55 text-lg max-w-2xl mx-auto">
            Board-certified surgeons with 20+ years of experience, an
            accredited facility in Hialeah, and an unwavering commitment to
            natural, beautiful results across South Florida.
          </p>
        </div>

        {/* Credentials grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {credentials.map((cred) => (
            <div
              key={cred.title}
              className="bg-white rounded-2xl p-7 border border-cream-dark card-hover"
            >
              <div className="w-12 h-12 bg-navy/8 rounded-xl flex items-center justify-center mb-5">
                <cred.icon size={22} className="text-gold" />
              </div>
              <h3 className="font-heading text-navy text-xl mb-2 font-semibold">
                {cred.title}
              </h3>
              <p className="text-navy/55 text-sm leading-relaxed">{cred.desc}</p>
            </div>
          ))}
        </div>

        {/* Rating badges */}
        <div className="bg-white rounded-2xl p-8 border border-cream-dark mb-10">
          <p className="text-center text-navy/40 text-xs tracking-widest uppercase mb-6">
            Patient Satisfaction Ratings
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {ratings.map((r) => (
              <div key={r.platform} className="text-center">
                <div className="font-heading text-3xl text-navy mb-1">
                  {r.score}
                  <span className="text-gold text-xl">/5</span>
                </div>
                <div className="flex justify-center gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-3 h-3 fill-gold text-gold"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-navy font-semibold text-sm">{r.platform}</p>
                <p className="text-navy/40 text-xs">{r.reviews}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Surgeon spotlight */}
        <div className="bg-navy rounded-2xl p-8 text-white mb-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-navy-light to-navy border-2 border-gold flex items-center justify-center shrink-0 text-gold font-heading text-3xl">
            MR
          </div>
          <div className="text-center md:text-left">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-1">Lead Surgeon</p>
            <h3 className="font-heading text-3xl text-white mb-1">Dr. Mario Reyes-Serrano</h3>
            <p className="text-white/55 text-sm mb-3">Board-Certified Plastic Surgeon · 20+ Years of Experience</p>
            <p className="text-white/45 text-sm leading-relaxed max-w-2xl">
              One of South Florida&apos;s most trusted cosmetic surgeons, Dr. Reyes-Serrano
              brings over two decades of expertise to every procedure. His philosophy
              centers on natural results tailored to each patient&apos;s unique anatomy and goals.
            </p>
          </div>
        </div>

        {/* As seen in */}
        <div className="text-center">
          <p className="text-navy/35 text-xs tracking-widest uppercase mb-6">
            Featured In
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {mediaLogos.map((logo) => (
              <span
                key={logo.name}
                className={`${logo.style} text-navy/30 hover:text-navy/60 transition-colors cursor-default`}
              >
                {logo.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
