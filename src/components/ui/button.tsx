"use client";

import { Button as HeroUIButton } from "@heroui/react";
import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  onClick,
  href,
  type = "button",
  variant = "primary",
  disabled = false,
  isLoading = false,
  className = "",
  size = "md",
}: ButtonProps) {
  const baseStyle = "font-sans uppercase text-[10px] tracking-widest font-medium border transition-colors duration-200 rounded-none shadow-none cursor-pointer";

  let variantStyle = "";
  if (variant === "primary") {
    // Solid bronze background with dark text, inverts/brightens on hover
    variantStyle = "bg-accent border-accent text-background hover:bg-accent-hover hover:border-accent-hover";
  } else if (variant === "secondary") {
    // Transparent background, thin border, light text, changes border/bg on hover
    variantStyle = "bg-transparent border-border text-primary hover:bg-surface hover:border-accent";
  } else if (variant === "danger") {
    variantStyle = "bg-transparent border-red-800/40 text-red-400 hover:bg-red-950/20 hover:border-red-600";
  }

  let sizeStyle = "";
  if (size === "sm") sizeStyle = "px-4 py-2 text-[10px]";
  else if (size === "md") sizeStyle = "px-6 py-3";
  else if (size === "lg") sizeStyle = "px-8 py-4 text-sm";

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`${baseStyle} ${variantStyle} ${sizeStyle} ${className} inline-flex items-center justify-center`}
      >
        {children}
      </Link>
    );
  }

  return (
    <HeroUIButton
      type={type}
      onClick={onClick}
      isDisabled={disabled}
      isPending={isLoading}
      className={`${baseStyle} ${variantStyle} ${sizeStyle} ${className}`}
    >
      {children}
    </HeroUIButton>
  );
}
