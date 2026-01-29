import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Heart, Truck, RotateCcw, Shield, Minus, Plus, ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageGallery from "@/components/product/ImageGallery";
import SizeSelector from "@/components/product/SizeSelector";
import ColorSelector from "@/components/product/ColorSelector";
import ProductReviews from "@/components/product/ProductReviews";
import { getProductById } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Button } from "@/components/ui/button";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(Number(id));
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const isWishlisted = product ? isInWishlist(product.id) : false;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl mb-4">Product not found</h1>
          <Link to="/" className="text-primary hover:underline">
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
    });
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <>
      <Helmet>
        <title>{product.name} | ELEVÉ</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={`${product.name} | ELEVÉ`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.images[0]} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            image: product.images,
            offers: {
              "@type": "Offer",
              price: product.price,
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        <Header />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6 lg:px-12">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft size={16} />
                Back to Shop
              </Link>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Image Gallery */}
              <ImageGallery images={product.images} productName={product.name} />

              {/* Product Info */}
              <div className="space-y-8">
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs tracking-fashion text-muted-foreground uppercase">
                      {product.category}
                    </span>
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
                  <h1 className="font-display text-4xl lg:text-5xl font-medium text-foreground">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-2xl text-foreground">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>

                {/* Color Selector */}
                <ColorSelector
                  colors={product.colors}
                  selectedColor={selectedColor}
                  onSelect={setSelectedColor}
                />

                {/* Size Selector */}
                <SizeSelector
                  sizes={product.sizes}
                  selectedSize={selectedSize}
                  onSelect={setSelectedSize}
                />

                {/* Quantity & Add to Cart */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Quantity */}
                  <div className="flex items-center border border-border">
                    <button
                      onClick={decrementQuantity}
                      className="w-12 h-12 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={incrementQuantity}
                      className="w-12 h-12 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <Button
                    onClick={handleAddToCart}
                    disabled={!selectedSize || !selectedColor}
                    className="flex-1 h-12 bg-foreground text-background hover:bg-primary text-sm tracking-fashion font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {!selectedSize || !selectedColor
                      ? "SELECT SIZE & COLOR"
                      : "ADD TO BAG"}
                  </Button>

                  {/* Wishlist */}
                  <button
                    onClick={() =>
                      toggleWishlist({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.images[0],
                        category: product.category,
                      })
                    }
                    className={`w-12 h-12 border flex items-center justify-center transition-colors ${
                      isWishlisted
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-foreground hover:border-foreground"
                    }`}
                    aria-label="Add to wishlist"
                  >
                    <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                  </button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                  <div className="text-center space-y-2">
                    <Truck className="mx-auto text-primary" size={24} />
                    <p className="text-xs text-muted-foreground">Free Shipping</p>
                  </div>
                  <div className="text-center space-y-2">
                    <RotateCcw className="mx-auto text-primary" size={24} />
                    <p className="text-xs text-muted-foreground">30-Day Returns</p>
                  </div>
                  <div className="text-center space-y-2">
                    <Shield className="mx-auto text-primary" size={24} />
                    <p className="text-xs text-muted-foreground">Secure Payment</p>
                  </div>
                </div>

                {/* Product Details */}
                <div className="pt-6 border-t border-border space-y-4">
                  <h3 className="text-sm font-medium tracking-fashion">DETAILS</h3>
                  <ul className="space-y-2">
                    {product.details.map((detail, index) => (
                      <li
                        key={index}
                        className="text-sm text-muted-foreground flex items-center gap-2"
                      >
                        <span className="w-1 h-1 bg-primary rounded-full" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-foreground font-medium">Material:</span>{" "}
                    {product.material}
                  </p>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <ProductReviews productId={product.id} />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ProductDetail;
