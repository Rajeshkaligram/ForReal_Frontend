import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Transform localhost image URLs to use proxied path to avoid private IP warnings
 * Converts: http://localhost/uploads/products/... -> /uploads/products/...
 */
export function transformImageUrl(url?: string): string {
  if (!url) return "";
  
  // Replace localhost URLs with proxied path
  if (url.includes('localhost/uploads/')) {
    return url.replace(/http:\/\/localhost\/uploads\//g, '/uploads/');
  }
  
  return url;
}
