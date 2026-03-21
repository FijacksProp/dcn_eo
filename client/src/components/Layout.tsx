import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Music, X } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMusic = () => {
    if (!audioElement) {
      // Create audio element on first click
      const audio = new Audio(
        "https://assets.mixkit.co/active_storage/sfx/2806/2806-preview.mp3"
      );
      audio.loop = true;
      audio.volume = 0.3;
      setAudioElement(audio);
      audio.play();
      setIsMusicPlaying(true);
    } else {
      if (isMusicPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground grain">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          isScrolled
            ? "bg-card bg-opacity-95 backdrop-blur-md border-b border-accent border-opacity-15"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between py-4 md:py-6">
          <Link href="/">
            <a className="text-2xl md:text-3xl font-serif font-bold text-accent hover-gold">
              Olugbemi
            </a>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/biography">
              <a className="text-sm font-medium hover-gold">
                Biography
              </a>
            </Link>
            <Link href="/tributes">
              <a className="text-sm font-medium hover-gold">
                Tributes
              </a>
            </Link>
            <Link href="/gallery">
              <a className="text-sm font-medium hover-gold">
                Gallery
              </a>
            </Link>
            <Link href="/service-details">
              <a className="text-sm font-medium hover-gold">
                Service Details
              </a>
            </Link>
            <Link href="/legacy">
              <a className="text-sm font-medium hover-gold">
                Legacy
              </a>
            </Link>
          </div>

          {/* Music Toggle */}
          <button
            onClick={toggleMusic}
            className="p-2 rounded-lg hover:bg-accent hover:bg-opacity-10 transition-all duration-300 ease-out"
            aria-label="Toggle background music"
          >
            {isMusicPlaying ? (
              <Music className="w-5 h-5 text-accent" />
            ) : (
              <Music className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden bg-card bg-opacity-95 border-t border-accent border-opacity-15 px-4 py-4 space-y-3">
          <Link href="/biography">
            <a className="block text-sm font-medium hover-gold py-2">
              Biography
            </a>
          </Link>
          <Link href="/tributes">
            <a className="block text-sm font-medium hover-gold py-2">
              Tributes
            </a>
          </Link>
          <Link href="/gallery">
            <a className="block text-sm font-medium hover-gold py-2">
              Gallery
            </a>
          </Link>
          <Link href="/service-details">
            <a className="block text-sm font-medium hover-gold py-2">
              Service Details
            </a>
          </Link>
          <Link href="/legacy">
            <a className="block text-sm font-medium hover-gold py-2">
              Legacy
            </a>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 pt-20 md:pt-24">{children}</main>

      {/* Footer */}
      <footer className="bg-card bg-opacity-50 border-t border-accent border-opacity-15 mt-20">
        <div className="container py-12 md:py-16">
          <div className="text-center">
            <p className="text-lg md:text-xl font-serif text-accent mb-4">
              Forever in our hearts
            </p>
            <div className="divider-gold my-6" />
            <p className="text-sm md:text-base text-muted-foreground">
              Dcn. Olugbenga Eyitayo Olugbemi
            </p>
            <p className="text-sm md:text-base text-muted-foreground mt-2">
              June 4, 1970 – March 14, 2026
            </p>
            <p className="text-xs md:text-sm text-muted-foreground mt-6">
              © 2026 The Olugbemi Family. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
