import { useState, type SyntheticEvent } from "react";
import { Heart, Minus, Plus, X } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface ProductQuickViewProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProductQuickView = ({ product, open, onOpenChange }: ProductQuickViewProps) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) return null;

  const isWishlisted = isInWishlist(product.id);

  const handleImgError = (e: SyntheticEvent<HTMLImageElement>) => {
    const attempted = Number(e.currentTarget.dataset.fallbackIdx ?? String(currentImageIndex));
    const next = attempted + 1;

    if (next < product.images.length) {
      e.currentTarget.dataset.fallbackIdx = String(next);
      setCurrentImageIndex(next);
      return;
    }

    e.currentTarget.src = "/placeholder.svg";
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
    });
    onOpenChange(false);
  };

  const handleToggleWishlist = () => {
    toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden">
        <VisuallyHidden>
          <DialogTitle>{product.name} Quick View</DialogTitle>
        </VisuallyHidden>
        
        <div className="grid md:grid-cols-2">
          {/* Image Section */}
          <div className="relative bg-muted">
            <img
              key={currentImageIndex}
              src={product.images[currentImageIndex]}
              alt={product.name}
              onError={handleImgError}
              className="w-full aspect-square object-cover"
            />
            
            {/* Thumbnail Navigation */}
            {product.images.length > 1 && (
              <div className="absolute bottom-4 left-4 right-4 flex gap-2 justify-center">
                {product.images.slice(0, 4).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-12 h-12 rounded overflow-hidden border-2 transition-all ${
                      currentImageIndex === idx
                        ? "border-primary"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      loading="lazy"
                      onError={handleImgError}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

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
          </div>

          {/* Details Section */}
          <div className="p-6 md:p-8 flex flex-col">
            {/* Header */}
            <div className="space-y-3 mb-6">
              <p className="text-xs tracking-fashion text-muted-foreground uppercase">
                {product.category}
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-medium text-foreground">
                {product.name}
              </h2>
              <div className="flex items-center gap-3">
                <span className="font-display text-xl text-foreground">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
              {product.description}
            </p>

            {/* Color Selector */}
            <div className="mb-6">
              <p className="text-xs font-medium tracking-fashion mb-3">
                COLOR: {selectedColor || "Select a color"}
              </p>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color.name
                        ? "border-primary scale-110"
                        : "border-muted hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <p className="text-xs font-medium tracking-fashion mb-3">
                SIZE: {selectedSize || "Select a size"}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[44px] h-10 px-3 border text-sm font-medium transition-all ${
                      selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="flex gap-3 mt-auto">
              {/* Quantity */}
              <div className="flex items-center border border-border">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Add to Cart */}
              <Button
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedColor}
                className="flex-1 h-10 bg-foreground text-background hover:bg-primary text-xs tracking-fashion font-medium"
              >
                {!selectedSize || !selectedColor ? "SELECT OPTIONS" : "ADD TO BAG"}
              </Button>

              {/* Wishlist */}
              <button
                onClick={handleToggleWishlist}
                className={`w-10 h-10 border flex items-center justify-center transition-colors ${
                  isWishlisted
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-foreground"
                }`}
              >
                <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            {/* View Full Details Link */}
            <Link
              to={`/product/${product.id}`}
              onClick={() => onOpenChange(false)}
              className="text-xs text-center text-muted-foreground hover:text-primary mt-4 underline transition-colors"
            >
              View Full Details
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductQuickView;
