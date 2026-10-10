'use client';

import { useState } from 'react';
import { Check, Send, HandHeart } from 'lucide-react';
import clsx from 'clsx';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Eyebrow from '../ui/Eyebrow';
import { Field, Input, Select, Textarea } from '../ui/Field';

const CATEGORIES = [
  'Spiritual Growth & Fire',
  'Healing & Health',
  'Family & Marriage Peace',
  'Financial & Debt Deliverance',
  'Fruit of the Womb',
  'Academic & Career Breakthrough',
  'Deliverance from Habitual Sin',
];

const initialWall = [
  {
    id: 1,
    name: 'Sister Mary O.',
    category: 'Family & Marriage',
    request: 'Please stand in agreement with me for divine peace, godly restoration, and wisdom in my marriage.',
    date: 'Yesterday',
    amens: 34,
  },
  {
    id: 2,
    name: 'Brother Emmanuel K.',
    category: 'Academic & Career',
    request: 'Praying for divine favour and open doors in my final examinations and post-graduate fellowship.',
    date: '2 days ago',
    amens: 28,
  },
  {
    id: 3,
    name: 'Anonymous Believer',
    category: 'Spiritual Growth & Fire',
    request: 'Desiring a fresh baptism of the Holy Ghost fire and consistency in my secret prayer altar.',
    date: '3 days ago',
    amens: 47,
  },
];

const emptyForm = { name: '', phone: '', category: CATEGORIES[0], details: '', isConfidential: true };

// Not wired to a backend yet: submissions and "amens" live only in this tab's state.
export default function PrayerRequest() {
  const [form, setForm] = useState(emptyForm);
  const [submittedName, setSubmittedName] = useState(null);
  const [wall, setWall] = useState(initialWall);
  const [prayed, setPrayed] = useState({});
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const amen = (id) => {
    if (prayed[id]) return;
    setPrayed({ ...prayed, [id]: true });
    setWall(wall.map((p) => (p.id === id ? { ...p, amens: p.amens + 1 } : p)));
  };

  return (
    <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
      <Card className="p-6 sm:p-10">
        {submittedName !== null ? (
          <div>
            <Check size={40} strokeWidth={1.5} className="text-brand-600" />
            <h3 className="mt-6 font-display text-4xl uppercase leading-none text-ink-950">Placed on the altar</h3>
            <p className="mt-4 leading-relaxed text-ink-950/70">
              Thank you, <strong className="text-ink-950">{submittedName || 'beloved'}</strong>. Apostle Oluwafunminiyi
              Olufisayo and the School of Prayer intercessors will lift this need in earnest prayer.
            </p>
            <Button
              variant="outlineDark"
              className="mt-8"
              onClick={() => {
                setForm(emptyForm);
                setSubmittedName(null);
              }}
            >
              Send another request
            </Button>
          </div>
        ) : (
          <>
            <Eyebrow>School of Prayer intercession</Eyebrow>
            <h3 className="mt-4 font-display text-4xl uppercase leading-none text-ink-950">Send us your burden</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-950/70">
              “The effectual fervent prayer of a righteous man availeth much.” (James 5:16). Every request is held in
              sacred trust.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmittedName(form.name);
              }}
              className="mt-8 grid gap-5 sm:grid-cols-2"
            >
              <div className="sm:col-span-2">
                <Field label="Your name (or “Anonymous”)" id="prayer-name">
                  <Input id="prayer-name" placeholder="Your name" value={form.name} onChange={set('name')} />
                </Field>
              </div>
              <Field label="Phone number" id="prayer-phone">
                <Input id="prayer-phone" type="tel" placeholder="080 1234 5678" value={form.phone} onChange={set('phone')} />
              </Field>
              <Field label="Category" id="prayer-category">
                <Select id="prayer-category" value={form.category} onChange={set('category')}>
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </Select>
              </Field>
              <div className="sm:col-span-2">
                <Field label="Prayer details *" id="prayer-details">
                  <Textarea
                    id="prayer-details"
                    required
                    rows={5}
                    placeholder="Describe the situation you need God to intervene in…"
                    value={form.details}
                    onChange={set('details')}
                  />
                </Field>
              </div>
              <label className="flex items-center gap-3 text-sm font-semibold text-ink-950 sm:col-span-2">
                <input
                  type="checkbox"
                  checked={form.isConfidential}
                  onChange={(e) => setForm({ ...form, isConfidential: e.target.checked })}
                  className="h-4 w-4 accent-brand-600"
                />
                Keep strictly confidential (pastors only)
              </label>
              <Button type="submit" variant="solid" size="lg" className="sm:col-span-2">
                <Send size={14} />
                Place upon the altar
              </Button>
            </form>
          </>
        )}
      </Card>

      <div>
        <Eyebrow>Corporate intercession</Eyebrow>
        <h3 className="mt-4 font-display text-[2.4rem] uppercase leading-[0.95] text-ink-950 sm:text-5xl">Agreed in prayer</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-950/70">
          Join faith with brethren everywhere — tap “Amen” to stand with each request.
        </p>
        <ul className="mt-8 border-b border-ink-950/10">
          {wall.map((item) => (
            <li key={item.id} className="border-t border-ink-950/10 py-6">
              <div className="flex items-center justify-between gap-4 text-[0.64rem] font-bold uppercase tracking-[0.2em]">
                <span className="text-brand-600">{item.category}</span>
                <span className="text-ink-950/45">{item.date}</span>
              </div>
              <p className="mt-3 leading-relaxed text-ink-950/80">“{item.request}”</p>
              <div className="mt-4 flex items-center justify-between gap-4">
                <span className="text-sm text-ink-950/60">
                  <strong className="text-ink-950">{item.name}</strong> · {item.amens} praying
                </span>
                <button
                  type="button"
                  onClick={() => amen(item.id)}
                  aria-pressed={Boolean(prayed[item.id])}
                  className={clsx(
                    'inline-flex items-center gap-2 border px-4 py-2 text-[0.64rem] font-bold uppercase tracking-[0.18em] transition-colors',
                    prayed[item.id]
                      ? 'border-brand-600 bg-brand-600 text-white'
                      : 'border-ink-950/25 text-ink-950 hover:border-ink-950'
                  )}
                >
                  <HandHeart size={13} />
                  {prayed[item.id] ? 'Praying with you' : 'Amen'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
