import { useState } from "react";
import { Button } from "@/components/ui/button";
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

/**
 * Tributes Page - Memorial Website
 * Design: Timeless Elegance with Warm Reverence
 * 
 * Display condolence messages in card layout
 * Modal form to leave new tributes
 */

interface Tribute {
  id: number;
  name: string;
  relationship: string;
  message: string;
}

const initialTributes: Tribute[] = [
  {
    id: 1,
    name: "Adekunle Adeyemi",
    relationship: "Colleague & Friend",
    message:
      "Olugbenga was more than a colleague—he was a mentor and a true friend. His wisdom and kindness touched everyone around him. We will miss him dearly.",
  },
  {
    id: 2,
    name: "Chioma Okafor",
    relationship: "Church Member",
    message:
      "His dedication to the church and his unwavering faith inspired us all. He lived what he preached, and his legacy will continue to guide us.",
  },
  {
    id: 3,
    name: "Tunde Balogun",
    relationship: "Family Friend",
    message:
      "A man of integrity and grace. Olugbenga showed us what it means to live a life of purpose. His memory will be a blessing to all who knew him.",
  },
  {
    id: 4,
    name: "Folake Adebayo",
    relationship: "Neighbor",
    message:
      "He was always there with a kind word and a helping hand. The community has lost a true pillar. Rest well, Dcn. Olugbenga.",
  },
];

export default function Tributes() {
  const [tributes, setTributes] = useState<Tribute[]>(initialTributes);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.relationship && formData.message) {
      const newTribute: Tribute = {
        id: tributes.length + 1,
        ...formData,
      };
      setTributes([newTribute, ...tributes]);
      setFormData({ name: "", relationship: "", message: "" });
      setIsOpen(false);
    }
  };

  return (
    <div className="min-h-screen py-20 md:py-28">
      <div className="container max-w-5xl">
        {/* Page Title */}
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-foreground">
          Tributes
        </h1>
        <div className="divider-gold w-16 mb-12" />

        {/* Introduction */}
        <p className="text-base md:text-lg text-foreground mb-12 leading-relaxed max-w-3xl">
          The following are heartfelt messages and condolences from family, friends, and loved
          ones who have been touched by Olugbenga's life and legacy.
        </p>

        {/* Leave Tribute Button */}
        <div className="mb-16">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent hover:opacity-90"
              >
                Leave a Tribute
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-accent border-opacity-20">
              <DialogHeader>
                <DialogTitle className="text-2xl font-serif text-foreground">
                  Leave a Tribute
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Share your memories and condolences with the family.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Name
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter your name"
                    className="bg-background border-accent border-opacity-20 text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Relationship
                  </label>
                  <Input
                    value={formData.relationship}
                    onChange={(e) =>
                      setFormData({ ...formData, relationship: e.target.value })
                    }
                    placeholder="e.g., Family Friend, Colleague, Church Member"
                    className="bg-background border-accent border-opacity-20 text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Message
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Share your memories, condolences, or words of encouragement..."
                    className="bg-background border-accent border-opacity-20 text-foreground placeholder:text-muted-foreground min-h-32"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent hover:opacity-90"
                >
                  Submit Tribute
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tributes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {tributes.map((tribute, index) => (
            <div
              key={tribute.id}
              className="card-memorial fade-in-up"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <h3 className="text-xl font-serif font-bold text-foreground mb-2">
                {tribute.name}
              </h3>
              <p className="text-sm text-accent font-medium mb-4">
                {tribute.relationship}
              </p>
              <div className="divider-gold mb-4" />
              <p className="text-base text-foreground leading-relaxed">
                {tribute.message}
              </p>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {tributes.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-6">
              No tributes yet. Be the first to share your memories.
            </p>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent hover:opacity-90"
                >
                  Leave a Tribute
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
}
