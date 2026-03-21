"use client";

import { useCallback, useState } from "react";
import { starRatingProps } from "../types/feedback";

const StarIcon = ({ filled }: { filled: boolean }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.5}
      className="size-8"
      aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
      />
    </svg>
  );
};
const StarList = [1, 2, 3, 4, 5] as const;
export const StarRatings = ({ rating, errors, onRatingChange, disable = false }: starRatingProps) => {
  const [hoverStar, setHoverStar] = useState<number | null>(null);
  const displayValue = hoverStar ?? rating;

  const handleMouseEnter = useCallback((star: number) => {
    setHoverStar(star);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoverStar(null);
  }, []);

  return (
    <>
      <div className="flex gap-1">
        {StarList.map((star) => {
          const isFilled = star <= displayValue;
          const isSelected = star === rating;
          return (
            <button
              key={star}
              className={`${isFilled ? "text-yellow-400" : "text-gray-500"}`}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={disable}
              onMouseEnter={() => handleMouseEnter(star)}
              onMouseLeave={handleMouseLeave}
              onClick={() => onRatingChange(star)}>
              <StarIcon filled={isFilled} />
            </button>
          );
        })}
      </div>
      {errors.rating && (
        <p role="alert" className="mt-1.5 text-sm text-red-600">
          {errors.rating}
        </p>
      )}
    </>
  );
};
