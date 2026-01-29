import { ScrollReveal } from "@/components/ui/scroll-reveal";

const BrandStatement = () => {
  return (
    <section className="py-24 lg:py-40 bg-foreground text-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 border border-background rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] border border-background rounded-full translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal delay={0.1}>
            <p className="text-xs tracking-fashion text-primary-light font-medium mb-8">
              OUR PHILOSOPHY
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <blockquote className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light leading-snug mb-12">
              "Fashion is not about following trends, it's about
              <span className="italic text-primary-light"> defining </span>
              your own narrative."
            </blockquote>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-[1px] bg-background/30" />
              <p className="text-sm tracking-fashion text-background/60">
                EST. 2024
              </p>
              <div className="w-16 h-[1px] bg-background/30" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default BrandStatement;
