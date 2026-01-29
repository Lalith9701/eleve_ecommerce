import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, ChevronDown } from "lucide-react";
import StarRating from "./StarRating";
import { Button } from "@/components/ui/button";

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  helpful: number;
  verified: boolean;
}

interface ProductReviewsProps {
  productId: number;
}

// Mock reviews data
const mockReviews: Record<number, Review[]> = {
  1: [
    {
      id: 1,
      author: "Victoria M.",
      rating: 5,
      date: "December 15, 2025",
      title: "Absolutely stunning dress",
      content: "This silk dress exceeded all my expectations. The fabric is incredibly luxurious and drapes beautifully. I wore it to a gala and received so many compliments. Worth every penny!",
      helpful: 24,
      verified: true,
    },
    {
      id: 2,
      author: "Sarah L.",
      rating: 4,
      date: "November 28, 2025",
      title: "Beautiful quality, runs slightly large",
      content: "The craftsmanship is impeccable and the silk is divine. I would recommend sizing down one size as it runs a bit large. Otherwise, a gorgeous addition to my wardrobe.",
      helpful: 18,
      verified: true,
    },
    {
      id: 3,
      author: "Emma R.",
      rating: 5,
      date: "November 10, 2025",
      title: "Perfect for special occasions",
      content: "I purchased this for my anniversary dinner and it was absolutely perfect. The midnight black color is so elegant and the fit is flattering. Highly recommend!",
      helpful: 12,
      verified: false,
    },
  ],
  2: [
    {
      id: 1,
      author: "James D.",
      rating: 5,
      date: "December 20, 2025",
      title: "Exceptional tailoring",
      content: "The attention to detail in this blazer is remarkable. The wool blend is soft yet structured, and the fit is perfect. A timeless piece that elevates any outfit.",
      helpful: 31,
      verified: true,
    },
    {
      id: 2,
      author: "Michael T.",
      rating: 4,
      date: "December 5, 2025",
      title: "Great quality, classic style",
      content: "Very pleased with this purchase. The construction is solid and it looks expensive. Only giving 4 stars because I wish it came in more colors.",
      helpful: 15,
      verified: true,
    },
  ],
};

// Generate default reviews for products without specific reviews
const defaultReviews: Review[] = [
  {
    id: 1,
    author: "Alexandra P.",
    rating: 5,
    date: "December 18, 2025",
    title: "Exceeded expectations",
    content: "Beautiful quality and exactly as pictured. The attention to detail is impressive and it arrived in beautiful packaging. Will definitely be shopping here again.",
    helpful: 22,
    verified: true,
  },
  {
    id: 2,
    author: "Charlotte W.",
    rating: 4,
    date: "December 1, 2025",
    title: "Lovely piece",
    content: "Very happy with this purchase. Great quality materials and excellent craftsmanship. Shipping was fast and customer service was helpful with sizing questions.",
    helpful: 14,
    verified: true,
  },
  {
    id: 3,
    author: "Olivia K.",
    rating: 5,
    date: "November 22, 2025",
    title: "Worth the investment",
    content: "This is exactly what I was looking for. The quality is outstanding and it fits perfectly. A truly luxurious piece that feels special every time I wear it.",
    helpful: 19,
    verified: false,
  },
];

const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const reviews = mockReviews[productId] || defaultReviews;
  const [showAll, setShowAll] = useState(false);
  const [helpfulClicked, setHelpfulClicked] = useState<number[]>([]);

  const displayedReviews = showAll ? reviews : reviews.slice(0, 2);
  
  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  const handleHelpful = (reviewId: number) => {
    if (!helpfulClicked.includes(reviewId)) {
      setHelpfulClicked([...helpfulClicked, reviewId]);
    }
  };

  // Rating distribution
  const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => Math.floor(r.rating) === rating).length,
    percentage: (reviews.filter(r => Math.floor(r.rating) === rating).length / totalReviews) * 100,
  }));

  return (
    <div className="pt-12 border-t border-border">
      <h2 className="font-display text-2xl font-medium text-foreground mb-8">
        Customer Reviews
      </h2>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Rating Summary */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="font-display text-5xl font-medium text-foreground">
              {averageRating.toFixed(1)}
            </span>
            <div>
              <StarRating rating={averageRating} size={20} />
              <p className="text-sm text-muted-foreground mt-1">
                Based on {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
              </p>
            </div>
          </div>

          {/* Rating Bars */}
          <div className="space-y-2">
            {ratingCounts.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-12">
                  {rating} star
                </span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-8">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            {displayedReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-muted/30 rounded-lg"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground">
                        {review.author}
                      </span>
                      {review.verified && (
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] tracking-fashion font-medium rounded">
                          VERIFIED
                        </span>
                      )}
                    </div>
                    <StarRating rating={review.rating} size={14} />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {review.date}
                  </span>
                </div>

                <h4 className="font-medium text-foreground mb-2">
                  {review.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {review.content}
                </p>

                <button
                  onClick={() => handleHelpful(review.id)}
                  disabled={helpfulClicked.includes(review.id)}
                  className={`flex items-center gap-2 text-xs transition-colors ${
                    helpfulClicked.includes(review.id)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <ThumbsUp size={14} fill={helpfulClicked.includes(review.id) ? "currentColor" : "none"} />
                  Helpful ({review.helpful + (helpfulClicked.includes(review.id) ? 1 : 0)})
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {reviews.length > 2 && (
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="w-full text-xs tracking-fashion"
            >
              {showAll ? "Show Less" : `Show All ${reviews.length} Reviews`}
              <ChevronDown
                size={16}
                className={`ml-2 transition-transform ${showAll ? "rotate-180" : ""}`}
              />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
