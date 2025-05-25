"use client";

import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "@/firebase";
import {doc, getDoc} from "firebase/firestore";
import {useRouter} from "next/navigation";

export default function ArticleGuidePage() {
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
                    <h1 className="text-3xl md:text-5xl font-bold text-text-800">Step-by-Step Guide to Create Articles for StartupVista</h1>
                </div>

                {/* Introduction */}
                <section className="mb-16">
                    <h2 className="text-2xl mb-2 font-bold text-[#0D0D0D] w-fit ">Getting Started </h2>
                    <Separator />
                    <div className="space-y-6 text-[#2E2E2E] pt-6">
                        <p>
                            This guide will walk you through creating professional, engaging articles using ChatGPT that are ready to publish on StartupVista.
                        </p>
                    </div>
                </section>

                {/* Step 1 */}
                <section className="mb-16">
                    <h2 className="text-2xl mb-2 font-bold text-[#0D0D0D] w-fit">1️⃣ Login or Create an Account in ChatGPT </h2>
                    <Separator />
                    <div className="space-y-6 text-[#2E2E2E] pt-6">
                        <Card className="p-6 border-[#CEE0F6] bg-white">
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Open  <Button variant="link" className="p-0 h-auto text-blue-600 underline" asChild>
                                    <Link href="https://chatgpt.com/" target="_blank">ChatGPT</Link>
                                </Button></li>
                                <li>Sign up or log in with your email ID or Google account</li>
                            </ul>
                            <Image
                                src="/images/article-guide-1.png"
                                alt="ChatGPT Login Example"
                                width={600}
                                height={400}
                                className="mt-4 w-full rounded-lg border border-gray-200"
                            />
                        </Card>
                    </div>
                </section>

                {/* Step 2 */}
                <section className="mb-16">
                    <h2 className="text-2xl mb-2 font-bold text-[#0D0D0D] w-fit ">2️⃣ Start a New Chat </h2>
                    <Separator />
                    <div className="space-y-6 text-[#2E2E2E] pt-6">
                        <Card className="p-6 border-[#CEE0F6] bg-white">
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Click on &#34;New Chat&#34;</li>
                                <li>This will open a fresh conversation where you can feed your data</li>
                            </ul>
                            <Image
                                src="/images/article-guide-2.png"
                                alt="ChatGPT Login Example"
                                width={600}
                                height={400}
                                className="mt-4 w-full rounded-lg border border-gray-200"
                            />
                        </Card>
                    </div>
                </section>

                {/* Step 3 */}
                <section className="mb-16">
                    <h2 className="text-2xl mb-2 font-bold text-[#0D0D0D] w-fit ">3️⃣ Upload the Company Overview Information </h2>
                    <Separator />
                    <div className="space-y-6 text-[#2E2E2E] pt-6">
                        <Card className="p-6 border-[#CEE0F6] bg-white">
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Open the <Button variant="link" className="p-0 h-auto text-blue-600 underline" asChild>
                                    <Link href="/documents/company-overview-questions.docx">Company Overview questions</Link>
                                </Button></li>
                                <li>Answer all the questions honestly and clearly</li>
                                <li>Once done, save it as a document (Word or PDF)</li>
                            </ul>
                            <Image
                                src="/images/article-guide-3.png"
                                alt="ChatGPT Login Example"
                                width={600}
                                height={400}
                                className="mt-4 w-full rounded-lg border border-gray-200"
                            />
                        </Card>
                    </div>
                </section>

                {/* Step 4 */}
                <section className="mb-16">
                    <h2 className="text-2xl mb-2 font-bold text-[#0D0D0D] w-fit ">4️⃣ Upload to ChatGPT </h2>
                    <Separator />
                    <div className="space-y-6 text-[#2E2E2E] pt-6">
                        <Card className="p-6 border-[#CEE0F6] bg-white">
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Drag and drop OR use &#34;Upload File&#34; in ChatGPT (bottom of the prompt bar)</li>
                                <li>After uploading, copy and paste this special prompt:</li>
                            </ul>
                            <div className="mt-4 p-4 bg-gray-800 text-white rounded-lg font-mono text-sm">
                                &#34;Save all the information provided in this conversation as structured data, including:
                                •	Company basics (name, founding date, mission).
                                •	Founder background and story highlights.
                                •	Product details, tech stack, and competitive advantages.
                                •	Traction metrics, funding, and market positioning.
                                For future requests, use this saved data to:
                                1.	Auto-generate articles in any requested format (news, deep-dive, founder profile, etc.).
                                2.	Maintain consistency: Reuse facts/quotes without repetition.
                                3.	Adapt to tone/style: Apply journalistic, analytical, or inspirational tones on demand.
                                4.	Optimize for SEO: Naturally integrate keywords like [Company Name], [Industry], [Founder Name], and [Core Product USP].
                                Next time I ask, start with:
                                I recall [Company Name] is a [Industry] startup solving [Problem]. Need an article? Specify:
                                •	Type (e.g., funding announcement, founder interview).
                                •	Tone (e.g., professional, storytelling).
                                •	Focus (e.g., tech innovation, market trends).
                                •	Word count (e.g., 500-800 words).
                                I’ll draft a unique, fact-checked piece using saved details.&#34;
                            </div>
                            <Image
                                src="/images/article-guide-4.png"
                                alt="ChatGPT Login Example"
                                width={600}
                                height={400}
                                className="mt-4 w-full rounded-lg border border-gray-200"
                            />
                        </Card>
                    </div>
                </section>

                {/* Step 5 */}
                <section className="mb-16">
                    <h2 className="text-2xl mb-2 font-bold text-[#0D0D0D] w-fit ">5️⃣ Select Your Article Type </h2>
                    <Separator />
                    <div className="space-y-6 text-[#2E2E2E] pt-6">
                        <Card className="p-6 border-[#CEE0F6] bg-white">
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Now open <Button variant="link" className="p-0 h-auto text-blue-600 underline" asChild>
                                    <Link href="/documents/article-type-questions.docx">Article Type & Questions</Link>
                                </Button></li>
                                <li>Decide what kind of article you want to create:</li>
                            </ul>
                            <div className="mt-4 grid grid-cols-2 gap-2">
                                {['Funding', 'Finance', 'Market Trends', 'Founder Story', 'In-Depth Analysis', 'News'].map((type) => (
                                    <div key={type} className="p-3 border border-blue-200 rounded-lg bg-blue-50">
                                        {type}
                                    </div>
                                ))}
                            </div>
                            <Image
                                src="/images/article-guide-5.png"
                                alt="ChatGPT Login Example"
                                width={600}
                                height={400}
                                className="mt-4 w-full rounded-lg border border-gray-200"
                            />
                        </Card>
                    </div>
                </section>

                {/* Step 6 */}
                <section className="mb-16">
                    <h2 className="text-2xl mb-2 font-bold text-[#0D0D0D] w-fit ">6️⃣ Answer the Article Questions </h2>
                    <Separator />
                    <div className="space-y-6 text-[#2E2E2E] pt-6">
                        <Card className="p-6 border-[#CEE0F6] bg-white">
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Copy the questions of your chosen article type</li>
                                <li>Create a new document and answer those questions in detail</li>
                                <li>Example: If you chose Funding, answer funding-related questions</li>
                            </ul>
                            <Image
                                src="/images/article-guide-6.png"
                                alt="ChatGPT Login Example"
                                width={600}
                                height={400}
                                className="mt-4 w-full rounded-lg border border-gray-200"
                            />
                        </Card>
                    </div>
                </section>

                {/* Step 7 */}
                <section className="mb-16">
                    <h2 className="text-2xl mb-2 font-bold text-[#0D0D0D] w-fit ">7️⃣ Generate the Article </h2>
                    <Separator />
                    <div className="space-y-6 text-[#2E2E2E] pt-6">
                        <Card className="p-6 border-[#CEE0F6] bg-white">
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Copy all your answers and paste them into ChatGPT</li>
                                <li>Then paste this article-generation prompt:</li>
                            </ul>
                            <div className="mt-4 p-4 bg-gray-800 text-white rounded-lg font-mono text-sm">
                                &#34;Using the information provided above, write a well-structured, engaging article under the category of [insert category: Funding / Finance / Market Trends / Founder Story / In-Depth / Daily News].
                                Ensure the tone matches [insert tone: journalistic, analytical, conversational, inspiring, etc.], and cover all the important aspects including key facts, quotes, and context. Start with a compelling introduction or hook, and conclude with relevant insights, implications, or future outlook & Give me hooked tittle & summary of 2 lines as well.
                                Keep it between [insert word count: 500-800 / 800-1200 words] and make sure it&#39;s informative, fact-checked, and ready for publication.&#34;
                                Optional Add-ons (You can toggle in your form):
                                •	“Include bullet points or key takeaways at the end.”
                                •	“Add a summary paragraph at the beginning.”
                                •	“Make it SEO-friendly with keywords like [insert keywords].”
                                •	“Write in a first-person/third-person narrative depending on context.”
                            </div>
                            <Image
                                src="/images/article-guide-7.png"
                                alt="ChatGPT Login Example"
                                width={600}
                                height={400}
                                className="mt-4 w-full rounded-lg border border-gray-200"
                            />
                        </Card>
                    </div>
                </section>

                {/* Step 8 */}
                <section className="mb-16">
                    <h2 className="text-2xl mb-2 font-bold text-[#0D0D0D] w-fit ">8️⃣ Final Steps: Publishing </h2>
                    <Separator />
                    <div className="space-y-6 text-[#2E2E2E] pt-6">
                        <Card className="p-6 border-[#CEE0F6] bg-white">
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Review and copy the generated article</li>
                                <li>Create visuals if needed (for social media or StartupVista images)</li>
                                <li>Post your article on StartupVista</li>
                            </ul>
                        </Card>
                    </div>
                </section>

                {/* Bonus Tips */}
                <section className="mb-16">
                    <h2 className="text-2xl mb-2 font-bold text-[#0D0D0D] w-fit ">✨ Bonus Tips </h2>
                    <Separator />
                    <div className="space-y-6 text-[#2E2E2E] pt-6">
                        <Card className="p-6 border-[#CEE0F6] bg-white">
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Modify prompts to match your desired tone (casual, journalistic, etc.)</li>
                                <li>Always verify critical data before publishing</li>
                                <li>Add links or images for richer storytelling</li>
                                {/*<li>Use the <Button variant="link" className="p-0 h-auto text-blue-600 underline" asChild>*/}
                                {/*    <Link href="/start-up/article-templates">article templates</Link>*/}
                                {/*</Button> for consistent formatting</li>*/}
                            </ul>
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