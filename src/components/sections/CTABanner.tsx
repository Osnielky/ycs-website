import { Play, Star } from "lucide-react";

const videos = [
  {
    id: "v1",
    tiktokId: "7642393826211925279",
    name: "Patient Story",
    procedure: "Your Cosmetic Surgery & SPA",
    rating: 5,
    quote: "Real results from a real patient.",
  },
  {
    id: "v2",
    tiktokId: "7356006842247712046",
    name: "Patient Story",
    procedure: "Your Cosmetic Surgery & SPA",
    rating: 5,
    quote: "Real results from a real patient.",
  },
  {
    id: "v3",
    tiktokId: "7403557762489257246",
    name: "Anabel — New Jersey",
    procedure: "Lipo + BBL",
    rating: 5,
    quote: "Real results from a real patient.",
  },
];

function VideoCard({ video }: { video: typeof videos[0] }) {
  return (
    <div className="flex flex-col group">
      {/* Video area — portrait 9:16 matches TikTok format */}
      <div className="relative rounded-2xl overflow-hidden aspect-[9/16] bg-navy-dark border border-white/10 group-hover:border-gold/30 transition-colors duration-300">
        {video.tiktokId ? (
          <iframe
            src={`https://www.tiktok.com/embed/v2/${video.tiktokId}`}
            allow="encrypted-media"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-dark to-navy-dark/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-white font-semibold text-sm">{video.name}</p>
              <p className="text-gold text-xs tracking-wider">{video.procedure}</p>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center bg-white/8">
                <Play size={22} className="text-white/30 fill-white/30 ml-1" />
              </div>
              <span className="text-white/30 text-[11px] tracking-widest uppercase">Coming soon</span>
            </div>
          </>
        )}
      </div>

      {/* Info below video */}
      <div className="mt-4 px-1">
        <div className="flex gap-0.5 mb-2">
          {[...Array(video.rating)].map((_, i) => (
            <Star key={i} size={12} className="fill-gold text-gold" />
          ))}
        </div>
        <p className="text-white/65 text-sm italic leading-relaxed">
          &ldquo;{video.quote}&rdquo;
        </p>
      </div>
    </div>
  );
}

export default function CTABanner() {
  return (
    <section className="py-24 bg-navy-dark relative overflow-hidden" id="patient-stories">
      <div className="absolute inset-0 hero-pattern opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="gold-divider mx-auto mb-5" />
          <h2 className="font-heading text-5xl md:text-6xl text-white font-light mb-4">
            Real Patients, Real Results
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Hear directly from the patients whose lives were transformed at
            Your Cosmetic Surgery &amp; SPA.
          </p>
        </div>

        {/* Video grid — portrait ratio for phone-recorded testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {videos.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      </div>
    </section>
  );
}
