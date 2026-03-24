import { useMemorialContent } from "@/contexts/MemorialContentContext";
import { ArrowUp, Menu, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useLayoutEffect, useState } from "react";
import { Link, useLocation } from "wouter";

interface LayoutProps {
  children: React.ReactNode;
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/biography", label: "Biography" },
  { href: "/tributes", label: "Tributes" },
  { href: "/gallery", label: "Gallery" },
  { href: "/service-details", label: "Service Details" },
  { href: "/legacy", label: "Legacy" },
  { href: "/family-message", label: "Family Message" },
];

function formatMemorialDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function Layout({ children }: LayoutProps) {
  const { memorial } = useMemorialContent();
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
      setShowBackToTop(window.scrollY > 320);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    return () => {
      if (audioElement) {
        audioElement.pause();
      }
    };
  }, [audioElement]);

  const toggleMusic = () => {
    if (!memorial?.background_audio_url) {
      return;
    }

    if (!audioElement) {
      const audio = new Audio(memorial.background_audio_url);
      audio.loop = true;
      audio.volume = 0.3;
      audio.addEventListener("play", () => setIsMusicPlaying(true));
      audio.addEventListener("pause", () => setIsMusicPlaying(false));
      audio.addEventListener("ended", () => {
        audio.currentTime = 0;
        void audio.play();
      });
      setAudioElement(audio);
      void audio.play().catch(() => {
        setIsMusicPlaying(false);
      });
      return;
    }

    if (isMusicPlaying) {
      audioElement.pause();
    } else {
      void audioElement.play().catch(() => {
        setIsMusicPlaying(false);
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground grain overflow-x-hidden">
      <div aria-hidden className="site-particles" />
      <div aria-hidden className="site-particles site-particles-secondary" />
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          isScrolled || isMobileMenuOpen
            ? "bg-card/95 backdrop-blur-md border-b border-accent/15 shadow-[0_10px_40px_rgba(0,0,0,0.28)]"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between gap-3 py-4 md:py-6">
          <Link href="/">
            <a className="text-sm sm:text-lg md:text-xl lg:text-2xl font-serif italic font-semibold text-accent hover-gold tracking-[0.04em]">
              Dcn. EO Olugbemi
            </a>
          </Link>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className={`text-sm font-medium transition-all duration-300 ${
                    location === link.href ? "text-accent" : "hover-gold"
                  }`}
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMusic}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 transition-all duration-300 ease-out disabled:opacity-50 ${
                isMusicPlaying
                  ? "border-accent/35 bg-accent/12 text-accent shadow-[0_10px_25px_rgba(212,165,116,0.18)]"
                  : "border-accent/12 bg-card/50 text-muted-foreground hover:border-accent/25 hover:bg-accent/6"
              }`}
              aria-label="Toggle background music"
              aria-pressed={isMusicPlaying}
              disabled={!memorial?.background_audio_url}
            >
              <span className="relative flex h-5 w-5 items-center justify-center">
                {isMusicPlaying ? (
                  <>
                    <span className="absolute h-2.5 w-2.5 rounded-full bg-accent/25 pulse-soft" />
                    <Volume2 className="relative z-10 h-5 w-5" />
                  </>
                ) : (
                  <VolumeX className="h-5 w-5" />
                )}
              </span>
              <span className="hidden text-[0.68rem] font-medium uppercase tracking-[0.24em] sm:inline">
                {isMusicPlaying ? "Sound On" : "Sound Off"}
              </span>
            </button>

            <button
              type="button"
              className="md:hidden p-2 rounded-lg hover:bg-accent/10 transition-all duration-300"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-accent" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen ? (
          <div className="md:hidden border-t border-accent/15 bg-card/95 backdrop-blur-md">
            <div className="container py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <a
                    className={`block rounded-lg px-3 py-3 text-sm font-medium transition-all duration-300 ${
                      location === link.href
                        ? "bg-accent/10 text-accent"
                        : "text-foreground hover:bg-accent/5 hover:text-accent"
                    }`}
                  >
                    {link.label}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </nav>

      <main className={location === "/" ? "flex-1" : "flex-1 pt-24 md:pt-28"}>{children}</main>

      {showBackToTop ? (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-accent/25 bg-card/88 text-accent shadow-[0_18px_45px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all duration-300 hover:border-accent/45 hover:bg-accent/12 hover:-translate-y-1 md:bottom-8 md:right-8"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      ) : null}

      <footer className="bg-card/60 border-t border-accent/15 mt-20">
        <div className="container py-12 md:py-16">
          <div className="text-center">
            <p className="text-lg md:text-xl font-serif text-accent mb-4">
              {memorial?.hero_quote || "Forever in our hearts"}
            </p>
            <div className="divider-gold my-6" />
            <p className="text-sm md:text-base text-muted-foreground">{memorial?.full_name || "Memorial"}</p>
            {memorial ? (
              <p className="text-sm md:text-base text-muted-foreground mt-2">
                {formatMemorialDate(memorial.birth_date)} - {formatMemorialDate(memorial.death_date)}
              </p>
            ) : null}
            {memorial?.footer_note ? (
              <p className="text-xs md:text-sm text-muted-foreground mt-6">
                © 2026 {memorial.footer_note}. All rights reserved.
              </p>
            ) : null}
          </div>
        </div>
      </footer>
    </div>
  );
}
