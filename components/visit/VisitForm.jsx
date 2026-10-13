'use client';

import { useState } from 'react';
import { CheckCircle2, Phone, ArrowRight } from 'lucide-react';
import { CHURCH } from '../../lib/site-config';
import Button from '../ui/Button';
import Eyebrow from '../ui/Eyebrow';
import { Field, Input, Select, Textarea } from '../ui/Field';

export const SERVICE_OPTIONS = [
  'Upcoming Sunday (8:00 AM)',
  'Tuesday School of Prayer (5:00 PM)',
  'Thursday Revelational Hour (5:00 PM)',
];

const emptyForm = {
  name: '',
  phone: '',
  email: '',
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
    } catch (err) {
      setErrorMessage(err.message || 'Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="py-4">
        <CheckCircle2 size={40} strokeWidth={1.5} className="text-brand-600" />
        <h2 className="mt-6 font-display text-4xl uppercase leading-none text-ink-950">Your visit is reserved</h2>
        <p className="mt-4 leading-relaxed text-ink-950/70">
          Thank you, <strong className="text-ink-950">{form.name}</strong>. Our hospitality team has received your details and has been told to expect
          you for <strong className="text-ink-950">{form.serviceDate}</strong>.
        </p>
        <div className="mt-6 border-l-2 border-brand-600 pl-5 text-sm leading-relaxed text-ink-950/70">
          <p>
            On arrival, tell the ushers: <em>“I’m {form.name}, I reserved a visit online.”</em> They will escort you and
            your party.
          </p>
          <p className="mt-3 flex items-center gap-2 font-semibold text-brand-700">
            <Phone size={14} />
            Morning-of help line: {CHURCH.phone}
          </p>
        </div>
        <Button
          variant="outlineDark"
          className="mt-8"
          onClick={() => {
            setForm(emptyForm);
            setSubmitted(false);
          }}
        >
          Register another guest
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Eyebrow>Pre-registration</Eyebrow>
      <h2 className="mt-4 font-display text-4xl uppercase leading-none text-ink-950">Tell us you&apos;re coming</h2>
      <p className="mt-3 text-sm leading-relaxed text-ink-950/70">
        Planning ahead lets us save you seats, prepare for your children, and greet you by name.
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
        <Field label="Phone number *" id="visit-phone">
          <Input id="visit-phone" type="tel" required placeholder="080 1234 5678" value={form.phone} onChange={set('phone')} />
        </Field>
        <Field label="Email" id="visit-email">
          <Input id="visit-email" type="email" placeholder="you@email.com" value={form.email} onChange={set('email')} />
        </Field>
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
            <option>6+ people (group)</option>
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
          <Field label="Special needs or requests" id="visit-notes">
            <Textarea
              id="visit-notes"
              rows={3}
              placeholder="Wheelchair access, translation, directions…"
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
          {isSubmitting ? 'Sending RSVP…' : 'Confirm my visit'}
          <ArrowRight size={14} />
        </Button>
      </form>
    </div>
  );
}
