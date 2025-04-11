import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';

export default function AboutPage() {
  const faqs = [
    {
      question: "What is StartupVista?",
      answer: "StartupVista is a platform designed to help startups and growing businesses share their updates, achievements, funding news, market insights, and more. Our goal is to increase visibility and build trust between startups and the broader ecosystem, including investors and the public."
    },
    {
      question: "Who can join StartupVista?",
      answer: "Only legitimate startups and businesses are eligible to apply. You must submit relevant business and personal information, and our team will review and verify your details before approval."
    },
    {
      question: "What kind of content can I post?",
      answer: "You can post verified and valuable updates such as: • Company milestones and achievements • Product launches or improvements • Funding rounds and investor news • Market insights, trends, and industry thought pieces"
    },
    {
      question: "How does the approval process work?",
      answer: "Once you submit your application, our team manually reviews your business details, certificates (if registered), and content eligibility. If approved, you'll gain full access to post and engage with our platform."
    },
    {
      question: "Is StartupVista free to use?",
      answer: "Currently, yes — registration and usage are free for startups. We may introduce premium features or investor access subscriptions in the future, but core visibility features will remain accessible."
    },
    {
      question: "Will my startup data be shared with others?",
      answer: "Only public-facing business details and content you choose to publish will be visible. Sensitive data (like contact details or incorporation docs) remains private unless explicitly shared for features like investor subscriptions."
    },
    {
      question: "Can investors access our startup data?",
      answer: "In future subscription models, verified investors may gain access to selected startup data to analyze potential opportunities. This will always be permission-based and transparent."
    },
    {
      question: "How do I edit or delete my company profile?",
      answer: "You can request updates or deletions anytime by contacting our support team. We're committed to giving you full control over your profile and data."
    },
    {
      question: "Is content moderated?",
      answer: "Yes. All content is subject to our Content Guidelines and Community Standards. We maintain a professional, respectful space, and any violations may lead to content removal or account suspension."
    },
    {
      question: "How can I contact StartupVista?",
      answer: "You can reach out to us at: [Insert contact email or form link]. We're always here to support startups and answer questions!"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F0F7FC]">
      {/* Hero Section */}
      <div className="w-full h-1/10">
        <Image
          src="/images/about.png"
          alt="StartupVista About"
          width={2000}
          height={2000}
          className="object-cover w-full"
          priority
        />
      </div>
      

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Our Story Section */}
        <section className="mb-16 pt-12">
          <h2 className="text-3xl font-bold text-[#0D0D0D] w-fit border-b-5 border-[#1C4BC6]">Why We Started StartupVista &nbsp;&nbsp;&nbsp;</h2>
          <Separator />
          <div className="space-y-6 text-[#2E2E2E] pt-12">
            <p>
              Every great company starts with a challenge—and ours was simple:
            </p>
            <p className="font-bold text-[#1C4BC6]">
              Startups were doing amazing things, but no one knew about them.
            </p>
            <p>
              While working closely with early-stage founders and startup teams, we realized that many were building impactful products, raising funds, and making big moves—but their stories rarely reached the people who mattered: customers, media, partners, and especially investors.
            </p>
            <p>
              The traditional media spotlight was limited. Social media was noisy and fleeting. And unless you were already well-funded or famous, your startup's milestones often went unnoticed.
            </p>
            <p>
              So, we created StartupVista — a platform that lets startups showcase their journey, achievements, and vision, in their own words, to the right audience. A place where updates turn into visibility, visibility turns into trust, and trust opens doors to growth.
            </p>
          </div>
        </section>

        {/* Our Purpose Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#0D0D0D] w-fit border-b-5 border-[#1C4BC6]">Our Purpose &nbsp;&nbsp;&nbsp;</h2>
          <Separator />
          <div className="space-y-6 text-[#2E2E2E] pt-12">
            <p>
              To empower startups by giving them a credible, centralized platform to tell their story, build visibility, and connect with the world.
            </p>
            <p>
              We believe that every milestone—from your first MVP to your next funding round—deserves recognition.
            </p>
            <p className="font-semibold">
              StartupVista is built to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Help startups share meaningful updates: achievements, product launches, partnerships, funding news, and more</li>
              <li>Give founders a trusted voice beyond social noise</li>
              <li>Offer a discovery tool for investors and ecosystem partners</li>
              <li>Foster a community that values transparency, innovation, and long-term impact</li>
            </ul>
          </div>
        </section>

        {/* Our Promise Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#0D0D0D] w-fit border-b-5 border-[#1C4BC6]">Our Promise &nbsp;&nbsp;&nbsp;</h2>
          <Separator />
          <div className="space-y-6 pt-12">
            <Card className="p-6 border-[#CEE0F6] bg-white">
              <h3 className="text-xl font-bold text-[#1C4BC6] mb-3">✅ Curated & Verified</h3>
              <p className="text-[#2E2E2E]">We manually review each startup to ensure credibility and authenticity</p>
            </Card>
            <Card className="p-6 border-[#CEE0F6] bg-white">
              <h3 className="text-xl font-bold text-[#1C4BC6] mb-3">🔒 Privacy First</h3>
              <p className="text-[#2E2E2E]">Your data is safe, and your stories are yours to own and share</p>
            </Card>
            <Card className="p-6 border-[#CEE0F6] bg-white">
              <h3 className="text-xl font-bold text-[#1C4BC6] mb-3">📢 Founder-First Platform</h3>
              <p className="text-[#2E2E2E]">We're here to amplify your journey, not exploit it</p>
            </Card>
            <Card className="p-6 border-[#CEE0F6] bg-white">
              <h3 className="text-xl font-bold text-[#1C4BC6] mb-3">📈 Built for Impact</h3>
              <p className="text-[#2E2E2E]">Whether you're bootstrapped or backed, you deserve to be seen</p>
            </Card>
          </div>
          <p className="mt-6 text-[#243799] font-bold">
            StartupVista is more than a product. It's a belief—that your startup story is worth telling, and we're here to help you tell it well.
          </p>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-3xl font-bold text-[#0D0D0D] mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left hover:no-underline text-[#1C4BC6] font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#2E2E2E]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </div>
  );
}