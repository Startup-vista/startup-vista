"use client";

import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from 'react-hook-form';

const formSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Please enter a valid email"),
  summary: z.string().trim().min(10, "Summary must be at least 10 characters"),
  explanation: z.string().trim().min(20, "Please provide more details"),
  isStartup: z.enum(["yes", "no"]),
  companyLink: z.string().trim().optional()
});

export default function ContactPage() {
  const faqsStartups = [
    {
      question: "What can I update after registering my startup?",
      answer: "After registration, you can add funding details, company registration verification (if not submitted earlier), and website/Android/iOS app links. These fields can only be updated once, so please double-check your information before submitting."
    },
    {
      question: "Can I edit my details later if needed?",
      answer: "Edits are restricted after submission. However, if you need to update any info, fill out the Contact Form with a summary mentioning 'Edit Request' and details explaining what you want to change and why. Our team will review your request."
    },
    {
      question: "How can I delete my startup profile?",
      answer: "To permanently delete your profile, please fill out the Contact Form with a summary saying 'Delete Account' and mention the reason for deletion. We'll verify and process the request."
    },
    {
      question: "How do I manage or delete an article/update I've posted?",
      answer: "Articles and posts can't be edited after publishing. To request deletion, fill the Contact Form with summary 'Delete Post' and mention which post and why you want to delete it."
    },
    {
      question: "I'm facing a technical issue — how can I get support?",
      answer: "Fill out the Contact Form with summary 'Technical Issue' and describe the bug or error you're experiencing. Our support team will respond within 24-48 hours."
    },
    {
      question: "⁠I have a suggestion or feedback — where can I share it?",
      answer: (
        <>
          We’d love to hear your ideas! Please fill the Contact Form by clicking{" "}
          <a 
            href="https://forms.gle/CRXNmyXu2T8dSUpQA" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#1C4BC6] hover:underline"
          >
            https://forms.gle/CRXNmyXu2T8dSUpQA
          </a>{" "}
          and share your suggestions in detail.
        </>
      )
    }
  ];

  const faqsUsers = [
    {
      question: "Do I need to sign up to view updates?",
      answer: "No. Anyone can freely browse startup profiles, funding news, and articles. Only startups need to sign in or register to post content."
    },
    {
      question: "How can I report a post or incorrect information?",
      answer: "Click the 'Report' button directly on the post or fill out the Contact Form with the link to the post and a brief reason for your report."
    },
    {
      question: "⁠I have a suggestion or feedback — where can I share it?",
      answer: (
        <>
          We welcome your thoughts! Just fill out {" "}
          <a 
            href="https://forms.gle/CRXNmyXu2T8dSUpQA" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#1C4BC6] hover:underline"
          >
            https://forms.gle/CRXNmyXu2T8dSUpQA
          </a>{" "}
          and write about your suggestion or experience.
        </>
      )
    }
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      summary: "",
      explanation: "",
      isStartup: "no",
      companyLink: ""
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle form submission
  }

  const isStartup = form.watch("isStartup") === "yes";

  return (
    <div className="min-h-screen bg-[#F0F7FC]">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="items-center justify-center w-fit mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-text-800">Contact Us</h1>
        </div>
        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#0D0D0D] w-fit border-b-5 border-[#1C4BC6]">FAQs for Startups&nbsp;&nbsp;&nbsp;</h2>
          <Separator />
          <Accordion type="single" collapsible className="w-full mb-12 pt-6">
            {faqsStartups.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left hover:no-underline cursor-pointer text-[#1C4BC6] font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#2E2E2E]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <h2 className="text-3xl font-bold text-[#0D0D0D] w-fit border-b-5 border-[#1C4BC6]">FAQs for Users/Viewers&nbsp;&nbsp;&nbsp;</h2>
          <Separator />
          <Accordion type="single" collapsible className="w-full pt-6">
            {faqsUsers.map((faq, index) => (
              <AccordionItem value={`user-item-${index}`} key={`user-${index}`}>
                <AccordionTrigger className="text-left hover:no-underline cursor-pointer text-[#1C4BC6] font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#2E2E2E]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Contact Form Section */}
        <section>
          <h2 className="text-3xl font-bold text-[#0D0D0D] w-fit border-b-5 border-[#1C4BC6]">Your Message</h2>
          <Separator />
          <Card className="p-6 border-[#CEE0F6] bg-white mt-12">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email*</FormLabel>
                        <FormControl>
                          <Input placeholder="Your email" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="summary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Summary*</FormLabel>
                      <FormControl>
                        <Input placeholder="Brief summary of your request" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="explanation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brief Explanation*</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Please explain your request in detail" 
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isStartup"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Are you contacting us as a startup?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="yes" />
                            </FormControl>
                            <FormLabel className="font-normal">Yes</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="no" />
                            </FormControl>
                            <FormLabel className="font-normal">No</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                {isStartup && (
                  <FormField
                    control={form.control}
                    name="companyLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Profile Link</FormLabel>
                        <FormControl>
                          <Input placeholder="Link to your company profile" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                )}

                <Button type="submit" className="w-full text-white cursor-pointer bg-[#1C4BC6] hover:bg-[#1a3fb0]">
                  Submit
                </Button>
              </form>
            </Form>
          </Card>
        </section>
      </div>
    </div>
  );
}