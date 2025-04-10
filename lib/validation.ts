import { z } from "zod";
import { Gender, FundingStage, Industry } from "@/constants";

const passwordValidation = {
  min8Chars: (val: string) => val.length >= 8,
  hasUpperCase: (val: string) => /[A-Z]/.test(val),
  hasLowerCase: (val: string) => /[a-z]/.test(val),
  hasNumber: (val: string) => /[0-9]/.test(val),
  hasSpecialChar: (val: string) => /[!@#$%^&*(),.?":{}|<>]/.test(val),
};

const genderOptions = Gender as [string, ...string[]];
const fundingStageNames = FundingStage.map(stage => stage.name);
const industryNames = Industry.map(industry => industry.name);

export const UserFormValidation = z.object({
  email: z.string().email("Invalid email address"),
  phone: z
      .string()
      .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  password: z.string()
});

export const RegisterFormValidation = z.object({
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .refine(passwordValidation.hasUpperCase, "Password must contain at least one uppercase letter")
    .refine(passwordValidation.hasLowerCase, "Password must contain at least one lowercase letter")
    .refine(passwordValidation.hasNumber, "Password must contain at least one number")
    .refine(passwordValidation.hasSpecialChar, "Password must contain at least one special character"),

  email: z.string().email("Please enter a valid email address"),
  
  phone: z.string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), {
      message: "Please enter a valid phone number with country code (e.g. +1234567890)"
    }),

  birthDate: z.coerce.date()
    .max(new Date(), "Birth date cannot be in the future")
    .refine(date => {
      const minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - 120);
      return date >= minDate;
    }, "Please enter a valid birth date"),

  foundingDate: z.coerce.date()
    .max(new Date(), "Founding date cannot be in the future"),

  fundingDate: z.coerce.date()
    .max(new Date(), "Funding date cannot be in the future")
    .optional(),

  gender: z.enum(genderOptions, {
    errorMap: () => ({ message: `Please select a valid gender`})
  }),

  companyName: z.string()
    .min(2, "Company name must be at least 2 characters")
    .max(50, "Company name must be at most 50 characters"),

    industry: z.string()
    .refine(val => industryNames.includes(val), {
      message: `Select from: ${industryNames.join(', ')}`
    }),

  productUrl: z.string()
    .url("Please enter a valid URL")
    .refine(url => url.startsWith("http://") || url.startsWith("https://"), {
      message: "URL must start with http:// or https://"
    }),

  androidLink: z.string()
    .url("Please enter a valid URL")
    .optional(),

  iosLink: z.string()
    .url("Please enter a valid URL")
    .optional(),

    fundingStage: z.string()
    .refine(val => fundingStageNames.includes(val), {
      message: `Select from: ${fundingStageNames.join(', ')}`
    }),

  fundingAmount: z.string()
    .refine(val => {
      if (!val) return true;
      return /^[0-9]+$/.test(val);
    }, {
      message: "Funding amount must be a positive number"
    })
    .optional(),

  linkedin: z.string()
    .url("Please enter a valid URL")
    .refine(url => url.includes("linkedin.com"), {
      message: "Please enter a valid LinkedIn URL"
    }),

  instagram: z.string()
    .url("Please enter a valid URL")
    .refine(url => url.includes("instagram.com"), {
      message: "Please enter a valid Instagram URL"
    })
    .optional(),

  x: z.string()
    .url("Please enter a valid URL")
    .refine(url => url.includes("x.com") || url.includes("twitter.com"), {
      message: "Please enter a valid X/Twitter URL"
    })
    .optional(),

  facebook: z.string()
    .url("Please enter a valid URL")
    .refine(url => url.includes("facebook.com"), {
      message: "Please enter a valid Facebook URL"
    })
    .optional(),

  companyLogo: z.custom<File[]>()
    .refine(files => files.length <= 1, "You can upload only one file")
    .refine(files => !files.length || files[0].size <= 5 * 1024 * 1024, {
      message: "Max file size is 5MB"
    })
    .refine(files => !files.length || ['image/jpeg', 'image/png', 'image/webp'].includes(files[0].type), {
      message: "Only .jpg, .png, and .webp formats are supported"
    })
    .optional(),

    incorporationCertificate: z.custom<File[]>()
    .refine(files => files.length <= 1, "You can upload only one file")
    .refine(files => !files.length || files[0].size <= 10 * 1024 * 1024, {
      message: "Max file size is 10MB"
    })
    .refine(files => !files.length || [
      'application/pdf',
    ].includes(files[0].type), {
      message: "Only .pdf format is supported"
    }),

  privacyConsent: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" })
  })
}).superRefine((data, ctx) => {
    if (data.fundingStage === "Funding") {
      if (!data.fundingDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Required when Funding stage selected",
          path: ["fundingDate"]
        });
      }
      if (!data.fundingAmount) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Required when Funding stage selected",
          path: ["fundingAmount"]
        });
      }
      if (data.fundingAmount && !/^[1-9][0-9]*$/.test(data.fundingAmount)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Must be positive number",
          path: ["fundingAmount"]
        });
      }
    }
  });