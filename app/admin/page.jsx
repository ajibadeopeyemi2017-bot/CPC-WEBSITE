'use client';

import { useState, useEffect } from 'react';
import {
  Users,
  Flame,
  Sparkles,
  HeartHandshake,
  CreditCard,
  Lock,
  LogOut,
  CheckCircle,
  Clock,
  Eye,
  Check,
  X,
  Search,
  Download,
  ShieldAlert,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import clsx from 'clsx';
import { CHURCH } from '../../lib/site-config';

export default function AdminPage() {
  const [token, setToken] = useState(null);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);

  const [data, setData] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [activeTab, setActiveTab] = useState('visitors');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionSuccess, setActionSuccess] = useState(null);

  // Check saved token on mount
  useEffect(() => {
    const saved = localStorage.getItem('cpc_admin_token');
    if (saved) {
      setToken(saved);
      fetchAdminData(saved);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoadingAuth(true);
    setAuthError(null);

    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode }),
      });
      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Authentication failed. Please check passcode.');
      }

      localStorage.setItem('cpc_admin_token', result.token);
      setToken(result.token);
      fetchAdminData(result.token);
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('cpc_admin_token');
    setToken(null);
    setData(null);
    setPasscode('');
  };

  const fetchAdminData = async (authToken) => {
    setIsLoadingData(true);
    try {
      const res = await fetch('/api/admin', {
        headers: { 'x-admin-token': authToken || token },
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setData(result.data);
      } else {
        handleLogout();
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleApproveTestimony = async (id, approved) => {
    try {
      const res = await fetch('/api/admin', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token,
        },
        body: JSON.stringify({ action: 'approve_testimony', id, value: approved }),
      });
      const result = await res.json();
      if (result.success) {
        setActionSuccess(`Testimony ${approved ? 'approved' : 'hidden'} successfully!`);
        setTimeout(() => setActionSuccess(null), 3000);
        fetchAdminData(token);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateVisitor = async (id, status) => {
    try {
      const res = await fetch('/api/admin', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token,
        },
        body: JSON.stringify({ action: 'update_visitor_status', id, value: status }),
      });
      const result = await res.json();
      if (result.success) {
        setActionSuccess(`Guest marked as ${status}!`);
        setTimeout(() => setActionSuccess(null), 3000);
        fetchAdminData(token);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Export data to CSV
  const exportToCsv = (items, filename) => {
    if (!items || items.length === 0) return;
    const headers = Object.keys(items[0]).join(',');
    const rows = items.map((item) =>
      Object.values(item)
        .map((val) => `"${String(val || '').replace(/"/g, '""')}"`)
        .join(',')
    );
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  // -----------------------------------------------------------------
  // LOGIN SCREEN
  // -----------------------------------------------------------------
  if (!token) {
    return (
      <div className="flex min-h-[85vh] items-center justify-center bg-paper px-4 py-16">
        <div className="w-full max-w-md rounded-xl border border-ink-950/15 bg-white p-8 shadow-2xl">
          <div className="text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-700">
              <Lock size={28} />
            </span>
            <p className="mt-4 text-[0.66rem] font-bold uppercase tracking-[0.25em] text-brand-700">
              Christ The Potter Church
            </p>
            <h1 className="mt-1 font-display text-3xl uppercase tracking-tight text-ink-950">
              Pastoral &amp; Protocol Desk
            </h1>
            <p className="mt-2 text-xs text-ink-950/70">
              Administrative portal for guest RSVPs, prayer petitions, praise reports, and finance records.
            </p>
          </div>

          {authError && (
            <div className="mt-6 flex items-center gap-2 rounded border border-red-200 bg-red-50 p-3 text-xs text-red-700">
              <ShieldAlert size={16} className="shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label htmlFor="passcode" className="block text-xs font-bold uppercase tracking-wider text-ink-950/80">
                Admin Passcode
              </label>
              <input
                id="passcode"
                type="password"
                required
                placeholder="Enter passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="mt-1.5 block w-full rounded border border-ink-950/20 px-3.5 py-2.5 text-sm text-ink-950 shadow-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
              />
              <p className="mt-1.5 text-[0.68rem] text-ink-950/50">
                Default: <code className="font-mono text-brand-700 font-semibold">cpc2026admin</code>
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoadingAuth}
              className="flex w-full items-center justify-center gap-2 rounded bg-brand-600 py-3 text-xs font-bold uppercase tracking-widest text-white shadow transition-all hover:bg-brand-700 disabled:opacity-50"
            >
              {isLoadingAuth ? 'Verifying...' : 'Access Portal'}
              <ArrowRight size={14} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------------------
  // DASHBOARD SCREEN
  // -----------------------------------------------------------------
  const stats = data?.stats || {};
  const q = searchQuery.toLowerCase().trim();

  const filteredVisitors = (data?.visitors || []).filter(
    (v) => !q || [v.name, v.phone, v.serviceDate, v.email].some((f) => f?.toLowerCase().includes(q))
  );

  const filteredPrayers = (data?.prayers || []).filter(
    (p) => !q || [p.name, p.category, p.details].some((f) => f?.toLowerCase().includes(q))
  );

  const filteredTestimonies = (data?.testimonies || []).filter(
    (t) => !q || [t.name, t.title, t.details, t.category].some((f) => f?.toLowerCase().includes(q))
  );

  const filteredVolunteers = (data?.volunteers || []).filter(
    (vol) => !q || [vol.name, vol.phone, vol.department, vol.experience].some((f) => f?.toLowerCase().includes(q))
  );

  const filteredDonations = (data?.donations || []).filter(
    (d) => !q || [d.donorName, d.reference, d.category, d.email].some((f) => f?.toLowerCase().includes(q))
  );

  return (
    <div className="min-h-screen bg-paper pb-20">
      {/* Top Banner */}
      <header className="border-b border-ink-950/10 bg-brand-700 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div>
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.25em] text-brand-200">
              Christ The Potter Church
            </p>
            <h1 className="font-display text-2xl uppercase tracking-tight sm:text-3xl">
              Pastoral &amp; Administrative Portal
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => fetchAdminData(token)}
              disabled={isLoadingData}
              className="inline-flex items-center gap-1.5 rounded border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/20"
              title="Refresh Records"
            >
              <RefreshCw size={13} className={clsx(isLoadingData && 'animate-spin')} />
              <span>Refresh</span>
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded border border-white/30 bg-ink-950/40 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-red-700"
            >
              <LogOut size={13} />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-5 pt-8 sm:px-8">
        {actionSuccess && (
          <div className="mb-6 flex items-center gap-2 rounded border border-green-300 bg-green-50 p-4 text-sm font-semibold text-green-900 shadow-sm animate-in fade-in">
            <CheckCircle size={18} className="text-green-600" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 sm:gap-4">
          <div className="rounded-lg border border-ink-950/10 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between text-brand-600">
              <span className="text-[0.64rem] font-bold uppercase tracking-wider text-ink-950/60">Guests RSVP</span>
              <Users size={16} />
            </div>
            <p className="mt-2 font-display text-3xl text-ink-950">{stats.totalVisitors || 0}</p>
          </div>

          <div className="rounded-lg border border-ink-950/10 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between text-blue-600">
              <span className="text-[0.64rem] font-bold uppercase tracking-wider text-ink-950/60">Prayers</span>
              <Flame size={16} />
            </div>
            <p className="mt-2 font-display text-3xl text-ink-950">{stats.totalPrayers || 0}</p>
          </div>

          <div className="rounded-lg border border-ink-950/10 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between text-amber-600">
              <span className="text-[0.64rem] font-bold uppercase tracking-wider text-ink-950/60">Testimonies</span>
              <Sparkles size={16} />
            </div>
            <p className="mt-2 font-display text-3xl text-ink-950">{stats.totalTestimonies || 0}</p>
            {stats.pendingTestimonies > 0 && (
              <span className="mt-1 inline-block rounded bg-amber-100 px-1.5 py-0.5 text-[0.62rem] font-bold text-amber-800">
                {stats.pendingTestimonies} pending approval
              </span>
            )}
          </div>

          <div className="rounded-lg border border-ink-950/10 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between text-purple-600">
              <span className="text-[0.64rem] font-bold uppercase tracking-wider text-ink-950/60">Volunteers</span>
              <HeartHandshake size={16} />
            </div>
            <p className="mt-2 font-display text-3xl text-ink-950">{stats.totalVolunteers || 0}</p>
          </div>

          <div className="col-span-2 sm:col-span-1 rounded-lg border border-brand-600/30 bg-brand-50 p-4 shadow-sm">
            <div className="flex items-center justify-between text-brand-700">
              <span className="text-[0.64rem] font-bold uppercase tracking-wider text-brand-800">Online Giving</span>
              <CreditCard size={16} />
            </div>
            <p className="mt-2 font-display text-2xl text-brand-900 sm:text-3xl">
              ₦{(stats.totalNgn || 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Tab Controls and Search Toolbar */}
        <div className="mt-8 flex flex-col gap-4 border-b border-ink-950/15 pb-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Tabs */}
          <div className="flex flex-wrap gap-1.5 rounded-lg bg-white p-1 border border-ink-950/10 shadow-sm">
            {[
              { id: 'visitors', label: 'Guest RSVPs', count: data?.visitors?.length },
              { id: 'prayers', label: 'Prayers', count: data?.prayers?.length },
              { id: 'testimonies', label: 'Praise Reports', count: data?.testimonies?.length },
              { id: 'volunteers', label: 'Volunteers', count: data?.volunteers?.length },
              { id: 'donations', label: 'Giving & Treasury', count: data?.donations?.length },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  setSearchQuery('');
                }}
                className={clsx(
                  'rounded px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all',
                  activeTab === tab.id
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-ink-950/70 hover:bg-paper hover:text-ink-950'
                )}
              >
                {tab.label} {tab.count !== undefined ? `(${tab.count})` : ''}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-950/40" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded border border-ink-950/20 bg-white py-2 pl-9 pr-3 text-xs text-ink-950 shadow-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
            />
          </div>
        </div>

        {/* TAB 1: GUEST RSVPs */}
        {activeTab === 'visitors' && (
          <div className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl uppercase text-ink-950">Pre-Registered Guests</h2>
              <button
                type="button"
                onClick={() => exportToCsv(data?.visitors, 'cpc-guest-rsvps')}
                className="inline-flex items-center gap-1.5 rounded border border-ink-950/20 bg-white px-3 py-1.5 text-xs font-semibold text-ink-950 hover:bg-paper"
              >
                <Download size={13} /> Export CSV
              </button>
            </div>

            <div className="overflow-x-auto rounded-lg border border-ink-950/15 bg-white shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-ink-950/10 bg-paper/60 uppercase text-ink-950/60 font-bold">
                  <tr>
                    <th className="p-3.5">Guest Name</th>
                    <th className="p-3.5">Contact</th>
                    <th className="p-3.5">Target Service</th>
                    <th className="p-3.5">Party / Kids</th>
                    <th className="p-3.5">Notes</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-950/5">
                  {filteredVisitors.map((v) => (
                    <tr key={v.id} className="hover:bg-paper/40">
                      <td className="p-3.5 font-bold text-ink-950">{v.name}</td>
                      <td className="p-3.5 text-ink-950/80">
                        <a href={`tel:${v.phone}`} className="font-semibold text-brand-700 hover:underline">
                          {v.phone}
                        </a>
                        {v.email && <div className="text-[0.7rem] text-ink-950/60">{v.email}</div>}
                      </td>
                      <td className="p-3.5 font-semibold text-brand-800">{v.serviceDate}</td>
                      <td className="p-3.5 text-ink-950/80">
                        {v.attendeeCount}
                        {v.hasKids === 'Yes' && <span className="block text-[0.7rem] text-amber-700 font-medium">Kids: {v.kidAges || 'Yes'}</span>}
                      </td>
                      <td className="p-3.5 max-w-xs truncate text-ink-950/70" title={v.specialAssistance}>
                        {v.specialAssistance || 'None noted'}
                      </td>
                      <td className="p-3.5">
                        <span
                          className={clsx(
                            'inline-block rounded px-2 py-0.5 text-[0.65rem] font-bold uppercase',
                            v.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                          )}
                        >
                          {v.status || 'new'}
                        </span>
                      </td>
                      <td className="p-3.5">
                        {v.status !== 'confirmed' ? (
                          <button
                            type="button"
                            onClick={() => handleUpdateVisitor(v.id, 'confirmed')}
                            className="rounded bg-brand-600 px-2.5 py-1 text-[0.65rem] font-bold uppercase text-white hover:bg-brand-700"
                          >
                            Confirm
                          </button>
                        ) : (
                          <span className="text-green-700 text-xs font-semibold">✓ Confirmed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filteredVisitors.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-sm text-ink-950/50">
                        No visitors match your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: PRAYERS */}
        {activeTab === 'prayers' && (
          <div className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl uppercase text-ink-950">Prayer Altar Petitions</h2>
              <button
                type="button"
                onClick={() => exportToCsv(data?.prayers, 'cpc-prayer-requests')}
                className="inline-flex items-center gap-1.5 rounded border border-ink-950/20 bg-white px-3 py-1.5 text-xs font-semibold text-ink-950 hover:bg-paper"
              >
                <Download size={13} /> Export CSV
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPrayers.map((p) => (
                <div key={p.id} className="flex flex-col justify-between rounded-lg border border-ink-950/15 bg-white p-5 shadow-sm">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded bg-blue-50 px-2 py-0.5 text-[0.64rem] font-bold text-blue-700 uppercase">
                        {p.category}
                      </span>
                      {p.isConfidential && (
                        <span className="rounded bg-red-100 px-2 py-0.5 text-[0.62rem] font-bold text-red-800 uppercase">
                          🔒 Pastoral Only
                        </span>
                      )}
                    </div>
                    <h3 className="mt-3 font-display text-base uppercase text-ink-950">{p.name}</h3>
                    {p.phone && (
                      <p className="mt-0.5 text-xs text-brand-700 font-semibold">
                        <a href={`tel:${p.phone}`}>{p.phone}</a>
                      </p>
                    )}
                    <p className="mt-3 text-xs leading-relaxed text-ink-950/80 bg-paper/60 p-3 rounded border border-ink-950/5">
                      “{p.details}”
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-ink-950/10 pt-3 text-[0.7rem] text-ink-950/60">
                    <span>Amen Agreements: <strong>{p.amens || 0}</strong></span>
                    <span>{new Date(p.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: TESTIMONIES / MODERATION */}
        {activeTab === 'testimonies' && (
          <div className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl uppercase text-ink-950">Praise Reports Moderation</h2>
                <p className="text-xs text-ink-950/60">Approve testimonies before they appear on the public community wall.</p>
              </div>
              <button
                type="button"
                onClick={() => exportToCsv(data?.testimonies, 'cpc-testimonies')}
                className="inline-flex items-center gap-1.5 rounded border border-ink-950/20 bg-white px-3 py-1.5 text-xs font-semibold text-ink-950 hover:bg-paper"
              >
                <Download size={13} /> Export CSV
              </button>
            </div>

            <div className="space-y-4">
              {filteredTestimonies.map((t) => (
                <div key={t.id} className="rounded-lg border border-ink-950/15 bg-white p-5 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-amber-100 px-2 py-0.5 text-[0.64rem] font-bold uppercase text-amber-800">
                          {t.category}
                        </span>
                        <span
                          className={clsx(
                            'rounded px-2 py-0.5 text-[0.64rem] font-bold uppercase',
                            t.approved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          )}
                        >
                          {t.approved ? '✓ Live on Wall' : 'Pending Moderation'}
                        </span>
                      </div>
                      <h3 className="mt-2 font-display text-lg uppercase text-ink-950">{t.title}</h3>
                      <p className="text-xs text-ink-950/70 font-semibold">
                        Shared by: <strong className="text-ink-950">{t.name}</strong> {t.phone && `(${t.phone})`}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      {!t.approved ? (
                        <button
                          type="button"
                          onClick={() => handleApproveTestimony(t.id, true)}
                          className="flex items-center gap-1 rounded bg-green-600 px-3 py-1.5 text-xs font-bold uppercase text-white shadow hover:bg-green-700"
                        >
                          <Check size={14} /> Approve for Wall
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleApproveTestimony(t.id, false)}
                          className="flex items-center gap-1 rounded border border-ink-950/20 bg-white px-3 py-1.5 text-xs font-bold uppercase text-ink-950 hover:bg-red-50 hover:text-red-700"
                        >
                          <X size={14} /> Revoke / Hide
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-ink-950/80 bg-paper/50 p-3.5 rounded border border-ink-950/5">
                    {t.details}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: VOLUNTEERS */}
        {activeTab === 'volunteers' && (
          <div className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl uppercase text-ink-950">Volunteer Directorate Applications</h2>
              <button
                type="button"
                onClick={() => exportToCsv(data?.volunteers, 'cpc-volunteers')}
                className="inline-flex items-center gap-1.5 rounded border border-ink-950/20 bg-white px-3 py-1.5 text-xs font-semibold text-ink-950 hover:bg-paper"
              >
                <Download size={13} /> Export CSV
              </button>
            </div>

            <div className="overflow-x-auto rounded-lg border border-ink-950/15 bg-white shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-ink-950/10 bg-paper/60 uppercase text-ink-950/60 font-bold">
                  <tr>
                    <th className="p-3.5">Worker Name</th>
                    <th className="p-3.5">Department</th>
                    <th className="p-3.5">Phone / Contact</th>
                    <th className="p-3.5">Prior Experience</th>
                    <th className="p-3.5">Submitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-950/5">
                  {filteredVolunteers.map((vol) => (
                    <tr key={vol.id} className="hover:bg-paper/40">
                      <td className="p-3.5 font-bold text-ink-950">{vol.name}</td>
                      <td className="p-3.5 font-bold text-brand-700">{vol.department}</td>
                      <td className="p-3.5">
                        <a href={`tel:${vol.phone}`} className="font-semibold text-ink-950 hover:underline">
                          {vol.phone}
                        </a>
                        {vol.email && <div className="text-[0.7rem] text-ink-950/60">{vol.email}</div>}
                      </td>
                      <td className="p-3.5 max-w-sm text-ink-950/80">{vol.experience || 'None noted'}</td>
                      <td className="p-3.5 text-ink-950/60">{new Date(vol.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: GIVING & TREASURY */}
        {activeTab === 'donations' && (
          <div className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl uppercase text-ink-950">Kingdom Giving &amp; Financial Records</h2>
                <p className="text-xs text-ink-950/60">Verified payments from Paystack Inline and Webhook channels.</p>
              </div>
              <button
                type="button"
                onClick={() => exportToCsv(data?.donations, 'cpc-giving-records')}
                className="inline-flex items-center gap-1.5 rounded border border-ink-950/20 bg-white px-3 py-1.5 text-xs font-semibold text-ink-950 hover:bg-paper"
              >
                <Download size={13} /> Export Excel / CSV
              </button>
            </div>

            <div className="overflow-x-auto rounded-lg border border-ink-950/15 bg-white shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-ink-950/10 bg-paper/60 uppercase text-ink-950/60 font-bold">
                  <tr>
                    <th className="p-3.5">Reference ID</th>
                    <th className="p-3.5">Donor Name</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Amount</th>
                    <th className="p-3.5">Channel</th>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-950/5">
                  {filteredDonations.map((d) => (
                    <tr key={d.reference} className="hover:bg-paper/40">
                      <td className="p-3.5 font-mono text-[0.72rem] text-ink-950/70">{d.reference}</td>
                      <td className="p-3.5 font-bold text-ink-950">
                        {d.donorName}
                        {d.email && <div className="text-[0.68rem] font-normal text-ink-950/50">{d.email}</div>}
                      </td>
                      <td className="p-3.5 font-semibold text-brand-800">{d.category}</td>
                      <td className="p-3.5 font-display text-sm text-brand-700">
                        {d.currency === 'USD' ? '$' : '₦'}{d.amount?.toLocaleString()}
                      </td>
                      <td className="p-3.5 text-ink-950/60 uppercase text-[0.68rem]">{d.channel}</td>
                      <td className="p-3.5 text-ink-950/60">{new Date(d.paidAt || d.createdAt).toLocaleDateString()}</td>
                      <td className="p-3.5">
                        <span className="inline-block rounded bg-green-100 px-2 py-0.5 text-[0.65rem] font-bold uppercase text-green-800">
                          {d.status || 'paid'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
