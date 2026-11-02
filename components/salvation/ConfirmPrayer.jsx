'use client';

import { useState } from 'react';
import { Check, Sparkles, MessageCircle, Download, Send, HeartHandshake } from 'lucide-react';
import Button from '../ui/Button';
import { toast } from '../ui/Toast';
import { CHURCH } from '../../lib/site-config';

const DECISION_TYPES = [
  'First-Time Surrender to Jesus',
  'Rededicating My Life to Christ',
  'Desiring Holy Ghost Baptism & Fire',
];

const CAMPUS_AREAS = [
  'OAU Campus / Hostels (Sub / Angola / Fajuyi / Moremi)',
  'Mayfair / Lagere / Fajuyi Road Axis',
  'Ede Road / Damico / Oduduwa Estate Axis',
  'Parakin / Phase 2 / Moremi Estate Axis',
  'Modakeke / Ondo Road / Opa Axis',
  'Outside Ile-Ife (Online Sanctuary Member)',
];

const FOUNDATION_OPTIONS = [
  'Yes — Enroll me in Believers Foundation Class',
  'Send me New Believer Study Materials on WhatsApp',
];

const emptyForm = {
  name: '',
  phone: '',
  email: '',
  decisionType: DECISION_TYPES[0],
  location: CAMPUS_AREAS[0],
  foundationClass: FOUNDATION_OPTIONS[0],
  prayerNeed: '',
};

export default function ConfirmPrayer() {
  const [step, setStep] = useState('initial'); // 'initial' | 'form' | 'completed'
  const [form, setForm] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState(null);

  const handleOpenForm = () => {
    setStep('form');
    toast.success(
      'Hallelujah! There is rejoicing in heaven over your surrender to Christ. Please share your details so our pastors can walk with you.',
      'Welcome to God’s Family'
    );
  };

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'salvation', data: form }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Could not submit your decision. Please try again.');
      }

      setSubmittedRecord({
        ...form,
        date: new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
      });
      setStep('completed');
      toast.success(
        'Glory to God! Your salvation decision is registered with the Pastoral & Discipleship Office.',
        'Name Written In Heaven'
      );
    } catch (err) {
      toast.error(err.message || 'Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 'initial') {
    return (
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="solid" size="lg" onClick={handleOpenForm}>
          <Sparkles size={15} className="text-amber-300" />
          I just prayed this prayer
        </Button>
        <span className="text-xs text-white/60">
          Click to register your decision &amp; receive your New Believer&apos;s Starter Pack
        </span>
      </div>
    );
  }

  if (step === 'completed' && submittedRecord) {
    const whatsappMessage = encodeURIComponent(
      `Hallelujah Pastor! I just prayed the Salvation Prayer on the Christ The Potter Church website.\n\n` +
        `• Name: ${submittedRecord.name}\n` +
        `• Decision: ${submittedRecord.decisionType}\n` +
        `• Area: ${submittedRecord.location}\n` +
        `• Next Step: ${submittedRecord.foundationClass}\n\n` +
        `Please connect me with the Follow-Up & Foundation Class team!`
    );

    return (
      <div className="mt-2 rounded-sm border border-brand-500/40 bg-white/5 p-6 text-white backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
            <Check size={20} />
          </span>
          <div>
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.25em] text-brand-300">
              Covenant of New Life · {submittedRecord.date}
            </p>
            <h3 className="font-display text-2xl uppercase leading-none text-white">
              Welcome Home, {submittedRecord.name}!
            </h3>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-white/80">
          Your decision (<strong className="text-white">{submittedRecord.decisionType}</strong>) has been sent to
          Apostle Oluwafunminiyi Olufisayo&apos;s Discipleship Desk. A pastoral counselor will reach out to you on{' '}
          <strong className="text-brand-300">{submittedRecord.phone}</strong>.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`https://wa.me/${CHURCH.whatsapp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] px-5 py-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white shadow-md transition-transform hover:-translate-y-0.5"
          >
            <MessageCircle size={15} />
            Chat Follow-Up Pastor Now
          </a>

          <a
            href="/CPC_Daily_Devotional.pdf"
            download
            className="inline-flex items-center gap-2 border border-white/30 bg-white/10 px-5 py-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-ink-950"
          >
            <Download size={14} />
            Download 31-Day Devotional Gift
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-2 rounded-sm border border-white/15 bg-white/5 p-6 text-white backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-2 border-b border-white/15 pb-4">
        <div className="flex items-center gap-2.5">
          <HeartHandshake size={18} className="text-brand-300" />
          <h3 className="font-display text-2xl uppercase tracking-wide text-white">
            Register Your Decision for Christ
          </h3>
        </div>
        <span className="rounded bg-brand-600/40 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-brand-200">
          2 Corinthians 5:17
        </span>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-white/70">
        Please share your contact details below so our Pastoral Follow-Up Team can pray with you by name and send your
        free New Believer&apos;s study materials.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-[0.62rem] font-bold uppercase tracking-[0.2em] text-brand-200">
            Your Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Brother / Sister Adewale"
            value={form.name}
            onChange={set('name')}
            className="mt-1.5 w-full border border-white/20 bg-ink-950/80 px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-brand-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[0.62rem] font-bold uppercase tracking-[0.2em] text-brand-200">
            Phone / WhatsApp Number *
          </label>
          <input
            type="tel"
            required
            placeholder="080 1234 5678"
            value={form.phone}
            onChange={set('phone')}
            className="mt-1.5 w-full border border-white/20 bg-ink-950/80 px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-brand-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[0.62rem] font-bold uppercase tracking-[0.2em] text-brand-200">
            Decision Type
          </label>
          <select
            value={form.decisionType}
            onChange={set('decisionType')}
            className="mt-1.5 w-full border border-white/20 bg-ink-950 px-3.5 py-2.5 text-sm text-white focus:border-brand-400 focus:outline-none"
          >
            {DECISION_TYPES.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[0.62rem] font-bold uppercase tracking-[0.2em] text-brand-200">
            Your Area / Campus
          </label>
          <select
            value={form.location}
            onChange={set('location')}
            className="mt-1.5 w-full border border-white/20 bg-ink-950 px-3.5 py-2.5 text-sm text-white focus:border-brand-400 focus:outline-none"
          >
            {CAMPUS_AREAS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-[0.62rem] font-bold uppercase tracking-[0.2em] text-brand-200">
            Discipleship &amp; Foundation Class
          </label>
          <select
            value={form.foundationClass}
            onChange={set('foundationClass')}
            className="mt-1.5 w-full border border-white/20 bg-ink-950 px-3.5 py-2.5 text-sm text-white focus:border-brand-400 focus:outline-none"
          >
            {FOUNDATION_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-[0.62rem] font-bold uppercase tracking-[0.2em] text-brand-200">
            Any Specific Prayer Point for the Pastor? (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. Grace for consistent walk with God & Holy Ghost baptism..."
            value={form.prayerNeed}
            onChange={set('prayerNeed')}
            className="mt-1.5 w-full border border-white/20 bg-ink-950/80 px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-brand-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button type="submit" variant="solid" size="lg" disabled={isSubmitting}>
          <Send size={14} />
          {isSubmitting ? 'Registering Decision…' : 'Complete Salvation Registration'}
        </Button>
        <button
          type="button"
          onClick={() => setStep('initial')}
          className="px-3 py-2 text-xs text-white/60 hover:text-white"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
