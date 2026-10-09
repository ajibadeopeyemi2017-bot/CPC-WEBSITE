'use client';

import { useState, useEffect } from 'react';
import { X, CheckCircle, Calendar, MapPin, Users, Heart, Sparkles } from 'lucide-react';

export default function PlanVisitModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    serviceDate: 'Upcoming Sunday (8:00 AM)',
    attendingGuests: '1 person',
    hasChildren: 'No',
    notes: ''
  });

  useEffect(() => {
    const handleOpenModal = () => setIsOpen(true);
    window.addEventListener('open-plan-visit-modal', handleOpenModal);
    return () => window.removeEventListener('open-plan-visit-modal', handleOpenModal);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsSubmitted(false);
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className="cpc-card"
        style={{
          maxWidth: '560px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '32px',
          position: 'relative',
          background: '#ffffff',
          borderRadius: '24px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            color: '#64748b',
            background: '#f1f5f9',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={20} />
        </button>

        {isSubmitted ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: '#ecfdf5',
              color: '#0e6b3c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              border: '2px solid #a7f3d0'
            }}>
              <CheckCircle size={38} />
            </div>

            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '8px' }}>
              We Can&apos;t Wait to Welcome You!
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
              Thank you, <strong>{formData.fullName}</strong>. Your visit has been scheduled for <strong>{formData.serviceDate}</strong>.
              Our Hospitality & Ushers Team has reserved a VIP guest seat for you and your guests.
            </p>

            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '16px',
              textAlign: 'left',
              marginBottom: '24px',
              fontSize: '0.9rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--navy-900)', fontWeight: 700 }}>
                <MapPin size={16} style={{ color: '#d4af37' }} />
                <span>Auditorium Location:</span>
              </div>
              <p style={{ margin: 0, color: '#475569' }}>
                76B, PHCN Office (Upper Floor), Off Fajuyi Road, Ile-Ife, Osun State.
              </p>
              <p style={{ marginTop: '8px', marginBottom: 0, fontSize: '0.8rem', color: '#64748b' }}>
                Need directions on arrival? Call our welcoming team at <strong>0814 863 7261</strong>.
              </p>
            </div>

            <button onClick={handleClose} className="btn btn-primary" style={{ width: '100%' }}>
              Got It, See You Soon!
            </button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <span className="badge-green" style={{ marginBottom: '8px' }}>
                <Sparkles size={12} />
                First-Time Experience
              </span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy-900)', marginTop: '6px' }}>
                Plan Your Visit to CPC
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px', lineHeight: 1.5 }}>
                We want your first service at Christ The Potter Church to be seamless and life-changing. Let us know you&apos;re coming!
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samuel Adekunle"
                  className="form-input"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="080 1234 5678"
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="form-label">Select Service</label>
                  <select
                    className="form-select"
                    value={formData.serviceDate}
                    onChange={(e) => setFormData({ ...formData, serviceDate: e.target.value })}
                  >
                    <option>Upcoming Sunday (8:00 AM)</option>
                    <option>Tuesday School of Prayer (5:00 PM)</option>
                    <option>Thursday Revelational Hour (5:00 PM)</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Bringing Children?</label>
                  <select
                    className="form-select"
                    value={formData.hasChildren}
                    onChange={(e) => setFormData({ ...formData, hasChildren: e.target.value })}
                  >
                    <option>No</option>
                    <option>Yes (1-2 Kids)</option>
                    <option>Yes (3+ Kids)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="form-label">Any questions or prayer needs?</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Need wheelchair accessibility, parking info..."
                  className="form-textarea"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '8px' }}>
                <Calendar size={18} />
                Reserve My VIP Guest Welcome
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
