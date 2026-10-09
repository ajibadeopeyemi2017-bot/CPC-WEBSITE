'use client';

import { useState } from 'react';
import {
  Heart,
  ShieldCheck,
  CreditCard,
  Copy,
  Check,
  Lock,
  Sparkles,
  ArrowRight,
  Gift,
  Building,
  TrendingUp,
  Receipt
} from 'lucide-react';

const givingCategories = [
  { id: 'tithe', name: 'Tithe & First Fruits', desc: 'Returning 10% in covenant obedience (Malachi 3:10)' },
  { id: 'offering', name: 'General Offering', desc: 'Freewill praise & thanksgiving giving in service' },
  { id: 'missions', name: 'Mission Offerings', desc: 'Sponsoring city outreaches, community crusades, and soul-winning missions' },
  { id: 'osom', name: 'OSOM Partnership', desc: 'Partner with Apostle Olufisayo for national conferences & media' },
  { id: 'building', name: 'Building Project', desc: 'Direct contributions toward the permanent church auditorium' },
  { id: 'welfare', name: 'Welfare & Love Seed', desc: 'Caring for widows, students, and needy families in the church' }
];

const presetAmountsNGN = ['2,000', '5,000', '10,000', '25,000', '50,000', '100,000'];
const presetAmountsUSD = ['20', '50', '100', '250', '500', '1,000'];

const bankAccounts = [
  {
    purpose: 'Church Tithes, General Offerings & Mission Offerings',
    bank: 'Zenith Bank',
    accountNumber: '1220867697',
    accountName: 'Christ the potter church'
  },
  {
    purpose: 'OSOM Partnership, Conferences & Ministry Mandate',
    bank: 'Zenith Bank',
    accountNumber: '1220867707',
    accountName: 'Oluwafunminiyi Samson Olufisayo ministries'
  }
];

