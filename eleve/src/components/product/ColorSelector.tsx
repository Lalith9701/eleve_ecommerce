import { Check } from "lucide-react";

interface Color {
  name: string;
  hex: string;
}

interface ColorSelectorProps {
  colors: Color[];
  selectedColor: string;
  onSelect: (color: string) => void;
}

const ColorSelector = ({ colors, selectedColor, onSelect }: ColorSelectorProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium tracking-fashion text-foreground">
          COLOR
        </span>
        <span className="text-sm text-muted-foreground">— {selectedColor}</span>
      </div>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => onSelect(color.name)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              selectedColor === color.name
                ? "ring-2 ring-offset-2 ring-primary"
                : "ring-1 ring-border hover:ring-foreground"
            }`}
            style={{ backgroundColor: color.hex }}
            aria-label={color.name}
            title={color.name}
          >
            {selectedColor === color.name && (
              <Check
                size={16}
                className={
                  color.hex === "#FFFFF0" || color.hex === "#F7E7CE"
                    ? "text-foreground"
                    : "text-white"
                }
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
