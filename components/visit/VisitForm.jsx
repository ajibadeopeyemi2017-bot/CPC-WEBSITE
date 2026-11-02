'use client';

import { useState } from 'react';
import { CheckCircle2, Phone, ArrowRight, Download, MapPin, Calendar, Users } from 'lucide-react';
import { CHURCH } from '../../lib/site-config';
import { DEVOTIONAL_PDF_URL } from '../../lib/devotional';
import Button from '../ui/Button';
import Eyebrow from '../ui/Eyebrow';
import { Field, Input, Select, Textarea } from '../ui/Field';
import { toast } from '../ui/Toast';

export const SERVICE_OPTIONS = [
  'Upcoming Sunday (8:00 AM)',
  'Tuesday School of Prayer (5:00 PM)',
  'Thursday Revelational Hour (5:00 PM)',
];

export const AREA_OPTIONS = [
  'OAU Campus / Ede Road / Asherifa',
  'Mayfair / Parakin / Damico',
  'Lagere / Fajuyi Road / Sabo / Enuwa',
  'OAUTHC / Eleyele / Moore',
  'Iloro / Esindale / Ondo Road',
  'Visiting from outside Ile-Ife',
];

const emptyForm = {
  name: '',
  phone: '',
  email: '',
  area: AREA_OPTIONS[0],
  serviceDate: SERVICE_OPTIONS[0],
  attendeeCount: '1 person (just me)',
  hasKids: 'No',
  kidAges: '',
  specialAssistance: '',
};

