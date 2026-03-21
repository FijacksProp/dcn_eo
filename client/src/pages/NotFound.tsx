import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="card-memorial w-full max-w-2xl text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-accent mb-4">404</p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
          Page Not Found
        </h1>
        <p className="text-base md:text-lg text-muted-foreground mb-8">
          The page you requested does not exist or may have been moved.
        </p>
        <Button
          onClick={() => setLocation("/")}
          className="bg-accent text-accent-foreground hover:opacity-90"
        >
          <Home className="w-4 h-4 mr-2" />
          Return Home
        </Button>
      </div>
    </div>
  );
}
