'use client';

import { useState, useEffect } from 'react';
import { X, Check, Send, Calendar, ExternalLink, Sparkles, Phone, MessageSquare } from 'lucide-react';
import { CONFERENCES } from '../../lib/conferences';
import { CHURCH } from '../../lib/site-config';
import { dispatchToBothWhatsAppLines, formatConferenceRegistrationMessage, WHATSAPP_LINES } from '../../lib/whatsapp';
import Button from '../ui/Button';
import { Field, Input, Select, Textarea } from '../ui/Field';
import { toast } from '../ui/Toast';

export default function ConferenceRegistrationModal({
  isOpen,
  onClose,
  initialConferenceId = null,
}) {
  const [selectedConfId, setSelectedConfId] = useState(
    initialConferenceId || (CONFERENCES[0] ? CONFERENCES[0].id : '')
  );

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    church: '',
    role: 'Believer / Delegate',
    accommodation: 'No, self-arranged',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [dispatchedLinks, setDispatchedLinks] = useState(null);

  useEffect(() => {
    if (initialConferenceId) {
      setSelectedConfId(initialConferenceId);
    }
  }, [initialConferenceId]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentConf = CONFERENCES.find((c) => c.id === selectedConfId) || CONFERENCES[0];

  const setField = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setErrorMessage('Please provide your full name and phone/WhatsApp number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const submissionData = {
      ...form,
      eventId: currentConf?.id || 'conference',
      eventTitle: currentConf ? `${currentConf.title} (${currentConf.short})` : 'Conference / School',
    };

    try {
      // 1. Post to Server API (saves to DB and notifies email if configured)
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'registration', data: submissionData }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Registration submission failed. Please try again.');
      }

      // 2. Format WhatsApp message
      const waMsg = formatConferenceRegistrationMessage(submissionData);

      // 3. Dispatch to BOTH WhatsApp lines simultaneously
      const links = dispatchToBothWhatsAppLines(waMsg);
      setDispatchedLinks(links);

      setIsSubmitted(true);
      toast.success(
        `Registration recorded! Dispatched to both WhatsApp numbers (07062709694 & 08163776464).`,
        'Registration Successful'
      );
    } catch (err) {
      const msg = err.message || 'Network error occurred. Please try again.';
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm({
      name: '',
      phone: '',
      email: '',
      location: '',
      church: '',
      role: 'Believer / Delegate',
      accommodation: 'No, self-arranged',
      notes: '',
    });
    setIsSubmitted(false);
    setDispatchedLinks(null);
    setErrorMessage(null);
  };

  const openWhatsAppUrl = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reg-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-ink-950/75 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Dialog Card */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-ink-950/15 bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-ink-950/10 bg-brand-900 px-6 py-5 text-white">
          <div>
            <span className="text-[0.62rem] font-bold uppercase tracking-[0.25em] text-brand-300">
              Christ The Potter Church &bull; Portal
            </span>
            <h2 id="reg-modal-title" className="mt-1 font-display text-2xl uppercase tracking-wide text-white sm:text-3xl">
              Conference &amp; School Registration
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            <div className="space-y-6 text-center py-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <Check size={36} strokeWidth={2.5} />
              </div>

              <div>
                <span className="text-[0.64rem] font-bold uppercase tracking-[0.25em] text-brand-700">
                  Confirmed &bull; {currentConf?.short || 'Event'}
                </span>
                <h3 className="mt-2 font-display text-3xl uppercase leading-tight text-ink-950 sm:text-4xl">
                  Registration Successful!
                </h3>
                <p className="mt-2 text-sm text-ink-950/75 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-ink-950">{form.name}</strong>. Your registration for{' '}
                  <strong className="text-brand-800">{currentConf?.title}</strong> has been safely recorded and dispatched to all church WhatsApp lines.
                </p>
              </div>

              {/* WhatsApp dual-line delivery confirmation box */}
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-50/70 p-5 text-left">
                <div className="flex items-center gap-2 font-display text-base uppercase text-[#0f4a17]">
                  <MessageSquare size={18} className="text-emerald-700" />
                  <span>Received Across All Official WhatsApp Lines:</span>
                </div>
                <p className="mt-1 text-xs text-ink-950/70">
                  Our ministers and protocol teams have received your notification. If the chats did not open automatically, tap either pastoral line below:
                </p>

                <div className="mt-3.5 grid gap-2.5 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => dispatchedLinks && openWhatsAppUrl(dispatchedLinks.line1.url)}
                    className="flex items-center justify-between rounded-md bg-[#0f4a17] px-4 py-3 text-xs font-bold text-white shadow-sm hover:bg-[#156320] transition-colors"
                  >
                    <span>Line 1: 0706 270 9694</span>
                    <ExternalLink size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => dispatchedLinks && openWhatsAppUrl(dispatchedLinks.line2.url)}
                    className="flex items-center justify-between rounded-md bg-[#0f4a17] px-4 py-3 text-xs font-bold text-white shadow-sm hover:bg-[#156320] transition-colors"
                  >
                    <span>Line 2: 0816 377 6464</span>
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Button variant="outlineDark" size="md" onClick={handleReset}>
                  Register Another Delegate
                </Button>
                <Button variant="solid" size="md" onClick={onClose}>
                  Done &bull; Return to Website
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMessage && (
                <div className="rounded-md border border-red-500/30 bg-red-50 p-3.5 text-xs font-medium text-red-800">
                  {errorMessage}
                </div>
              )}

              {/* Select Conference / School */}
              <Field label="Select Conference / School *" id="reg-conf">
                <Select
                  id="reg-conf"
                  value={selectedConfId}
                  onChange={(e) => setSelectedConfId(e.target.value)}
                  required
                >
                  {CONFERENCES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.short}) &bull; {c.date}
                    </option>
                  ))}
                </Select>
              </Field>

              {/* Banner with chosen conference info */}
              {currentConf && (
                <div className="rounded-md border border-brand-700/20 bg-brand-50/60 p-3.5 text-xs text-brand-950">
                  <p className="font-bold uppercase tracking-wider text-brand-800">
                    Theme: {currentConf.theme}
                  </p>
                  <p className="mt-1 text-ink-950/70">
                    <strong>Date &amp; Time:</strong> {currentConf.date} &bull; {currentConf.time}
                  </p>
                  <p className="mt-0.5 text-ink-950/70">
                    <strong>Venue:</strong> {currentConf.venue}
                  </p>
                </div>
              )}

              {/* Name & Phone */}
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name *" id="reg-name">
                  <Input
                    id="reg-name"
                    type="text"
                    required
                    placeholder="e.g. Pastor Samuel Adeyemi"
                    value={form.name}
                    onChange={setField('name')}
                  />
                </Field>

                <Field label="Phone / WhatsApp Number *" id="reg-phone">
                  <Input
                    id="reg-phone"
                    type="tel"
                    required
                    placeholder="e.g. 0803 123 4567"
                    value={form.phone}
                    onChange={setField('phone')}
                  />
                </Field>
              </div>

              {/* Email & Location */}
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Email Address (Optional)" id="reg-email">
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="e.g. samuel@example.com"
                    value={form.email}
                    onChange={setField('email')}
                  />
                </Field>

                <Field label="City & State of Residence *" id="reg-location">
                  <Input
                    id="reg-location"
                    type="text"
                    required
                    placeholder="e.g. Ile-Ife, Osun State"
                    value={form.location}
                    onChange={setField('location')}
                  />
                </Field>
              </div>

              {/* Church / Ministry & Role */}
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Home Church / Ministry" id="reg-church">
                  <Input
                    id="reg-church"
                    type="text"
                    placeholder="e.g. Christ The Potter Church"
                    value={form.church}
                    onChange={setField('church')}
                  />
                </Field>

                <Field label="Ministry Role / Calling" id="reg-role">
                  <Select id="reg-role" value={form.role} onChange={setField('role')}>
                    <option value="Minister / Pastor">Minister / Pastor</option>
                    <option value="Youth Leader / Minister">Youth Leader / Minister</option>
                    <option value="Church Worker / Department Lead">Church Worker / Department Lead</option>
                    <option value="Believer / Delegate">Believer / Delegate</option>
                    <option value="Student / Campus Fellowship">Student / Campus Fellowship</option>
                  </Select>
                </Field>
              </div>

              {/* Accommodation Requirement */}
              <Field label="Do you require accommodation arrangement?" id="reg-accommodation">
                <Select id="reg-accommodation" value={form.accommodation} onChange={setField('accommodation')}>
                  <option value="No, self-arranged">No, self-arranged / I live in Ile-Ife</option>
                  <option value="Yes, please guide me with church hostel/accommodation">
                    Yes, please guide me with church hostel / accommodation
                  </option>
                  <option value="Need hotel recommendations in Ile-Ife">
                    Need hotel recommendations near church auditorium
                  </option>
                </Select>
              </Field>

              {/* Questions or notes */}
              <Field label="Questions, Special Needs, or Prayer Requests (Optional)" id="reg-notes">
                <Textarea
                  id="reg-notes"
                  rows={3}
                  placeholder="Share any special inquiries or expectations for this gathering..."
                  value={form.notes}
                  onChange={setField('notes')}
                />
              </Field>

              {/* WhatsApp Dispatch Notice */}
              <div className="rounded-md border border-brand-700/20 bg-paper/60 p-3.5 text-xs text-ink-950/80 leading-relaxed">
                <p className="font-semibold text-brand-800 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-brand-600" />
                  Dual WhatsApp Confirmation:
                </p>
                <p className="mt-1 text-[0.76rem]">
                  Upon clicking submit, your registration is instantly stored and dispatched to both official pastoral WhatsApp numbers:
                  <strong className="block text-brand-800 mt-0.5">0706 270 9694 &amp; 0816 377 6464</strong>
                </p>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-wrap items-center justify-end gap-3 pt-3">
                <Button variant="outlineDark" size="md" type="button" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="solid" size="md" type="submit" disabled={isSubmitting}>
                  <Send size={14} />
                  {isSubmitting ? 'Registering...' : 'Submit Registration'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
