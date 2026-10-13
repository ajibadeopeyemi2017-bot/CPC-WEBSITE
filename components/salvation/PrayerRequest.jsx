'use client';

import { useState, useEffect } from 'react';
import { Check, Send, HandHeart, Sparkles, Flame, Heart, Share2, Award } from 'lucide-react';
import clsx from 'clsx';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Eyebrow from '../ui/Eyebrow';
import { Field, Input, Select, Textarea } from '../ui/Field';

const PRAYER_CATEGORIES = [
  'Spiritual Growth & Fire',
  'Healing & Health',
  'Family & Marriage Peace',
  'Financial & Debt Deliverance',
  'Fruit of the Womb',
  'Academic & Career Breakthrough',
  'Deliverance from Habitual Sin',
];

const TESTIMONY_CATEGORIES = [
  'Healing & Divine Deliverance',
  'Fruit of the Womb & Safe Delivery',
  'Academic & Job Breakthrough',
  'Supernatural Provision & Debt Miracle',
  'Family, Marriage & Restoration',
  'Salvation & Holy Ghost Encounter',
  'Divine Preservation & Journey Mercy',
];

const initialPrayerWall = [
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

const initialTestimonyWall = [
  {
    id: 101,
    name: 'Sister Blessing A.',
    category: 'Fruit of the Womb & Safe Delivery',
    title: 'Blessed with Healthy Twin Boys after 4 Years of Waiting!',
    testimony:
      'After four years of medical delays, Apostle prayed with my husband and me at the School of Prayer altar and declared: “Before this season ends, your shame turns to double glory!” Glory to Jesus, the Lord blessed us with healthy twin boys!',
    date: '3 days ago',
    praises: 74,
  },
  {
    id: 102,
    name: 'Brother Tolu O.',
    category: 'Academic & Job Breakthrough',
    title: 'Unexpected Job Appointment at Multi-National Firm',
    testimony:
      'I was unemployed for 11 months. During the Revelational Hour service on Thursday, Apostle taught on Divine Help from Hebrews 4:16. That same Friday afternoon, I received a call offering me a senior managerial position with full relocation benefits!',
    date: 'Last week',
    praises: 58,
  },
  {
    id: 103,
    name: 'Deaconess Folake M.',
    category: 'Healing & Divine Deliverance',
    title: 'Total Deliverance from Chronic 6-Year Migraine',
    testimony:
      'I suffered from debilitating migraines for over 6 years that defied medication. During Tuesday School of Prayer, as hands were laid and the fire of God fell, the pain vanished instantly. Follow-up hospital scan confirmed complete normalcy. Praise the Lord!',
    date: '2 weeks ago',
    praises: 92,
  },
];

const emptyPrayerForm = {
  name: '',
  phone: '',
  category: PRAYER_CATEGORIES[0],
  details: '',
  isConfidential: true,
};

const emptyTestimonyForm = {
  name: '',
  phone: '',
  category: TESTIMONY_CATEGORIES[0],
  title: '',
  details: '',
  allowShare: true,
};

export default function PrayerRequest() {
  const [activeTab, setActiveTab] = useState('prayer'); // 'prayer' | 'testimony'

  // Prayer state
  const [prayerForm, setPrayerForm] = useState(emptyPrayerForm);
  const [submittedPrayerName, setSubmittedPrayerName] = useState(null);
  const [isSubmittingPrayer, setIsSubmittingPrayer] = useState(false);
  const [prayerError, setPrayerError] = useState(null);
  const [prayerWall, setPrayerWall] = useState(initialPrayerWall);
  const [prayed, setPrayed] = useState({});

  // Testimony state
  const [testimonyForm, setTestimonyForm] = useState(emptyTestimonyForm);
  const [submittedTestimonyName, setSubmittedTestimonyName] = useState(null);
  const [isSubmittingTestimony, setIsSubmittingTestimony] = useState(false);
  const [testimonyError, setTestimonyError] = useState(null);
  const [testimonyWall, setTestimonyWall] = useState(initialTestimonyWall);
  const [praised, setPraised] = useState({});

  // Load live prayers and approved praise reports
  useEffect(() => {
    fetch('/api/testimonies')
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          if (res.prayers && res.prayers.length > 0) {
            setPrayerWall(
              res.prayers.map((p) => ({
                id: p.id,
                name: p.name,
                category: p.category,
                request: p.details,
                date: new Date(p.createdAt).toLocaleDateString(),
                amens: p.amens || 0,
              }))
            );
          }
          if (res.testimonies && res.testimonies.length > 0) {
            setTestimonyWall(
              res.testimonies.map((t) => ({
                id: t.id,
                name: t.name,
                category: t.category,
                title: t.title,
                testimony: t.details,
                date: new Date(t.createdAt).toLocaleDateString(),
                praises: t.praises || 0,
              }))
            );
          }
        }
      })
      .catch(() => {});
  }, []);

  // Handlers for prayer
  const setP = (key) => (e) => setPrayerForm({ ...prayerForm, [key]: e.target.value });
  const amen = (id) => {
    if (prayed[id]) return;
    setPrayed({ ...prayed, [id]: true });
    setPrayerWall(prayerWall.map((p) => (p.id === id ? { ...p, amens: (p.amens || 0) + 1 } : p)));
    fetch('/api/testimonies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'amen', id }),
    }).catch(() => {});
  };

  const handlePrayerSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingPrayer(true);
    setPrayerError(null);

    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'prayer', data: prayerForm }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit prayer request. Please try again.');
      }

      if (!prayerForm.isConfidential) {
        const newEntry = {
          id: Date.now(),
          name: prayerForm.name.trim() || 'Anonymous Believer',
          category: prayerForm.category,
          request: prayerForm.details,
          date: 'Just now',
          amens: 1,
        };
        setPrayerWall((prev) => [newEntry, ...prev]);
      }

      setSubmittedPrayerName(prayerForm.name.trim() || 'beloved');
    } catch (err) {
      setPrayerError(err.message || 'Network error. Please try again.');
    } finally {
      setIsSubmittingPrayer(false);
    }
  };

  // Handlers for testimony
  const setT = (key) => (e) => setTestimonyForm({ ...testimonyForm, [key]: e.target.value });
  const givePraise = (id) => {
    if (praised[id]) return;
    setPraised({ ...praised, [id]: true });
    setTestimonyWall(testimonyWall.map((t) => (t.id === id ? { ...t, praises: (t.praises || 0) + 1 } : t)));
    fetch('/api/testimonies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'praise', id }),
    }).catch(() => {});
  };

  const handleTestimonySubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingTestimony(true);
    setTestimonyError(null);

    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'testimony', data: testimonyForm }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit praise report. Please try again.');
      }

      // Add to live praise wall
      const newTestimony = {
        id: Date.now(),
        name: testimonyForm.name.trim() || 'A Grateful Believer',
        category: testimonyForm.category,
        title: testimonyForm.title.trim() || 'The Lord Has Done It!',
        testimony: testimonyForm.details,
        date: 'Just now',
        praises: 1,
      };
      setTestimonyWall((prev) => [newTestimony, ...prev]);
      setSubmittedTestimonyName(testimonyForm.name.trim() || 'Grateful Soul');
    } catch (err) {
      setTestimonyError(err.message || 'Could not submit praise report. Please try again.');
    } finally {
      setIsSubmittingTestimony(false);
    }
  };

  return (
    <div>
      {/* ---------------------------------------------------- */}
      {/* TOP TAB SWITCHER */}
      {/* ---------------------------------------------------- */}
      <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-ink-950/15 pb-6">
        <div>
          <Eyebrow>{activeTab === 'prayer' ? 'School of Prayer Intercession' : 'Thanksgiving & Praise Altar'}</Eyebrow>
          <h2 className="mt-2 font-display text-3xl uppercase leading-none text-ink-950 sm:text-5xl">
            {activeTab === 'prayer' ? 'Altar of Prayer' : 'Praise Reports & Testimonies'}
          </h2>
        </div>

        <div className="flex border border-ink-950/20 bg-paper p-1" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'prayer'}
            onClick={() => setActiveTab('prayer')}
            className={clsx(
              'flex items-center gap-2 px-5 py-2.5 text-[0.66rem] font-bold uppercase tracking-[0.18em] transition-all',
              activeTab === 'prayer'
                ? 'bg-ink-950 text-white shadow-sm'
                : 'text-ink-950/70 hover:text-ink-950 hover:bg-white'
            )}
          >
            <HandHeart size={14} />
            Request Prayer
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'testimony'}
            onClick={() => setActiveTab('testimony')}
            className={clsx(
              'flex items-center gap-2 px-5 py-2.5 text-[0.66rem] font-bold uppercase tracking-[0.18em] transition-all',
              activeTab === 'testimony'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-ink-950/70 hover:text-ink-950 hover:bg-white'
            )}
          >
            <Sparkles size={14} />
            Share Testimony
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* TAB 1: PRAYER REQUESTS */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'prayer' && (
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Card className="p-6 sm:p-10">
            {submittedPrayerName !== null ? (
              <div>
                <Check size={40} strokeWidth={1.5} className="text-brand-600" />
                <h3 className="mt-6 font-display text-4xl uppercase leading-none text-ink-950">Placed on the altar</h3>
                <p className="mt-4 leading-relaxed text-ink-950/70">
                  Thank you, <strong className="text-ink-950">{submittedPrayerName}</strong>. Your prayer request has been
                  delivered to the pastoral office. Apostle Oluwafunminiyi Olufisayo and the School of Prayer intercessors
                  will lift this need in earnest prayer.
                </p>
                <Button
                  variant="outlineDark"
                  className="mt-8"
                  onClick={() => {
                    setPrayerForm(emptyPrayerForm);
                    setSubmittedPrayerName(null);
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

                {prayerError && (
                  <div className="mt-4 border border-red-200 bg-red-50 p-4 text-sm text-red-700">{prayerError}</div>
                )}

                <form onSubmit={handlePrayerSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Field label="Your name (or “Anonymous”)" id="prayer-name">
                      <Input
                        id="prayer-name"
                        placeholder="Your name"
                        value={prayerForm.name}
                        onChange={setP('name')}
                      />
                    </Field>
                  </div>
                  <Field label="Phone / WhatsApp" id="prayer-phone">
                    <Input
                      id="prayer-phone"
                      type="tel"
                      placeholder="080 1234 5678"
                      value={prayerForm.phone}
                      onChange={setP('phone')}
                    />
                  </Field>
                  <Field label="Category" id="prayer-category">
                    <Select id="prayer-category" value={prayerForm.category} onChange={setP('category')}>
                      {PRAYER_CATEGORIES.map((c) => (
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
                        value={prayerForm.details}
                        onChange={setP('details')}
                      />
                    </Field>
                  </div>
                  <label className="flex items-center gap-3 text-sm font-semibold text-ink-950 sm:col-span-2">
                    <input
                      type="checkbox"
                      checked={prayerForm.isConfidential}
                      onChange={(e) => setPrayerForm({ ...prayerForm, isConfidential: e.target.checked })}
                      className="h-4 w-4 accent-brand-600"
                    />
                    Keep strictly confidential (pastoral altar only)
                  </label>
                  <Button
                    type="submit"
                    variant="solid"
                    size="lg"
                    className="sm:col-span-2"
                    disabled={isSubmittingPrayer}
                  >
                    <Send size={14} />
                    {isSubmittingPrayer ? 'Placing upon altar…' : 'Place upon the altar'}
                  </Button>
                </form>
              </>
            )}
          </Card>

          <div>
            <Eyebrow>Corporate intercession</Eyebrow>
            <h3 className="mt-4 font-display text-[2.4rem] uppercase leading-[0.95] text-ink-950 sm:text-5xl">
              Agreed in prayer
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-950/70">
              Join faith with brethren everywhere — tap “Amen” to stand with each request.
            </p>
            <ul className="mt-8 border-b border-ink-950/10">
              {prayerWall.map((item) => (
                <li key={item.id} className="border-t border-ink-950/10 py-6">
                  <div className="flex items-center justify-between gap-4 text-[0.64rem] font-bold uppercase tracking-[0.2em]">
                    <span className="text-brand-600">{item.category}</span>
                    <span className="text-ink-950/45">{item.date}</span>
                  </div>
                  <p className="mt-3 leading-relaxed text-ink-950/80">“{item.request}”</p>
                  <div className="mt-4 flex items-center justify-between gap-4">
                    <span className="text-sm text-ink-950/60">
                      <strong className="text-ink-950">{item.name}</strong> &bull; {item.amens} praying
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
      )}

      {/* ---------------------------------------------------- */}
      {/* TAB 2: PRAISE REPORTS & TESTIMONIES */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'testimony' && (
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Card className="p-6 sm:p-10 border-t-4 border-t-brand-600">
            {submittedTestimonyName !== null ? (
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-700 ring-8 ring-amber-500/10 mb-5">
                  <Sparkles size={28} />
                </div>
                <h3 className="font-display text-4xl uppercase leading-none text-ink-950">Glory to God!</h3>
                <p className="mt-4 leading-relaxed text-ink-950/70">
                  Thank you, <strong className="text-ink-950">{submittedTestimonyName}</strong>! Your testimony has been
                  received by the pastoral team. Your praise report glorifies Jesus and stirs up faith in the hearts of
                  believers!
                </p>
                <blockquote className="mt-6 border-l-4 border-brand-600 bg-brand-50/50 p-4 text-xs italic text-brand-900 leading-relaxed">
                  “And they overcame him by the blood of the Lamb, and by the word of their testimony.” &mdash; Rev. 12:11
                </blockquote>
                <Button
                  variant="solid"
                  className="mt-8"
                  onClick={() => {
                    setTestimonyForm(emptyTestimonyForm);
                    setSubmittedTestimonyName(null);
                  }}
                >
                  Share another testimony
                </Button>
              </div>
            ) : (
              <>
                <Eyebrow tone="brand">The Lord Has Done Great Things</Eyebrow>
                <h3 className="mt-4 font-display text-4xl uppercase leading-none text-ink-950">
                  Declare God&apos;s Faithfulness
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-950/70">
                  Did the Lord answer your prayer, heal your body, or open a closed door? Share your testimony to defeat
                  the enemy and inspire the congregation.
                </p>

                {testimonyError && (
                  <div className="mt-4 border border-red-200 bg-red-50 p-4 text-sm text-red-700">{testimonyError}</div>
                )}

                <form onSubmit={handleTestimonySubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Field label="Your Name (or “Anonymous”)" id="testimony-name">
                      <Input
                        id="testimony-name"
                        placeholder="e.g. Sister Funke A."
                        value={testimonyForm.name}
                        onChange={setT('name')}
                      />
                    </Field>
                  </div>

                  <Field label="Phone / WhatsApp (Optional)" id="testimony-phone">
                    <Input
                      id="testimony-phone"
                      type="tel"
                      placeholder="080 1234 5678"
                      value={testimonyForm.phone}
                      onChange={setT('phone')}
                    />
                  </Field>

                  <Field label="Testimony Category" id="testimony-category">
                    <Select id="testimony-category" value={testimonyForm.category} onChange={setT('category')}>
                      {TESTIMONY_CATEGORIES.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </Select>
                  </Field>

                  <div className="sm:col-span-2">
                    <Field label="Testimony Headline / Summary *" id="testimony-title">
                      <Input
                        id="testimony-title"
                        required
                        placeholder="e.g. Divine healing from 4-year spinal pain!"
                        value={testimonyForm.title}
                        onChange={setT('title')}
                      />
                    </Field>
                  </div>

                  <div className="sm:col-span-2">
                    <Field label="Your Full Testimony Story *" id="testimony-details">
                      <Textarea
                        id="testimony-details"
                        required
                        rows={6}
                        placeholder="Describe what the situation was, how God intervened, and what you are thanking Him for…"
                        value={testimonyForm.details}
                        onChange={setT('details')}
                      />
                    </Field>
                  </div>

                  <label className="flex items-center gap-3 text-sm font-semibold text-ink-950 sm:col-span-2">
                    <input
                      type="checkbox"
                      checked={testimonyForm.allowShare}
                      onChange={(e) => setTestimonyForm({ ...testimonyForm, allowShare: e.target.checked })}
                      className="h-4 w-4 accent-brand-600"
                    />
                    I give permission for this testimony to be shared during church service or on the praise wall
                  </label>

                  <Button
                    type="submit"
                    variant="solid"
                    size="lg"
                    className="sm:col-span-2"
                    disabled={isSubmittingTestimony}
                  >
                    <Flame size={14} className="text-amber-300" />
                    {isSubmittingTestimony ? 'Publishing praise report…' : 'Publish Praise Report'}
                  </Button>
                </form>
              </>
            )}
          </Card>

          {/* Right Column: Praise Wall */}
          <div>
            <Eyebrow tone="brand">The Overcomers&apos; Wall</Eyebrow>
            <h3 className="mt-4 font-display text-[2.4rem] uppercase leading-[0.95] text-ink-950 sm:text-5xl">
              Voices of Thanksgiving
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-950/70">
              Read what God is doing in the midst of His people. Tap “Glory to God!” to praise the Lord with each
              testifier!
            </p>

            <ul className="mt-8 space-y-6">
              {testimonyWall.map((item) => (
                <li
                  key={item.id}
                  className="rounded-sm border border-ink-950/15 bg-white p-6 shadow-sm transition-all hover:border-brand-600 hover:shadow-md"
                >
                  <div className="flex items-center justify-between gap-4 text-[0.64rem] font-bold uppercase tracking-[0.2em]">
                    <span className="rounded bg-brand-50 px-2.5 py-1 text-brand-700 border border-brand-600/20">
                      {item.category}
                    </span>
                    <span className="text-ink-950/45">{item.date}</span>
                  </div>

                  <h4 className="mt-3 font-display text-xl uppercase leading-tight text-ink-950">{item.title}</h4>

                  <p className="mt-2.5 text-sm leading-relaxed text-ink-950/75">“{item.testimony}”</p>

                  <div className="mt-5 flex items-center justify-between gap-4 border-t border-ink-950/10 pt-4">
                    <span className="text-xs text-ink-950/60">
                      <strong className="text-ink-950">{item.name}</strong> &bull; {item.praises} praising God
                    </span>

                    <button
                      type="button"
                      onClick={() => givePraise(item.id)}
                      aria-pressed={Boolean(praised[item.id])}
                      className={clsx(
                        'inline-flex items-center gap-1.5 border px-3.5 py-1.5 text-[0.64rem] font-bold uppercase tracking-[0.18em] transition-all',
                        praised[item.id]
                          ? 'border-brand-600 bg-brand-600 text-white shadow-sm scale-105'
                          : 'border-ink-950/20 text-ink-950 hover:border-brand-600 hover:bg-brand-50 hover:text-brand-800'
                      )}
                    >
                      <Sparkles size={13} className={praised[item.id] ? 'text-amber-300' : 'text-brand-600'} />
                      {praised[item.id] ? 'Hallelujah!' : 'Glory to God!'}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
