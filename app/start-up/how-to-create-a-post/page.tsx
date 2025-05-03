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
            <div className="flex items-center flex-center h-screen text-[#2e2e2e] gap-4 text-2xl font-bold">
                <Image
                    src="/icons/loader.svg"
                    alt="loader"
                    width={48}
                    height={48}
                    className="animate-spin"
                />
                Loading ...
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
                    <h1 className="text-3xl md:text-5xl font-bold text-text-800">🚀 Step-by-Step Guide to Create Articles for StartupVista</h1>
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
                                src="/images/chatgpt-login-example.jpg"
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
                                <li>Click on "New Chat"</li>
                                <li>This will open a fresh conversation where you can feed your data</li>
                            </ul>
                            <Image
                                src="/images/chatgpt-login-example.jpg"
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
                                src="/images/chatgpt-login-example.jpg"
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
                                <li>Drag and drop OR use "Upload File" in ChatGPT (bottom of the prompt bar)</li>
                                <li>After uploading, copy and paste this special prompt:</li>
                            </ul>
                            <div className="mt-4 p-4 bg-gray-800 text-white rounded-lg font-mono text-sm">
                                "Save all the information provided in this conversation as structured data, including company name, industry, description, and key details for future reference when creating articles."
                            </div>
                            <Image
                                src="/images/chatgpt-login-example.jpg"
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
                                src="/images/chatgpt-login-example.jpg"
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
                                src="/images/chatgpt-login-example.jpg"
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
                                "Using the information provided above, write a well-structured, engaging article under the category of [insert category]. The article should be SEO-friendly, approximately 800-1000 words, with an attention-grabbing headline, clear sections with subheadings, and a compelling conclusion. Include relevant statistics or examples where appropriate."
                            </div>
                            <Image
                                src="/images/chatgpt-login-example.jpg"
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
                            <Image
                                src="/images/chatgpt-login-example.jpg"
                                alt="ChatGPT Login Example"
                                width={600}
                                height={400}
                                className="mt-4 w-full rounded-lg border border-gray-200"
                            />
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
                        <Link href="/start-up/create-post">Start Creating Your Article Now</Link>
                    </Button>
                </section>
            </div>
        </div>
    );
}