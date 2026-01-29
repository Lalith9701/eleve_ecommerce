import { useState, useMemo, type SyntheticEvent } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Heart, Eye, SlidersHorizontal, X, ArrowUpDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products, Product } from "@/data/products";
import { useWishlist } from "@/contexts/WishlistContext";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import ProductQuickView from "@/components/ProductQuickView";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOption = "featured" | "newest" | "bestsellers" | "price-low" | "price-high";

const categories = [...new Set(products.map((p) => p.category))];
const allColors = products.flatMap((p) => p.colors);
const uniqueColors = allColors.reduce(
  (acc, color) => {
    if (!acc.some((c) => c.name === color.name)) {
      acc.push(color);
    }
    return acc;
  },
  [] as { name: string; hex: string }[]
);

const maxPrice = Math.max(...products.map((p) => p.price));
const minPrice = Math.min(...products.map((p) => p.price));

const Products = () => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const categoryMatch =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const colorMatch =
        selectedColors.length === 0 ||
        product.colors.some((c) => selectedColors.includes(c.name));
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      return categoryMatch && colorMatch && priceMatch;
    });

    // Apply sorting
    switch (sortBy) {
      case "newest":
        result = result.filter((p) => p.isNew).concat(result.filter((p) => !p.isNew));
        break;
      case "bestsellers":
        result = result.filter((p) => p.isBestseller).concat(result.filter((p) => !p.isBestseller));
        break;
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      default:
        // "featured" - keep original order
        break;
    }

    return result;
  }, [selectedCategories, selectedColors, priceRange, sortBy]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const toggleColor = (colorName: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorName) ? prev.filter((c) => c !== colorName) : [...prev, colorName]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setPriceRange([minPrice, maxPrice]);
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedColors.length > 0 ||
    priceRange[0] > minPrice ||
    priceRange[1] < maxPrice;

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-medium tracking-fashion mb-4">CATEGORY</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <Checkbox
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-medium tracking-fashion mb-4">PRICE RANGE</h3>
        <div className="px-1">
          <Slider
            value={priceRange}
            min={minPrice}
            max={maxPrice}
            step={10}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="mb-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="text-sm font-medium tracking-fashion mb-4">COLOR</h3>
        <div className="flex flex-wrap gap-3">
          {uniqueColors.map((color) => (
            <button
              key={color.name}
              onClick={() => toggleColor(color.name)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                selectedColors.includes(color.name)
                  ? "border-primary scale-110"
                  : "border-transparent hover:scale-105"
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
              aria-label={`Filter by ${color.name}`}
            />
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full text-xs tracking-fashion"
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Shop All Products | ELEVÉ</title>
        <meta
          name="description"
          content="Explore our curated collection of luxury fashion pieces. Filter by category, price, and color to find your perfect style."
        />
      </Helmet>

      <div className="min-h-screen">
        <Header />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6 lg:px-12">
            {/* Page Header */}
            <ScrollReveal>
              <div className="text-center mb-12">
                <p className="text-xs tracking-fashion text-primary font-medium mb-4">
                  THE COLLECTION
                </p>
                <h1 className="font-display text-4xl lg:text-5xl font-medium text-foreground">
                  Shop All
                </h1>
              </div>
            </ScrollReveal>

            {/* Filters & Results Bar */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
              {/* Mobile Filter Button */}
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="lg:hidden flex items-center gap-2 text-xs tracking-fashion"
                  >
                    <SlidersHorizontal size={16} />
                    Filters
                    {hasActiveFilters && (
                      <span className="w-5 h-5 bg-primary text-primary-foreground rounded-full text-[10px] flex items-center justify-center">
                        {selectedCategories.length + selectedColors.length}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="font-display text-lg tracking-wide">
                      Filters
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-8">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Results Count & Sort */}
              <div className="flex items-center gap-4">
                <p className="text-sm text-muted-foreground hidden sm:block">
                  {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
                </p>
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                  <SelectTrigger className="w-[160px] text-xs tracking-fashion">
                    <ArrowUpDown size={14} className="mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="bestsellers">Bestsellers</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Active Filters Tags (Desktop) */}
              {hasActiveFilters && (
                <div className="hidden lg:flex items-center gap-2">
                  {selectedCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className="flex items-center gap-1 px-3 py-1 bg-muted text-xs rounded-full hover:bg-muted/70 transition-colors"
                    >
                      {cat}
                      <X size={12} />
                    </button>
                  ))}
                  {selectedColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => toggleColor(color)}
                      className="flex items-center gap-1 px-3 py-1 bg-muted text-xs rounded-full hover:bg-muted/70 transition-colors"
                    >
                      {color}
                      <X size={12} />
                    </button>
                  ))}
                  <button
                    onClick={clearFilters}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors underline"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>

            <div className="flex gap-12">
              {/* Desktop Sidebar Filters */}
              <aside className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-28">
                  <FilterContent />
                </div>
              </aside>

              {/* Products Grid */}
              <div className="flex-1">
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-muted-foreground mb-4">
                      No products match your filters.
                    </p>
                    <Button variant="outline" onClick={clearFilters}>
                      Clear Filters
                    </Button>
                  </div>
                ) : (
                  <StaggerContainer
                    className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8"
                    staggerDelay={0.08}
                  >
                    {filteredProducts.map((product) => (
                      <StaggerItem key={product.id}>
                        <ProductCard
                          product={product}
                          isInWishlist={isInWishlist(product.id)}
                          onToggleWishlist={() =>
                            toggleWishlist({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              image: product.images[0],
                              category: product.category,
                            })
                          }
                          onQuickView={() => setQuickViewProduct(product)}
                        />
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>

      <ProductQuickView
        product={quickViewProduct}
        open={!!quickViewProduct}
        onOpenChange={(open) => !open && setQuickViewProduct(null)}
      />
    </>
  );
};

interface ProductCardProps {
  product: Product;
  isInWishlist: boolean;
  onToggleWishlist: () => void;
  onQuickView: () => void;
}

const ProductCard = ({ product, isInWishlist, onToggleWishlist, onQuickView }: ProductCardProps) => {
  const handleImgError = (e: SyntheticEvent<HTMLImageElement>) => {
    const attempted = Number(e.currentTarget.dataset.fallbackIdx ?? "0");
    const next = attempted + 1;

    if (next < product.images.length) {
      e.currentTarget.dataset.fallbackIdx = String(next);
      e.currentTarget.src = product.images[next];
      return;
    }

    e.currentTarget.src = "/placeholder.svg";
  };

  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted mb-4">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            onError={handleImgError}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-3 py-1 bg-primary text-primary-foreground text-[10px] tracking-fashion font-medium">
              NEW
            </span>
          )}
          {product.isBestseller && (
            <span className="px-3 py-1 bg-foreground text-background text-[10px] tracking-fashion font-medium">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={onToggleWishlist}
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors ${
              isInWishlist
                ? "bg-primary text-primary-foreground"
                : "bg-card hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            <Heart size={18} fill={isInWishlist ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Quick View */}
        <button
          onClick={onQuickView}
          className="absolute bottom-4 left-4 right-4 py-3 bg-foreground text-background text-xs tracking-fashion font-medium flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary"
        >
          <Eye size={16} />
          QUICK VIEW
        </button>
      </div>

      {/* Product Info */}
      <Link to={`/product/${product.id}`} className="block space-y-2">
        <p className="text-xs text-muted-foreground tracking-wider uppercase">
          {product.category}
        </p>
        <h3 className="font-display text-lg font-medium text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">${product.price}</span>
          {product.originalPrice && (
            <span className="text-muted-foreground line-through text-sm">
              ${product.originalPrice}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Products;
