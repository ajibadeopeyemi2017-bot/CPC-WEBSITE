'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { Info, Lock } from 'lucide-react';
import { GIVING_CATEGORIES, PRESET_AMOUNTS, GATEWAYS, ONLINE_GIVING_ENABLED } from '../../lib/giving';
import Button from '../ui/Button';
import Eyebrow from '../ui/Eyebrow';
import { Field, Input, Label } from '../ui/Field';

const optionClasses = (selected) =>
  clsx(
    'border px-4 py-3 text-left transition-colors',
    selected ? 'border-brand-600 bg-brand-50' : 'border-ink-950/15 bg-white hover:border-ink-950/40'
  );

export default function GivingForm() {
  const [currency, setCurrency] = useState('NGN');
  const [category, setCategory] = useState(GIVING_CATEGORIES[0].id);
  const [amount, setAmount] = useState('10,000');
  const [gateway, setGateway] = useState(GATEWAYS[0].id);
  const [donor, setDonor] = useState({ name: '', email: '' });

  const switchCurrency = (next) => {
    setCurrency(next);
    setAmount(next === 'NGN' ? '10,000' : '100');
  };
  const symbol = currency === 'NGN' ? '₦' : '$';

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Eyebrow>Online giving</Eyebrow>
          <h2 className="mt-4 font-display text-4xl uppercase leading-none text-ink-950">Giving portal</h2>
        </div>
        <div className="flex border border-ink-950/15" role="group" aria-label="Currency">
          {['NGN', 'USD'].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => switchCurrency(c)}
              aria-pressed={currency === c}
              className={clsx(
                'px-4 py-2 text-[0.64rem] font-bold uppercase tracking-[0.18em]',
                currency === c ? 'bg-ink-950 text-white' : 'text-ink-950/60 hover:text-ink-950'
              )}
            >
              {c} ({c === 'NGN' ? '₦' : '$'})
            </button>
          ))}
        </div>
      </div>

      {!ONLINE_GIVING_ENABLED && (
        <p className="mt-6 flex gap-3 border border-brand-600/30 bg-brand-50 p-4 text-sm leading-relaxed text-brand-800">
          <Info size={18} className="mt-0.5 shrink-0" />
          Card and online payments are launching soon. For now, please give by direct bank transfer using the
          account details on this page.
        </p>
      )}

      <fieldset className="mt-8">
        <legend className="mb-3">
          <Label>Giving category</Label>
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {GIVING_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              aria-pressed={category === cat.id}
              className={optionClasses(category === cat.id)}
            >
              <span className="block text-sm font-semibold text-ink-950">{cat.name}</span>
              <span className="mt-0.5 block text-xs text-ink-950/60">{cat.desc}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-8">
        <Label htmlFor="give-amount">Amount ({currency})</Label>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-display text-xl text-ink-950">
            {symbol}
          </span>
          <Input
            id="give-amount"
            inputMode="numeric"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="pl-10 font-display text-2xl sm:text-2xl"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {PRESET_AMOUNTS[currency].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setAmount(value)}
              className={clsx(
                'border px-3 py-1.5 text-xs font-semibold',
                amount === value ? 'border-ink-950 bg-ink-950 text-white' : 'border-ink-950/15 text-ink-950 hover:border-ink-950/40'
              )}
            >
              {symbol}
              {value}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field label="Full name" id="give-name">
          <Input id="give-name" value={donor.name} onChange={(e) => setDonor({ ...donor, name: e.target.value })} />
        </Field>
        <Field label="Email" id="give-email">
          <Input
            id="give-email"
            type="email"
            placeholder="you@email.com"
            value={donor.email}
            onChange={(e) => setDonor({ ...donor, email: e.target.value })}
          />
        </Field>
      </div>

      <fieldset className="mt-8">
        <legend className="mb-3">
          <Label>Payment gateway</Label>
        </legend>
        <div className="grid grid-cols-3 gap-2">
          {GATEWAYS.map((gw) => (
            <button
              key={gw.id}
              type="button"
              onClick={() => setGateway(gw.id)}
              aria-pressed={gateway === gw.id}
              className={clsx(optionClasses(gateway === gw.id), 'text-center')}
            >
              <span className="block text-sm font-semibold text-ink-950">{gw.label}</span>
              <span className="mt-0.5 hidden text-xs text-ink-950/60 sm:block">{gw.desc}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <Button
        type="submit"
        variant="solid"
        size="lg"
        disabled={!ONLINE_GIVING_ENABLED}
        className="mt-8 w-full disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Lock size={14} />
        {ONLINE_GIVING_ENABLED ? `Give ${symbol}${amount}` : 'Online giving coming soon'}
      </Button>
    </form>
  );
}
