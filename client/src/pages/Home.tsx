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
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card opacity-50" />

        <div className="relative z-10 container flex flex-col items-center text-center px-4 py-20">
          <div className="mb-12 md:mb-16">
            <div className="relative w-64 h-80 md:w-80 md:h-96 mx-auto">
              <div className="absolute inset-0 rounded-lg glow-soft" />
              <div className="relative w-full h-full rounded-lg overflow-hidden border border-accent border-opacity-20">
                <img
                  src={memorial.portrait_image_url}
                  alt={memorial.full_name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 text-foreground">
            {memorial.full_name}
          </h1>

          <p className="text-lg md:text-2xl text-accent font-serif mb-8">
            {formatMemorialDate(memorial.birth_date)} - {formatMemorialDate(memorial.death_date)}
          </p>

          <p className="text-xl md:text-2xl text-muted-foreground font-serif italic mb-12 max-w-2xl">
            "{memorial.hero_title}"
          </p>

          <div className="divider-gold w-16 mb-12" />

          <p className="text-base md:text-lg text-foreground leading-relaxed max-w-3xl mb-16">
            {memorial.hero_summary}
          </p>

          {showScroll ? (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <ChevronDown className="w-8 h-8 text-accent pulse-soft" />
            </div>
          ) : null}
        </div>
      </section>

      <section className="py-20 md:py-28 bg-card bg-opacity-30">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-16 text-foreground">
            Explore His Life
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Link href="/biography">
              <a className="card-memorial group cursor-pointer">
                <div className="h-32 bg-gradient-to-br from-accent from-10% to-transparent opacity-20 rounded-lg mb-6 group-hover:opacity-30 transition-all duration-300 ease-out" />
                <h3 className="text-2xl font-serif font-bold mb-3 group-hover:text-accent transition-all duration-300 ease-out">
                  Biography
                </h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-all duration-300 ease-out">
                  Discover his journey through early life, education, career, and spiritual growth.
                </p>
              </a>
            </Link>

            <Link href="/tributes">
              <a className="card-memorial group cursor-pointer">
                <div className="h-32 bg-gradient-to-br from-accent from-10% to-transparent opacity-20 rounded-lg mb-6 group-hover:opacity-30 transition-all duration-300 ease-out" />
                <h3 className="text-2xl font-serif font-bold mb-3 group-hover:text-accent transition-all duration-300 ease-out">
                  Tributes
                </h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-all duration-300 ease-out">
                  Read heartfelt messages and condolences from family, friends, and loved ones.
                </p>
              </a>
            </Link>

            <Link href="/gallery">
              <a className="card-memorial group cursor-pointer">
                <div className="h-32 bg-gradient-to-br from-accent from-10% to-transparent opacity-20 rounded-lg mb-6 group-hover:opacity-30 transition-all duration-300 ease-out" />
                <h3 className="text-2xl font-serif font-bold mb-3 group-hover:text-accent transition-all duration-300 ease-out">
                  Gallery
                </h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-all duration-300 ease-out">
                  Browse cherished photos from family, work, church, and life moments.
                </p>
              </a>
            </Link>

            <Link href="/service-details">
              <a className="card-memorial group cursor-pointer">
                <div className="h-32 bg-gradient-to-br from-accent from-10% to-transparent opacity-20 rounded-lg mb-6 group-hover:opacity-30 transition-all duration-300 ease-out" />
                <h3 className="text-2xl font-serif font-bold mb-3 group-hover:text-accent transition-all duration-300 ease-out">
                  Service Details
                </h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-all duration-300 ease-out">
                  Information about the wake keep, burial, and service arrangements.
                </p>
              </a>
            </Link>

            <Link href="/legacy">
              <a className="card-memorial group cursor-pointer">
                <div className="h-32 bg-gradient-to-br from-accent from-10% to-transparent opacity-20 rounded-lg mb-6 group-hover:opacity-30 transition-all duration-300 ease-out" />
                <h3 className="text-2xl font-serif font-bold mb-3 group-hover:text-accent transition-all duration-300 ease-out">
                  Legacy
                </h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-all duration-300 ease-out">
                  His values of faith, service, and mentorship live on through us.
                </p>
              </a>
            </Link>

            <Link href="/family-message">
              <a className="card-memorial group cursor-pointer">
                <div className="h-32 bg-gradient-to-br from-accent from-10% to-transparent opacity-20 rounded-lg mb-6 group-hover:opacity-30 transition-all duration-300 ease-out" />
                <h3 className="text-2xl font-serif font-bold mb-3 group-hover:text-accent transition-all duration-300 ease-out">
                  Family Message
                </h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-all duration-300 ease-out">
                  A personal tribute from his children and family.
                </p>
              </a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
