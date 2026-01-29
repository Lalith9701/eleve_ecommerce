interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSelect: (size: string) => void;
}

const SizeSelector = ({ sizes, selectedSize, onSelect }: SizeSelectorProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium tracking-fashion text-foreground">
          SIZE
        </span>
        <button className="text-xs text-muted-foreground hover:text-primary underline transition-colors">
          Size Guide
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className={`min-w-[48px] px-4 py-3 text-sm font-medium tracking-wider border transition-all duration-300 ${
              selectedSize === size
                ? "bg-foreground text-background border-foreground"
                : "bg-background text-foreground border-border hover:border-foreground"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
