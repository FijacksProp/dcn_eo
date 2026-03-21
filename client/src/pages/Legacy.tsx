import PageState from "@/components/PageState";
import { useMemorialContent } from "@/contexts/MemorialContentContext";
import { BookOpen, Heart, Lightbulb, Users } from "lucide-react";

const iconMap = {
  Heart,
  Users,
  BookOpen,
  Lightbulb,
};

export default function Legacy() {
  const { memorial, isLoading, error } = useMemorialContent();

  if (isLoading) {
    return <PageState title="Loading Legacy" message="Fetching the values and legacy content." />;
  }

  if (error || !memorial) {
    return <PageState title="Legacy Unavailable" message={error || "Legacy content could not be loaded."} />;
  }

  return (
    <div className="min-h-screen py-20 md:py-28">
      <div className="container max-w-5xl">
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-foreground">Legacy</h1>
        <div className="divider-gold w-16 mb-12" />

        <p className="text-base md:text-lg text-foreground mb-16 leading-relaxed max-w-3xl">
          {memorial.full_name}'s legacy extends far beyond his lifetime. The values he embodied,
          the lives he touched, and the example he set continue to inspire and guide us.
        </p>

        <section className="mb-20 md:mb-28">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-foreground">
            His Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {memorial.legacy_values.map((value, index) => {
              const Icon = iconMap[value.icon_name as keyof typeof iconMap] || Heart;

              return (
                <div
                  key={value.id}
                  className="card-memorial fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-accent bg-opacity-20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-foreground">{value.title}</h3>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
