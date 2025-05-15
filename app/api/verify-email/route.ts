import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, status, brandName } = body;

        // Send email based on the status
        const {  error } = await resend.emails.send({
            from: "StartupVista <notifications@startupvista.in>",
            to: email,
            subject: status === "verified"
                ? "Your StartupVista Account Has Been Verified!"
                : "Important Update About Your StartupVista Account",
            html: generateStatusEmailHTML({ status, brandName }),
        });

        // Send notification to admin
        await resend.emails.send({
            from: "StartupVista <notifications@startupvista.in>",
            to: "startupvista09@gmail.com",
            subject: `${brandName} ${status.charAt(0).toUpperCase() + status.slice(1)}`,
            html: generateAdminNotificationHTML({ email, status, brandName }),
        });

        if (error) {
            return NextResponse.json({ error }, { status: 400 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

function generateStatusEmailHTML({ status, brandName }: any) {
    const isVerified = status === "verified";

    return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
      <h1 style="color: #1C4BC6; margin-bottom: 20px;">Hi ${brandName},</h1>
      
      ${isVerified ? `
        <div style="background: #eef7ee; border-left: 4px solid #4caf50; padding: 12px 20px; margin-bottom: 20px;">
          <h3 style="color: #2e7d32; margin: 0;">✅ Your account has been verified!</h3>
        </div>
        
        <p style="margin-bottom: 20px;">
          We're pleased to inform you that your StartupVista account${brandName ? ` for <strong>${brandName}</strong>` : ''} has been verified.
          You now have full access to all features and benefits of our platform.
        </p>
        
        <p style="margin-bottom: 20px;">
          Here's what you can do now:
        </p>
        
        <ul style="margin-bottom: 30px; padding-left: 20px;">
          <li>Access exclusive startup resources</li>
          <li>Connect with investors and mentors</li>
          <li>Participate in our community forums</li>
          <li>Create and share your startup profile</li>
        </ul>
        
        <p style="margin-bottom: 30px;">
          If you have any questions or need assistance, please don't hesitate to reach out to our support team.
        </p>
      ` : `
        <div style="background: #fff0f0; border-left: 4px solid #f44336; padding: 12px 20px; margin-bottom: 20px;">
          <h3 style="color: #d32f2f; margin: 0;">Important update about your account</h3>
        </div>
        
        <p style="margin-bottom: 20px;">
          We regret to inform you that we were unable to verify your StartupVista account${brandName ? ` for <strong>${brandName}</strong>` : ''} at this time.
        </p>
        
        <p style="margin-bottom: 20px;">
          There could be several reasons for this:
        </p>
        
        <ul style="margin-bottom: 20px; padding-left: 20px;">
          <li>Incomplete or inaccurate information provided</li>
          <li>Unable to verify company details</li>
          <li>Your profile doesn't meet our current requirements</li>
        </ul>
        
        <p style="margin-bottom: 30px;">
          If you believe this is an error or would like to provide additional information, please reply to this email
          or contact our support team directly. We're happy to reconsider your application with updated information.
        </p>
      `}
  
      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="margin: 5px 0;">
          <strong>Thank you for choosing StartupVista,</strong>
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

function generateAdminNotificationHTML({ email, status, brandName }: any) {
    const isVerified = status === "verified";

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
      </table>
      
      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="margin: 5px 0; color: #1C4BC6; font-weight: bold;">
          Team StartupVista
        </p>
      </div>
    </div>
  `;
}