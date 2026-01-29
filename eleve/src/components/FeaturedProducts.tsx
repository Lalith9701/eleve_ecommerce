import { useState, type SyntheticEvent } from "react";
import { Heart, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { products, Product } from "@/data/products";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import { useWishlist } from "@/contexts/WishlistContext";
import ProductQuickView from "@/components/ProductQuickView";

const FeaturedProducts = () => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const handleImgError = (e: SyntheticEvent<HTMLImageElement>, sources: string[]) => {
    const attempted = Number(e.currentTarget.dataset.fallbackIdx ?? "0");
    const next = attempted + 1;

    if (next < sources.length) {
      e.currentTarget.dataset.fallbackIdx = String(next);
      e.currentTarget.src = sources[next];
      return;
    }

    e.currentTarget.src = "/placeholder.svg";
  };

  return (
    <>
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
              <div>
                <p className="text-xs tracking-fashion text-primary font-medium mb-4">
                  HANDPICKED FOR YOU
                </p>
                <h2 className="font-display text-4xl lg:text-5xl font-medium text-foreground">
                  Featured Pieces
                </h2>
              </div>
              <Link
                to="/products"
                className="mt-6 lg:mt-0 text-sm font-medium tracking-fashion text-foreground hover:text-primary transition-colors link-underline"
              >
                VIEW ALL PRODUCTS
              </Link>
            </div>
          </ScrollReveal>

          {/* Products Grid */}
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8" staggerDelay={0.1}>
            {products.map((product) => (
              <StaggerItem key={product.id}>
                <div className="group">
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-muted mb-4">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        loading="lazy"
                        onError={(e) => handleImgError(e, product.images)}
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
                        onClick={() => toggleWishlist({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.images[0],
                          category: product.category,
                        })}
                        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors ${
                          isInWishlist(product.id)
                            ? "bg-primary text-primary-foreground"
                            : "bg-card hover:bg-primary hover:text-primary-foreground"
                        }`}
                      >
                        <Heart size={18} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                      </button>
                    </div>

                    {/* Quick View */}
                    <button 
                      onClick={() => setQuickViewProduct(product)}
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
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <ProductQuickView
        product={quickViewProduct}
        open={!!quickViewProduct}
        onOpenChange={(open) => !open && setQuickViewProduct(null)}
      />
    </>
  );
};

export default FeaturedProducts;
