import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thank you for subscribing!", {
        description: "You'll receive exclusive updates soon.",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-24 lg:py-32 bg-fashion-cream">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-xs tracking-fashion text-primary font-medium mb-4">
              STAY CONNECTED
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-medium text-foreground mb-4">
              Join the ELEVÉ World
            </h2>
            <p className="text-muted-foreground mb-10">
              Subscribe to receive exclusive early access to new collections, 
              style inspirations, and members-only offers.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                required
              />
              <button
                type="submit"
                className="btn-fashion-primary whitespace-nowrap"
              >
                <span className="hidden sm:inline">Subscribe</span>
                <ArrowRight size={18} className="sm:ml-2" />
              </button>
            </form>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="text-xs text-muted-foreground mt-6">
              By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
