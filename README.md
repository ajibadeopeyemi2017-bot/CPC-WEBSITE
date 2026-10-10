# Christ The Potter Church (CPC) - Official Website

Welcome to the official web platform for **Christ The Potter Church (CPC)** & **Oluwafunminiyi Samson Olufisayo Ministries (OSOM)**.

> *"Teaching men to walk in the reality of who Christ is."*

---

## 🏛️ Main Auditorium & Service Schedule
* **Location:** 76B, PHCN Office (Upper Floor), Off Fajuyi Road, Ile-Ife, Osun State, Nigeria.
* **Helpline & Pastoral Care:** `0814 863 7261`
* **Email:** `christthepotterchurch@gmail.com`
* **Sunday Worship Service:** 8:00 AM WAT
* **Tuesday School of Prayer:** 5:00 PM WAT
* **Thursday Revelational Hour:** 5:00 PM WAT

---

## 🌟 Signature Annual Conferences & Schools
1. **Kingdom Young Ministers Conference (KYMC)** — September 24–26, 2026
2. **Annual Gathering of the Eagles (AGOTE)** — December 19–20, 2025
3. **Realised Destiny Summit (RDS)** — May 22–24, 2025
4. **Revelation of our Salvation (ROS)** — July 23–25, 2026
5. **AMITES: Acquiring Ministers' Teaching School** — Modular Cohorts
6. **Community Outreaches & Crusades** — Power-charged soul winning

---

## 💳 Supported Giving Channels & Bank Accounts
*"You can send it into any of the acct below:"*

* **Bank:** Zenith Bank
* **Account 1 (Church Tithes, General Offerings & Mission Offerings):**
  * **Name:** `Christ the potter church`
  * **Account Number:** `1220867697`
* **Account 2 (OSOM Partnership, Conferences & Ministry Mandate):**
  * **Name:** `Oluwafunminiyi Samson Olufisayo ministries`
  * **Account Number:** `1220867707`

---

## 🚀 Tech Stack
* **Framework:** Next.js 14 (App Router)
* **Styling:** Tailwind CSS — tokens in `tailwind.config.js` (`paper`, `brand`, `ink`), fonts Anton (display) + Archivo (body) via `next/font`
* **Icons:** Lucide React
* **Deployment:** Vercel

---

## 📁 Project Structure

```
app/              Pages (Next.js App Router) — one folder per route
components/
  ui/             Design-system primitives: Button, Card, Eyebrow,
                  SectionHeader, PageHeader, CtaBand, Field, Accordion
  home/           One file per homepage section
  give/ visit/ salvation/ connect/ sermons/
                  Interactive pieces used by a single page
  Navbar, Footer, Logo, LiveCountdown, modals — site-wide components
lib/
  site-config.js  Phone, address, service times, nav, bank accounts
  conferences.js  Conferences, past editions, ministries
  sermons.js      Sermon library + playSermon()
  giving.js       Giving categories; ONLINE_GIVING_ENABLED flag
public/images/    Final, optimized images used by the live site
design-source/    Raw/original design files (docx, flyers, PSD-style
                  exports). Not tracked in git, not used at runtime —
                  reference material only.
scripts/          One-off utility scripts (e.g. importing new design
                  assets into public/images)
```

If you add a new raw design file, drop it in `design-source/`, add a
mapping entry in `scripts/import-design-assets.js`, then run
`npm run import-assets` to copy it into `public/images` under its
final name.

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```
Open [http://localhost:3000](http://localhost:3000) to view the application.
