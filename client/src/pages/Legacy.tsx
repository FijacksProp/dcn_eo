import { Heart, Users, BookOpen, Lightbulb } from "lucide-react";

/**
 * Legacy Page - Memorial Website
 * Design: Timeless Elegance with Warm Reverence
 * 
 * Focus on impact and values: Faith, Service, Helping Others, Mentorship
 * Statements about his beliefs and continuing his legacy
 */

export default function Legacy() {
  const legacyValues = [
    {
      icon: Heart,
      title: "Faith",
      description:
        "His unwavering faith in God was the foundation of everything he did. He lived his beliefs with consistency and conviction, inspiring others to deepen their own spiritual journeys.",
    },
    {
      icon: Users,
      title: "Service",
      description:
        "Olugbenga believed that true faith must be demonstrated through action. He served his church, his community, and his family with dedication and selflessness.",
    },
    {
      icon: BookOpen,
      title: "Helping Others",
      description:
        "He had a genuine concern for the welfare of those around him. Whether through counsel, material support, or simply a listening ear, he was always ready to help.",
    },
    {
      icon: Lightbulb,
      title: "Mentorship",
      description:
        "Olugbenga invested in the lives of others, sharing his wisdom and experience. He believed in lifting others up and helping them reach their potential.",
    },
  ];

  return (
    <div className="min-h-screen py-20 md:py-28">
      <div className="container max-w-5xl">
        {/* Page Title */}
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-foreground">
          Legacy
        </h1>
        <div className="divider-gold w-16 mb-12" />

        {/* Introduction */}
        <p className="text-base md:text-lg text-foreground mb-16 leading-relaxed max-w-3xl">
          Dcn. Olugbenga Eyitayo Olugbemi's legacy extends far beyond his lifetime. The values he
          embodied, the lives he touched, and the example he set continue to inspire and guide us.
        </p>

        {/* Core Values Section */}
        <section className="mb-20 md:mb-28" style={{ animationDelay: '0ms' }}>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-foreground">
            His Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {legacyValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="card-memorial fade-in-up"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-accent bg-opacity-20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-foreground">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <div className="divider-gold my-16" />

        {/* Key Beliefs Section */}
        <section className="mb-20 md:mb-28" style={{ animationDelay: '100ms' }}>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-foreground">
            What He Believed
          </h2>

          <div className="space-y-8">
            <blockquote className="border-l-4 border-accent border-opacity-50 pl-8 py-6 bg-card bg-opacity-50 rounded-r-lg">
              <p className="text-lg md:text-xl text-accent font-serif italic mb-4">
                "Ko si nkan to le to o ni ro"
              </p>
              <p className="text-base text-muted-foreground">
                <span className="font-medium text-foreground">There is nothing that cannot be solved.</span> This was his
                philosophy—a belief that with faith, wisdom, and determination, any problem can be
                overcome. He approached challenges not with despair, but with the confidence that
                solutions exist.
              </p>
            </blockquote>

            <blockquote className="border-l-4 border-accent border-opacity-50 pl-8 py-6 bg-card bg-opacity-50 rounded-r-lg">
              <p className="text-lg md:text-xl text-accent font-serif italic mb-4">
                "Faith without works is dead"
              </p>
              <p className="text-base text-muted-foreground">
                He lived this principle daily. His faith was not merely words, but actions—in how
                he treated others, how he served his community, and how he lived his life with
                integrity and purpose.
              </p>
            </blockquote>

            <blockquote className="border-l-4 border-accent border-opacity-50 pl-8 py-6 bg-card bg-opacity-50 rounded-r-lg">
              <p className="text-lg md:text-xl text-accent font-serif italic mb-4">
                "Leave the world better than you found it"
              </p>
              <p className="text-base text-muted-foreground">
                This was his guiding principle. Whether through his work, his family, his church,
                or his community, he was committed to making a positive difference and leaving a
                lasting legacy of love and service.
              </p>
            </blockquote>
          </div>
        </section>

        <div className="divider-gold my-16" />

        {/* Continuing His Legacy */}
        <section className="fade-in-up" style={{ animationDelay: '200ms' }}>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-foreground">
            We Continue His Legacy
          </h2>

          <div className="card-memorial">
            <p className="text-base md:text-lg text-foreground leading-relaxed mb-6">
              Though Dcn. Olugbenga has passed from this earthly life, his legacy lives on through
              us. We are committed to continuing the values he embodied and the example he set.
            </p>

            <div className="divider-gold my-8" />

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-serif font-bold text-accent mb-2">
                  Through Our Actions
                </h3>
                <p className="text-base text-muted-foreground">
                  We honor his memory by serving others with the same dedication and compassion he
                  demonstrated. We seek to be peacemakers, helpers, and sources of encouragement in
                  our communities.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-serif font-bold text-accent mb-2">
                  Through Our Values
                </h3>
                <p className="text-base text-muted-foreground">
                  We uphold the principles of faith, integrity, and service that defined his life.
                  We strive to approach challenges with his optimism and wisdom, knowing that
                  solutions exist for every problem.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-serif font-bold text-accent mb-2">
                  Through Our Relationships
                </h3>
                <p className="text-base text-muted-foreground">
                  We nurture the bonds of family and community, just as he did. We invest in the
                  lives of others, mentor the next generation, and create spaces of warmth and
                  belonging.
                </p>
              </div>
            </div>

            <div className="divider-gold my-8" />

            <p className="text-lg md:text-xl text-center text-accent font-serif italic">
              "Forever in our hearts, always in our actions"
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
