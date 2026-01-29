import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import menModel from "@/assets/men-model.png";
import womenModel from "@/assets/women-model.png";
import kidsModel from "@/assets/kids-model.png";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";

const categories = [
  {
    title: "MEN",
    subtitle: "Refined Masculinity",
    description: "Tailored perfection for the modern gentleman",
    image: menModel,
    href: "/men",
  },
  {
    title: "WOMEN",
    subtitle: "Effortless Grace",
    description: "Timeless pieces that celebrate femininity",
    image: womenModel,
    href: "/women",
  },
  {
    title: "KIDS",
    subtitle: "Little Ones, Big Style",
    description: "Premium fashion for the next generation",
    image: kidsModel,
    href: "/kids",
  },
];

const CategorySection = () => {
  return (
    <section id="collection" className="py-24 lg:py-32 bg-fashion-cream">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16 lg:mb-24">
          <p className="text-xs tracking-fashion text-primary font-medium mb-4">
            CURATED COLLECTIONS
          </p>
          <h2 className="font-display text-4xl lg:text-6xl font-medium text-foreground">
            Shop by Category
          </h2>
        </ScrollReveal>

        {/* Categories Grid */}
        <StaggerContainer className="grid md:grid-cols-3 gap-8 lg:gap-12" staggerDelay={0.2}>
          {categories.map((category) => (
            <StaggerItem key={category.title}>
              <Link
                to={category.href}
                className="group relative block bg-card overflow-hidden"
              >
                {/* Image Container */}
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-xs tracking-fashion text-primary-light font-medium mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {category.subtitle}
                    </p>
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="font-display text-3xl lg:text-4xl font-medium text-card mb-2">
                          {category.title}
                        </h3>
                        <p className="text-card/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          {category.description}
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                        <ArrowUpRight size={20} className="text-foreground" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Border accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default CategorySection;
