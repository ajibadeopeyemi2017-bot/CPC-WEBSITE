import { CHURCH } from './site-config';

export const WHATSAPP_LINES = [
  { id: 'line1', number: '2347062709694', display: '0706 270 9694', raw: '07062709694' },
  { id: 'line2', number: '2348163776464', display: '0816 377 6464', raw: '08163776464' },
];

/**
 * Returns formatted WhatsApp URLs for both pastoral numbers.
 */
export function getWhatsAppLinks(message) {
  const text = (message || 'Hello Christ The Potter Church, I am reaching out from your website.').trim();
  const encoded = encodeURIComponent(text);

  return {
    text,
    line1: {
      number: WHATSAPP_LINES[0].number,
      display: WHATSAPP_LINES[0].display,
      url: `https://wa.me/${WHATSAPP_LINES[0].number}?text=${encoded}`,
    },
    line2: {
      number: WHATSAPP_LINES[1].number,
      display: WHATSAPP_LINES[1].display,
      url: `https://wa.me/${WHATSAPP_LINES[1].number}?text=${encoded}`,
    },
  };
}

/**
 * Opens WhatsApp for Line 1 immediately and Line 2 after a short delay
 * to notify both numbers simultaneously.
 */
export function dispatchToBothWhatsAppLines(message) {
  const links = getWhatsAppLinks(message);

  if (typeof window !== 'undefined') {
    // Open line 1 directly
    window.open(links.line1.url, '_blank', 'noopener,noreferrer');

    // Attempt to open line 2 in parallel
    setTimeout(() => {
      try {
        window.open(links.line2.url, '_blank', 'noopener,noreferrer');
      } catch (err) {
        console.warn('Popup blocker prevented automatic opening of Line 2', err);
      }
    }, 450);
  }

  return links;
}

/**
 * Format conference / school registration data for WhatsApp dispatch
 */
export function formatConferenceRegistrationMessage(data) {
  return [
    `*CHRIST THE POTTER CHURCH*`,
    `*CONFERENCE & SCHOOL REGISTRATION*`,
    `================================`,
    `*Event / School:* ${data.eventTitle || data.eventName || 'Conference / School'}`,
    `*Full Name:* ${data.name || 'N/A'}`,
    `*Phone / WhatsApp:* ${data.phone || 'N/A'}`,
    `*Email:* ${data.email || 'N/A'}`,
    `*City / Location:* ${data.location || 'N/A'}`,
    `*Home Church / Ministry:* ${data.church || 'N/A'}`,
    data.accommodation ? `*Accommodation Required:* ${data.accommodation}` : null,
    data.notes ? `*Notes / Special Needs:* ${data.notes}` : null,
    `================================`,
    `Submitted from Christ The Potter Church Website`,
  ]
    .filter(Boolean)
    .join('\n');
}
