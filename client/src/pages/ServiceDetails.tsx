import PageState from "@/components/PageState";
import { useMemorialContent } from "@/contexts/MemorialContentContext";
import { Calendar, Clock, MapPin, ScrollText, Sparkles } from "lucide-react";

const orderOfServiceMap: Record<
  string,
  {
    heading: string;
    items: string[];
  }
> = {
  wake: {
    heading: "Order of Service - Wake Keep",
    items: [
      "Opening Prayer",
      "Praise and Worship",
      "Scripture Reading - Rev. 7:9-17 (Gideon Olugbemi)",
      "Congregational Hymn - All Must Be Well",
      "Scripture Reading - 1 Cor. 15:51-58 (Joshua Olugbemi)",
      "Tributes",
      "Choir Ministration",
      "Scripture Reading - John 14:1-6 (Emmanuel Olugbemi)",
      "Exhortation",
      "Special Prayer for the Family",
      "Congregational Hymn - In Christ Alone",
      "Announcement",
      "Congregational Hymn - As We Journey Through the Land",
      "Vote of Thanks / Special Number",
      "Prayer and Benediction",
    ],
  },
  burial: {
    heading: "Order of Service - Burial",
    items: [
      "Opening Prayer",
      "Hymn/Orin - Jerusalem on High",
      "Short Charge",
      "Interment",
      "Farewell Hymn/Orin Idagbere - Till We Meet Again",
      "Prayer and Benediction / Adura ati Ore Ofe",
    ],
  },
};

function getEventHeadingIcon(eventType: string) {
  if (eventType === "wake") {
    return Clock;
  }

  return Calendar;
}

function getEventTypeLabel(eventType: string) {
  if (eventType === "wake") {
    return "Wake";
  }

  if (eventType === "burial") {
    return "Burial";
  }

  if (eventType === "service") {
    return "Memorial Service";
  }

  return "Memorial Event";
}

export default function ServiceDetails() {
  const { memorial, isLoading, error } = useMemorialContent();

  if (isLoading) {
    return <PageState title="Loading Service Details" message="Fetching memorial service arrangements." />;
  }

  if (error || !memorial) {
    return <PageState title="Service Details Unavailable" message={error || "Service details could not be loaded."} />;
  }

  return (
    <div className="min-h-screen pb-20 md:pb-28">
      <div className="container max-w-4xl">
        <div className="mb-14 md:mb-16">
          <p className="text-[0.7rem] sm:text-xs uppercase tracking-[0.35em] text-accent/85 mb-4">Service Details</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-foreground">Gathering to Honor His Life</h1>
          <div className="divider-gold w-20 mb-6" />

          <p className="text-base md:text-lg text-foreground mb-0 leading-relaxed max-w-3xl">
            Below are the service arrangements for {memorial.full_name}. Family, friends,
            and loved ones joined us in celebrating his life and honoring his memory.
          </p>
        </div>

        {memorial.service_events.map((event, index) => {
          const HeadingIcon = getEventHeadingIcon(event.event_type);
          const eventDate = new Date(event.start_at);
          const orderOfService = orderOfServiceMap[event.event_type];

          return (
            <section
              key={event.id}
              className="mb-16 md:mb-20 fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative flex h-16 w-16 items-center justify-center">
                    <div className="absolute inset-0 rounded-full border border-accent/20 bg-accent/10" />
                    <div className="absolute inset-2 rounded-full border border-accent/15 bg-background/70" />
                    <HeadingIcon className="relative z-10 h-7 w-7 text-accent" />
                  </div>
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.32em] text-accent/85 mb-2">
                      {getEventTypeLabel(event.event_type)}
                    </p>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">{event.title}</h2>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 self-start rounded-full border border-accent/15 bg-card/60 px-4 py-2 text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5 text-accent" />
                  <span>Arrangement</span>
                </div>
              </div>

              <div className="card-memorial space-y-6">
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-serif font-bold text-foreground mb-2">Date & Time</h3>
                    <p className="text-base md:text-lg text-muted-foreground">
                      {eventDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                      <br />
                      <span className="text-accent font-medium">
                        {eventDate.toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="divider-gold" />

                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-serif font-bold text-foreground mb-2">Venue</h3>
                    <p className="text-base md:text-lg text-muted-foreground">
                      {event.venue_name}
                      <br />
                      {event.venue_address.split("\n").map((line) => (
                        <span key={`${event.id}-${line}`} className="block">
                          {line}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                {event.description ? (
                  <>
                    <div className="divider-gold" />
                    <p className="text-base text-foreground leading-relaxed italic">{event.description}</p>
                  </>
                ) : null}

                {orderOfService ? (
                  <>
                    <div className="divider-gold" />
                    <div className="rounded-[1.75rem] border border-accent/12 bg-background/45 px-5 py-5 md:px-6 md:py-6">
                      <div className="mb-6 flex items-start gap-4">
                        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
                          <div className="absolute inset-0 rounded-full border border-accent/18 bg-accent/10" />
                          <div className="absolute inset-2 rounded-full border border-accent/12 bg-background/70" />
                          <ScrollText className="relative z-10 h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <p className="text-[0.65rem] uppercase tracking-[0.32em] text-accent/85 mb-2">
                            Ceremony Flow
                          </p>
                          <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                            {orderOfService.heading}
                          </h3>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {orderOfService.items.map((item, itemIndex) => (
                          <div
                            key={`${event.id}-${itemIndex}`}
                            className="flex items-start gap-4 rounded-2xl border border-accent/10 bg-card/55 px-4 py-4"
                          >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/18 bg-accent/10 text-sm font-medium text-accent">
                              {itemIndex + 1}
                            </div>
                            <p className="text-sm md:text-base text-foreground/92 leading-7">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
