import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, status , brandName , reason} = body;

        // Send email based on the status
        const {  error } = await resend.emails.send({
            from: "StartupVista <notifications@startupvista.in>",
            to: email,
            subject: status === "verified"
                ? `You’re Approved — Welcome to StartupVista!`
                :  `Update on Your StartupVista Application`,
            html: generateStatusEmailHTML({ status, brandName , reason}),
        });

        // // Send notification to admin
        await resend.emails.send({
            from: "StartupVista <notifications@startupvista.in>",
            to: "startupvista09@gmail.com",
            subject: `${brandName} ${status.charAt(0).toUpperCase() + status.slice(1)}`,
            html: generateAdminNotificationHTML({ email, status, brandName, reason }),
        });

        if (error) {
            return NextResponse.json({ error }, { status: 400 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

function generateStatusEmailHTML({ status, brandName , reason}: any) {
    const isVerified = status === "verified";

    const formattedReason = reason
        ? reason.replace(/\n/g, '<br>')
        : 'Not provided';

    return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
      <h1 style="color: #1C4BC6; margin-bottom: 20px;">Hi ${brandName},</h1>
      
      ${isVerified ? `   
        <p style="margin-bottom: 20px;">
            Great news — your account has been successfully verified on StartupVista!
            You can now begin sharing your startup journey, product updates, funding news, hiring announcements, and much more — directly from your dashboard.
            This is your space to build trust, visibility, and community around your brand — completely on your terms.
        </p>
        
        <p style="margin-bottom: 20px;">
          Here's what to do next:
        </p>
        
        <ul style="margin-bottom: 30px; padding-left: 20px;">
          <li>Log in: https://www.startupvista.in/start-up/login</li>
          <li>Post your first update: https://www.startupvista.in/start-up/create-post</li>
          <li>Share your public profile link and build your startup’s presence!</li>
        </ul>
        
        <p style="margin-bottom: 30px;">
          If you need help or have any questions, feel free to reach out to us anytime.
        </p>
        
        <p style="margin-bottom: 30px;">
          Welcome aboard — let’s share your story with the world!
        </p>
      ` : `
        <p style="margin-bottom: 20px;">
         Thank you for applying to join StartupVista — we truly appreciate your interest.
        </p>
        
        <p style="margin-bottom: 20px;">
          After reviewing your submission, we were unable to verify your startup profile at this time due to one or more of the following reasons:
        </p>
        
        <p style="margin-bottom: 20px;white-space: pre-wrap;">${formattedReason}</p>
        
        <p style="margin-bottom: 20px;">
          We understand this might be disappointing, but we encourage you to re-apply after carefully reviewing and correcting the above.
        </p>
        
        <p style="margin-bottom: 20px;">
            To increase your chances of approval, please ensure:
        </p>
        
        <ul style="margin-bottom: 30px; padding-left: 20px;">
          <li>Your company name and email domain match public records or your website</li>
          <li>All information is complete, accurate, and verifiable</li>
          <li>You provide active links to your website and social media</li>
        </ul>
        
        <p style="margin-bottom: 20px;">
            Ready to reapply? Click here: Reapply on StartupVista
            For any help, contact us at support@startupvista.in
        </p>
        
        <p style="margin-bottom: 20px;">
            Ready to reapply? Click here: 
            <a href="https://www.startupvista.in/start-up/register" style="color: #1C4BC6; text-decoration: none;">Reapply on StartupVista</a>
            For any help, contact us at support@startupvista.in
        </p>
        
        <p style="margin-bottom: 30px;">
            We're rooting for your journey and look forward to seeing you back!
        </p>
      `}
  
      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="margin: 5px 0;">
          <strong>Warm regards,</strong>
        </p>
        <p style="margin: 5px 0; color: #1C4BC6; font-weight: bold;">
          Team StartupVista
        </p>
        <p style="margin: 5px 0;">
          <a href="https://startupvista.in" style="color: #1C4BC6; text-decoration: none;">www.startupvista.in</a>
        </p>
      </div>
    </div>
  `;
}

function generateAdminNotificationHTML({ email, status, brandName , reason}: any) {
    const isVerified = status === "verified";
    const formattedReason = reason
        ? reason.replace(/\n/g, '<br>')
        : 'Not provided';

    return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
      <h1 style="color: #1C4BC6; margin-bottom: 20px;">User ${status.charAt(0).toUpperCase() + status.slice(1)}</h1>
      
      <div style="background: ${isVerified ? '#eef7ee' : '#fff0f0'}; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
        <h2 style="color: ${isVerified ? '#2e7d32' : '#d32f2f'}; margin-top: 0; font-size: 18px;">
          User has been ${status}
        </h2>
        <p style="margin-bottom: 0;">
          The following user has been ${status}:
        </p>
      </div>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${email}</td>
        </tr>
        ${brandName ? `
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Company</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${brandName}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Status</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: ${isVerified ? '#2e7d32' : '#d32f2f'}; font-weight: bold;">
            ${status.charAt(0).toUpperCase() + status.slice(1)}
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Reason for Rejection</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${formattedReason}</td>
        </tr>
      </table>
      
      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="margin: 5px 0; color: #1C4BC6; font-weight: bold;">
          Team StartupVista
        </p>
      </div>
    </div>
  `;
}