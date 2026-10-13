'use client';

import { useLiveStatus } from '../hooks/useLiveStatus';
import { Radio } from 'lucide-react';

export default function LiveModeToggle() {
  const { isLive, isSimulated, toggleSimulation, mounted } = useLiveStatus();

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => toggleSimulation()}
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wider transition-all ${
          isSimulated
            ? 'bg-red-600 text-white shadow-sm shadow-red-900/50 hover:bg-red-500'
            : 'border border-white/20 bg-white/5 text-white/60 hover:border-white/40 hover:text-white'
        }`}
        title="Toggle simulation of Sunday celebration service live stream"
      >
        <span className={isSimulated ? 'live-dot !h-1.5 !w-1.5' : 'h-1.5 w-1.5 rounded-full bg-white/40'} />
        <Radio size={10} />
        <span>{isSimulated ? 'Exit Live Demo' : 'Test Live Broadcast'}</span>
      </button>
    </div>
  );
}