export default function VisitForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'visit', data: form }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit your RSVP. Please try again or call our helpline.');
      }

      setSubmitted(true);
      toast.success(
        `Welcome ${form.name || 'Friend'}! Your VIP seat reservation for ${form.serviceDate} is ready.`,
        'VIP Seat Reserved'
      );
    } catch (err) {
      const msg = err.message || 'Network error. Please try again.';
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppPassHref = () => {
    const msg =
      `Hello Christ The Potter Church Protocol Desk! 🕊️\n\n` +
      `I have just reserved my First-Timer VIP Visit online:\n` +
      `• *Name:* ${form.name}\n` +
      `• *Service:* ${form.serviceDate}\n` +
      `• *Party Size:* ${form.attendeeCount}\n` +
      `• *Coming From:* ${form.area}\n` +
      `• *Children:* ${form.hasKids}${form.kidAges ? ` (Ages: ${form.kidAges})` : ''}\n` +
      (form.specialAssistance ? `• *Note:* ${form.specialAssistance}\n` : '') +
      `\nPlease send me the location pin and protocol contact for my arrival. Thank you!`;
    return `https://wa.me/${CHURCH.whatsapp}?text=${encodeURIComponent(msg)}`;
  };

  if (submitted) {
    return (
      <div className="py-2">
        <div className="flex items-center gap-3">
          <CheckCircle2 size={36} strokeWidth={1.75} className="text-brand-600" />
          <div>
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-brand-600">
              VIP Guest Confirmation
            </span>
            <h2 className="font-display text-3xl uppercase leading-none text-ink-950 sm:text-4xl">
              Your Seat Is Reserved
            </h2>
          </div>
        </div>

        {/* Digital VIP Boarding Pass Card */}
        <div className="mt-6 border-2 border-brand-600 bg-ink-950 p-6 text-white">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-4">
            <div>
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-[#d4af37]">
                Christ The Potter Church · Ile-Ife
              </p>
              <p className="mt-0.5 font-display text-2xl uppercase text-white">
                {form.name}
              </p>
            </div>
            <span className="bg-brand-600 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white">
              First-Timer VIP Pass
            </span>
          </div>

          <div className="mt-4 grid gap-3 text-xs sm:grid-cols-2">
            <div className="flex items-start gap-2">
              <Calendar size={14} className="mt-0.5 shrink-0 text-brand-300" />
              <div>
                <span className="block text-[0.6rem] uppercase tracking-wider text-white/55">Service</span>
                <strong className="text-white">{form.serviceDate}</strong>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Users size={14} className="mt-0.5 shrink-0 text-brand-300" />
              <div>
                <span className="block text-[0.6rem] uppercase tracking-wider text-white/55">Party &amp; Area</span>
                <strong className="text-white">{form.attendeeCount} · {form.area}</strong>
              </div>
            </div>

            <div className="flex items-start gap-2 sm:col-span-2">
              <MapPin size={14} className="mt-0.5 shrink-0 text-brand-300" />
              <div>
                <span className="block text-[0.6rem] uppercase tracking-wider text-white/55">Auditorium Venue</span>
                <strong className="text-white">{CHURCH.address.full}</strong>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2.5 border-t border-white/15 pt-4">
            <a
              href={getWhatsAppPassHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 bg-[#25D366] px-4 py-3 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white transition-transform hover:scale-[1.01]"
            >
              Send VIP Pass to Protocol on WhatsApp
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Free Welcome Gift: 31-Day Devotional Booklet */}
        <div className="mt-5 border border-[#d4af37]/50 bg-[#fdfaf2] p-5">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#9a7b1c]">
            Complimentary First-Timer Gift
          </p>
          <p className="mt-1 text-sm font-semibold text-ink-950">
            Download our 31-Day Devotional Booklet (&ldquo;My Purpose: Divine Blueprint&rdquo;) while we prepare for your arrival:
          </p>
          <a
            href={DEVOTIONAL_PDF_URL}
            download="CPC_Daily_Devotional_31Days.pdf"
            className="mt-3 inline-flex items-center gap-2 bg-brand-600 px-4 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white hover:bg-brand-700"
          >
            <Download size={14} />
            Download Free 31-Day Devotional (PDF)
          </a>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-ink-950/10 pt-5">
          <p className="flex items-center gap-2 text-xs font-semibold text-brand-700">
            <Phone size={14} />
            Morning-of Protocol Line: <a href={CHURCH.phoneHref} className="underline">{CHURCH.phone}</a>
          </p>

          <Button
            variant="outlineDark"
            size="sm"
            onClick={() => {
              setForm(emptyForm);
              setSubmitted(false);
            }}
          >
            Register Another Guest
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Eyebrow>VIP Pre-Registration</Eyebrow>
      <h2 className="mt-4 font-display text-4xl uppercase leading-none text-ink-950">Tell us you&apos;re coming</h2>
      <p className="mt-3 text-sm leading-relaxed text-ink-950/70">
        Planning ahead lets our Protocol &amp; Hospitality team save your seat, prepare for your children, and send you directions from your area in Ile-Ife.
      </p>

      {errorMessage && (
        <div className="mt-4 border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field label="Full name *" id="visit-name">
            <Input id="visit-name" required placeholder="e.g. Grace Adeleke" value={form.name} onChange={set('name')} />
          </Field>
        </div>
        <Field label="Phone / WhatsApp number *" id="visit-phone">
          <Input id="visit-phone" type="tel" required placeholder="080 1234 5678" value={form.phone} onChange={set('phone')} />
        </Field>
        <Field label="Email" id="visit-email">
          <Input id="visit-email" type="email" placeholder="you@email.com" value={form.email} onChange={set('email')} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Coming from which area in Ile-Ife?" id="visit-area">
            <Select id="visit-area" value={form.area} onChange={set('area')}>
              {AREA_OPTIONS.map((area) => (
                <option key={area}>{area}</option>
              ))}
            </Select>
          </Field>
        </div>
        <Field label="Service *" id="visit-service">
          <Select id="visit-service" value={form.serviceDate} onChange={set('serviceDate')}>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </Select>
        </Field>
        <Field label="Party size" id="visit-count">
          <Select id="visit-count" value={form.attendeeCount} onChange={set('attendeeCount')}>
            <option>1 person (just me)</option>
            <option>2 people</option>
            <option>3 – 5 people (family)</option>
            <option>6+ people (campus / group)</option>
          </Select>
        </Field>
        <Field label="Bringing children?" id="visit-kids">
          <Select id="visit-kids" value={form.hasKids} onChange={set('hasKids')}>
            <option>No</option>
            <option>Yes (1 child)</option>
            <option>Yes (2 children)</option>
            <option>Yes (3+ children)</option>
          </Select>
        </Field>
        <Field label="Children's ages" id="visit-ages">
          <Input id="visit-ages" placeholder="e.g. 4 and 8" value={form.kidAges} onChange={set('kidAges')} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Need directions, bus guidance, or special assistance?" id="visit-notes">
            <Textarea
              id="visit-notes"
              rows={2}
              placeholder="e.g. Coming from OAU campus gate, need landmark guidance..."
              value={form.specialAssistance}
              onChange={set('specialAssistance')}
            />
          </Field>
        </div>
        <Button
          type="submit"
          variant="solid"
          size="lg"
          className="sm:col-span-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Generating Your VIP Pass…' : 'Confirm Visit & Get VIP Pass'}
          <ArrowRight size={14} />
        </Button>
      </form>
    </div>
  );
}
