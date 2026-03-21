import PageState from "@/components/PageState";
import { Button } from "@/components/ui/button";
import { useMemorialContent } from "@/contexts/MemorialContentContext";
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
import { useState } from "react";

export default function Tributes() {
  const { memorial, isLoading, error } = useMemorialContent();
  const [isOpen, setIsOpen] = useState(false);
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

  if (isLoading) {
    return <PageState title="Loading Tributes" message="Fetching public tributes and condolence messages." />;
  }

  if (error || !memorial) {
    return <PageState title="Tributes Unavailable" message={error || "Tribute content could not be loaded."} />;
  }

  return (
    <div className="min-h-screen pb-20 md:pb-28">
      <div className="container max-w-5xl">
        <div className="mb-14 md:mb-16 max-w-3xl">
          <p className="text-[0.7rem] sm:text-xs uppercase tracking-[0.35em] text-accent/85 mb-4">Tributes</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-foreground">Words Shared in His Memory</h1>
          <div className="divider-gold w-20 mb-6" />

          <p className="text-base md:text-lg text-foreground mb-0 leading-relaxed">
            The following are heartfelt messages and condolences from family, friends, and loved ones
            who have been touched by {memorial.full_name}'s life and legacy.
          </p>
        </div>

        <div className="mb-10 card-memorial bg-card/70">
          <p className="text-sm md:text-base text-muted-foreground">
            Public tribute submission is still pending backend connection and moderation flow. The
            current dialog is only a temporary local placeholder.
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {memorial.tributes.map((tribute, index) => (
            <div
              key={tribute.id}
              className="card-memorial fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-xl font-serif font-bold text-foreground mb-2">{tribute.name}</h3>
              <p className="text-sm text-accent font-medium mb-4">{tribute.relationship}</p>
              <div className="divider-gold mb-4" />
              <p className="text-base text-foreground leading-relaxed">{tribute.message}</p>
            </div>
          ))}
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
