import { createHash, randomBytes } from 'crypto';

// In-memory store for OTPs (in production, use Redis or a database)
type OTPRecord = {
  hash: string;
  expiresAt: Date;
};

const otpStore: Record<string, OTPRecord> = {};

// Generate a 6-digit OTP
export function generateOTP(): string {
  return randomBytes(3)
    .readUIntBE(0, 3)
    .toString()
    .padStart(6, '0')
    .slice(0, 6);
}

// Hash the OTP with the email as salt
function hashOTP(otp: string, email: string): string {
  return createHash('sha256')
    .update(`${otp}.${email}`)
    .digest('hex');
}

// Store OTP for a given email
export function storeOTP(email: string, otp: string): void {
  const expiryMinutes = parseInt(process.env.OTP_EXPIRY_MINUTES || '10', 10);
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + expiryMinutes);
  
  otpStore[email] = {
    hash: hashOTP(otp, email),
    expiresAt,
  };
}

// Verify OTP for a given email
export function verifyOTP(email: string, otp: string): boolean {
  const record = otpStore[email];
  
  if (!record) {
    return false;
  }
  
  // Check if OTP has expired
  if (new Date() > record.expiresAt) {
    delete otpStore[email];
    return false;
  }
  
  // Check if OTP is valid
  const isValid = record.hash === hashOTP(otp, email);
  
  // Remove OTP after verification (one-time use)
  if (isValid) {
    delete otpStore[email];
  }
  
  return isValid;
}