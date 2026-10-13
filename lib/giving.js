export const GIVING_CATEGORIES = [
  { id: 'tithe', name: 'Tithe & First Fruits', desc: 'Returning 10% in covenant obedience (Malachi 3:10).' },
  { id: 'offering', name: 'General Offering', desc: 'Freewill praise and thanksgiving giving in service.' },
  { id: 'missions', name: 'Mission Offerings', desc: 'Sponsoring city outreaches, community crusades, and soul-winning missions.' },
  { id: 'osom', name: 'OSOM Partnership', desc: 'Partnering with Apostle Olufisayo for national conferences and media.' },
  { id: 'building', name: 'Building Project', desc: 'Contributions toward the permanent church auditorium.' },
  { id: 'welfare', name: 'Welfare & Love Seed', desc: 'Caring for widows, students, and families in need in the church.' },
];

export const PRESET_AMOUNTS = {
  NGN: ['2,000', '5,000', '10,000', '25,000', '50,000', '100,000'],
  USD: ['20', '50', '100', '250', '500', '1,000'],
};

export const GATEWAYS = [
  { id: 'paystack', label: 'Paystack', desc: 'Cards, transfer, USSD' },
  { id: 'flutterwave', label: 'Flutterwave', desc: 'Naira & Barter' },
  { id: 'stripe', label: 'Stripe', desc: 'International cards' },
];

// Flip to true once a payment gateway is actually integrated in GivingForm.
export const ONLINE_GIVING_ENABLED = true;

/**
 * Strips commas and non-numeric chars from user input
 * e.g. "10,000" -> 10000
 */
export function parseAmountNumber(amountStr) {
  if (typeof amountStr === 'number') return amountStr;
  if (!amountStr) return 0;
  const cleaned = String(amountStr).replace(/,/g, '').trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}
