'use client';

import React from 'react';
import { useBuilderStore } from '@/stores/builder-store';
import { useCartStore } from '@/stores/cart-store';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Undo2, Redo2, Trash2, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

const BASE_PRICES = {
  bracelet: 49.99,
  necklace: 89.99,
  anklet: 39.99,
};

export function DesignInfo() {
  const { 
    placedBeads, 
    baseType, 
    setBaseType, 
    zoom, 
    setZoom, 
    removeBead, 
    resetBuilder,
    historyIndex,
    history,
    undo,
    redo,
    totalPrice
  } = useBuilderStore();
  const { addItem } = useCartStore();

  const basePrice = BASE_PRICES[baseType];
  const beadsTotal = placedBeads.reduce((sum, pb) => sum + pb.bead.price, 0);
  const uniqueTypes = new Set(placedBeads.map(pb => pb.bead.id)).size;

  const handleSave = () => {
    toast.success('Design saved successfully!');
  };

  const handleAddToCart = () => {
    addItem({
      name: `Custom ${baseType.charAt(0).toUpperCase() + baseType.slice(1)}`,
      type: 'design',
      price: totalPrice,
      quantity: 1,
      beads: placedBeads,
      image: '/images/custom-placeholder.png'
    });
    toast.success('Added to cart!');
  };

  return (
    <div className="w-80 flex flex-col bg-[#0a0a0a] border-l border-white/10 h-full">
      <div className="p-5 border-b border-white/10">
        <h2 className="text-lg font-medium text-white tracking-wide font-serif mb-4">Design Info</h2>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs text-white/60 uppercase tracking-wider">Base Type</label>
            <Select value={baseType} onValueChange={(val: any) => setBaseType(val)}>
              <SelectTrigger className="w-full bg-[#111111] border-white/20 text-white">
                <SelectValue placeholder="Select base" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-white/20 text-white">
                <SelectItem value="bracelet">Bracelet ($49.99)</SelectItem>
                <SelectItem value="necklace">Necklace ($89.99)</SelectItem>
                <SelectItem value="anklet">Anklet ($39.99)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs text-white/60 uppercase tracking-wider">Zoom</label>
              <span className="text-xs text-white/80">{Math.round(zoom * 100)}%</span>
            </div>
            <Slider 
              value={[zoom]} 
              min={0.5} 
              max={2} 
              step={0.1}
              onValueChange={([val]) => setZoom(val)}
              className="py-2"
            />
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 border-white/20 text-white bg-transparent hover:bg-white/10" 
                onClick={undo} 
                disabled={historyIndex <= 0}
              >
                <Undo2 size={14} />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 border-white/20 text-white bg-transparent hover:bg-white/10" 
                onClick={redo} 
                disabled={historyIndex >= history.length - 1}
              >
                <Redo2 size={14} />
              </Button>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetBuilder} 
              className="text-red-400 hover:text-red-300 hover:bg-red-400/10 h-8 text-xs"
            >
              Clear All
            </Button>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-5">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 bg-[#111111] p-3 rounded-lg border border-white/5">
            <div>
              <p className="text-xs text-white/50 mb-1">Total Beads</p>
              <p className="text-xl text-white font-medium">{placedBeads.length}</p>
            </div>
            <div>
              <p className="text-xs text-white/50 mb-1">Unique Types</p>
              <p className="text-xl text-white font-medium">{uniqueTypes}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm text-white/80 font-medium">Placed Beads</h3>
            {placedBeads.length === 0 ? (
              <p className="text-xs text-white/40 italic">No beads added yet.</p>
            ) : (
              <div className="space-y-2">
                {placedBeads.map((pb, idx) => (
                  <div key={pb.id} className="flex items-center justify-between bg-[#111111] p-2 rounded-md border border-white/5 group">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: pb.bead.color }} />
                      <div className="flex flex-col">
                        <span className="text-xs text-white/90 truncate max-w-[100px]">{pb.bead.name}</span>
                        <span className="text-[10px] text-white/50">#{idx + 1}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#c9a96e]">${pb.bead.price}</span>
                      <button onClick={() => removeBead(pb.id)} className="text-white/30 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      <div className="p-5 border-t border-white/10 bg-[#0f0f0f] space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Base Price</span>
            <span className="text-white">${basePrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Beads ({placedBeads.length})</span>
            <span className="text-white">${beadsTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-serif pt-2 border-t border-white/10">
            <span className="text-white">Total</span>
            <span className="text-[#c9a96e]">${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="border-[#c9a96e] text-[#c9a96e] hover:bg-[#c9a96e]/10" onClick={handleSave}>
            Save
          </Button>
          <Button className="bg-[#c9a96e] hover:bg-[#b8985d] text-black" onClick={handleAddToCart}>
            <ShoppingBag size={16} className="mr-2" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
