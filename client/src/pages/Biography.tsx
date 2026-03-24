import PageState from "@/components/PageState";
import { useMemorialContent } from "@/contexts/MemorialContentContext";
import { BookOpenText, HeartHandshake, Landmark, Quote, Sprout, Users } from "lucide-react";

const sectionVisuals = [
  { icon: Landmark, label: "Foundations", accent: "from-accent/18 via-accent/8 to-transparent" },
  { icon: BookOpenText, label: "Formation", accent: "from-foreground/10 via-accent/5 to-transparent" },
  { icon: Sprout, label: "Work & Calling", accent: "from-accent/15 via-transparent to-card/80" },
  { icon: HeartHandshake, label: "Character", accent: "from-accent/18 via-accent/6 to-transparent" },
  { icon: Users, label: "Devotion", accent: "from-foreground/10 via-accent/7 to-transparent" },
];

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function splitParagraphs(body: string) {
  return body
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export default function Biography() {
  const { memorial, isLoading, error } = useMemorialContent();

  if (isLoading) {
    return <PageState title="Loading Biography" message="Fetching biography sections from the memorial archive." />;
  }

  if (error || !memorial) {
    return <PageState title="Biography Unavailable" message={error || "Biography content could not be loaded."} />;
  }

  const overviewFacts = [
    { label: "Born", value: formatDate(memorial.birth_date) },
    { label: "Transitioned", value: formatDate(memorial.death_date) },
    { label: "Profession", value: "Education & Agric Extension" },
    { label: "Family", value: "Husband, Father, Brother, Son" },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-28">
      <div className="container max-w-6xl">
        <div className="mb-14 md:mb-16 max-w-4xl">
          <p className="text-[0.7rem] sm:text-xs uppercase tracking-[0.35em] text-accent/85 mb-4">Biography</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-foreground">
            The Story of His Life
          </h1>
          <div className="divider-gold w-20 mb-6" />
          <p className="max-w-3xl text-muted-foreground">
            A life remembered not in fragments, but in a full story of discipline, compassion,
            learning, service, evangelism, and love.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-12 md:mb-16">
          {overviewFacts.map((fact) => (
            <div key={fact.label} className="card-memorial bg-card/75">
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-accent/85 mb-3">{fact.label}</p>
              <p className="text-sm sm:text-base md:text-lg text-foreground leading-7">{fact.value}</p>
            </div>
          ))}
        </div>

        <div className="mb-10 md:mb-12 card-memorial bg-card/72">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accent">
              <Quote className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.32em] text-accent/85 mb-3">Words That Stayed With Him</p>
              <p className="text-lg md:text-2xl font-serif italic text-foreground leading-9">
                "Ko si nkan to le ti ko ni ro."
              </p>
              <p className="text-sm md:text-base text-muted-foreground mt-3">
                A resilient outlook that captured the way he encouraged people to face life with hope.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8 md:space-y-10">
          {memorial.biography_sections.map((section, index) => {
            const visual = sectionVisuals[index % sectionVisuals.length];
            const Icon = visual.icon;
            const paragraphs = splitParagraphs(section.body);

            return (
              <section
                key={section.id}
                className="fade-in-up card-memorial relative overflow-hidden"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <div className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-r ${visual.accent}`} />

                <div className="relative grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
                  <div className="lg:border-r lg:border-accent/10 lg:pr-8">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-[0.7rem] uppercase tracking-[0.32em] text-accent/85 mb-3">{visual.label}</p>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">{section.title}</h2>
                    <p className="mt-4 text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground">
                      Chapter {String(index + 1).padStart(2, "0")}
                    </p>
                  </div>

                  <div className="space-y-5">
                    {paragraphs.map((paragraph, paragraphIndex) => (
                      <div
                        key={`${section.id}-${paragraphIndex}`}
                        className={`rounded-2xl border px-5 py-5 ${
                          paragraphIndex === 0
                            ? "border-accent/15 bg-background/55"
                            : "border-accent/10 bg-card/55"
                        }`}
                      >
                        <p className="text-base md:text-lg text-foreground/92 leading-8">{paragraph}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-12 md:mt-16 card-memorial text-center">
          <p className="text-[0.7rem] uppercase tracking-[0.35em] text-accent/85 mb-4">Enduring Legacy</p>
          <p className="text-xl md:text-2xl font-serif italic text-foreground leading-9 max-w-4xl mx-auto">
            Though his departure leaves a deep void, his legacy of faith, service, love, and impact
            continues to live on in the hearts of all who knew him.
          </p>
        </div>
      </div>
    </div>
  );
}
