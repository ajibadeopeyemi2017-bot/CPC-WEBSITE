'use client';

import { useState } from 'react';
import { PhoneCall, Copy, Check, Smartphone, Globe, Landmark, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { BANK_ACCOUNTS } from '../../lib/site-config';
import { toast } from '../ui/Toast';

const NIGERIAN_BANKS = [
  { id: 'zenith', name: 'Zenith Bank', ussd: '*966*{AMOUNT}*{ACC}#' },
  { id: 'gtb', name: 'GTBank (Guaranty Trust)', ussd: '*737*1*{AMOUNT}*{ACC}#' },
  { id: 'access', name: 'Access Bank', ussd: '*901*1*{AMOUNT}*{ACC}#' },
  { id: 'firstbank', name: 'First Bank of Nigeria', ussd: '*894*{AMOUNT}*{ACC}#' },
  { id: 'uba', name: 'UBA (United Bank for Africa)', ussd: '*919*3*{ACC}*{AMOUNT}#' },
  { id: 'opay', name: 'OPay / PalmPay / Kuda', manual: true },
];

export default function BankUssdQuickDial() {
  const [selectedAccIdx, setSelectedAccIdx] = useState(0);
  const [selectedBankId, setSelectedBankId] = useState('zenith');
  const [amount, setAmount] = useState('5000');
  const [copiedUssd, setCopiedUssd] = useState(false);

  const activeAccount = BANK_ACCOUNTS[selectedAccIdx] || BANK_ACCOUNTS[0];
  const activeBank = NIGERIAN_BANKS.find((b) => b.id === selectedBankId) || NIGERIAN_BANKS[0];

  const cleanAmount = (amount || '').replace(/[^0-9]/g, '') || '1000';
  const ussdString = activeBank.ussd
    ? activeBank.ussd.replace('{AMOUNT}', cleanAmount).replace('{ACC}', activeAccount.accountNumber)
    : null;

  const handleCopyUssd = async () => {
    if (!ussdString) return;
    try {
      await navigator.clipboard.writeText(ussdString);
      setCopiedUssd(true);
      toast.success(`Copied USSD code "${ussdString}" to clipboard`);
      setTimeout(() => setCopiedUssd(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="border border-ink-950/15 bg-white p-5 sm:p-7 shadow-sm">
      <div className="flex items-center gap-2">
        <Smartphone size={18} className="text-brand-600" />
        <h3 className="font-display text-lg uppercase tracking-tight text-ink-950 sm:text-xl">
          Quick USSD Mobile Transfer Helper
        </h3>
      </div>
      <p className="mt-1 text-xs text-ink-950/65">
        Transfer directly from your phone keypad using your bank’s official USSD code without entering a banking app.
      </p>

      {/* Select CPC Account */}
      <div className="mt-5">
        <label className="block text-[0.62rem] font-bold uppercase tracking-[0.2em] text-ink-950/70 mb-1.5">
          1. Destination CPC Account
        </label>
        <div className="grid gap-2 sm:grid-cols-2">
          {BANK_ACCOUNTS.map((acc, idx) => (
            <button
              key={acc.accountNumber}
              type="button"
              onClick={() => setSelectedAccIdx(idx)}
              className={clsx(
                'border p-3 text-left transition-all text-xs',
                selectedAccIdx === idx
                  ? 'border-brand-600 bg-brand-50/70 ring-1 ring-brand-600/30 font-semibold'
                  : 'border-ink-950/15 hover:border-ink-950/40'
              )}
            >
              <span className="block font-mono text-sm text-brand-900">{acc.accountNumber}</span>
              <span className="block text-[0.68rem] text-ink-950/75 truncate mt-0.5">{acc.purpose}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Select User Bank */}
      <div className="mt-4">
        <label className="block text-[0.62rem] font-bold uppercase tracking-[0.2em] text-ink-950/70 mb-1.5">
          2. Your Personal Bank
        </label>
        <select
          value={selectedBankId}
          onChange={(e) => setSelectedBankId(e.target.value)}
          aria-label="Select your Nigerian bank for USSD transfer"
          className="w-full border border-ink-950/20 bg-white px-3 py-2 text-xs text-ink-950 focus:border-brand-600 focus:outline-none"
        >
          {NIGERIAN_BANKS.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      {/* Transfer Amount */}
      <div className="mt-4">
        <label className="block text-[0.62rem] font-bold uppercase tracking-[0.2em] text-ink-950/70 mb-1.5">
          3. Amount to Seed (₦)
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            inputMode="numeric"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="5000"
            className="w-full border border-ink-950/20 px-3 py-2 text-sm font-semibold text-brand-950 focus:border-brand-600 focus:outline-none"
          />
          {['2000', '5000', '10000', '20000'].map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => setAmount(amt)}
              className={clsx(
                'border px-2.5 py-1 text-xs font-semibold shrink-0 transition-colors',
                amount === amt
                  ? 'border-brand-700 bg-brand-700 text-white'
                  : 'border-ink-950/15 bg-paper/20 hover:border-ink-950/40 text-ink-950'
              )}
            >
              ₦{Number(amt).toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      {/* Generated USSD String & Actions */}
      <div className="mt-5 rounded border border-brand-500/30 bg-brand-50/50 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-brand-700">
              {activeBank.name} Dial String
            </span>
            {ussdString ? (
              <p className="font-mono text-base sm:text-lg font-bold text-brand-950 tracking-wider">
                {ussdString}
              </p>
            ) : (
              <p className="text-xs text-ink-950/80 mt-0.5">
                Copy account number <strong className="font-mono">{activeAccount.accountNumber}</strong> and select
                Zenith Bank in your {activeBank.name} app.
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            {ussdString && (
              <>
                <button
                  type="button"
                  onClick={handleCopyUssd}
                  aria-label="Copy USSD dial string"
                  className="flex items-center gap-1.5 border border-brand-700 bg-white px-3 py-2 text-[0.66rem] font-bold uppercase tracking-wider text-brand-800 hover:bg-brand-50 transition-colors"
                >
                  {copiedUssd ? <Check size={13} className="text-brand-600" /> : <Copy size={13} />}
                  <span>{copiedUssd ? 'Copied' : 'Copy Code'}</span>
                </button>

                <a
                  href={`tel:${encodeURIComponent(ussdString)}`}
                  className="inline-flex items-center gap-1.5 border border-brand-700 bg-brand-700 px-3 py-2 text-[0.66rem] font-bold uppercase tracking-wider text-white hover:bg-brand-800 shadow-sm transition-colors"
                >
                  <PhoneCall size={13} />
                  <span>Dial Now</span>
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
