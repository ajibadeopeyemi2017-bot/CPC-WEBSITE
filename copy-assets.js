const fs = require('fs');
const path = require('path');

const srcDir = 'c:\\Users\\hp\\Desktop\\CPC WEBSITE';
const targetDir = path.join(srcDir, 'public', 'images');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const mappings = [
  { src: '11.jpeg', dest: 'logo.png' },
  { src: '22.jpeg', dest: 'logo-icon.png' },
  { src: '33.jpeg', dest: 'logo-badge.png' },
  { src: 'WhatsApp Image 2026-10-08 at 1.48.40 PM.jpeg', dest: 'pastor-oluwafunminiyi.jpg' },
  { src: '2.jpeg', dest: 'pastor-portrait.jpg' },
  { src: '3.jpeg', dest: 'pastor-action.jpg' },
  { src: 'AGOTE 2025_1765871752515_2.jpg', dest: 'flyer-agote.jpg' },
  { src: 'KINGDOM YOUNG MINISTERS CONFERENCE_1789101813095.jpg', dest: 'flyer-kymc.jpg' },
  { src: 'REVELATION OF OUR SALVATION DESIGN_1751806575411.jpg', dest: 'flyer-ros.jpg' },
  { src: 'Maximalist Church Flyer  A6_1746645603327_1.jpg', dest: 'flyer-rds-2025.jpg' },
  { src: 'OUTREACH FL_1758358633279.jpg', dest: 'flyer-outreach.jpg' },
  { src: 'REVELATION OF OUR SALVATION_1784192603304.jpg', dest: 'flyer-ros-2026.jpg' },
  { src: 'IMG-20241210-WA0025.jpg', dest: 'flyer-agote-2024.jpg' },
  { src: 'IMG-20250103-WA0058.jpg', dest: 'flyer-amites.jpg' },
  { src: 'IMG-20240827-WA0107.jpg', dest: 'flyer-kymc-2024.jpg' },
  { src: 'join us for church service_1745083155798.jpg', dest: 'service-schedule-banner.jpg' },
  { src: 'You are invited_1745083058682.jpg', dest: 'flyer-invitation.jpg' },
  { src: 'church excerpt_1747990912519.jpg', dest: 'quote-purpose.jpg' },
  { src: 'Excerpt_1748020548268.jpg', dest: 'quote-accountability.jpg' },
  { src: 'Excerpt_1748020960500.jpg', dest: 'quote-excerpt-2.jpg' },
  { src: 'Excerpt_1748021189215.jpg', dest: 'quote-excerpt-3.jpg' },
  { src: 'Church Life Quote Ad_1753611242277.jpg', dest: 'quote-surrender.jpg' },
  { src: 'Church Life Quote Ad_1753611871207.jpg', dest: 'quote-ad-2.jpg' },
  { src: 'Church Life Quote Ad_1753612058896.jpg', dest: 'quote-ad-3.jpg' },
  { src: 'Church Life Quote Ad_1753612952873.jpg', dest: 'quote-ad-4.jpg' },
  { src: '_ Church flyer template_1746459083544.jpg', dest: 'flyer-rds-alt.jpg' },
  { src: 'church_1746304048359.jpg', dest: 'flyer-rds-banner.jpg' },
];

for (const { src, dest } of mappings) {
  const sPath = path.join(srcDir, src);
  const dPath = path.join(targetDir, dest);
  if (fs.existsSync(sPath)) {
    fs.copyFileSync(sPath, dPath);
    console.log(`Copied ${src} -> ${dest}`);
  } else {
    console.warn(`File not found: ${src}`);
  }
}
console.log('Done copying all assets.');
