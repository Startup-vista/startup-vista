import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-[#F0F7FC]">
            {/* Main Content */}
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                {/* Title Section */}
                <div className="items-center justify-center w-fit mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-text-800">Privacy Policy</h1>
                </div>

                {/* Effective Date */}
                <div className="mb-12 text-primary-300">
                    <p>Last Updated: 18th April 2025</p>
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
                        <p>&nbsp;For privacy concerns :&nbsp;
                            <Link href="/contact-us" className="text-primary-500 font-bold hover:underline">
                                Click here
                            </Link>
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}