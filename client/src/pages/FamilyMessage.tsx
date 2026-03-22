import PageState from "@/components/PageState";
import { useMemorialContent } from "@/contexts/MemorialContentContext";
import { HeartHandshake, ScrollText } from "lucide-react";

export default function FamilyMessage() {
  const { memorial, isLoading, error } = useMemorialContent();

  if (isLoading) {
    return <PageState title="Loading Family Message" message="Fetching the family's tribute and message." />;
  }

  if (error || !memorial?.family_message) {
    return (
      <PageState
        title="Family Message Unavailable"
        message={error || "The family message could not be loaded."}
      />
    );
  }

  return (
    <div className="min-h-screen pb-20 md:pb-28">
      <div className="container max-w-5xl">
        <div className="mb-14 md:mb-16">
          <p className="text-[0.7rem] sm:text-xs uppercase tracking-[0.35em] text-accent/85 mb-4">Family Message</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-foreground">
            {memorial.family_message.title}
          </h1>
          <div className="divider-gold w-20 mb-6" />
          <p className="max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed">
            A note of gratitude, remembrance, and heartfelt appreciation from the family he loved and served so deeply.
          </p>
        </div>

        <article className="fade-in-up card-memorial">
          <div className="mb-10 flex flex-col gap-5 rounded-[2rem] border border-accent/12 bg-card/45 px-6 py-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative flex h-14 w-14 items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-accent/18 bg-accent/10" />
                <div className="absolute inset-2 rounded-full border border-accent/12 bg-background/70" />
                <HeartHandshake className="relative z-10 h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-accent/85 mb-2">From the Family</p>
                <p className="text-lg md:text-xl font-serif text-foreground">With gratitude for every prayer, tribute, and act of love</p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-accent/12 bg-background/55 px-4 py-2 text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground">
              <ScrollText className="h-3.5 w-3.5 text-accent" />
              <span>Appreciation</span>
            </div>
          </div>

          <div className="space-y-6">
            {memorial.family_message.body.split("\n\n").map((paragraph, index) => (
              <div
                key={index}
                className={`rounded-[1.75rem] border px-6 py-6 ${
                  index === 0
                    ? "border-accent/18 bg-background/55"
                    : "border-accent/10 bg-card/55"
                }`}
              >
                <p className="text-base md:text-lg text-foreground leading-8">{paragraph}</p>
              </div>
            ))}
          </div>

          <div className="divider-gold my-12" />

          <div className="text-center">
            <p className="text-lg md:text-xl font-serif text-accent italic mb-4">
              With love and eternal gratitude
            </p>
            <p className="text-base text-muted-foreground">{memorial.family_message.signature}</p>
          </div>
        </article>
      </div>
    </div>
  );
}