export default function GivePage() {
  const [currency, setCurrency] = useState('NGN');
  const [selectedCategory, setSelectedCategory] = useState('tithe');
  const [amount, setAmount] = useState('10,000');
  const [paymentMethod, setPaymentMethod] = useState('paystack');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [copiedBank, setCopiedBank] = useState(null);
  const [showSuccessReceipt, setShowSuccessReceipt] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCopyAccount = (accNum, idx) => {
    navigator.clipboard.writeText(accNum);
    setCopiedBank(idx);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  const handleProcessGiving = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccessReceipt(true);
    }, 1200);
  };

  return (
    <div>
      {/* Page Header */}
      <section style={{
        background: 'linear-gradient(180deg, #060c1a 0%, #0b1528 100%)',
        color: '#ffffff',
        padding: '70px 0 80px',
        textAlign: 'center'
      }}>
        <div className="cpc-container">
          <span className="badge-gold" style={{ marginBottom: '14px' }}>
            <Heart size={13} />
            Honour The Lord With Your Substance
          </span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)', fontWeight: 800, marginBottom: '16px' }}>
            Online Giving &amp; <span className="text-gold-gradient">Kingdom Partnership</span>
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            &quot;Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver.&quot; — 2 Cor. 9:7
          </p>
        </div>
      </section>

      {/* Main Giving Form & Direct Bank Accounts Grid */}
      <section style={{ padding: '80px 0', background: '#f8fafc' }}>
        <div className="cpc-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'flex-start'
          }}>
            {/* Giving Portal Card */}
            <div className="cpc-card" style={{
              padding: '36px',
              borderRadius: '24px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.06)'
            }}>
              {showSuccessReceipt ? (
                <div style={{ textAlign: 'center', padding: '16px 0' }}>
                  <div style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    background: '#ecfdf5',
                    color: '#0e6b3c',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 18px',
                    border: '2px solid #a7f3d0'
                  }}>
                    <Check size={36} />
                  </div>

                  <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '8px' }}>
                    Giving Acknowledged!
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '24px' }}>
                    Thank you, <strong>{donorName || 'Beloved Partner'}</strong>. Your seed of <strong>{currency} {amount}</strong> toward <strong>{givingCategories.find(c => c.id === selectedCategory)?.name}</strong> has been received into the storehouse.
                  </p>

                  <div style={{
                    background: '#f8fafc',
                    border: '1.5px dashed #cbd5e1',
                    borderRadius: '16px',
                    padding: '20px',
                    textAlign: 'left',
                    marginBottom: '24px',
                    fontSize: '0.88rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: '#64748b' }}>Reference ID:</span>
                      <strong style={{ fontFamily: 'monospace', color: 'var(--navy-900)' }}>CPC-{Math.floor(100000 + Math.random() * 900000)}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: '#64748b' }}>Gateway:</span>
                      <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{paymentMethod}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: '#64748b' }}>Date &amp; Time:</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '10px', marginTop: '10px', color: '#0e6b3c', fontWeight: 600, textAlign: 'center' }}>
                      &quot;The Lord reward your labour of love abundantly.&quot;
                    </div>
                  </div>

                  <button
                    onClick={() => setShowSuccessReceipt(false)}
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                  >
                    Give Another Seed
                  </button>
                </div>
              ) : (
                <form onSubmit={handleProcessGiving}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy-900)', margin: 0 }}>
                      Giving Portal
                    </h3>

                    {/* Currency Switcher */}
                    <div style={{ display: 'flex', background: '#f1f5f9', padding: '3px', borderRadius: '8px' }}>
                      <button
                        type="button"
                        onClick={() => { setCurrency('NGN'); setAmount('10,000'); }}
                        style={{
                          padding: '4px 12px',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          background: currency === 'NGN' ? '#ffffff' : 'transparent',
                          color: currency === 'NGN' ? 'var(--navy-900)' : '#64748b',
                          boxShadow: currency === 'NGN' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                        }}
                      >
                        NGN (₦)
                      </button>
                      <button
                        type="button"
                        onClick={() => { setCurrency('USD'); setAmount('100'); }}
                        style={{
                          padding: '4px 12px',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          background: currency === 'USD' ? '#ffffff' : 'transparent',
                          color: currency === 'USD' ? 'var(--navy-900)' : '#64748b',
                          boxShadow: currency === 'USD' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                        }}
                      >
                        USD ($)
                      </button>
                    </div>
                  </div>

                  {/* 1. Category Selection */}
                  <div style={{ marginBottom: '22px' }}>
                    <label className="form-label">Select Giving Category</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {givingCategories.map((cat) => {
                        const isSelected = selectedCategory === cat.id;
                        return (
                          <div
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            style={{
                              padding: '12px 16px',
                              borderRadius: '10px',
                              border: isSelected ? '2px solid #0e6b3c' : '1px solid #e2e8f0',
                              background: isSelected ? '#ecfdf5' : '#ffffff',
                              cursor: 'pointer',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <div>
                              <strong style={{ display: 'block', fontSize: '0.92rem', color: 'var(--navy-900)' }}>
                                {cat.name}
                              </strong>
                              <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{cat.desc}</span>
                            </div>
                            <div style={{
                              width: '18px',
                              height: '18px',
                              borderRadius: '50%',
                              border: isSelected ? '5px solid #0e6b3c' : '2px solid #cbd5e1',
                              background: '#ffffff',
                              flexShrink: 0
                            }} />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Amount Input & Presets */}
                  <div style={{ marginBottom: '22px' }}>
                    <label className="form-label">Specify Amount ({currency})</label>
                    <div style={{ position: 'relative', marginBottom: '10px' }}>
                      <span style={{
                        position: 'absolute',
                        left: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontWeight: 800,
                        fontSize: '1.2rem',
                        color: 'var(--navy-900)'
                      }}>
                        {currency === 'NGN' ? '₦' : '$'}
                      </span>
                      <input
                        type="text"
                        required
                        className="form-input"
                        style={{ paddingLeft: '40px', fontSize: '1.2rem', fontWeight: 700 }}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {(currency === 'NGN' ? presetAmountsNGN : presetAmountsUSD).map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setAmount(val)}
                          style={{
                            padding: '6px 14px',
                            borderRadius: '8px',
                            background: amount === val ? 'var(--navy-900)' : '#f1f5f9',
                            color: amount === val ? '#ffffff' : '#334155',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            border: '1px solid #e2e8f0'
                          }}
                        >
                          {currency === 'NGN' ? `₦${val}` : `$${val}`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. Donor Info */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                    <div>
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        placeholder="Sister / Brother..."
                        className="form-input"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        placeholder="you@email.com"
                        className="form-input"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* 4. Payment Gateway Placeholders */}
                  <div style={{ marginBottom: '24px' }}>
                    <label className="form-label">Choose Payment Gateway</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                      {[
                        { id: 'paystack', label: 'Paystack', desc: 'Cards, Transfer, USSD' },
                        { id: 'flutterwave', label: 'Flutterwave', desc: 'Naira & Barter' },
                        { id: 'stripe', label: 'Stripe', desc: 'Intl Cards / USD' },
                      ].map((gw) => {
                        const isChosen = paymentMethod === gw.id;
                        return (
                          <div
                            key={gw.id}
                            onClick={() => setPaymentMethod(gw.id)}
                            style={{
                              border: isChosen ? '2px solid #d4af37' : '1px solid #e2e8f0',
                              background: isChosen ? '#fef9e7' : '#ffffff',
                              borderRadius: '10px',
                              padding: '10px 8px',
                              textAlign: 'center',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <strong style={{ fontSize: '0.85rem', color: 'var(--navy-900)', display: 'block' }}>{gw.label}</strong>
                            <span style={{ fontSize: '0.68rem', color: '#64748b' }}>{gw.desc}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="btn btn-primary btn-lg"
                    style={{ width: '100%', opacity: isProcessing ? 0.7 : 1 }}
                  >
                    <Lock size={16} />
                    <span>{isProcessing ? 'Connecting Secure Gateway...' : `Proceed to Give ${currency} ${amount}`}</span>
                  </button>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    fontSize: '0.78rem',
                    color: '#64748b',
                    marginTop: '14px'
                  }}>
                    <ShieldCheck size={14} style={{ color: '#0e6b3c' }} />
                    <span>256-bit Bank Grade Encrypted &bull; 100% Secure Ministry Portal</span>
                  </div>
                </form>
              )}
            </div>

            {/* Direct Bank Accounts & Scripture Column */}
            <div id="accounts">
              <div style={{ marginBottom: '32px' }}>
                <span className="badge-green" style={{ marginBottom: '8px' }}>
                  Direct Bank Transfer
                </span>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--navy-900)', marginTop: '6px', marginBottom: '12px' }}>
                  Church Official Bank Accounts
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, fontWeight: 600 }}>
                  You can send it into any of the acct below:
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '36px' }}>
                {bankAccounts.map((acc, idx) => (
                  <div
                    key={idx}
                    className="cpc-card"
                    style={{
                      padding: '24px',
                      background: '#ffffff',
                      borderLeft: '4px solid #0e6b3c'
                    }}
                  >
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0e6b3c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {acc.purpose}
                    </span>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy-900)', margin: '4px 0 10px' }}>
                      {acc.bank}
                    </h4>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: '#f8fafc',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      marginBottom: '10px'
                    }}>
                      <div>
                        <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block' }}>ACCOUNT NUMBER</span>
                        <strong style={{ fontSize: '1.3rem', letterSpacing: '0.08em', fontFamily: 'monospace', color: 'var(--navy-900)' }}>
                          {acc.accountNumber}
                        </strong>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopyAccount(acc.accountNumber, idx)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: copiedBank === idx ? '#ecfdf5' : '#ffffff',
                          border: '1px solid #cbd5e1',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          color: copiedBank === idx ? '#0e6b3c' : 'var(--navy-900)'
                        }}
                      >
                        {copiedBank === idx ? (
                          <>
                            <Check size={14} />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      Account Name: <strong style={{ color: 'var(--navy-900)' }}>{acc.accountName}</strong>
                    </div>
                  </div>
                ))}
              </div>

              {/* Giving Testimony / Scripture Quote Box */}
              <div style={{
                background: 'linear-gradient(135deg, #0b1528 0%, #15294d 100%)',
                color: '#ffffff',
                borderRadius: '20px',
                padding: '28px',
                border: '1px solid rgba(212, 175, 55, 0.3)'
              }}>
                <Sparkles size={24} style={{ color: '#d4af37', marginBottom: '12px' }} />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px', color: '#f5d77f' }}>
                  The Covenant of the Storehouse
                </h4>
                <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.85)', margin: 0 }}>
                  &quot;Bring ye all the tithes into the storehouse, that there may be meat in mine house, and prove me now herewith, saith the LORD of hosts, if I will not open you the windows of heaven, and pour you out a blessing, that there shall not be room enough to receive it.&quot; — Malachi 3:10
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
