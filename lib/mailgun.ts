// src/lib/mailgun.ts

import formData from 'form-data';
import Mailgun from 'mailgun.js';

// Initialize Mailgun
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || '',
});

export async function sendOTPEmail(email: string, otp: string): Promise<boolean> {
  try {
    const domain = process.env.MAILGUN_DOMAIN || '';
    const from = process.env.MAILGUN_FROM || 'noreply@example.com';
    
    const messageData = {
      from,
      to: email,
      subject: 'Your Verification Code',
      text: `Your verification code is: ${otp}. It will expire in ${process.env.OTP_EXPIRY_MINUTES || 10} minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Email Verification Code</h2>
          <p>Please use the following code to verify your email address:</p>
          <div style="background-color: #f4f4f4; padding: 12px; text-align: center; font-size: 24px; letter-spacing: 4px; font-weight: bold; border-radius: 4px; margin: 20px 0;">
            ${otp}
          </div>
          <p>This code will expire in ${process.env.OTP_EXPIRY_MINUTES || 10} minutes.</p>
          <p>If you didn't request this code, you can safely ignore this email.</p>
        </div>
      `,
    };

    await mg.messages.create(domain, messageData);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}