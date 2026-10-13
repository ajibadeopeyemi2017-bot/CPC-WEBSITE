/**
 * Paystack Integration Helper for Christ The Potter Church
 *
 * Provides utilities to dynamically load Paystack Inline JS and trigger
 * secure online giving transactions for tithes, offerings, building fund, etc.
 */

export function loadPaystackScript() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      return resolve(false);
    }

    if (window.PaystackPop) {
      return resolve(true);
    }

    // Check if script tag already exists
    const existing = document.getElementById('paystack-inline-js');
    if (existing) {
      existing.addEventListener('load', () => resolve(true));
      existing.addEventListener('error', (err) => reject(err));
      return;
    }

    const script = document.createElement('script');
    script.id = 'paystack-inline-js';
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error('Failed to load Paystack payment script. Please check your internet connection.'));
    document.body.appendChild(script);
  });
}

/**
 * Launch Paystack Popup
 * @param {Object} options
 * @param {string} options.key - Paystack Public Key (pk_test_... or pk_live_...)
 * @param {string} options.email - Donor's email address
 * @param {number} options.amount - Amount in main unit (e.g. 5000 NGN)
 * @param {string} options.currency - 'NGN' or 'USD'
 * @param {string} options.donorName - Donor's full name
 * @param {string} options.categoryName - Selected giving category
 * @param {Function} options.onSuccess - Callback on payment success
 * @param {Function} options.onClose - Callback on modal close
 */
export async function openPaystackPayment({
  key,
  email,
  amount,
  currency = 'NGN',
  donorName = 'Anonymous Giver',
  categoryName = 'General Offering',
  onSuccess,
  onClose,
}) {
  if (typeof window === 'undefined') return;

  await loadPaystackScript();

  if (!window.PaystackPop) {
    throw new Error('Paystack could not be loaded. Please check your internet connection.');
  }

  // Paystack amounts are in the lowest currency unit (Kobo for NGN, Cents for USD)
  const amountInKobo = Math.round(Number(amount) * 100);
  const reference = `CPC-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;

  const handler = window.PaystackPop.setup({
    key: key,
    email: email.trim(),
    amount: amountInKobo,
    currency: currency,
    ref: reference,
    metadata: {
      custom_fields: [
        {
          display_name: 'Donor Name',
          variable_name: 'donor_name',
          value: donorName.trim() || 'Anonymous',
        },
        {
          display_name: 'Giving Category',
          variable_name: 'giving_category',
          value: categoryName,
        },
        {
          display_name: 'Ministry',
          variable_name: 'ministry',
          value: 'Christ The Potter Church',
        },
      ],
    },
    callback: function (response) {
      if (onSuccess) {
        onSuccess({
          reference: response.reference || reference,
          trans: response.trans,
          status: response.status,
          message: response.message,
          amount,
          currency,
          donorName,
          email,
          categoryName,
        });
      }
    },
    onClose: function () {
      if (onClose) {
        onClose();
      }
    },
  });

  handler.openIframe();
}
