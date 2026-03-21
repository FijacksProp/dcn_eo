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
    <div className="min-h-screen py-20 md:py-28">
      <div className="container max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-foreground">
          {memorial.family_message.title}
        </h1>
        <div className="divider-gold w-16 mb-12" />

        <article className="prose prose-invert max-w-none fade-in-up">
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
