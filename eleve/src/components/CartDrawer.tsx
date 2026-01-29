import { Minus, Plus, X, ShoppingBag, Trash2 } from "lucide-react";
import type { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ScrollArea } from "@/components/ui/scroll-area";

const CartDrawer = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart } = useCart();

  const handleImgError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/placeholder.svg";
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="p-2 text-foreground/80 hover:text-primary transition-colors relative"
          aria-label="Shopping bag"
        >
          <ShoppingBag size={20} />
          {totalItems > 0 && (
            <span className="absolute -top-0 -right-0 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-medium rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-display text-xl font-medium">
              Shopping Bag ({totalItems})
            </SheetTitle>
            <SheetClose asChild>
              <button className="p-2 hover:bg-muted rounded-full transition-colors">
                <X size={20} />
              </button>
            </SheetClose>
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
              <ShoppingBag size={32} className="text-muted-foreground" />
            </div>
            <h3 className="font-display text-lg font-medium text-foreground mb-2">
              Your bag is empty
            </h3>
            <p className="text-muted-foreground text-sm text-center mb-6">
              Discover our curated collection and find something you'll love.
            </p>
            <SheetClose asChild>
              <Link
                to="/"
                className="btn-fashion-primary"
              >
                Continue Shopping
              </Link>
            </SheetClose>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6">
              <div className="py-4 space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}-${item.color}`}
                    className="flex gap-4 pb-4 border-b border-border last:border-0"
                  >
                    {/* Product Image */}
                    <Link
                      to={`/product/${item.id}`}
                      className="w-20 h-24 bg-muted flex-shrink-0 overflow-hidden"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        onError={handleImgError}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2">
                        <Link
                          to={`/product/${item.id}`}
                          className="font-display font-medium text-foreground hover:text-primary transition-colors truncate"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.id, item.size, item.color)}
                          className="p-1 text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                        <p>Size: {item.size}</p>
                        <p>Color: {item.color}</p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.size, item.color, item.quantity - 1)
                            }
                            className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.size, item.color, item.quantity + 1)
                            }
                            className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-medium text-foreground">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="border-t border-border px-6 py-4 space-y-4 bg-background">
              {/* Subtotal */}
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-display text-lg font-medium text-foreground">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>

              {/* Checkout Button */}
              <Button
                className="w-full h-12 bg-foreground text-background hover:bg-primary text-sm tracking-fashion font-medium"
              >
                PROCEED TO CHECKOUT
              </Button>

              {/* Continue Shopping */}
              <SheetClose asChild>
                <button className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Continue Shopping
                </button>
              </SheetClose>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
