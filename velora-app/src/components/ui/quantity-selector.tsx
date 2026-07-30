"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function QuantitySelector({ 
  value, 
  onChange, 
  min = 1, 
  max = 99,
  className 
}: QuantitySelectorProps) {
  
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val >= min && val <= max) {
      onChange(val);
    }
  };

  return (
    <div className={cn("flex items-center border border-border rounded-sm w-fit", className)}>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-9 w-9 rounded-none text-muted-foreground hover:text-foreground"
        onClick={handleDecrement}
        disabled={value <= min}
      >
        <Minus className="h-3 w-3" />
        <span className="sr-only">Decrease quantity</span>
      </Button>
      
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className="w-12 h-9 text-center bg-transparent text-sm font-medium focus:outline-none focus:ring-0 [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
      />
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-9 w-9 rounded-none text-muted-foreground hover:text-foreground"
        onClick={handleIncrement}
        disabled={value >= max}
      >
        <Plus className="h-3 w-3" />
        <span className="sr-only">Increase quantity</span>
      </Button>
    </div>
  )
}
