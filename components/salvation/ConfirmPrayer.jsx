'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import Button from '../ui/Button';
import { toast } from '../ui/Toast';

export default function ConfirmPrayer() {
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    toast.success('Hallelujah — there is rejoicing in heaven over your surrender to Christ!', 'Name Written In Heaven');
  };

  if (confirmed) {
    return (
      <p className="inline-flex items-center gap-2 bg-brand-600 px-5 py-3 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-white shadow-md animate-fadeIn">
        <Check size={14} />
        Hallelujah — your name is written in heaven
      </p>
    );
  }

  return (
    <Button variant="solid" size="lg" onClick={handleConfirm}>
      I just prayed this prayer
    </Button>
  );
}
