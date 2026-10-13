'use client';

import { useState } from 'react';
import clsx from 'clsx';
import {
  CheckCircle2,
  Copy,
  CreditCard,
  ExternalLink,
  Info,
  Loader2,
  Lock,
  Printer,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import {
  GIVING_CATEGORIES,
  PRESET_AMOUNTS,
  GATEWAYS,
  ONLINE_GIVING_ENABLED,
  parseAmountNumber,
} from '../../lib/giving';
import { openPaystackPayment } from '../../lib/paystack';
import Button from '../ui/Button';
import Eyebrow from '../ui/Eyebrow';
import { Field, Input, Label } from '../ui/Field';
import CopyButton from './CopyButton';

const optionClasses = (selected) =>
  clsx(
    'border p-4 text-left transition-all duration-150',
    selected
      ? 'border-brand-600 bg-brand-50/70 shadow-sm ring-1 ring-brand-600/30'
      : 'border-ink-950/15 bg-white hover:border-ink-950/40 hover:bg-paper/30'
  );

export default function GivingForm() {
  const [currency, setCurrency] = useState('NGN');
  const [categoryId, setCategoryId] = useState(GIVING_CATEGORIES[0].id);
  const [amount, setAmount] = useState('10,000');
  const [gateway, setGateway] = useState('paystack');
  const [donor, setDonor] = useState({ name: '', email: '', phone: '' });

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [showConfigNotice, setShowConfigNotice] = useState(false);

  const paystackPublicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
  const symbol = currency === 'NGN' ? '₦' : '$';
  const selectedCategory = GIVING_CATEGORIES.find((c) => c.id === categoryId) || GIVING_CATEGORIES[0];

  const switchCurrency = (next) => {
    setCurrency(next);
    setAmount(next === 'NGN' ? '10,000' : '100');
    setError(null);
  };

  const handleAmountChange = (e) => {
    const raw = e.target.value;
    // Allow numbers and commas
    setAmount(raw);
    setError(null);
  };

  const completeGivingAndVerify = async (paymentPayload) => {
    setIsProcessing(true);
    try {
      const res = await fetch('/api/paystack/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentPayload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Payment verification could not be completed.');
      }

      setReceipt({
        reference: paymentPayload.reference,
        amount: paymentPayload.amount,
        currency: paymentPayload.currency,
        category: paymentPayload.category,
        donorName: paymentPayload.donorName || 'Anonymous Giver',
        email: paymentPayload.email,
        paidAt: data.data?.paidAt || new Date().toISOString(),
        verified: data.data?.verified,
        simulated: data.data?.simulated,
      });
      setError(null);
    } catch (err) {
      console.error('Verification error:', err);
      setError(err.message || 'Payment verification failed. Please contact the church finance desk.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const numericAmount = parseAmountNumber(amount);
    const minAmount = currency === 'NGN' ? 100 : 1;

    if (numericAmount < minAmount) {
      setError(`Please enter an amount of at least ${symbol}${minAmount}.`);
      return;
    }

    if (!donor.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donor.email)) {
      setError('Please provide a valid email address so Paystack can issue your official payment receipt.');
      return;
    }

    // Direct bank transfer selection redirects to bank accounts list
    if (gateway === 'bank_transfer') {
      const el = document.getElementById('accounts');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    // If Paystack Public Key is NOT set in .env.local, prompt user / offer test demo
    if (!paystackPublicKey) {
      setShowConfigNotice(true);
      return;
    }

    setIsProcessing(true);
    try {
      await openPaystackPayment({
        key: paystackPublicKey,
        email: donor.email,
        amount: numericAmount,
        currency,
        donorName: donor.name || 'Anonymous Giver',
        categoryName: selectedCategory.name,
        onSuccess: (res) => {
          completeGivingAndVerify({
            reference: res.reference,
            amount: numericAmount,
            currency,
            donorName: donor.name,
            email: donor.email,
            category: selectedCategory.name,
          });
        },
        onClose: () => {
          setIsProcessing(false);
        },
      });
    } catch (err) {
      setIsProcessing(false);
      setError(err.message || 'Could not launch Paystack payment window.');
    }
  };

  // Helper for test mode demonstration when key is pending
  const handleSimulatePayment = () => {
    const numericAmount = parseAmountNumber(amount) || 10000;
    setShowConfigNotice(false);
    const demoRef = `CPC-TEST-${Date.now().toString().slice(-6)}`;
    completeGivingAndVerify({
      reference: demoRef,
      amount: numericAmount,
      currency,
      donorName: donor.name || 'Test Believer',
      email: donor.email || 'donor@example.com',
      category: selectedCategory.name,
    });
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const resetGivingForm = () => {
    setReceipt(null);
    setError(null);
    setShowConfigNotice(false);
  };

  // -------------------------------------------------------------
  // VIEW: GIVING SUCCESS RECEIPT
  // -------------------------------------------------------------
  if (receipt) {
    const formattedDate = new Date(receipt.paidAt).toLocaleDateString('en-GB', {
      timeZone: 'Africa/Lagos',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <div className="rounded-sm border-2 border-brand-600/30 bg-white p-6 sm:p-8">
        <div className="flex items-center gap-3 border-b border-ink-950/10 pb-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 ring-4 ring-brand-500/10">
            <CheckCircle2 size={26} />
          </div>
          <div>
            <Eyebrow tone="green">Covenant Seed Confirmed</Eyebrow>
            <h2 className="mt-1 font-display text-2xl uppercase tracking-tight text-ink-950 sm:text-3xl">
              Kingdom Giving Receipt
            </h2>
          </div>
        </div>

        {receipt.simulated && (
          <div className="mt-4 border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900">
            <strong>Note:</strong> Processed in <em>Developer Simulation Mode</em>. To accept live cards and USSD, add{' '}
            <code className="font-mono font-semibold">NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY</code> to your{' '}
            <code className="font-mono">.env.local</code>.
          </div>
        )}

        <div className="mt-6 text-center rounded-sm bg-brand-50/50 p-6 border border-brand-600/15">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.25em] text-ink-950/60">Amount Given</p>
          <p className="mt-2 font-display text-4xl text-brand-800 sm:text-5xl">
            {symbol}
            {Number(receipt.amount).toLocaleString('en-US')}
          </p>
          <div className="mt-3 inline-block rounded-full bg-brand-700 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
            {receipt.category}
          </div>
        </div>

        <dl className="mt-6 divide-y divide-ink-950/10 border-y border-ink-950/10 text-sm">
          <div className="flex items-center justify-between py-3">
            <dt className="text-xs uppercase tracking-wider text-ink-950/60">Reference ID</dt>
            <dd className="flex items-center gap-2 font-mono text-xs font-semibold text-ink-950">
              {receipt.reference}
              <CopyButton value={receipt.reference} label="Copy Ref" />
            </dd>
          </div>
          <div className="flex items-center justify-between py-3">
            <dt className="text-xs uppercase tracking-wider text-ink-950/60">Donor Name</dt>
            <dd className="font-medium text-ink-950">{receipt.donorName}</dd>
          </div>
          <div className="flex items-center justify-between py-3">
            <dt className="text-xs uppercase tracking-wider text-ink-950/60">Donor Email</dt>
            <dd className="font-medium text-ink-950">{receipt.email || '—'}</dd>
          </div>
          <div className="flex items-center justify-between py-3">
            <dt className="text-xs uppercase tracking-wider text-ink-950/60">Payment Gateway</dt>
            <dd className="flex items-center gap-1.5 font-medium text-brand-800">
              <ShieldCheck size={14} className="text-brand-600" />
              Paystack Verified
            </dd>
          </div>
          <div className="flex items-center justify-between py-3">
            <dt className="text-xs uppercase tracking-wider text-ink-950/60">Transaction Date</dt>
            <dd className="font-medium text-ink-950">{formattedDate}</dd>
          </div>
        </dl>

        <div className="mt-6 border-l-4 border-brand-600 bg-paper/60 p-4 text-xs italic leading-relaxed text-ink-950/80">
          “And God is able to make all grace abound toward you; that ye, always having all sufficiency in all
          things, may abound to every good work.” — 2 Corinthians 9:8
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex flex-1 items-center justify-center gap-2 border border-ink-950/20 bg-white px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-ink-950 hover:border-ink-950 transition-colors"
          >
            <Printer size={15} />
            Print Receipt
          </button>
          <button
            type="button"
            onClick={resetGivingForm}
            className="inline-flex flex-1 items-center justify-center gap-2 border border-brand-700 bg-brand-700 px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white hover:bg-brand-800 transition-colors"
          >
            <RefreshCw size={14} />
            Give Another Seed
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW: GIVING FORM
  // -------------------------------------------------------------
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Eyebrow tone="green">Online Giving</Eyebrow>
          <h2 className="mt-3 font-display text-3xl uppercase leading-none text-ink-950 sm:text-4xl">
            Kingdom Giving Portal
          </h2>
        </div>
        <div className="flex border border-ink-950/15" role="group" aria-label="Currency selection">
          {['NGN', 'USD'].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => switchCurrency(c)}
              aria-pressed={currency === c}
              className={clsx(
                'px-4 py-2 text-[0.64rem] font-bold uppercase tracking-[0.18em] transition-colors',
                currency === c ? 'bg-ink-950 text-white' : 'text-ink-950/60 hover:text-ink-950'
              )}
            >
              {c} ({c === 'NGN' ? '₦' : '$'})
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="mt-6 border border-rose-300 bg-rose-50 p-4 text-xs font-medium text-rose-900 leading-relaxed">
          {error}
        </div>
      )}

      {showConfigNotice && (
        <div className="mt-6 border border-brand-600/30 bg-brand-50 p-4 text-xs leading-relaxed text-brand-900">
          <p className="font-bold flex items-center gap-2 text-brand-800">
            <Info size={16} /> Paystack Public Key Not Configured Yet
          </p>
          <p className="mt-1">
            To accept real cards and bank transfers, paste your free Paystack Public Key into your{' '}
            <code className="bg-brand-100 px-1 py-0.5 font-mono text-[0.7rem]">.env.local</code> file under{' '}
            <code className="bg-brand-100 px-1 py-0.5 font-mono text-[0.7rem]">NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY</code>.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleSimulatePayment}
              className="inline-flex items-center gap-1.5 border border-brand-700 bg-brand-700 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-wider text-white hover:bg-brand-800"
            >
              <Sparkles size={13} />
              Simulate Test Payment &amp; View Receipt
            </button>
            <a
              href="https://dashboard.paystack.com/#/settings/developer"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-ink-950/20 bg-white px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-wider text-ink-950 hover:border-ink-950"
            >
              Get Free Paystack Keys
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      )}

      {/* Giving Category */}
      <fieldset className="mt-8">
        <legend className="mb-3">
          <Label>Select Giving Category</Label>
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {GIVING_CATEGORIES.map((cat) => {
            const isSelected = categoryId === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoryId(cat.id)}
                aria-pressed={isSelected}
                className={optionClasses(isSelected)}
              >
                <div className="flex items-center justify-between">
                  <span className="block text-sm font-bold text-ink-950">{cat.name}</span>
                  {isSelected && <span className="h-2 w-2 rounded-full bg-brand-600" />}
                </div>
                <span className="mt-1 block text-xs leading-relaxed text-ink-950/65">{cat.desc}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Amount Selection */}
      <div className="mt-8">
        <Label htmlFor="give-amount">Amount ({currency})</Label>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-display text-2xl text-ink-950">
            {symbol}
          </span>
          <Input
            id="give-amount"
            inputMode="numeric"
            required
            value={amount}
            onChange={handleAmountChange}
            placeholder="10,000"
            className="pl-11 font-display text-2xl sm:text-3xl text-brand-900 tracking-tight"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {PRESET_AMOUNTS[currency].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setAmount(value)}
              className={clsx(
                'border px-3.5 py-1.5 text-xs font-semibold transition-colors',
                amount === value
                  ? 'border-brand-700 bg-brand-700 text-white'
                  : 'border-ink-950/15 bg-paper/30 text-ink-950 hover:border-ink-950/40'
              )}
            >
              {symbol}
              {value}
            </button>
          ))}
        </div>
      </div>

      {/* Donor Information */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field label="Full Name (or leave blank for Anonymous)" id="give-name">
          <Input
            id="give-name"
            placeholder="e.g. Sister Grace Adeola"
            value={donor.name}
            onChange={(e) => setDonor({ ...donor, name: e.target.value })}
          />
        </Field>
        <Field label="Email Address (Required for official receipt)" id="give-email">
          <Input
            id="give-email"
            type="email"
            required
            placeholder="grace@example.com"
            value={donor.email}
            onChange={(e) => setDonor({ ...donor, email: e.target.value })}
          />
        </Field>
      </div>

      {/* Payment Gateway */}
      <fieldset className="mt-8">
        <legend className="mb-3">
          <Label>Payment Method</Label>
        </legend>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setGateway('paystack')}
            aria-pressed={gateway === 'paystack'}
            className={optionClasses(gateway === 'paystack')}
          >
            <div className="flex items-center gap-2">
              <CreditCard size={18} className="text-brand-700 shrink-0" />
              <span className="block text-sm font-bold text-ink-950">Paystack Gateway</span>
            </div>
            <span className="mt-1 block text-xs text-ink-950/60">
              Debit card, instant bank transfer, USSD, Apple Pay
            </span>
          </button>

          <button
            type="button"
            onClick={() => setGateway('bank_transfer')}
            aria-pressed={gateway === 'bank_transfer'}
            className={optionClasses(gateway === 'bank_transfer')}
          >
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-brand-700">ZB</span>
              <span className="block text-sm font-bold text-ink-950">Direct Bank Transfer</span>
            </div>
            <span className="mt-1 block text-xs text-ink-950/60">
              Zenith Bank official accounts on this page
            </span>
          </button>
        </div>
      </fieldset>

      <div className="mt-8 space-y-3">
        {gateway === 'paystack' ? (
          <Button
            type="submit"
            variant="solid"
            size="lg"
            disabled={isProcessing}
            className="w-full justify-center disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Connecting to Paystack...
              </>
            ) : (
              <>
                <Lock size={15} />
                Give {symbol}
                {amount || '0'} via Paystack
              </>
            )}
          </Button>
        ) : (
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => {
              const el = document.getElementById('accounts');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full justify-center"
          >
            View Zenith Bank Transfer Details
          </Button>
        )}

        <div className="flex items-center justify-center gap-2 text-center text-[0.68rem] text-ink-950/60">
          <ShieldCheck size={14} className="text-brand-600" />
          <span>256-bit encrypted &amp; PCI-DSS Level 1 compliant secure payment</span>
        </div>
      </div>
    </form>
  );
}
