import { Anton, Archivo } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnnouncementTicker from '../components/AnnouncementTicker';
import AudioPlayerBar from '../components/AudioPlayerBar';
import PlanVisitModal from '../components/PlanVisitModal';
import WhatsAppButton from '../components/WhatsAppButton';
import LiveFloatingBadge from '../components/LiveFloatingBadge';
import PwaRegister from '../components/PwaRegister';
import { CHURCH } from '../lib/site-config';

const display = Anton({ weight: '400', subsets: ['latin'], variable: '--font-display', display: 'swap' });
const body = Archivo({ subsets: ['latin'], variable: '--font-body', display: 'swap' });

export const viewport = {
  themeColor: '#0f4a17',
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL(CHURCH.siteUrl),
  title: 'Christ The Potter Church | Ile-Ife | Apostle Oluwafunminiyi Olufisayo',
  description: 'Welcome to Christ The Potter Church (CPC) - Teaching men to walk in the reality of who Christ is. Join our Sunday Service (8 AM), Tuesday School of Prayer (5 PM), and Thursday Revelational Hour (5 PM) at Fajuyi Road, Ile-Ife, Nigeria.',
  keywords: [
    'Christ The Potter Church',
    'CPC Ile-Ife',
    'Apostle Oluwafunminiyi Olufisayo',
    'Rev Olamide Olufisayo',
    'OSOM Ministries',
    'Kingdom Young Ministers Conference',
    'Gathering of the Eagles',
    'Realised Destiny Summit',
    'Church in Ile-Ife',
    'Nigerian Apostolic Ministry'
  ],
  authors: [{ name: 'Christ The Potter Church' }],
  creator: 'Christ The Potter Church',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'CPC Church',
  },
  openGraph: {
    title: 'Christ The Potter Church - Teaching Men to Walk in the Reality of Christ',
    description: 'Join our weekly worship, listen to apostolic sermons, and discover your kingdom calling at Christ The Potter Church, Ile-Ife.',
    siteName: 'Christ The Potter Church',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/pastor-portrait.jpg',
        width: 1200,
        height: 630,
        alt: 'Christ The Potter Church - Apostle Oluwafunminiyi Olufisayo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Christ The Potter Church | Ile-Ife',
    description: 'Teaching men to walk in the reality of who Christ is.',
    images: ['/images/pastor-portrait.jpg'],
  },
  icons: {
    icon: [
      { url: '/images/logo-icon.png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-paper font-sans text-ink-950">
        <AnnouncementTicker />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <AudioPlayerBar />
        <PlanVisitModal />
        <WhatsAppButton />
        <LiveFloatingBadge />
        <PwaRegister />
        <Footer />
      </body>
    </html>
  );
}
