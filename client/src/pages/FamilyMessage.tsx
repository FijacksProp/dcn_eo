import PageState from "@/components/PageState";
import { useMemorialContent } from "@/contexts/MemorialContentContext";

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
      <div className="container max-w-3xl">
        <div className="mb-14 md:mb-16">
          <p className="text-[0.7rem] sm:text-xs uppercase tracking-[0.35em] text-accent/85 mb-4">Family Message</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-foreground">
            {memorial.family_message.title}
          </h1>
          <div className="divider-gold w-20 mb-6" />
        </div>

        <article className="prose prose-invert max-w-none fade-in-up card-memorial">
          {memorial.family_message.body.split("\n\n").map((paragraph, index) => (
            <p key={index} className="text-base md:text-lg text-foreground leading-relaxed mb-8">
              {paragraph}
            </p>
          ))}

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
