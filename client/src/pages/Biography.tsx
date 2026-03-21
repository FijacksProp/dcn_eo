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
    <div className="min-h-screen py-20 md:py-28">
      <div className="container max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-foreground">Biography</h1>
        <div className="divider-gold w-16 mb-12" />

        {memorial.biography_sections.map((section, index) => (
          <div key={section.id}>
            <section className="mb-16 md:mb-20 fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-foreground">
                {section.title}
              </h2>
              {section.body.split("\n\n").map((paragraph, paragraphIndex) => (
                <p
                  key={`${section.id}-${paragraphIndex}`}
                  className="text-base md:text-lg text-foreground mb-4 leading-relaxed last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </section>
            {index < memorial.biography_sections.length - 1 ? <div className="divider-gold my-12" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
