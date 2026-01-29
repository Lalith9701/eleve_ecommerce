import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import heroModel from "@/assets/hero-model.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-fashion-cream/30" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-0 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="space-y-8">
              {/* Eyebrow text */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xs tracking-fashion text-primary font-medium"
              >
                NEW COLLECTION 2024
              </motion.p>
              
              {/* Main headline */}
              <div className="space-y-2">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium text-foreground leading-[0.9]"
                >
                  ELEVATE YOUR
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl italic font-light text-primary leading-[0.9]"
                >
                  Style
                </motion.p>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-muted-foreground max-w-md mx-auto lg:mx-0 text-base lg:text-lg leading-relaxed"
              >
                Discover timeless elegance and contemporary fashion that speaks to your unique sense of style.
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <a
                  href="#collection"
                  className="btn-fashion-primary group"
                >
                  <span>Shop Now</span>
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#lookbook"
                  className="btn-fashion-outline"
                >
                  View Lookbook
                </a>
              </motion.div>

              {/* Decorative line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="hidden lg:block pt-8 origin-left"
              >
                <div className="w-32 h-[1px] bg-foreground/20" />
              </motion.div>
            </div>
          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto lg:ml-auto lg:mr-0 max-w-md lg:max-w-lg xl:max-w-xl"
            >
              {/* Decorative elements */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="absolute -top-4 -left-4 w-24 h-24 border border-primary/20"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/5"
              />
              
              {/* Main image */}
              <div className="relative z-10 overflow-hidden">
                <motion.img
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  src={heroModel}
                  alt="Fashion model in elegant black dress"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute bottom-8 -left-8 lg:-left-16 bg-card p-4 shadow-lg z-20"
              >
                <p className="text-xs tracking-fashion text-muted-foreground">TRENDING</p>
                <p className="font-display text-lg font-medium text-foreground mt-1">Black Elegance</p>
                <p className="text-primary font-medium mt-1">$299</p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs tracking-fashion">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
