"use client";

import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "@/firebase";
import {doc, getDoc} from "firebase/firestore";
import {useRouter} from "next/navigation";

export default function CategoryGuidePage() {
    const router = useRouter();
    const [isVerified, setIsVerified] = useState<boolean | null>(null);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userDoc = await getDoc(doc(db, "users", user.uid));
                    if (userDoc.exists()) {
                        setUserId(user.uid);
                        setIsVerified(userDoc.data().isVerified);
                    } else {
                        setUserId(null);
                        setIsVerified(false);
                    }
                } catch (error) {
                    console.error("Error checking user verification:", error);
                    setIsVerified(false);
                }
            } else {
                setIsVerified(false);
                setUserId(null);
            }
            setLoadingAuth(false);
        });

        return () => unsubscribe();
    }, []);

    if (loadingAuth) {
        return (
            <div className="min-h-screen bg-primary-200 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (!isVerified || !userId) {
        router.replace("/not-found");
    }

    return (
        <div className="min-h-screen bg-[#F0F7FC]">
            {/* Main Content */}
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                {/* Title Section */}
                <div className="items-center justify-center w-fit mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold text-text-800">Step-by-Step Guide to Find The Appropriate Category For Your Post</h1>
                </div>

                {/* Step 1 */}
                <section className="mb-16">
                    <h2 className="text-2xl mb-2 font-bold text-[#0D0D0D] w-fit">1. Funding Updates</h2>
                    <Separator />
                    <div className="space-y-6 text-[#2E2E2E] pt-6">
                        <Card className="p-6 border-[#CEE0F6] bg-white">
                            <h3 className="font-bold">What it’s for:</h3>
                            <h4>Announce funding rounds, investor partnerships, and capital growth milestones.</h4>
                            <h3 className="font-bold">What you can post:</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Seed, Pre-Series A, Series A/B/C funding announcements</li>
                                <li>Strategic investments or equity/debt raises</li>
                                <li>Angel investors or VCs onboarded</li>
                                <li>Valuation updates</li>
                                <li>Use of funds (team, product, marketing, etc.)</li>
                            </ul>
                            <h3 className="font-bold">Ideal for:</h3>
                            <h4>Startups looking to boost credibility and attract attention from press, talent, and more investors.</h4>
                        </Card>
                    </div>
                </section>

                {/* Step 2 */}
                <section className="mb-16">
                    <h2 className="text-2xl mb-2 font-bold text-[#0D0D0D] w-fit ">2. News </h2>
                    <Separator />
                    <div className="space-y-6 text-[#2E2E2E] pt-6">
                        <Card className="p-6 border-[#CEE0F6] bg-white">
                            <h3 className="font-bold">What it’s for:</h3>
                            <h4>Quick updates about your startup's activities or milestones.</h4>
                            <h3 className="font-bold">What you can post:</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Product launches</li>
                                <li>App releases or updates</li>
                                <li>New partnerships or collaborations</li>
                                <li>Expansion to new cities or countries</li>
                                <li>Major events, awards, or recognitions</li>
                            </ul>
                            <h3 className="font-bold">Ideal for:</h3>
                            <h4>Timely updates that build buzz or show growth momentum.</h4>
                        </Card>
                    </div>
                </section>

                {/* Step 3 */}
                <section className="mb-16">
                    <h2 className="text-2xl mb-2 font-bold text-[#0D0D0D] w-fit ">3. Market Trends </h2>
                    <Separator />
                    <div className="space-y-6 text-[#2E2E2E] pt-6">
                        <Card className="p-6 border-[#CEE0F6] bg-white">
                            <h3 className="font-bold">What it’s for:</h3>
                            <h4>Show your thought leadership and understanding of the market you’re in.</h4>
                            <h3 className="font-bold">What you can post:</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Industry-specific trends you&#39;re observing</li>
                                <li>User behavior shifts or new market demands</li>
                                <li>Competitive changes or emerging opportunities</li>
                                <li>Predictions for your sector</li>
                                <li>Insights based on internal data or customer feedback</li>
                            </ul>
                            <h3 className="font-bold">Ideal for:</h3>
                            <h4>Founders positioning themselves as experts or innovators in their space.</h4>
                        </Card>
                    </div>
                </section>

                {/* Step 4 */}
                <section className="mb-16">
                    <h2 className="text-2xl mb-2 font-bold text-[#0D0D0D] w-fit ">4. Founder Stories</h2>
                    <Separator />
                    <div className="space-y-6 text-[#2E2E2E] pt-6">
                        <Card className="p-6 border-[#CEE0F6] bg-white">
                            <h3 className="font-bold">What it’s for:</h3>
                            <h4>Sharing your entrepreneurial journey — real, raw, and inspiring.</h4>
                            <h3 className="font-bold">What you can post:</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Your startup origin story</li>
                                <li>Challenges and failures you faced</li>
                                <li>Angel investors or VCs onboarded</li>
                                <li>Key milestones or turning points</li>
                                <li>Personal philosophies or mindset tips</li>
                                <li>How you found co-founders or built your team</li>
                            </ul>
                            <h3 className="font-bold">Ideal for:</h3>
                            <h4>Building emotional connection and humanizing your brand.</h4>
                        </Card>
                    </div>
                </section>

                {/* Step 5 */}
                <section className="mb-16">
                    <h2 className="text-2xl mb-2 font-bold text-[#0D0D0D] w-fit ">5. In-Depth </h2>
                    <Separator />
                    <div className="space-y-6 text-[#2E2E2E] pt-6">
                        <Card className="p-6 border-[#CEE0F6] bg-white">
                            <h3 className="font-bold">What it’s for:</h3>
                            <h4>A deep dive into how your product or business works and why it matters.</h4>
                            <h3 className="font-bold">What you can post:</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>How your tech/product actually works (in layman’s terms)</li>
                                <li>About Your business or business model or GTM strategy</li>
                                <li>Screenshots, workflows, diagrams of your platform</li>
                                <li>Behind-the-scenes of building your product</li>
                                <li>Key use cases or problem-solving stories</li>
                            </ul>
                            <h3 className="font-bold">Ideal for:</h3>
                            <h4>Tech startups, SaaS products, or founders explaining complex solutions simply.</h4>
                        </Card>
                    </div>
                </section>

                {/* Step 6 */}
                <section className="mb-16">
                    <h2 className="text-2xl mb-2 font-bold text-[#0D0D0D] w-fit ">6. Finance</h2>
                    <Separator />
                    <div className="space-y-6 text-[#2E2E2E] pt-6">
                        <Card className="p-6 border-[#CEE0F6] bg-white">
                            <h3 className="font-bold">What it’s for:</h3>
                            <h4>Talk about your business model, financial performance, and unit economics.</h4>
                            <h3 className="font-bold">What you can post:</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Revenue growth (MRR/ARR)</li>
                                <li>Profitability journey</li>
                                <li>Key metrics: CAC, LTV, burn rate, gross margin</li>
                                <li>Cost-cutting or growth hacks</li>
                                <li>Forecasts and financial roadmaps</li>
                            </ul>
                            <h3 className="font-bold">Ideal for:</h3>
                            <h4>Transparent startups and scale-ups showing traction or operational maturity.</h4>
                        </Card>
                    </div>
                </section>

                {/* CTA */}
                <section className="text-center py-8">
                    <Button size="lg" className="bg-[#1C4BC6] hover:bg-[#0D3AAB] text-white">
                        <Link href="/start-up/create-post">Start Creating Your Post Now</Link>
                    </Button>
                </section>
            </div>
        </div>
    );
}