import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, summary, explanation, isStartup, companyLink } = body;

    // Determine recipient based on summary content
    let recipient = "startupvista09@gmail.com";
    if (summary.toLowerCase().includes("technical issue")) {
      recipient = "startupvista09@gmail.com";
    }

    // Send email to support
    const { data, error } = await resend.emails.send({
      from: "StartupVista <support@startupvista.in>",
      to: recipient,
      subject: `New Contact: ${summary}`,
      html: generateContactEmailHTML({ name, email, summary, explanation, isStartup, companyLink }),
      replyTo: email
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    // Send confirmation email to user
    await resend.emails.send({
      from: "StartupVista <noreply@startupvista.in>",
      to: email,
      subject: "We've received your message",
      html: generateConfirmationEmailHTML({ name, summary })
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

function generateContactEmailHTML({ name, email, summary, explanation, isStartup, companyLink }: any) {
  const isUrgent = summary.toLowerCase().includes("technical issue");
  
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
      ${isUrgent ? `
        <div style="background: #ffebee; border-left: 4px solid #f44336; padding: 12px 20px; margin-bottom: 20px;">
          <h3 style="color: #d32f2f; margin: 0;">⚠️ URGENT: Technical Issue Reported</h3>
        </div>
      ` : ''}
      
      <h1 style="color: #1C4BC6; margin-bottom: 20px;">New Contact Form Submission</h1>
      
      <div style="background: #f5f7ff; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
        <h2 style="color: #1C4BC6; margin-top: 0; font-size: 18px;">${summary}</h2>
        <p style="white-space: pre-wrap; margin-bottom: 0;">${explanation}</p>
      </div>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">From</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${name} (${email})</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">User Type</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${isStartup === "yes" ? "Startup" : "Regular User"}</td>
        </tr>
        ${isStartup === "yes" && companyLink ? `
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Company Link</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee;">
            <a href="${companyLink}" target="_blank" style="color: #1C4BC6; text-decoration: none;">${companyLink}</a>
          </td>
        </tr>
        ` : ''}
      </table>
      
      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="margin: 5px 0;">
          <strong>Reply directly to this email or contact:</strong> ${email}
        </p>
        <p style="margin: 5px 0; color: #1C4BC6; font-weight: bold;">
          Team Startupvista
        </p>
      </div>
    </div>
  `;
}

function generateConfirmationEmailHTML({ name, summary }: any) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
      <h1 style="color: #1C4BC6; margin-bottom: 20px;">Hi ${name},</h1>
      
      <p style="margin-bottom: 20px;">
        Thank you for contacting Startupvista. We've received your message regarding:
      </p>
      
      <div style="background: #f5f7ff; border-left: 4px solid #1C4BC6; padding: 12px 20px; margin-bottom: 30px;">
        <p style="margin: 0; font-weight: bold;">${summary}</p>
      </div>
      
      <p style="margin-bottom: 20px;">
        Our team will review your request and get back to you as soon as possible.
        For technical issues, we typically respond within 24-48 hours.
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
  `;
}