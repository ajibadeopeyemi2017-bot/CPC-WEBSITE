import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnnouncementTicker from '../components/AnnouncementTicker';
import AudioPlayerBar from '../components/AudioPlayerBar';
import PlanVisitModal from '../components/PlanVisitModal';

export const metadata = {
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
  openGraph: {
    title: 'Christ The Potter Church - Teaching Men to Walk in the Reality of Christ',
    description: 'Join our weekly worship, listen to apostolic sermons, and discover your kingdom calling at Christ The Potter Church, Ile-Ife.',
    siteName: 'Christ The Potter Church',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/images/logo-icon.png',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <AnnouncementTicker />
        <Navbar />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <AudioPlayerBar />
        <PlanVisitModal />
        <Footer />
      </body>
    </html>
  );
}
