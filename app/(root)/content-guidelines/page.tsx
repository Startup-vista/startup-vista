import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function ContGuidePage() {
    return (
        <div className="min-h-screen bg-[#F0F7FC]">
            {/* Main Content */}
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="items-center justify-center w-fit mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-text-800">Content Guidelines</h1>
                </div>
                <section className="mb-16">
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
            </div>
        </div>
    );
}