import { Card } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { Separator } from '@/components/ui/separator';

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-[#F0F7FC]">      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Title Section */}
        <div className="items-center justify-center w-fit mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-text-800">Terms & Conditions</h1>
        </div>
        
        {/* Effective Date */}
        <div className="mb-12 text-primary-300">
          <p>Effective Date: [Insert Date]</p>
          <p>Last Updated: [Insert Date]</p>
        </div>

        {/* Introduction */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#0D0D0D] w-fit border-b-5 border-[#1C4BC6]">1. Introduction &nbsp;&nbsp;&nbsp;</h2>
          <Separator />
          <div className="space-y-6 text-[#2E2E2E] pt-6">
            <p>
              These Terms and Conditions ("Terms") govern your access to and use of StartupVista's platform, including all related services, content, and functionalities. By using StartupVista, you agree to these Terms.
            </p>
          </div>
        </section>

        {/* Account Registration & Approval */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#0D0D0D] w-fit border-b-5 border-[#1C4BC6]">2. Account Registration & Approval &nbsp;&nbsp;&nbsp;</h2>
          <Separator />
          <div className="space-y-6 text-[#2E2E2E] pt-6">
            <ul className="list-disc pl-6 space-y-2">
              <li>Only verified businesses or startup representatives can register.</li>
              <li>All applications are subject to manual review and approval.</li>
              <li>You must provide accurate, current, and complete business and personal information.</li>
              <li>We reserve the right to reject or revoke access at any time without notice.</li>
            </ul>
          </div>
        </section>

        {/* User Responsibilities */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#0D0D0D] w-fit border-b-5 border-[#1C4BC6]">3. User Responsibilities &nbsp;&nbsp;&nbsp;</h2>
          <Separator />
          <div className="space-y-6 text-[#2E2E2E] pt-6">
            <ul className="list-disc pl-6 space-y-2">
              <li>You agree to maintain the confidentiality of your login credentials.</li>
              <li>You are responsible for all activity conducted under your account.</li>
              <li>You must not use the platform for illegal or unauthorized purposes.</li>
            </ul>
          </div>
        </section>

        {/* Content Submission */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#0D0D0D] w-fit border-b-5 border-[#1C4BC6]">4. Content Submission &nbsp;&nbsp;&nbsp;</h2>
          <Separator />
          <div className="space-y-6 text-[#2E2E2E] pt-6">
            <ul className="list-disc pl-6 space-y-2">
              <li>Content must be business-related: news, achievements, funding, market trends, etc.</li>
              <li>You must own or have the right to post any content submitted.</li>
              <li>You retain ownership of your content but grant us a license to use, display, and distribute it.</li>
              <li>You are responsible for the accuracy and legality of your submissions.</li>
            </ul>
          </div>
        </section>

        {/* Platform Use */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#0D0D0D] w-fit border-b-5 border-[#1C4BC6]">5. Platform Use &nbsp;&nbsp;&nbsp;</h2>
          <Separator />
          <div className="space-y-6 text-[#2E2E2E] pt-6">
            <ul className="list-disc pl-6 space-y-2">
              <li>Do not impersonate any person or entity.</li>
              <li>Do not distribute malware, spam, or conduct phishing.</li>
              <li>Do not post offensive, obscene, or inappropriate content.</li>
            </ul>
          </div>
        </section>

        {/* Intellectual Property */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#0D0D0D] w-fit border-b-5 border-[#1C4BC6]">6. Intellectual Property &nbsp;&nbsp;&nbsp;</h2>
          <Separator />
          <div className="space-y-6 text-[#2E2E2E] pt-6">
            <ul className="list-disc pl-6 space-y-2">
              <li>All content on StartupVista (excluding user submissions) is the property of StartupVista.</li>
              <li>Unauthorized reproduction or distribution is strictly prohibited.</li>
            </ul>
          </div>
        </section>

        {/* Termination */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#0D0D0D] w-fit border-b-5 border-[#1C4BC6]">7. Termination &nbsp;&nbsp;&nbsp;</h2>
          <Separator />
          <div className="space-y-6 text-[#2E2E2E] pt-6">
            <ul className="list-disc pl-6 space-y-2">
              <li>We reserve the right to terminate or suspend access at our discretion.</li>
              <li>Users may delete their account by contacting support.</li>
            </ul>
          </div>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#0D0D0D] w-fit border-b-5 border-[#1C4BC6]">8. Limitation of Liability &nbsp;&nbsp;&nbsp;</h2>
          <Separator />
          <div className="space-y-6 text-[#2E2E2E] pt-6">
            <ul className="list-disc pl-6 space-y-2">
              <li>StartupVista is not responsible for user-submitted content.</li>
              <li>We are not liable for damages or losses arising from use of the platform.</li>
            </ul>
          </div>
        </section>

        {/* Modifications */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#0D0D0D] w-fit border-b-5 border-[#1C4BC6]">9. Modifications &nbsp;&nbsp;&nbsp;</h2>
          <Separator />
          <div className="space-y-6 text-[#2E2E2E] pt-6">
            <ul className="list-disc pl-6 space-y-2">
              <li>We may revise these Terms at any time with notice.</li>
              <li>Continued use of the platform after updates means you accept the new Terms.</li>
            </ul>
          </div>
        </section>

        {/* Governing Law */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#0D0D0D] w-fit border-b-5 border-[#1C4BC6]">10. Governing Law &nbsp;&nbsp;&nbsp;</h2>
          <Separator />
          <div className="space-y-6 text-[#2E2E2E] pt-6">
            <p>
              These Terms are governed by the laws of [Insert Jurisdiction].
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}