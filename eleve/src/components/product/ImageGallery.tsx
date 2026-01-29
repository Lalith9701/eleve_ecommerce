import { useState, type SyntheticEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

const ImageGallery = ({ images, productName }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleThumbError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/placeholder.svg";
  };

  const handleMainError = (e: SyntheticEvent<HTMLImageElement>) => {
    if (images.length === 0) {
      e.currentTarget.src = "/placeholder.svg";
      return;
    }

    const attempted = Number(e.currentTarget.dataset.fallbackIdx ?? String(selectedIndex));
    const next = attempted + 1;

    if (next < images.length) {
      e.currentTarget.dataset.fallbackIdx = String(next);
      setSelectedIndex(next);
      return;
    }

    e.currentTarget.src = "/placeholder.svg";
  };

  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-[600px]">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`flex-shrink-0 w-20 h-24 overflow-hidden transition-all duration-300 ${
              selectedIndex === index
                ? "ring-2 ring-primary"
                : "ring-1 ring-border opacity-60 hover:opacity-100"
            }`}
          >
            <img
              src={image}
              alt={`${productName} view ${index + 1}`}
              loading="lazy"
              onError={handleThumbError}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative flex-1 aspect-[3/4] lg:aspect-auto lg:h-[600px] overflow-hidden bg-muted">
        <img
          key={selectedIndex}
          src={images[selectedIndex]}
          alt={productName}
          onError={handleMainError}
          className="w-full h-full object-cover transition-opacity duration-500"
        />

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-background transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-background transition-colors"
          aria-label="Next image"
        >
          <ChevronRight size={20} />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-background/80 backdrop-blur-sm text-xs tracking-fashion">
          {selectedIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
