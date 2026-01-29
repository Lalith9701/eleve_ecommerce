import { useState } from "react";
import { Menu, X, Search, User } from "lucide-react";
import { Link } from "react-router-dom";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "SHOP", href: "/products" },
    { name: "MEN", href: "/men" },
    { name: "WOMEN", href: "/women" },
    { name: "KIDS", href: "/kids" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 -ml-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-2xl font-medium tracking-wide text-foreground">
              ELEVÉ
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-xs font-medium tracking-fashion text-foreground/80 hover:text-primary transition-colors link-underline"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-foreground/80 hover:text-primary transition-colors" aria-label="Search">
              <Search size={20} />
            </button>
            <button className="p-2 text-foreground/80 hover:text-primary transition-colors hidden sm:block" aria-label="Account">
              <User size={20} />
            </button>
            <WishlistDrawer />
            <CartDrawer />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-20 bg-background z-40 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-display font-medium tracking-wide text-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
