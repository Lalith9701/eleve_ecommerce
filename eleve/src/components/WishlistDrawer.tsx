import { Heart, X, ShoppingBag } from "lucide-react";
import type { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";

const WishlistDrawer = () => {
  const { items, removeFromWishlist, totalItems } = useWishlist();
  const { addToCart } = useCart();

  const handleImgError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/placeholder.svg";
  };

  const handleMoveToCart = (item: typeof items[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      size: "M",
      color: "Default",
    });
    removeFromWishlist(item.id);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="p-2 text-foreground/80 hover:text-primary transition-colors relative"
          aria-label="Wishlist"
        >
          <Heart size={20} />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display text-xl tracking-wide">
            Wishlist ({totalItems})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <Heart size={48} className="text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground mb-2">Your wishlist is empty</p>
              <p className="text-sm text-muted-foreground/70">
                Save items you love by clicking the heart icon
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-muted/30 rounded-lg"
                >
                  <Link to={`/product/${item.id}`} className="shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      onError={handleImgError}
                      className="w-20 h-24 object-cover rounded-md"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item.id}`}
                      className="font-medium text-sm hover:text-primary transition-colors line-clamp-2"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.category}
                    </p>
                    <p className="font-medium mt-2">${item.price}</p>
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-8 gap-1"
                        onClick={() => handleMoveToCart(item)}
                      >
                        <ShoppingBag size={14} />
                        Add to Bag
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-xs h-8 text-muted-foreground hover:text-destructive"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        <X size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default WishlistDrawer;
