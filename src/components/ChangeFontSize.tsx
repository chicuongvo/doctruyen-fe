import { AArrowDown, AArrowUp, Minus, Plus, Type } from "lucide-react";
import { useState } from "react";

type ChangeFontSizeProps = {
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
};

export default function ChangeFontSize({
  fontSize,
  setFontSize,
}: ChangeFontSizeProps) {
  const adjustFontSize = (increment: boolean) => {
    setFontSize((prev) => {
      const newSize = increment
        ? Math.min(prev + 2, 32)
        : Math.max(prev - 2, 14);
      return newSize;
    });
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center bg-white rounded-lg shadow-sm border border-secondary p-1">
        <button
          onClick={() => adjustFontSize(false)}
          className={`p-2 rounded-md hover:bg-violet-100 transition-colors disabled:opacity-50 cursor-${fontSize <= 14 ? "not-allowed" : "pointer"}`}
          disabled={fontSize <= 14}
        >
          <Minus className="h-4 w-4 text-secondary" />
        </button>
        <div className="flex items-center px-3">
          <Type className="h-4 w-4 text-secondary mr-1" />
          <span className="text-sm font-medium text-secondary">
            {fontSize}px
          </span>
        </div>
        <button
          onClick={() => adjustFontSize(true)}
          className={`p-2 rounded-md hover:bg-violet-100 transition-colors disabled:opacity-50 cursor-${fontSize >= 32 ? "not-allowed" : "pointer"}`}
          disabled={fontSize >= 32}
        >
          <Plus className="h-4 w-4 text-secondary" />
        </button>
      </div>
    </div>
  );
}
