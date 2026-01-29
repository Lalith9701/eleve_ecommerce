import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";

const footerLinks = {
  shop: [
    { name: "Women", href: "#" },
    { name: "Men", href: "#" },
    { name: "Kids", href: "#" },
    { name: "Accessories", href: "#" },
    { name: "New Arrivals", href: "#" },
    { name: "Sale", href: "#" },
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Sustainability", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
  ],
  support: [
    { name: "Contact", href: "#" },
    { name: "FAQs", href: "#" },
    { name: "Shipping & Returns", href: "#" },
    { name: "Size Guide", href: "#" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "Youtube" },
];

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <a href="/" className="inline-block mb-6">
              <span className="font-display text-2xl font-medium">ELEVÉ</span>
            </a>
            <p className="text-background/60 text-sm leading-relaxed mb-8 max-w-xs">
              Crafting timeless elegance for the modern individual. 
              Every piece tells a story of refined sophistication.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center hover:bg-background hover:text-foreground transition-colors"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-xs tracking-fashion font-medium mb-6">SHOP</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-xs tracking-fashion font-medium mb-6">COMPANY</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-xs tracking-fashion font-medium mb-6">SUPPORT</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/40">
            © 2024 ELEVÉ. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-background/40 hover:text-background transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-background/40 hover:text-background transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-xs text-background/40 hover:text-background transition-colors">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
