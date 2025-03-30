import { clsx, type ClassValue } from "clsx"
import exp from "constants"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getImageUrl = (path: string) => `http://localhost:5000/${path}`;
