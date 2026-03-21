import PageState from "@/components/PageState";
import { useMemorialContent } from "@/contexts/MemorialContentContext";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";

function formatMemorialDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const quickLinks = [
  {
    href: "/biography",
    title: "Biography",
    description: "Discover his journey through early life, education, career, and spiritual growth.",
  },
  {
    href: "/tributes",
    title: "Tributes",
    description: "Read heartfelt messages and condolences from family, friends, and loved ones.",
  },
  {
    href: "/gallery",
    title: "Gallery",
    description: "Browse cherished photos from family, work, church, and life moments.",
  },
  {
    href: "/service-details",
    title: "Service Details",
    description: "Information about the wake keep, burial, and service arrangements.",
  },
  {
    href: "/legacy",
    title: "Legacy",
    description: "His values of faith, service, and mentorship live on through us.",
  },
  {
    href: "/family-message",
    title: "Family Message",
    description: "A personal tribute from his children and family.",
  },
];

export default function Home() {
  const { memorial, isLoading, error } = useMemorialContent();
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) {
    return <PageState title="Loading Memorial" message="Fetching the memorial profile and homepage content." />;
  }

  if (error || !memorial) {
    return <PageState title="Content Unavailable" message={error || "Memorial content could not be loaded."} />;
  }

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden px-0 pt-0 pb-16 md:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,165,116,0.14),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(245,241,232,0.08),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_22%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-accent/8 to-transparent" />

        <div className="relative z-10 container">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:gap-14 min-h-screen pt-24 md:pt-28">
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <p className="text-[0.7rem] sm:text-xs uppercase tracking-[0.45em] text-accent/85 mb-5">
                A Memorial of Faith, Service, and Presence
              </p>

              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-serif font-bold text-foreground leading-[1.05] mb-5">
                {memorial.full_name}
              </h1>

              <div className="flex flex-col gap-3 lg:gap-4 mb-6">
                <p className="text-base sm:text-lg md:text-xl text-accent font-serif tracking-[0.12em] uppercase">
                  {formatMemorialDate(memorial.birth_date)} - {formatMemorialDate(memorial.death_date)}
                </p>
                <p className="text-xl sm:text-2xl md:text-3xl text-foreground/90 font-serif italic max-w-3xl mx-auto lg:mx-0">
                  "{memorial.hero_title}"
                </p>
              </div>

              <div className="w-20 h-px bg-accent/40 mx-auto lg:mx-0 mb-8" />

              <div className="max-w-3xl mx-auto lg:mx-0 space-y-5">
                <p className="text-base sm:text-lg md:text-xl text-foreground/95 leading-8">
                  {memorial.hero_summary}
                </p>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-8">
                  His memory is not held only in dates or ceremony, but in the lives he steadied,
                  the prayers he carried, and the warmth he brought into every room he entered.
                </p>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/biography">
                  <a className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:opacity-90">
                    Read His Story
                  </a>
                </Link>
                <Link href="/service-details">
                  <a className="inline-flex items-center justify-center rounded-full border border-accent/30 bg-card/50 px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:border-accent/60 hover:text-accent">
                    View Service Details
                  </a>
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative max-w-md sm:max-w-lg lg:max-w-none mx-auto">
              <div className="relative">
                <div className="absolute -inset-6 rounded-[2rem] border border-accent/10 bg-gradient-to-br from-accent/10 via-transparent to-card/70 blur-sm" />
                <div className="absolute -left-6 top-8 hidden md:block w-24 lg:w-32 h-px bg-accent/40" />
                <div className="absolute -right-4 bottom-14 hidden md:block w-20 h-20 rounded-full border border-accent/20" />

                <div className="relative bg-card/80 border border-accent/20 rounded-[2rem] p-4 md:p-5 shadow-[0_24px_90px_rgba(0,0,0,0.38)]">
                  <div className="relative overflow-hidden rounded-[1.5rem] aspect-[4/5]">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-transparent z-10" />
                    <img
                      src={memorial.portrait_image_url}
                      alt={memorial.full_name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="absolute left-0 bottom-10 md:-left-16 md:bottom-16 max-w-[15rem] md:max-w-xs rounded-2xl border border-accent/20 bg-background/88 backdrop-blur-md px-4 py-4 shadow-[0_12px_35px_rgba(0,0,0,0.32)]">
                    <p className="text-[0.65rem] uppercase tracking-[0.35em] text-accent/80 mb-2">Remembered For</p>
                    <p className="text-sm md:text-base text-foreground leading-7">
                      Quiet strength, wise counsel, steadfast faith, and a life poured into family,
                      church, and community.
                    </p>
                  </div>

                  <div className="absolute right-0 -bottom-8 md:right-6 md:-bottom-10 rounded-2xl border border-accent/20 bg-card/92 backdrop-blur-md px-4 py-3 shadow-[0_12px_35px_rgba(0,0,0,0.32)]">
                    <p className="text-[0.65rem] uppercase tracking-[0.35em] text-accent/80 mb-1">Legacy</p>
                    <p className="text-sm md:text-base font-serif text-foreground">Forever in our hearts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {showScroll ? (
            <div className="mt-8 flex justify-center">
              <div className="flex flex-col items-center gap-2 text-accent/80">
                <span className="text-[0.7rem] uppercase tracking-[0.35em] text-muted-foreground">
                  Scroll to Continue
                </span>
                <ChevronDown className="w-7 h-7 pulse-soft" />
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="py-20 md:py-28 bg-card/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-14 md:mb-16">
            <p className="text-[0.7rem] sm:text-xs uppercase tracking-[0.4em] text-accent/85 mb-4">
              Continue Through His Story
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Explore the Life He Lived and the Memory He Leaves
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
              Each section of this memorial gathers a different part of his presence: his journey,
              his service, the people he loved, and the legacy that remains with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {quickLinks.map((link, index) => (
              <Link key={link.href} href={link.href}>
                <a
                  className="card-memorial group cursor-pointer relative overflow-hidden"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-accent/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <div className="h-24 bg-gradient-to-br from-accent/20 via-accent/5 to-transparent rounded-xl mb-6 transition-all duration-300 group-hover:from-accent/25 group-hover:via-accent/10" />
                  <h3 className="text-2xl font-serif font-bold mb-3 group-hover:text-accent transition-all duration-300 ease-out">
                    {link.title}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-all duration-300 ease-out">
                    {link.description}
                  </p>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
