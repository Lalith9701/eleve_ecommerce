import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  showValue?: boolean;
}

const StarRating = ({ rating, maxRating = 5, size = 16, showValue = false }: StarRatingProps) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }, (_, index) => {
        const fillPercentage = Math.min(Math.max(rating - index, 0), 1);
        
        return (
          <div key={index} className="relative">
            <Star
              size={size}
              className="text-muted-foreground/30"
              fill="currentColor"
            />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fillPercentage * 100}%` }}
            >
              <Star
                size={size}
                className="text-primary"
                fill="currentColor"
              />
            </div>
          </div>
        );
      })}
      {showValue && (
        <span className="ml-1 text-sm text-muted-foreground">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating;
