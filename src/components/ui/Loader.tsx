"use client";

import { cn } from "@/lib/utils";

export const Loader = ({
    className
}: {
    className?: string
}) => {
    return (
        <div className={cn(["border-4 border-current border-l-transparent rounded-full w-8 h-8 animate-spin", className])}></div>

    )
}