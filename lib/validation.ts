import { z } from "zod";
import { Gender, FundingStage, Industry, Registered, TeamSize, FundingType } from "@/constants";

// Helper function to preprocess strings
const preprocessString = (val: unknown) => typeof val === "string" ? val.trim() : val;

// Password validation helpers
const passwordValidation = {
  min8Chars: (val: string) => val.length >= 8,
  hasUpperCase: (val: string) => /[A-Z]/.test(val),
  hasLowerCase: (val: string) => /[a-z]/.test(val),
  hasNumber: (val: string) => /[0-9]/.test(val),
  hasSpecialChar: (val: string) => /[!@#$%^&*(),.?":{}|<>]/.test(val),
};

// Constants for validation
const genderOptions = Gender as [string, ...string[]];
const registeredOptions = Registered as [string, ...string[]];
const teamSizeOptions = TeamSize as [string, ...string[]];
const fundingTypeOptions = FundingType as [string, ...string[]];
const fundingStageNames = FundingStage.map(stage => stage.name);
const industryNames = Industry.map(industry => industry.name);

const FundingEntrySchema = z.object({
  fundingName: z.preprocess(
    preprocessString,
    z.string().min(1, "Venture/Investor name is required")
  ),
  fundingType: z.enum(fundingTypeOptions),
  fundingDate: z.date(),
  fundingAmount: z.preprocess(
    preprocessString,
    z.string().regex(/^\d+$/, "Must be a valid number")
  )
});

// Common validations
const emailValidation = z.preprocess(
  preprocessString,
  z.string().min(1, "Email is required").email("Please enter a valid email address")
);

const phoneValidation = z.preprocess(
  preprocessString,
  z.string()
    .min(1, "Phone number is required")
    .refine((phone) => /^\+\d{10,15}$/.test(phone), {
      message: "Please enter a valid phone number with country code (e.g. +1234567890)"
    })
  .optional()
);

const urlValidation = z.preprocess(
  preprocessString,
  z.string()
    .min(1, "URL is required")
    .url("Please enter a valid URL")
    .refine(url => url.startsWith("http://") || url.startsWith("https://"), {
      message: "URL must start with http:// or https://"
    })
);

export const RegisterFormValidation = z.object({
  // Authentication fields
  companyEmail: emailValidation,
  personalEmail: emailValidation,
  password: z.preprocess(
    preprocessString,
    z.string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters")
      .refine(passwordValidation.hasUpperCase, "Password must contain at least one uppercase letter")
      .refine(passwordValidation.hasLowerCase, "Password must contain at least one lowercase letter")
      .refine(passwordValidation.hasNumber, "Password must contain at least one number")
      .refine(passwordValidation.hasSpecialChar, "Password must contain at least one special character")
  ),
  confirmPassword: z.preprocess(
    preprocessString,
    z.string().min(1, "Please confirm your password")
  ),

  // Company registration fields
  registered: z.enum(registeredOptions),
  companyName: z.preprocess(
    preprocessString,
    z.string()
      .min(2, "Company name must be at least 2 characters")
      .max(50, "Company name must be at most 50 characters")
      .optional()
  ),
  personalName: z.preprocess(
    preprocessString,
    z.string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters")
  ),
  brandName: z.preprocess(
    preprocessString,
    z.string()
      .min(2, "Brand name must be at least 2 characters")
      .max(50, "Brand name must be at most 50 characters")
  ),
  establishedDate: z.coerce.date()
    .max(new Date(), "Established date cannot be in the future"),
  industry: z.string()
    .refine(val => industryNames.includes(val), {
      message: `Select from: ${industryNames.join(', ')}`
    }),
  teamSize: z.enum(teamSizeOptions),
  aboutCompany: z.preprocess(
    preprocessString,
    z.string()
      .max(600, "Description must be at most 600 characters")
  ),

  // File uploads
  companyLogo: z.custom<File[]>()
    .refine(files => files.length > 0, "Company logo is required")
    .refine(files => files.length <= 1, "You can upload only one file")
    .refine(files => !files.length || files[0].size <= 5 * 1024 * 1024, {
      message: "Max file size is 5MB"
    })
    .refine(files => !files.length || ['image/jpeg', 'image/png', 'image/webp'].includes(files[0].type), {
      message: "Only .jpg, .png, and .webp formats are supported"
    }),
  incorporationCertificate: z.custom<File[]>()
    .refine(files => files.length <= 1, "You can upload only one file")
    .refine(files => !files.length || files[0].size <= 10 * 1024 * 1024, {
      message: "Max file size is 10MB"
    })
    .refine(files => !files.length || ['application/pdf'].includes(files[0].type), {
      message: "Only .pdf format is supported"
    })
    .optional(),

  // Funding information
  fundingStage: z.string(),
  fundingEntries: z.array(FundingEntrySchema).optional(),

  // Personal information
  designation: z.preprocess(
    preprocessString,
    z.string()
      .min(2, "Designation must be at least 2 characters")
      .max(50, "Designation must be at most 50 characters")
  ),
  personalPhone: phoneValidation,
  birthDate: z.coerce.date()
    .max(new Date(), "Birth date cannot be in the future")
    .refine(date => {
      const today = new Date();
      const minDate = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      );
      return date <= minDate;
    }, "You must be at least 18 years old"),
  gender: z.enum(genderOptions, {
    errorMap: () => ({ message: `Please select a valid gender` })
  }),

  // Social links
  websiteUrl: urlValidation,
  androidLink: urlValidation.optional(),
  iosLink: urlValidation.optional(),
  linkedin: urlValidation
    .refine(url => url.includes("linkedin.com"), {
      message: "Please enter a valid LinkedIn URL"
    })
    .optional(),
  instagram: urlValidation
    .refine(url => url.includes("instagram.com"), {
      message: "Please enter a valid Instagram URL"
    })
    .optional(),
  x: urlValidation
    .refine(url => url.includes("x.com") || url.includes("twitter.com"), {
      message: "Please enter a valid X/Twitter URL"
    })
    .optional(),
  facebook: urlValidation
    .refine(url => url.includes("facebook.com"), {
      message: "Please enter a valid Facebook URL"
    })
    .optional(),

  // Terms acceptance
  privacyConsent: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" })
  })
})
.refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})
.superRefine((data, ctx) => {
  if (data.registered === "Yes" && !data.companyName) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Company name is required when registered",
      path: ["companyName"]
    });
  }
  if (data.personalEmail === data.companyEmail) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Personal email must be different from company email",
      path: ["personalEmail"]
    });
  }
  if (data.registered === "Yes" && (!data.incorporationCertificate || data.incorporationCertificate.length === 0)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Incorporation certificate is required for registered companies",
      path: ["incorporationCertificate"]
    });
  }
});

export const UserFormValidation = z.object({
  email: emailValidation,
  password: z.preprocess(
    preprocessString,
    z.string().min(1, "Password is required")
  )
});
