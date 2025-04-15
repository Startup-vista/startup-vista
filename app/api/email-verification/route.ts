import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebase";
import { collection, doc, setDoc, getDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const OTP_COLLECTION = "otps";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, action, code } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    if (action === "generate") {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 10);

      const docRef = doc(collection(db, OTP_COLLECTION), email);
      await setDoc(docRef, {
        code: otp,
        expiresAt: expiresAt.getTime(),
        attempts: 0,
        createdAt: serverTimestamp(),
      });

      const { error } = await resend.emails.send({
        from: "StartupVista <noreply@startupvista.in>",
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
        await deleteDoc(docRef);
        return NextResponse.json(
          { error: "Failed to send verification email" },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true });
    }
    
    else if (action === "verify") {
      if (!code) {
        return NextResponse.json(
          { error: "Verification code is required" },
          { status: 400 }
        );
      }

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
      
      if (now > otpData.expiresAt) {
        await deleteDoc(docRef);
        return NextResponse.json(
          { error: "Verification code has expired" },
          { status: 400 }
        );
      }

      if (otpData.attempts >= 3) {
        await deleteDoc(docRef);
        return NextResponse.json(
          { error: "Too many attempts. Please request a new code." },
          { status: 400 }
        );
      }

      if (otpData.code !== code) {
        await setDoc(docRef, {
          ...otpData,
          attempts: otpData.attempts + 1
        }, { merge: true });
        
        return NextResponse.json(
          { error: "Invalid verification code" },
          { status: 400 }
        );
      }

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