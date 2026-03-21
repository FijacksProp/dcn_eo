/**
 * Family Message Page - Memorial Website
 * Design: Timeless Elegance with Warm Reverence
 * 
 * Personal tribute from children and family
 * Clean text-focused layout with emotional highlights
 */

export default function FamilyMessage() {
  return (
    <div className="min-h-screen py-20 md:py-28">
      <div className="container max-w-3xl">
        {/* Page Title */}
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-foreground">
          A Message from the Family
        </h1>
        <div className="divider-gold w-16 mb-12" />

        {/* Family Message Content */}
        <article className="prose prose-invert max-w-none fade-in-up">
          <p className="text-base md:text-lg text-foreground leading-relaxed mb-8">
            To all who have shared in our grief and supported us during this difficult time, we
            extend our deepest gratitude. The outpouring of love, prayers, and condolences has
            been a source of great comfort to our family.
          </p>

          <p className="text-base md:text-lg text-foreground leading-relaxed mb-8">
            Our father, Dcn. Olugbenga Eyitayo Olugbemi, was more than just a parent to us. He was
            a teacher, a guide, a friend, and an inspiration. From our earliest memories, he
            showed us what it means to live with purpose, integrity, and faith.
          </p>

          <blockquote className="border-l-4 border-accent border-opacity-50 pl-8 py-6 my-10 bg-card bg-opacity-50 rounded-r-lg">
            <p className="text-lg md:text-xl text-accent font-serif italic">
              "Dad, you taught us that life is not measured by the years we live, but by the
              difference we make in the lives of others."
            </p>
          </blockquote>

          <p className="text-base md:text-lg text-foreground leading-relaxed mb-8">
            He was a man of few words but many actions. His quiet strength, his unwavering faith,
            and his genuine love for people were evident in everything he did. Whether it was
            taking time to listen to our problems, offering wise counsel, or simply being present
            in our lives, he showed us the true meaning of love.
          </p>

          <p className="text-base md:text-lg text-foreground leading-relaxed mb-8">
            We remember his warm smile, his gentle laugh, the way his eyes would light up when he
            spoke about his grandchildren, and his ability to find humor and hope even in difficult
            circumstances. He had a way of making everyone around him feel valued and loved.
          </p>

          <h2 className="text-3xl md:text-4xl font-serif font-bold mt-12 mb-6 text-foreground">
            Lessons We Will Carry Forward
          </h2>

          <p className="text-base md:text-lg text-foreground leading-relaxed mb-8">
            Dad taught us that faith is not just about what we believe, but about how we live. He
            showed us that integrity is not negotiable, that service to others is a privilege, and
            that family is the foundation of everything. He demonstrated that true strength lies
            not in power or wealth, but in character and compassion.
          </p>

          <p className="text-base md:text-lg text-foreground leading-relaxed mb-8">
            He believed that every problem has a solution, and that with faith, wisdom, and
            determination, we can overcome any obstacle. He taught us to approach life with
            optimism, to help those in need, and to always strive to leave the world better than
            we found it.
          </p>

          <blockquote className="border-l-4 border-accent border-opacity-50 pl-8 py-6 my-10 bg-card bg-opacity-50 rounded-r-lg">
            <p className="text-lg md:text-xl text-accent font-serif italic">
              "We promise to honor your memory by living the values you taught us and continuing
              the legacy of love, service, and faith you have left behind."
            </p>
          </blockquote>

          <h2 className="text-3xl md:text-4xl font-serif font-bold mt-12 mb-6 text-foreground">
            Forever in Our Hearts
          </h2>

          <p className="text-base md:text-lg text-foreground leading-relaxed mb-8">
            Though you are no longer with us in body, your spirit lives on in our hearts. We feel
            your presence in the values you instilled in us, in the memories we cherish, and in
            the love that continues to bind our family together.
          </p>

          <p className="text-base md:text-lg text-foreground leading-relaxed mb-8">
            We will continue to live by your example, to support one another as you supported us,
            and to extend the same love and compassion you showed to everyone you met. Your legacy
            will endure through us and through the generations to come.
          </p>

          <p className="text-base md:text-lg text-foreground leading-relaxed mb-12">
            Rest well, Dad. You have earned your peace. We love you and will miss you always.
          </p>

          <div className="divider-gold my-12" />

          <div className="text-center">
            <p className="text-lg md:text-xl font-serif text-accent italic mb-4">
              With love and eternal gratitude
            </p>
            <p className="text-base text-muted-foreground">
              The Olugbemi Family
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
