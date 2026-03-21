/**
 * Biography Page - Memorial Website
 * Design: Timeless Elegance with Warm Reverence
 * 
 * Structured sections: Early Life, Education, Career, Spiritual Life, Family Life, Legacy
 * Uses serif headings, generous spacing, and gold dividers
 */

export default function Biography() {
  return (
    <div className="min-h-screen py-20 md:py-28">
      <div className="container max-w-4xl">
        {/* Page Title */}
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-foreground">
          Biography
        </h1>
        <div className="divider-gold w-16 mb-12" />

        {/* Early Life Section */}
        <section className="mb-16 md:mb-20 fade-in-up" style={{ animationDelay: '0ms' }}>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-foreground">
            Early Life
          </h2>
          <p className="text-base md:text-lg text-foreground mb-4 leading-relaxed">
            Born on June 4, 1970, in Iyah-Gbede, Ijumu Local Council, Kogi State, Olugbenga
            Eyitayo Olugbemi came from a family deeply rooted in faith and community service.
            From his earliest days, he demonstrated a remarkable compassion for others and an
            unwavering commitment to his values.
          </p>
          <p className="text-base md:text-lg text-foreground leading-relaxed">
            His childhood was marked by the influence of godly parents who instilled in him the
            importance of integrity, hard work, and service to humanity. These foundational
            values would shape every decision and relationship throughout his life.
          </p>
        </section>

        <div className="divider-gold my-12" />

        {/* Education Section */}
        <section className="mb-16 md:mb-20 fade-in-up" style={{ animationDelay: '100ms' }}>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-foreground">
            Education
          </h2>
          <p className="text-base md:text-lg text-foreground mb-4 leading-relaxed">
            Olugbenga pursued his education with dedication and excellence, earning qualifications
            that would serve him throughout his career. His commitment to learning extended beyond
            formal education—he was a lifelong student of life, constantly seeking wisdom and
            understanding.
          </p>
          <p className="text-base md:text-lg text-foreground leading-relaxed">
            He believed that education was not merely about acquiring knowledge, but about
            developing character and the ability to serve others more effectively.
          </p>
        </section>

        <div className="divider-gold my-12" />

        {/* Career Section */}
        <section className="mb-16 md:mb-20 fade-in-up" style={{ animationDelay: '200ms' }}>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-foreground">
            Career & Professional Life
          </h2>
          <p className="text-base md:text-lg text-foreground mb-4 leading-relaxed">
            Throughout his professional career, Olugbenga was known for his integrity, diligence,
            and genuine concern for the welfare of those around him. He approached his work not
            merely as a means of livelihood, but as an opportunity to make a positive impact on
            the lives of others.
          </p>
          <p className="text-base md:text-lg text-foreground mb-4 leading-relaxed">
            His colleagues and associates respected him for his wisdom, fair judgment, and
            willingness to go the extra mile. He was a mentor to many, always ready to share his
            knowledge and experience.
          </p>
          <blockquote className="border-l-4 border-accent border-opacity-50 pl-6 py-4 my-8 italic text-lg text-accent">
            "Ko si nkan to le to o ni ro"
            <br />
            <span className="text-sm text-muted-foreground not-italic">(There is nothing that cannot be solved)</span>
          </blockquote>
        </section>

        <div className="divider-gold my-12" />

        {/* Spiritual Life Section */}
        <section className="mb-16 md:mb-20 fade-in-up" style={{ animationDelay: '300ms' }}>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-foreground">
            Spiritual Life & Faith
          </h2>
          <p className="text-base md:text-lg text-foreground mb-4 leading-relaxed">
            At the core of Olugbenga's identity was his deep and abiding faith. As a Deacon
            (Dcn.) in his church, he lived out his beliefs with consistency and conviction. His
            faith was not merely a Sunday observance, but a daily practice that influenced every
            aspect of his life.
          </p>
          <p className="text-base md:text-lg text-foreground mb-4 leading-relaxed">
            He was a faithful servant in his church community, contributing his time, talents,
            and resources to the advancement of God's kingdom. His prayers were known to be
            powerful and his counsel sought by many who valued his spiritual wisdom.
          </p>
          <p className="text-base md:text-lg text-foreground leading-relaxed">
            Olugbenga believed that true faith must be demonstrated through action—through
            kindness, generosity, and a commitment to justice and righteousness.
          </p>
        </section>

        <div className="divider-gold my-12" />

        {/* Family Life Section */}
        <section className="mb-16 md:mb-20 fade-in-up" style={{ animationDelay: '400ms' }}>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-foreground">
            Family Life
          </h2>
          <p className="text-base md:text-lg text-foreground mb-4 leading-relaxed">
            Family was the center of Olugbenga's world. He was a devoted husband, a loving father,
            and a caring grandfather. His home was a place of warmth, laughter, and genuine love.
          </p>
          <p className="text-base md:text-lg text-foreground mb-4 leading-relaxed">
            He took his role as a father seriously, not just providing for his children's material
            needs, but investing in their character development and spiritual growth. He taught
            them by example—through his integrity, his work ethic, and his unwavering commitment
            to his values.
          </p>
          <p className="text-base md:text-lg text-foreground leading-relaxed">
            His grandchildren were a source of great joy to him, and he delighted in spending time
            with them, sharing stories, wisdom, and unconditional love.
          </p>
        </section>

        <div className="divider-gold my-12" />

        {/* Legacy Section */}
        <section className="mb-16 md:mb-20 fade-in-up" style={{ animationDelay: '500ms' }}>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-foreground">
            Legacy & Impact
          </h2>
          <p className="text-base md:text-lg text-foreground mb-4 leading-relaxed">
            Olugbenga's legacy is not measured in possessions or accolades, but in the lives he
            touched and the values he instilled in others. He leaves behind a rich heritage of
            faith, integrity, and service.
          </p>
          <p className="text-base md:text-lg text-foreground mb-4 leading-relaxed">
            Those who knew him will remember his warm smile, his thoughtful counsel, his generous
            spirit, and his unwavering commitment to doing what is right. He was a bridge-builder,
            a peacemaker, and a source of encouragement to all.
          </p>
          <p className="text-base md:text-lg text-foreground leading-relaxed">
            His life was a testament to the power of faith, the importance of family, and the
            difference one person can make when they live with purpose and integrity.
          </p>
        </section>
      </div>
    </div>
  );
}
