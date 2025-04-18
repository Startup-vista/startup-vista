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
        subject: "Your Startupvista Verification Code",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6; text-align: left;">
              <h1 style="color: #1C4BC6; margin-bottom: 20px;">Thank you for signing up on <a href="https://startupvista.in" style="color: #1C4BC6; text-decoration: none;">Startupvista</a></h1>
              
              <p style="margin-bottom: 20px;">
                The platform where startups take control of their own story.
              </p>
              
              <p style="font-weight: bold; margin-bottom: 20px; color: #1C4BC6;">
                To verify your email address, please use the OTP below:
              </p>
              
              <div style="background: #f5f7ff; border: 2px solid #1C4BC6; border-radius: 8px; padding: 15px 20px; margin-bottom: 30px;">
                <p style="margin: 0 0 8px 0; font-size: 14px; color: #666;">Your OTP:</p>
                <p style="margin: 0; font-size: 24px; font-weight: bold; color: #1C4BC6; letter-spacing: 2px;">${otp}</p>
              </div>
              
              <p style="margin-bottom: 15px;">
                This OTP is valid for the next 10 minutes.<br>
                Please do not share it with anyone.
              </p>
              
              <p style="margin-bottom: 30px;">
                If you did not request this verification, please ignore this email.
              </p>
              
              <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="margin: 5px 0;">
                  <strong>Thank you,</strong>
                </p>
                <p style="margin: 5px 0; color: #1C4BC6; font-weight: bold;">
                  Team Startupvista
                </p>
                <p style="margin: 5px 0;">
                  <a href="https://startupvista.in" style="color: #1C4BC6; text-decoration: none;">www.startupvista.in</a>
                </p>
              </div>
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