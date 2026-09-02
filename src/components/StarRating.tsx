"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
}

export default function StarRating({ 
  value, 
  onChange, 
  readonly = true, 
  size = "md",
  showNumber = false 
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState(0);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-8 h-8"
  };

  const handleMouseEnter = (index: number) => {
    if (!readonly) {
      setHoverValue(index);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverValue(0);
    }
  };

  const handleClick = (index: number) => {
    if (!readonly && onChange) {
      onChange(index);
    }
  };

  const displayValue = hoverValue || value;

  return (
    <div className="flex items-center gap-2">
      <div 
        className="flex items-center gap-1"
        onMouseLeave={handleMouseLeave}
      >
        {[1, 2, 3, 4, 5].map((index) => {
          const isFilled = index <= displayValue;
          
          return (
            <button
              key={index}
              type="button"
              disabled={readonly}
              onClick={() => handleClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              className={cn(
                "focus:outline-none",
                readonly ? "cursor-default" : "cursor-pointer transition-transform hover:scale-110"
              )}
            >
              <Star 
                className={cn(
                  sizeClasses[size],
                  isFilled 
                    ? "text-ink-400 fill-ink-400" 
                    : "text-gray-600 fill-transparent"
                )} 
              />
            </button>
          );
        })}
      </div>
      {showNumber && (
        <span className="text-gray-300 font-medium">
          {value > 0 ? value.toFixed(1) : "0"}
        </span>
      )}
    </div>
  );
}
