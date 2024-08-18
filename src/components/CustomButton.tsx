"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

const CustomButton = ({
  handleClick,
  className,
  isSelected,
}: {
  handleClick: () => void;
  className?: string;
  isSelected: boolean;
}) => {

  return (
    <button
      className={cn(
        "sparkal-button",
        isSelected && "selected",
        "bg-[#222321] p-2 rounded-full",
        className
      )}
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
    >
      <div className="wrapper">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
      </div>
    </button>
  );
};
export default CustomButton;
