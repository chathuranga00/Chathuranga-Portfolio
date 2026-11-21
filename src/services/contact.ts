export interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string; // Bot protection
}

export interface ContactSendResult {
  success: boolean;
  status: 'sent' | 'unconfigured' | 'spam' | 'throttled' | 'error';
  message: string;
}

let lastSubmissionTimestamp = 0;
const THROTTLE_DURATION_MS = 15000; // 15-second throttle

export async function sendContactMessage(data: ContactFormData): Promise<ContactSendResult> {
  // 1. Honeypot check: If filled, bot detected
  if (data.honeypot && data.honeypot.trim() !== '') {
    return {
      success: false,
      status: 'spam',
      message: 'Spam activity detected. Submission ignored.',
    };
  }

  // 2. Client-side throttling check
  const now = Date.now();
  if (now - lastSubmissionTimestamp < THROTTLE_DURATION_MS) {
    const waitSeconds = Math.ceil((THROTTLE_DURATION_MS - (now - lastSubmissionTimestamp)) / 1000);
    return {
      success: false,
      status: 'throttled',
      message: `Please wait ${waitSeconds} seconds before submitting another inquiry.`,
    };
  }

  // 3. Environment Variable Endpoint Check
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

  // Strict Rule: If VITE_CONTACT_ENDPOINT is not configured, NEVER pretend message was sent!
  if (!endpoint || endpoint.trim() === '') {
    return {
      success: false,
      status: 'unconfigured',
      message:
        "The automated contact form endpoint is not yet configured (VITE_CONTACT_ENDPOINT). Please email me directly at the address listed on this page.",
    };
  }

  // 4. Send to live endpoint (e.g. Formspree, Web3Forms, or serverless function)
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: data.fullName,
        email: data.email,
        subject: data.subject,
        message: data.message,
      }),
    });

    if (response.ok) {
      lastSubmissionTimestamp = Date.now();
      return {
        success: true,
        status: 'sent',
        message: 'Thank you! Your message has been received. I will reply to your email shortly.',
      };
    } else {
      const errorData = await response.json().catch(() => null);
      return {
        success: false,
        status: 'error',
        message:
          errorData?.message ||
          'Failed to send message via the endpoint. Please email me directly.',
      };
    }
  } catch (err) {
    return {
      success: false,
      status: 'error',
      message: 'Network error encountered. Please check your connection or reach out via email.',
    };
  }
}
