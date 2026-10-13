'use client';

import { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';
import { CHURCH } from '../lib/site-config';

export default function PwaRegister() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // 1. Register Service Worker in production & modern browsers
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => {
            console.log('[CPC PWA] Service Worker registered with scope:', reg.scope);
          })
          .catch((err) => {
            console.warn('[CPC PWA] Service Worker registration failed:', err);
          });
      });
    }

    // 2. Capture install prompt event
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setInstallPrompt(e);

      // Check if user already dismissed banner this session
      const dismissed = sessionStorage.getItem('cpc-pwa-dismissed');
      if (!dismissed) {
        // Show after 4 seconds of smooth browsing
        const timer = setTimeout(() => setShowBanner(true), 4000);
        return () => clearTimeout(timer);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    window.addEventListener('appinstalled', () => {
      setInstallPrompt(null);
      setShowBanner(false);
      console.log('[CPC PWA] Church app installed successfully!');
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowBanner(false);
    }
    setInstallPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    sessionStorage.setItem('cpc-pwa-dismissed', 'true');
  };

  if (!showBanner || !installPrompt) return null;

  return (
    <div
      role="banner"
      aria-label="Install Church App"
      className="fixed bottom-20 left-4 right-4 z-50 mx-auto max-w-md rounded-lg border border-brand-600/30 bg-ink-950 p-4 text-white shadow-2xl backdrop-blur-md sm:bottom-6 sm:left-auto sm:right-6 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start gap-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white shadow-md">
          <Smartphone size={20} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-display text-sm uppercase tracking-wide text-brand-300">
              Install {CHURCH.shortName} App
            </h4>
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss install prompt"
              className="text-white/60 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-white/80">
            Add to your home screen for fast 1-tap access to Sunday services, Mixlr live audio, and sermon downloads.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={handleInstallClick}
              className="inline-flex items-center gap-1.5 rounded bg-brand-600 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-brand-700 transition-colors"
            >
              <Download size={13} />
              Install App
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              className="px-2.5 py-1.5 text-xs text-white/60 hover:text-white transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
