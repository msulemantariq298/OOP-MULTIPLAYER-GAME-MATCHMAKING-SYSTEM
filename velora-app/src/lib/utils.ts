import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Coupon } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return `${text.slice(0, length)}...`;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function getImageUrl(bucket: string, path: string): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return "";
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
}

export function calculateDiscount(price: number, coupon: Coupon): number {
  if (!coupon || !coupon.is_active) return 0;
  
  if (coupon.min_order && price < coupon.min_order) return 0;
  
  if (coupon.discount_type === 'percentage') {
    return price * (coupon.discount_value / 100);
  } else if (coupon.discount_type === 'fixed') {
    return Math.min(price, coupon.discount_value); // Don't discount more than the price
  }
  
  return 0;
}
