import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Header } from '@/components/Header';
import { Separator } from '@/components/ui/separator';

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-[#F0F7FC]">
            <Header />

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                {/* Title Section */}
                <div className="items-center justify-center w-fit mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-text-800">Privacy Policy</h1>
                </div>

                {/* Effective Date */}
                <div className="mb-12 text-primary-300">
                    <p>Effective Date: 10-04-25</p>
                    <p>Last Updated: [Insert Date]</p>
                </div>

                {/* Introduction */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-[#0D0D0D] w-fit border-b-5 border-[#1C4BC6]">1. Introduction &nbsp;&nbsp;&nbsp;</h2>
                    <Separator />
                    <div className="space-y-6 text-[#2E2E2E] pt-6">
                        <p>
                            This Privacy Policy outlines how StartupVista collects, uses, shares, and protects user and business data.
                        </p>
                    </div>
                </section>

                {/* Data We Collect */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-[#0D0D0D] w-fit border-b-5 border-[#1C4BC6]">2. Data We Collect &nbsp;&nbsp;&nbsp;</h2>
                    <Separator />
                    <div className="space-y-6 text-[#2E2E2E] pt-6">
                        <Card className="p-6 border-[#CEE0F6] bg-white">
                            <h3 className="text-xl font-bold text-[#1C4BC6]">Company Information</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Logo, company email, password</li>
                                <li>Company/LLP name, Certificate of Incorporation (if registered)</li>
                                <li>Brand name, industry, established date, team size</li>
                                <li>600-character company description</li>
                                <li>Funding status (bootstrapped or funded), investor details (if applicable)</li>
                            </ul>
                        </Card>

                        <Card className="p-6 border-[#CEE0F6] bg-white">
                            <h3 className="text-xl font-bold text-[#1C4BC6]">Personal Information</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Full name, designation, date of birth, gender, phone number</li>
                            </ul>
                        </Card>

                        <Card className="p-6 border-[#CEE0F6] bg-white">
                            <h3 className="text-xl font-bold text-[#1C4BC6]">Product Information & Social Links</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Website URL, Android/iOS app links</li>
                                <li>LinkedIn, Instagram, X (Twitter), Facebook links</li>
                            </ul>
                        </Card>
                    </div>
                </section>

                {/* Use of Data */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-[#0D0D0D] w-fit border-b-5 border-[#1C4BC6]">3. Use of Data &nbsp;&nbsp;&nbsp;</h2>
                    <Separator />
                    <div className="space-y-6 text-[#2E2E2E] pt-6">
                        <ul className="list-disc pl-6 space-y-2">
                            <li>To verify and approve startups</li>
                            <li>To display business profiles on StartupVista</li>
                            <li>To help investors analyze and discover startups (with future subscription models)</li>
                            <li>To maintain platform security and compliance</li>
                            <li>To enhance features and provide user support</li>
                        </ul>
                    </div>
                </section>

                {/* Data Sharing */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-[#0D0D0D] w-fit border-b-5 border-[#1C4BC6]">4. Data Sharing &nbsp;&nbsp;&nbsp;</h2>
                    <Separator />
                    <div className="space-y-6 text-[#2E2E2E] pt-6">
                        <ul className="list-disc pl-6 space-y-2">
                            <li>With hosting, analytics, and technical service providers</li>
                            <li>With investors/subscribers (with your consent or when business is made public)</li>
                            <li>With legal authorities when required</li>
                        </ul>
                    </div>
                </section>

                {/* Data Security */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-[#0D0D0D] w-fit border-b-5 border-[#1C4BC6]">5. Data Security &nbsp;&nbsp;&nbsp;</h2>
                    <Separator />
                    <div className="space-y-6 text-[#2E2E2E] pt-6">
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Encryption of sensitive data (passwords, certificates, contact info)</li>
                            <li>Restricted access internally</li>
                            <li>Regular audits and backups</li>
                        </ul>
                    </div>
                </section>

                {/* Data Retention */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-[#0D0D0D] w-fit border-b-5 border-[#1C4BC6]">6. Data Retention &nbsp;&nbsp;&nbsp;</h2>
                    <Separator />
                    <div className="space-y-6 text-[#2E2E2E] pt-6">
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Data is retained for operational, analytical, or legal purposes</li>
                            <li>Users can request deletion of their data</li>
                        </ul>
                    </div>
                </section>

                {/* Your Rights */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-[#0D0D0D] w-fit border-b-5 border-[#1C4BC6]">7. Your Rights &nbsp;&nbsp;&nbsp;</h2>
                    <Separator />
                    <div className="space-y-6 text-[#2E2E2E] pt-6">
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Access, correction, and deletion of personal data</li>
                            <li>Data portability and export (especially for EU users)</li>
                        </ul>
                    </div>
                </section>

                {/* Cookies */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-[#0D0D0D] w-fit border-b-5 border-[#1C4BC6]">8. Cookies &nbsp;&nbsp;&nbsp;</h2>
                    <Separator />
                    <div className="space-y-6 text-[#2E2E2E] pt-6">
                        <ul className="list-disc pl-6 space-y-2">
                            <li>We use cookies to enhance experience and monitor site usage</li>
                            <li>Manage cookie preferences in your browser</li>
                        </ul>
                    </div>
                </section>

                {/* Contact Us */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-[#0D0D0D] w-fit border-b-5 border-[#1C4BC6]">9. Contact Us &nbsp;&nbsp;&nbsp;</h2>
                    <Separator />
                    <div className="space-y-6 text-[#2E2E2E] pt-6">
                        <p>For privacy concerns: [Your Contact Email]</p>
                    </div>
                </section>

                {/* Content Guidelines */}
                <section className="mb-16">
                    <div className="items-center justify-center w-fit mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-text-800">Content Guidelines</h2>
                    </div>

                    <h3 className="text-2xl font-bold text-[#0D0D0D] w-fit border-b-5 border-[#1C4BC6]">1. Acceptable Content &nbsp;&nbsp;&nbsp;</h3>
                    <Separator />
                    <ul className="list-disc pl-6 space-y-2 mb-6 pt-6 text-[#2E2E2E]">
                        <li>Company updates, product launches, partnerships</li>
                        <li>Industry insights, financial reports, funding announcements</li>
                        <li>Thought leadership articles by startup founders and team members</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-[#0D0D0D] w-fit border-b-5 border-[#1C4BC6]">2. Prohibited Content &nbsp;&nbsp;&nbsp;</h3>
                    <Separator />
                    <ul className="list-disc pl-6 space-y-2 mb-6 pt-6 text-[#2E2E2E]">
                        <li>False or misleading claims</li>
                        <li>Unverified financial statements or projections</li>
                        <li>Hate speech, offensive language, or discriminatory content</li>
                        <li>Plagiarized material or copyright infringement</li>
                        <li>Promotions unrelated to the business or irrelevant links</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-[#0D0D0D] w-fit border-b-5 border-[#1C4BC6]">3. Formatting Standards &nbsp;&nbsp;&nbsp;</h3>
                    <Separator />
                    <ul className="list-disc pl-6 space-y-2 mb-6 pt-6 text-[#2E2E2E]">
                        <li>Use proper grammar, clarity, and professional tone</li>
                        <li>Include relevant images, graphs, or media when applicable</li>
                        <li>Properly attribute any third-party data or references</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-[#0D0D0D] w-fit border-b-5 border-[#1C4BC6]">4. Review & Moderation &nbsp;&nbsp;&nbsp;</h3>
                    <Separator />
                    <ul className="list-disc pl-6 pt-6 space-y-2 text-[#2E2E2E]">
                        <li>All content is subject to moderation</li>
                        <li>Violations may result in warnings, removal, or account suspension</li>
                    </ul>
                </section>

                {/* Community Guidelines */}
                <section className="mb-16">
                    <div className="items-center justify-center w-fit mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-text-800">Community Guidelines</h2>
                    </div>

                    <h3 className="text-2xl font-bold text-[#0D0D0D] w-fit border-b-5 border-[#1C4BC6]">1. Respectful Behavior &nbsp;&nbsp;&nbsp;</h3>
                    <Separator />
                    <ul className="list-disc pl-6 space-y-2 mb-6 pt-6 text-[#2E2E2E]">
                        <li>Treat others with respect and professionalism</li>
                        <li>Do not engage in harassment, bullying, or personal attacks</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-[#0D0D0D] w-fit border-b-5 border-[#1C4BC6]">2. Constructive Engagement &nbsp;&nbsp;&nbsp;</h3>
                    <Separator />
                    <ul className="list-disc pl-6 space-y-2 mb-6 pt-6 text-[#2E2E2E]">
                        <li>Encourage thoughtful discussion and feedback</li>
                        <li>Stay on topic when commenting on articles or posts</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-[#0D0D0D] w-fit border-b-5 border-[#1C4BC6]">3. Prohibited Activities &nbsp;&nbsp;&nbsp;</h3>
                    <Separator />
                    <ul className="list-disc pl-6 space-y-2 mb-6 pt-6 text-[#2E2E2E]">
                        <li>Trolling, spamming, or repeated self-promotion</li>
                        <li>Posting sensitive or confidential information</li>
                        <li>Impersonation of others or misleading identities</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-[#0D0D0D] w-fit border-b-5 border-[#1C4BC6]">4. Reporting Violations &nbsp;&nbsp;&nbsp;</h3>
                    <Separator />
                    <ul className="list-disc pl-6 space-y-2 pt-6 text-[#2E2E2E]">
                        <li>Users can report inappropriate behavior or content</li>
                        <li>StartupVista reserves the right to investigate and take necessary action</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}