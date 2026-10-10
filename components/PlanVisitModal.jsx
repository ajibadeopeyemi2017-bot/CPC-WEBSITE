'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import VisitForm from './visit/VisitForm';

export default function PlanVisitModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const open = () => setIsOpen(true);
    window.addEventListener('open-plan-visit-modal', open);
    return () => window.removeEventListener('open-plan-visit-modal', open);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && setIsOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink-950/75 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={() => setIsOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Plan your visit"
        className="relative max-h-[92dvh] w-full max-w-2xl overflow-y-auto bg-paper p-6 sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center border border-ink-950/20 text-ink-950 hover:border-ink-950"
        >
          <X size={18} />
        </button>
        <VisitForm />
      </div>
    </div>
  );
}
