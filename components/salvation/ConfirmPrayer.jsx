'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import Button from '../ui/Button';

export default function ConfirmPrayer() {
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return (
      <p className="inline-flex items-center gap-2 bg-brand-600 px-5 py-3 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-white">
        <Check size={14} />
        Hallelujah — your name is written in heaven
      </p>
    );
  }

  return (
    <Button variant="solid" size="lg" onClick={() => setConfirmed(true)}>
      I just prayed this prayer
    </Button>
  );
}
