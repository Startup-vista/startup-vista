export const Industry = [
    { name: "ClimateTech startups" },
    { name: "Agritech startups" },
    { name: "AI startups" },
    { name: "Automobile startups" },
    { name: "Health care" },
    { name: "Edtech" },
    { name: "Recruiting Company/Agency" },
    { name: "Production House" },
    { name: "Business Consultancy" },
    { name: "IT Service & Consulting" },
    { name: "FMCG" },
    { name: "Gaming" },
    { name: "Tech startups" },
    { name: "Cyber security startups" },
    { name: "Food & Drinks" },
    { name: "Fashion" },
    { name: "Beauty" },
    { name: "Logistics" },
    { name: "Grocery" },
    { name: "Fintech" },
    { name: "Traveltech" },
    { name: "Clean tech" },
    { name: "Enterprise tech" },
    { name: "Retail" },
    { name: "Consumer interest" },
    { name: "Ecommerce" },
    { name: "Entertainment" },
    { name: "Consulting" },
    { name: "Tech Service" },
    { name: "Web3" },
    { name: "Blockchain" },
    { name: "Legal service" },
    { name: "Financial Services" },
    { name: "Digital Marketing Services" },
    { name: "Marketing Services" },
    { name: "Social Media" }
];


export const FundingStage = [
    {
        image: "/icons/funding.png",
        name: "Bootstrapped",
    },
    {
        image: "/icons/funding.png",
        name: "Funding",
    }
];

export const Gender = ["Male", "Female", "Other"];

export const Registered = ["Yes","No"];

export const TeamSize = ["1-10","10-50","50-100","100+"];

export const FundingType = ["Pre seed", "Seed", "Early Stage", "Series A", "Series B", "Series C", "Series D"];

export const PostCategory = ["Funding","Finance", "Market Trends", "Founder Story", "In depth", "News"];

export const reportCategories = [
    {
        value: "incorrect-information",
        label: "Incorrect Information",
        description: "Article contains wrong facts, misleading claims, or false updates."
    },
    {
        value: "plagiarized-content",
        label: "Plagiarized Content",
        description: "Copied from other sources without credit or permission."
    },
    {
        value: "spam",
        label: "Spam or Irrelevant Content",
        description: "Posts that are promotional, irrelevant, or spammy."
    },
    {
        value: "offensive-content",
        label: "Offensive or Inappropriate Content",
        description: "Contains hate speech, discrimination, abusive language, or explicit material."
    },
    {
        value: "ip-violation",
        label: "Violation of Intellectual Property",
        description: "Unauthorized use of logos, brand names, copyrighted material, etc."
    },
    {
        value: "fake-news",
        label: "Misleading or Fake News",
        description: "Deliberately sharing fake funding announcements, fake trends, or false milestones."
    },
    {
        value: "personal-attack",
        label: "Personal Attack or Defamation",
        description: "Targeting an individual, company, or brand unfairly."
    },
    {
        value: "duplicate",
        label: "Duplicate Post",
        description: "Exact same article or content posted multiple times."
    },
    {
        value: "privacy-violation",
        label: "Security or Privacy Violation",
        description: "Sharing personal information without consent."
    },
    {
        value: "other",
        label: "Others (Please Specify)",
        description: "Any other issues not covered above — users can add their own reason."
    }
];

export interface User {
    uid: string;
    companyName: string;
    companyEmail: string;
    industry: string;
    isVerified: boolean;
    isPremium: boolean;
}