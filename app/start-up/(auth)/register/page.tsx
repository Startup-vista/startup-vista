import React from 'react';
import Image from "next/image";
import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Register = async () => {
    return (
        <div className="flex bg-primary-200 h-screen max-h-screen">
            <section className="remove-scrollbar container">
                <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
                    <Link href="/">
                        <div className="flex flex-row">
                            <Image
                                src="/images/logo.png"
                                alt="patient"
                                width={300}
                                height={100}
                                className="mb-12 h-10 w-fit"
                            />
                        </div>
                    </Link>
                    <RegisterForm />
                    <div className="text-end text-sm text-text-600 pr-5">
                            Already have an account?{" "}
                            <Link href="/start-up/login" className="text-primary-500 font-bold hover:underline">
                                Login
                            </Link>
                    </div>
                    {/* FAQ Section */}
                    <div className="mt-8 w-full">
                    <section>
                    <h2 className="text-xl font-bold text-[#0D0D0D] mb-6">Frequently Asked Questions</h2>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1" className="border-b border-secondary-200">
                                <AccordionTrigger className="text-text-800 cursor-pointer py-4">
                                    Why We Collect This Information
                                </AccordionTrigger>
                                <AccordionContent className="text-text-600 pb-4">
                                    We ask for company, personal, and product information to:
                                    <ul className="list-disc pl-6 mt-2 space-y-1">
                                        <li>Verify you're a legitimate startup or business</li>
                                        <li>Showcase your achievements and offerings on StartupVista</li>
                                        <li>Connect you with investors and industry leaders (future feature)</li>
                                        <li>Maintain the quality, trust, and security of our platform</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2" className="border-b border-secondary-200">
                                <AccordionTrigger className="text-text-800 cursor-pointer py-4">
                                    Data Usage & Privacy
                                </AccordionTrigger>
                                <AccordionContent className="text-text-600 pb-4">
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>Your data is secure and never sold</li>
                                        <li>You control your profile visibility and shared details</li>
                                        <li>Some data (e.g., funding info, social links) enhances your discoverability</li>
                                        <li>Learn more in our <Link href="/privacy-policy" className="text-primary-500 hover:underline">Privacy Policy</Link> and <Link href="/terms-and-conditions" className="text-primary-500 hover:underline">Terms & Conditions</Link></li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        </section>
                    </div>

                    <div className='flex flex-row justify-between mt-4'>
                        <p className="copyright text-text-600 py-4">
                            © 2025 StartupVista
                        </p>
                    </div>
                </div>
            </section>
            <Image
                src="/images/register.png"
                alt="patient"
                width={1000}
                height={1000}
                className="side-img max-w-[390px]"
            />
        </div>
    );
};

export default Register;