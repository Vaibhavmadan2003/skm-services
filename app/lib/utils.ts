import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with proper override handling
 * Combines clsx for conditional classes with twMerge for Tailwind specificity
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
