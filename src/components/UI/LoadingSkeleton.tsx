// src/components/UI/LoadingSkeleton.tsx
"use client";

import { motion } from "framer-motion";

interface LoadingSkeletonProps {
    variant?: "hero" | "card" | "text" | "button";
    className?: string;
}

export default function LoadingSkeleton({
    variant = "card",
    className = ""
}: LoadingSkeletonProps) {
    const baseClasses = "animate-pulse bg-secondary/20 rounded";

    const variants = {
        hero: "h-96 w-full",
        card: "h-48 w-full",
        text: "h-4 w-3/4",
        button: "h-10 w-32"
    };

    return (
        <motion.div
            className={`${baseClasses} ${variants[variant]} ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        />
    );
}

// Multiple skeleton components for different sections
export function HeroSkeleton() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center space-y-6">
                <LoadingSkeleton variant="text" className="h-8 w-2/3 mx-auto" />
                <LoadingSkeleton variant="text" className="h-6 w-1/2 mx-auto" />
                <LoadingSkeleton variant="text" className="h-4 w-3/4 mx-auto" />
                <div className="flex justify-center gap-4 mt-8">
                    <LoadingSkeleton variant="button" />
                    <LoadingSkeleton variant="button" />
                </div>
            </div>
        </div>
    );
}

export function SectionSkeleton() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="space-y-8">
                <LoadingSkeleton variant="text" className="h-8 w-1/3" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <LoadingSkeleton key={i} variant="card" />
                    ))}
                </div>
            </div>
        </div>
    );
}