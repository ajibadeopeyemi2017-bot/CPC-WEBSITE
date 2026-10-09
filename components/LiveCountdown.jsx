'use client';

import { useState, useEffect } from 'react';
import { Clock, Radio, PlayCircle, Calendar } from 'lucide-react';

export default function LiveCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    targetService: 'Sunday Worship Service',
    isLive: false
  });

  useEffect(() => {
    function calculateNextService() {
      const now = new Date();
      const currentDay = now.getDay(); // 0 is Sunday, 2 is Tuesday, 4 is Thursday
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();

      // Check if currently live
      // Sunday 8:00am - 11:30am
      const isSundayLive = currentDay === 0 && (currentHours >= 8 && (currentHours < 11 || (currentHours === 11 && currentMinutes <= 30)));
      // Tuesday 5:00pm - 7:00pm
      const isTuesdayLive = currentDay === 2 && (currentHours >= 17 && currentHours < 19);
      // Thursday 5:00pm - 7:00pm
      const isThursdayLive = currentDay === 4 && (currentHours >= 17 && currentHours < 19);

      if (isSundayLive || isTuesdayLive || isThursdayLive) {
        let name = 'Sunday Service';
        if (isTuesdayLive) name = 'School of Prayer';
        if (isThursdayLive) name = 'Revelational Hour';
        setTimeLeft(prev => ({ ...prev, isLive: true, targetService: name }));
        return;
      }

      // Schedule definitions: [dayOfWeek, hour, minute, name]
      // Sunday 8am = [0, 8, 0]
      // Tuesday 5pm = [2, 17, 0]
      // Thursday 5pm = [4, 17, 0]
      const serviceSchedules = [
        { day: 0, hour: 8, minute: 0, name: 'Sunday Celebration Service (8:00 AM)' },
        { day: 2, hour: 17, minute: 0, name: 'Tuesday School of Prayer (5:00 PM)' },
        { day: 4, hour: 17, minute: 0, name: 'Thursday Revelational Hour (5:00 PM)' },
      ];

      // Find next date
      let nearestDiff = Infinity;
      let targetName = 'Sunday Celebration Service (8:00 AM)';

      for (const sched of serviceSchedules) {
        let candidate = new Date(now);
        candidate.setHours(sched.hour, sched.minute, 0, 0);

        let dayDiff = sched.day - currentDay;
        if (dayDiff < 0 || (dayDiff === 0 && now >= candidate)) {
          dayDiff += 7;
        }
        candidate.setDate(now.getDate() + dayDiff);

        const diff = candidate.getTime() - now.getTime();
        if (diff > 0 && diff < nearestDiff) {
          nearestDiff = diff;
          targetName = sched.name;
        }
      }

      const totalSeconds = Math.floor(nearestDiff / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        targetService: targetName,
        isLive: false
      });
    }

    calculateNextService();
    const interval = setInterval(calculateNextService, 1000);
    return () => clearInterval(interval);
  }, []);

  if (timeLeft.isLive) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.2) 0%, rgba(15, 30, 56, 0.9) 100%)',
        border: '1px solid rgba(239, 68, 68, 0.4)',
        borderRadius: '16px',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 8px 30px rgba(239, 68, 68, 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span className="live-dot" style={{ width: '14px', height: '14px' }} />
          <div>
            <div style={{ color: '#ef4444', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              BROADCASTING LIVE RIGHT NOW
            </div>
            <h4 style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: 700, margin: '2px 0 0' }}>
              {timeLeft.targetService} is in Session
            </h4>
          </div>
        </div>

        <a
          href="https://mixlr.com/christ-the-potter-church"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          style={{ padding: '10px 22px', fontSize: '0.9rem' }}
        >
          <Radio size={16} />
          <span>Join Live Audio Broadcast</span>
        </a>
      </div>
    );
  }

  return (
    <div style={{
      background: 'rgba(15, 30, 56, 0.75)',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      borderRadius: '16px',
      padding: '22px 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '20px',
      backdropFilter: 'blur(12px)',
      boxShadow: '0 8px 28px rgba(0,0,0,0.25)'
    }}>
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: '#d4af37',
          fontSize: '0.82rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '4px'
        }}>
          <Clock size={14} />
          Countdown to Next Gathering
        </div>
        <h4 style={{ color: '#ffffff', fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>
          {timeLeft.targetService}
        </h4>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {[
          { label: 'Days', val: timeLeft.days },
          { label: 'Hours', val: timeLeft.hours },
          { label: 'Mins', val: timeLeft.minutes },
          { label: 'Secs', val: timeLeft.seconds }
        ].map((unit, idx) => (
          <div
            key={idx}
            style={{
              background: 'rgba(255, 255, 255, 0.07)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '10px',
              padding: '8px 12px',
              minWidth: '58px',
              textAlign: 'center'
            }}
          >
            <div style={{
              color: '#ffffff',
              fontSize: '1.35rem',
              fontWeight: 800,
              fontFamily: 'monospace',
              lineHeight: 1
            }}>
              {String(unit.val).padStart(2, '0')}
            </div>
            <div style={{
              color: '#94a3b8',
              fontSize: '0.65rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginTop: '4px'
            }}>
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
