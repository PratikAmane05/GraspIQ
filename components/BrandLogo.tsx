"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { cn } from "@/components/utils/cn";

interface BrandLogoProps {
  size?: number; // height in px (width auto based on square)
  withText?: boolean;
  className?: string;
  priority?: boolean;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 32,
  withText = true,
  className,
  priority,
  onClick,
}) => {
  return (
    <Link
      href="/"
      className={cn(
        "group flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
        className
      )}
      aria-label={withText ? "Grasp IQ home" : "Home"}
      onClick={onClick}
    >
      <span className="relative inline-flex">
        <Image
          src="/logo.png"
          alt="Grasp IQ logo"
          width={size}
          height={size}
          priority={priority}
          className="rounded-sm select-none drop-shadow-sm group-hover:drop-shadow-[0_0_4px_rgba(56,189,248,0.35)] transition-shadow"
        />
      </span>
      {withText && (
        <span className="font-semibold tracking-tight text-white text-sm md:text-base whitespace-nowrap">
          GRASP <span className="text-cyan-400">IQ</span>
        </span>
      )}
    </Link>
  );
};
