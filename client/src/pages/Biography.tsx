import PageState from "@/components/PageState";
import { useMemorialContent } from "@/contexts/MemorialContentContext";

export default function Biography() {
  const { memorial, isLoading, error } = useMemorialContent();

  if (isLoading) {
    return <PageState title="Loading Biography" message="Fetching biography sections from the memorial archive." />;
  }

  if (error || !memorial) {
    return <PageState title="Biography Unavailable" message={error || "Biography content could not be loaded."} />;
  }

  return (
    <div className="min-h-screen pb-20 md:pb-28">
      <div className="container max-w-4xl">
        <div className="mb-14 md:mb-16">
          <p className="text-[0.7rem] sm:text-xs uppercase tracking-[0.35em] text-accent/85 mb-4">Biography</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-foreground">The Story of His Life</h1>
          <div className="divider-gold w-20 mb-6" />
          <p className="max-w-3xl text-muted-foreground">
            A life remembered through the values, seasons, and relationships that shaped the man we honor.
          </p>
        </div>

        {memorial.biography_sections.map((section, index) => (
          <div key={section.id}>
            <section
              className="mb-16 md:mb-20 fade-in-up card-memorial"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-foreground">
                {section.title}
              </h2>
              {section.body.split("\n\n").map((paragraph, paragraphIndex) => (
                <p
                  key={`${section.id}-${paragraphIndex}`}
                  className="text-base md:text-lg text-foreground/95 mb-4 leading-relaxed last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </section>
            {index < memorial.biography_sections.length - 1 ? <div className="divider-gold my-10 md:my-12" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
