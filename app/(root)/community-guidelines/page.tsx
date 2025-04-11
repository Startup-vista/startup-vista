import { Separator } from '@/components/ui/separator';

export default function CommGuidePage() {
    return (
        <div className="min-h-screen bg-[#F0F7FC]">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="items-center justify-center w-fit mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-text-800">Community Guidelines</h1>
                </div>
                <section className="mb-16">
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