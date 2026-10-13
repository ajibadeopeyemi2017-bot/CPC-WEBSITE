'use client';

import { useState } from 'react';
import { Check, Send } from 'lucide-react';
import { MINISTRIES } from '../../lib/conferences';
import Button from '../ui/Button';
import { Field, Input, Select, Textarea } from '../ui/Field';

const emptyForm = { name: '', phone: '', department: MINISTRIES[0].title, experience: '' };

// Not wired to a backend yet: submitting only shows the confirmation state.
export default function VolunteerForm() {
  const [form, setForm] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'volunteer', data: form }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit application. Please try again.');
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
      <div>
        <Check size={40} strokeWidth={1.5} className="text-brand-600" />
        <h3 className="mt-6 font-display text-4xl uppercase leading-none text-ink-950">Application received</h3>
        <p className="mt-4 leading-relaxed text-ink-950/70">
          Thank you for stepping up to serve, <strong className="text-ink-950">{form.name}</strong>. The{' '}
          {form.department} lead will reach out on {form.phone} within 48 hours.
        </p>
        <Button
          variant="outlineDark"
          className="mt-8"
          onClick={() => {
            setForm(emptyForm);
            setSubmitted(false);
          }}
        >
          Submit another
        </Button>
      </div>
    );
  }

  return (
    <div>
      {errorMessage && (
        <div className="mb-6 border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name *" id="vol-name">
          <Input id="vol-name" required placeholder="e.g. Mary Adeyemi" value={form.name} onChange={set('name')} />
        </Field>
        <Field label="Phone / WhatsApp *" id="vol-phone">
          <Input id="vol-phone" type="tel" required placeholder="080 1234 5678" value={form.phone} onChange={set('phone')} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Department *" id="vol-dept">
            <Select id="vol-dept" value={form.department} onChange={set('department')}>
              {MINISTRIES.map((m) => (
                <option key={m.title}>{m.title}</option>
              ))}
            </Select>
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Experience (optional)" id="vol-exp">
            <Textarea
              id="vol-exp"
              rows={4}
              placeholder="Your skills, gifts, or previous service…"
              value={form.experience}
              onChange={set('experience')}
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
          <Send size={14} />
          {isSubmitting ? 'Submitting application…' : 'Submit'}
        </Button>
      </form>
    </div>
  );
}
