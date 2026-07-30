'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { BeadPalette } from '@/components/builder/bead-palette';
import { DesignInfo } from '@/components/builder/design-info';
import { BuilderHeader } from '@/components/builder/builder-header';

const BuilderCanvas = dynamic(
  () => import('@/components/builder/builder-canvas').then((mod) => mod.BuilderCanvas),
  { ssr: false, loading: () => <div className="flex-1 bg-[#111111] flex items-center justify-center text-white/50">Loading Canvas...</div> }
);

export default function BuilderPage() {
  return (
    <div className="flex flex-col h-screen w-full bg-black overflow-hidden selection:bg-[#c9a96e]/30">
      <BuilderHeader />
      <div className="flex flex-1 overflow-hidden">
        <BeadPalette />
        <BuilderCanvas />
        <DesignInfo />
      </div>
    </div>
  );
}
