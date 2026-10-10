'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function Accordion({ items, defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-ink-950/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `accordion-panel-${i}`;
        return (
          <div key={item.q} className="border-t border-ink-950/10">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className="font-display text-xl uppercase leading-tight text-ink-950 sm:text-2xl">{item.q}</span>
              {isOpen ? (
                <Minus size={18} className="shrink-0 text-brand-600" />
              ) : (
                <Plus size={18} className="shrink-0 text-ink-950/50" />
              )}
            </button>
            {isOpen && (
              <p id={panelId} className="max-w-3xl pb-6 text-sm leading-relaxed text-ink-950/70 sm:text-base">
                {item.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
