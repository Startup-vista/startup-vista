// app/api/verification/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/firebase"; // Your firebase config
import { collection, doc, setDoc, getDoc, deleteDoc, serverTimestamp } from "firebase/firestore";

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Collection reference for OTPs
const OTP_COLLECTION = "otps";

export async function POST(req: NextRequest) {
  try {
    const { email, action } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Generate OTP action
    if (action === "generate") {
      // Generate a 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store OTP in Firestore with 10-minute expiration timestamp
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 10); // 10 minutes from now
      
      const docRef = doc(collection(db, OTP_COLLECTION), email);
      await setDoc(docRef, {
        code: otp,
        expiresAt: expiresAt.getTime(),
        createdAt: serverTimestamp(),
      });

      // Send email with OTP
      const { data, error } = await resend.emails.send({
        from: "StartupVista <noreply@yourdomain.com>",
        to: email,
        subject: "Your Verification Code",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Verification Code</h2>
            <p>Your verification code is: <strong>${otp}</strong></p>
            <p>This code will expire in 10 minutes.</p>
          </div>
        `,
      });

      if (error) {
        console.error("Failed to send email:", error);
        return NextResponse.json(
          { error: "Failed to send verification email" },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true });
    }
    
    // Verify OTP action
    else if (action === "verify") {
      const { code } = await req.json();
      
      if (!code) {
        return NextResponse.json(
          { error: "Verification code is required" },
          { status: 400 }
        );
      }

      // Get the OTP document from Firestore
      const docRef = doc(collection(db, OTP_COLLECTION), email);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        return NextResponse.json(
          { error: "No verification code found for this email" },
          { status: 400 }
        );
      }

      const otpData = docSnap.data();
      const now = Date.now();
      
      // Check if OTP is expired
      if (now > otpData.expiresAt) {
        // Clean up expired OTP
        await deleteDoc(docRef);
        return NextResponse.json(
          { error: "Verification code has expired" },
          { status: 400 }
        );
      }

      // Check if the code matches
      if (otpData.code !== code) {
        return NextResponse.json(
          { error: "Invalid verification code" },
          { status: 400 }
        );
      }

      // Clean up used OTP
      await deleteDoc(docRef);
      
      return NextResponse.json({ 
        success: true,
        message: "Email verified successfully" 
      });
    }
    
    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}