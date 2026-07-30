"use client"

import * as React from "react"
import Link from "next/link"
import { Heart, ShoppingBag } from "lucide-react"
import { cn, formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/ui/star-rating"
import { Product } from "@/types"

interface ProductCardProps {
  product: Product;
  className?: string;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
}

export function ProductCard({ 
  product, 
  className,
  onAddToCart,
  onToggleWishlist 
}: ProductCardProps) {
  const {
    id,
    name,
    price,
    original_price,
    image,
    images,
    is_new,
    is_sale,
    rating = 5,
  } = product;

  const productImage = image || images?.[0] || "";
  const hasOriginalPrice = typeof original_price === "number" && original_price > price;

  return (
    <div className={cn("group relative flex flex-col space-y-3", className)}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-muted">
        <div className="absolute left-2 top-2 z-10 flex flex-col gap-2">
          {is_new && <Badge variant="accent">New</Badge>}
          {is_sale && <Badge variant="destructive">Sale</Badge>}
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-2 z-10 rounded-full bg-black/20 hover:bg-black/50 backdrop-blur-sm"
          onClick={(e) => {
            e.preventDefault();
            onToggleWishlist?.(product);
          }}
        >
          <Heart className="h-4 w-4 text-white" />
        </Button>

        <Link href={`/shop/${id}`}>
          <div className="relative h-full w-full">
            <div 
              className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={productImage ? { backgroundImage: `url(${productImage})` } : undefined}
            />
          </div>
        </Link>

        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <Button 
            className="w-full bg-white/90 text-black hover:bg-white backdrop-blur-md"
            onClick={(e) => {
              e.preventDefault();
              onAddToCart?.(product);
            }}
          >
            <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </div>

      <div className="flex flex-col space-y-1">
        <Link href={`/shop/${id}`} className="hover:underline underline-offset-4">
          <h3 className="text-sm font-medium">{name}</h3>
        </Link>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold">{formatPrice(price)}</span>
          {hasOriginalPrice && original_price && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(original_price)}
            </span>
          )}
        </div>
        
        <StarRating rating={rating} />
      </div>
    </div>
  )
}
