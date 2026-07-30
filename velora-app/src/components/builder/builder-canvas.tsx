'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Stage, Layer, Circle, Ring, Group } from 'react-konva';
import { useBuilderStore } from '@/stores/builder-store';

export function BuilderCanvas() {
  const { placedBeads, zoom, selectBead, selectedBeadId, baseType, removeBead } = useBuilderStore();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;
  
  const baseRadius = baseType === 'necklace' ? 250 : baseType === 'anklet' ? 120 : 180;

  const handleWheel = (e: any) => {
    e.evt.preventDefault();
  };

  return (
    <div ref={containerRef} className="flex-1 bg-gradient-to-br from-[#111111] to-[#000000] overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.03] to-transparent pointer-events-none" />
      
      {dimensions.width > 0 && (
        <Stage 
          width={dimensions.width} 
          height={dimensions.height}
          onWheel={handleWheel}
          onClick={(e) => {
            if (e.target === e.target.getStage()) {
              selectBead(null);
            }
          }}
        >
          <Layer>
            <Group 
              x={centerX} 
              y={centerY} 
              scaleX={zoom} 
              scaleY={zoom}
            >
              <Circle
                x={0}
                y={0}
                radius={baseRadius}
                stroke="#c9a96e"
                strokeWidth={2}
                dash={[4, 8]}
                opacity={0.3}
              />
              <Circle
                x={0}
                y={0}
                radius={baseRadius}
                stroke="#ffffff"
                strokeWidth={1}
                opacity={0.1}
              />

              {placedBeads.map((placedBead, i) => {
                const total = Math.max(placedBeads.length, 1);
                const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
                const x = baseRadius * Math.cos(angle);
                const y = baseRadius * Math.sin(angle);
                const isSelected = selectedBeadId === placedBead.id;

                return (
                  <Group
                    key={placedBead.id}
                    x={x}
                    y={y}
                    onClick={(e) => {
                      e.cancelBubble = true;
                      selectBead(placedBead.id);
                    }}
                  >
                    <Circle
                      radius={14}
                      fill={placedBead.bead.color}
                      shadowColor="rgba(0,0,0,0.5)"
                      shadowBlur={5}
                      shadowOffsetX={2}
                      shadowOffsetY={2}
                    />
                    
                    <Circle
                      x={-3}
                      y={-3}
                      radius={4}
                      fill="rgba(255,255,255,0.4)"
                    />

                    {isSelected && (
                      <Ring
                        innerRadius={17}
                        outerRadius={19}
                        fill="#c9a96e"
                      />
                    )}
                  </Group>
                );
              })}
            </Group>
          </Layer>
        </Stage>
      )}

      {selectedBeadId && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#1a1a1a] border border-white/10 px-4 py-2 rounded-full flex items-center gap-4 shadow-xl z-10">
          <span className="text-white/80 text-sm">Bead Selected</span>
          <button 
            onClick={() => removeBead(selectedBeadId)}
            className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
