import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getImageUrl = (path?: string) => {
  if (!path) return ""; // atau bisa kembalikan placeholder default
  return `http://localhost:5000/${path}`;
};