import PageState from "@/components/PageState";
import { Button } from "@/components/ui/button";
import { useMemorialContent } from "@/contexts/MemorialContentContext";
import type { Tribute as TributeItem } from "@/types/memorial";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BookHeart, Building2, Church, HeartHandshake, Users } from "lucide-react";
import { useEffect, useState } from "react";

const sectionMeta: Record<
  TributeItem["section"],
  {
    label: string;
    description: string;
    icon: typeof Users;
  }
> = {
  family: {
    label: "Family",
    description: "Tributes from his wife, children, siblings, in-laws, and close family circle.",
    icon: Users,
  },
  church: {
    label: "Church",
    description: "Words from fellow workers, ministers, and members of the faith community he served.",
    icon: Church,
  },
  friend: {
    label: "Friends",
    description: "Memories shared by friends, co-workers, and people who walked closely with him.",
    icon: HeartHandshake,
  },
  relative: {
    label: "Relatives",
    description: "Messages from relatives and extended family connections beyond the immediate home.",
    icon: BookHeart,
  },
  institution: {
    label: "Institutions",
    description: "Tributes from schools, ministries, and organizations shaped by his presence.",
    icon: Building2,
  },
  community: {
    label: "Community",
    description: "Reflections from neighbours and the wider community that experienced his kindness.",
    icon: Users,
  },
};

const sectionOrder: TributeItem["section"][] = [
  "family",
  "church",
  "friend",
  "relative",
  "institution",
  "community",
];

export default function Tributes() {
  const { memorial, isLoading, error } = useMemorialContent();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<TributeItem["section"] | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.relationship && formData.message) {
      setFormData({ name: "", relationship: "", message: "" });
      setIsOpen(false);
    }
  };

  const availableSections = memorial
    ? sectionOrder.filter((section) => memorial.tributes.some((tribute) => tribute.section === section))
    : [];

  useEffect(() => {
    if (!activeSection && availableSections.length > 0) {
      setActiveSection(availableSections[0]);
      return;
    }

    if (activeSection && !availableSections.includes(activeSection) && availableSections.length > 0) {
      setActiveSection(availableSections[0]);
    }
  }, [activeSection, availableSections]);

  if (isLoading) {
    return <PageState title="Loading Tributes" message="Fetching public tributes and condolence messages." />;
  }

  if (error || !memorial) {
    return <PageState title="Tributes Unavailable" message={error || "Tribute content could not be loaded."} />;
  }

  const selectedSection = activeSection && availableSections.includes(activeSection) ? activeSection : availableSections[0];
  const filteredTributes = selectedSection
    ? memorial.tributes.filter((tribute) => tribute.section === selectedSection)
    : [];
  const selectedMeta = selectedSection ? sectionMeta[selectedSection] : null;
  const SelectedIcon = selectedMeta?.icon;

  return (
    <div className="min-h-screen pb-20 md:pb-28">
      <div className="container max-w-6xl">
        <div className="mb-14 md:mb-16 max-w-4xl">
          <p className="text-[0.7rem] sm:text-xs uppercase tracking-[0.35em] text-accent/85 mb-4">Tributes</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-foreground">Words Shared in His Memory</h1>
          <div className="divider-gold w-20 mb-6" />

          <p className="text-base md:text-lg text-foreground mb-0 leading-relaxed">
            The tributes are arranged by relationship so each voice can be read within its own circle:
            family, church, friends, relatives, and the wider community shaped by {memorial.full_name}'s
            life.
          </p>
        </div>

        <div className="mb-10 card-memorial bg-card/70">
          <p className="text-sm md:text-base text-muted-foreground">
            If you knew {memorial.full_name} and would like to share a memory, condolence, or words of 
            encouragement, please click the button below to leave a tribute.
          </p>
        </div>

        <div className="mb-16">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent hover:opacity-90">
                Leave a Tribute
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-accent border-opacity-20">
              <DialogHeader>
                <DialogTitle className="text-2xl font-serif text-foreground">Leave a Tribute</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Share your memories and condolences with the family.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Your Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="bg-background border-accent border-opacity-20 text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Relationship</label>
                  <Input
                    value={formData.relationship}
                    onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                    placeholder="e.g., Family Friend, Colleague, Church Member"
                    className="bg-background border-accent border-opacity-20 text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Your Message</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share your memories, condolences, or words of encouragement..."
                    className="bg-background border-accent border-opacity-20 text-foreground placeholder:text-muted-foreground min-h-32"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent hover:opacity-90"
                >
                  Save Draft Locally
                </Button>
                <p className="text-xs text-muted-foreground">
                  This draft is not sent anywhere yet.
                </p>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="space-y-3 lg:sticky lg:top-28 lg:self-start">
            {availableSections.map((section) => {
              const meta = sectionMeta[section];
              const Icon = meta.icon;
              const count = memorial.tributes.filter((tribute) => tribute.section === section).length;
              const isActive = selectedSection === section;

              return (
                <button
                  key={section}
                  type="button"
                  onClick={() => setActiveSection(section)}
                  className={`w-full rounded-3xl border px-5 py-5 text-left transition-all duration-300 ${
                    isActive
                      ? "border-accent/35 bg-accent/10 shadow-[0_18px_45px_rgba(0,0,0,0.24)]"
                      : "border-accent/12 bg-card/55 hover:border-accent/25 hover:bg-card/72"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[0.65rem] uppercase tracking-[0.32em] text-accent/85 mb-3">
                        Tribute Section
                      </p>
                      <h2 className="text-2xl font-serif font-bold text-foreground">{meta.label}</h2>
                    </div>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-accent/18 bg-background/55 text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-5 flex items-center justify-between text-sm text-muted-foreground">
                    <span>{count} tributes</span>
                    <span>{String(count).padStart(2, "0")}</span>
                  </div>
                </button>
              );
            })}
          </aside>

          <div>
            {selectedMeta && SelectedIcon ? (
              <div className="card-memorial mb-8 bg-card/70">
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.32em] text-accent/85 mb-3">
                      {selectedMeta.label}
                    </p>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
                      {selectedMeta.label} Tributes
                    </h2>
                    <p className="max-w-3xl text-muted-foreground leading-7">{selectedMeta.description}</p>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-accent/18 bg-accent/10 text-accent">
                    <SelectedIcon className="h-6 w-6" />
                  </div>
                </div>
              </div>
            ) : null}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
              {filteredTributes.map((tribute, index) => (
                <article
                  key={tribute.id}
                  className="card-memorial fade-in-up h-full"
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-foreground mb-2">{tribute.name}</h3>
                      <p className="text-sm text-accent font-medium">{tribute.relationship}</p>
                    </div>
                    <div className="rounded-full border border-accent/15 bg-accent/8 px-3 py-1 text-[0.65rem] uppercase tracking-[0.28em] text-accent/85">
                      {tribute.section_label}
                    </div>
                  </div>
                  <div className="divider-gold mb-5" />
                  <p className="text-base text-foreground leading-8 whitespace-pre-line">{tribute.message}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        {memorial.tributes.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-6">
              No tributes yet. Be the first to share your memories.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
