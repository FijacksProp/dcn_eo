import { Calendar, MapPin, Clock } from "lucide-react";

/**
 * Service Details Page - Memorial Website
 * Design: Timeless Elegance with Warm Reverence
 * 
 * Clearly structured sections for wake keep and burial
 * Includes icons and dividers for visual clarity
 */

export default function ServiceDetails() {
  return (
    <div className="min-h-screen py-20 md:py-28">
      <div className="container max-w-4xl">
        {/* Page Title */}
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-foreground">
          Service Details
        </h1>
        <div className="divider-gold w-16 mb-12" />

        {/* Introduction */}
        <p className="text-base md:text-lg text-foreground mb-16 leading-relaxed">
          Below are the details for the wake keep and burial service for Dcn. Olugbenga Eyitayo
          Olugbemi. We invite all family, friends, and loved ones to join us in celebrating his
          life and honoring his memory.
        </p>

        {/* Wake Keep Section */}
        <section className="mb-16 md:mb-20 fade-in-up" style={{ animationDelay: '0ms' }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-lg bg-accent bg-opacity-20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Wake Keep
            </h2>
          </div>

          <div className="card-memorial space-y-6">
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-serif font-bold text-foreground mb-2">Date & Time</h3>
                <p className="text-base md:text-lg text-muted-foreground">
                  Wednesday, 18th March 2026
                  <br />
                  <span className="text-accent font-medium">4:00 PM</span>
                </p>
              </div>
            </div>

            <div className="divider-gold" />

            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-serif font-bold text-foreground mb-2">Venue</h3>
                <p className="text-base md:text-lg text-muted-foreground">
                  Rhema Chapel Stadium Church
                  <br />
                  Ilorin, Nigeria
                </p>
              </div>
            </div>

            <div className="divider-gold" />

            <p className="text-base text-foreground leading-relaxed italic">
              The wake keep will be a time of fellowship, prayer, and celebration of Dcn.
              Olugbenga's life. Light refreshments will be served.
            </p>
          </div>
        </section>

        {/* Burial Section */}
        <section className="mb-16 md:mb-20 fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-lg bg-accent bg-opacity-20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Burial Service
            </h2>
          </div>

          <div className="card-memorial space-y-6">
            <div className="flex items-start gap-4">
              <Calendar className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-serif font-bold text-foreground mb-2">Date</h3>
                <p className="text-base md:text-lg text-muted-foreground">
                  Thursday, 19th March 2026
                </p>
              </div>
            </div>

            <div className="divider-gold" />

            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-serif font-bold text-foreground mb-2">Location</h3>
                <p className="text-base md:text-lg text-muted-foreground">
                  Iyah-Gbede
                  <br />
                  Ijumu Local Council
                  <br />
                  Kogi State, Nigeria
                </p>
              </div>
            </div>

            <div className="divider-gold" />

            <p className="text-base text-foreground leading-relaxed italic">
              The burial service will be conducted according to Christian traditions and family
              customs. All are welcome to pay their final respects and join in prayer.
            </p>
          </div>
        </section>

        {/* Additional Information */}
        <section className="fade-in-up" style={{ animationDelay: '200ms' }}>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-foreground">
            Additional Information
          </h2>

          <div className="space-y-6">
            <div className="card-memorial">
              <h3 className="text-lg font-serif font-bold text-foreground mb-3">
                Accommodation
              </h3>
              <p className="text-base text-muted-foreground">
                For those traveling from out of town, we recommend booking accommodation in Ilorin
                or Kogi State in advance. Please contact the family for recommendations.
              </p>
            </div>

            <div className="card-memorial">
              <h3 className="text-lg font-serif font-bold text-foreground mb-3">
                Transportation
              </h3>
              <p className="text-base text-muted-foreground">
                Shuttle services may be arranged from Ilorin to Iyah-Gbede for the burial service.
                Please confirm your attendance with the family for transportation details.
              </p>
            </div>

            <div className="card-memorial">
              <h3 className="text-lg font-serif font-bold text-foreground mb-3">
                Contact Information
              </h3>
              <p className="text-base text-muted-foreground">
                For any inquiries or to confirm your attendance, please reach out to the family
                through the contact information provided on this website.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
