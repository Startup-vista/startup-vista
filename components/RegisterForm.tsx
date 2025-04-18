"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form, FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CustomFormField from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import { useState } from "react";
import { RegisterFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { FundingStage, FundingType, Gender, Industry, Registered, TeamSize } from "@/constants";
import { Label } from "@/components/ui/label";
import { SelectItem } from "@/components/ui/select";
import FileUploader from "@/components/FileUploader";
import { VerificationField } from "./VerificationField";
import { authService } from "@/services/authService";
import { toast } from "sonner";
import { PlusCircle, X } from "lucide-react";
import { Button } from "./ui/button";


export enum FormFieldType {
    INPUT = "input",
    TEXTAREA = "textarea",
    PHONE_INPUT = "phoneInput",
    CHECKBOX = "checkbox",
    DATE_PICKER = "datePicker",
    SELECT = "select",
    SKELETON = "skeleton",
    PWD = "password"
}

const RegisterForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [fundingEntries, setFundingEntries] = useState([0]);

    const form = useForm<z.infer<typeof RegisterFormValidation>>({
        resolver: zodResolver(RegisterFormValidation),
        defaultValues: {
            ...RegisterFormValidation,
            password: "",
            companyEmail: "",
            fundingEntries: [],
        },
    })

    async function onSubmit(values: z.infer<typeof RegisterFormValidation>) {
        setIsLoading(true);
        try {
            // Prepare the user data object
            const userData = {
                // Company Information
                companyEmail: values.companyEmail,
                companyName: values.registered === "Yes" ? values.companyName : null,
                registered: values.registered,
                brandName: values.brandName,
                establishedDate: values.establishedDate,
                industry: values.industry,
                teamSize: values.teamSize,
                fundingStage: values.fundingStage,
                aboutCompany: values.aboutCompany,

                // Personal Information
                personalEmail: values.personalEmail,
                designation: values.designation,
                personalPhone: values.personalPhone,
                personalName: values.personalName,
                birthDate: values.birthDate,
                gender: values.gender,

                // Social Links
                websiteUrl: values.websiteUrl,
                androidLink: values.androidLink,
                iosLink: values.iosLink,
                linkedin: values.linkedin,
                instagram: values.instagram,
                x: values.x,
                facebook: values.facebook,

                // System fields (will be merged by authService)
                isVerified: false, // Default false
                isPremium: false,  // Default false

                ...(values.fundingStage === "Funding" ? {
                    fundingEntries: values.fundingEntries
                  } : {
                    fundingEntries: undefined
                  })
            };

            // Prepare files for upload
            const files = {
                companyLogo: values.companyLogo[0],
                ...(values.registered === "Yes" && {
                    incorporationCertificate: values.incorporationCertificate?.[0]
                })
            };

            // Call the auth service
            await authService.signUp({
                email: values.companyEmail,
                password: values.password,
                userData,
                files
            });
            toast.success('Registration successful! Your account is pending verification.');
            form.reset();
            router.push('/');
        } catch (error) {
            console.error('Registration error:', error);
            toast.error(error instanceof Error ? error.message : 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1 p-5 rounded-xl">
                <section className="space-y-4">
                    <h1 className="header">Apply to create profile</h1>
                    <p className="text-text-800 text-lg">Let us know more about your brand</p>
                </section>

                <section className="space-y-4">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Company Information</h2>
                    </div>
                </section>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <VerificationField
                        control={form.control}
                        name="companyEmail"
                        label="Email*"
                        placeholder="Enter your email"
                        iconSrc="/icons/email.svg"
                        iconAlt="email"
                        onVerificationComplete={(verified) => setIsEmailVerified(verified)}
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.PWD}
                        control={form.control}
                        name="password"
                        label="Password*"
                        placeholder="Enter your password"
                        iconSrc="/icons/lock.svg"
                        iconAlt="lock"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="confirmPassword"
                        label="Confirm Password*"
                        placeholder="Confirm your password"
                        iconSrc="/icons/lock.svg"
                        iconAlt="lock"
                    />
                </div>
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.SKELETON}
                        control={form.control}
                        name="companyLogo"
                        label="Company Logo*"
                        renderSkeleton={(field) => (
                            <FormControl>
                                <FileUploader files={field.value} onChange={field.onChange} accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] }} />
                            </FormControl>
                        )}
                    />

                    <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        control={form.control}
                        name="registered"
                        label="Is your company registered ?*"
                        placeholder="Select your choice"
                    >
                        {Registered.map((choice) => (
                            <SelectItem key={choice} value={choice}>
                                <div className="flex cursor-pointer items-center gap-2">
                                    <p>{choice}</p>
                                </div>
                            </SelectItem>
                        ))}
                    </CustomFormField>
                </div>
                {form.watch("registered") === "Yes" && (
                    <div className="flex flex-col gap-6  xl:flex-row">
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name="companyName"
                            label="Company/LLP Name"
                            placeholder="Enter your Company/LLP name"
                        />
                        <CustomFormField
                            fieldType={FormFieldType.SKELETON}
                            control={form.control}
                            name="incorporationCertificate"
                            label="Certificate of incorporation"
                            renderSkeleton={(field) => (
                                <FormControl>
                                    <FileUploader files={field.value} onChange={field.onChange} accept={{ 'application/pdf': ['.pdf'] }} />
                                </FormControl>
                            )}
                        />
                    </div>
                )}
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="brandName"
                        label="Brand Name*"
                        placeholder="Enter your brand name"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.DATE_PICKER}
                        control={form.control}
                        name="establishedDate"
                        label="Established Date*"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        control={form.control}
                        name="industry"
                        label="Industry*"
                        placeholder="Select your industry"
                        iconSrc="/icons/box.svg"
                        iconAlt="industry"
                    >
                        {Industry.map((industry) => (
                            <SelectItem key={industry.name} value={industry.name}>
                                <div className="flex cursor-pointer items-center gap-2">
                                    <p>{industry.name}</p>
                                </div>
                            </SelectItem>
                        ))}
                    </CustomFormField>
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        control={form.control}
                        name="teamSize"
                        label="Team Size*"
                        placeholder="Select your team size"
                    >
                        {TeamSize.map((size) => (
                            <SelectItem key={size} value={size}>
                                <div className="flex cursor-pointer items-center gap-2">
                                    <p>{size}</p>
                                </div>
                            </SelectItem>
                        ))}
                    </CustomFormField>
                    <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        control={form.control}
                        name="fundingStage"
                        label="Funding Stage*"
                        placeholder="Select your funding stage"
                        iconSrc="/icons/rupee.svg"
                        iconAlt="rupee"
                    >
                        {FundingStage.map((industry) => (
                            <SelectItem key={industry.name} value={industry.name}>
                                <div className="flex cursor-pointer items-center gap-2">
                                    <p>{industry.name}</p>
                                </div>
                            </SelectItem>
                        ))}
                    </CustomFormField>
                </div>

                {form.watch("fundingStage") === "Funding" && (
                    <div className="space-y-6">
                        {fundingEntries.map((_, index) => (
                            <div key={index} className="space-y-4 border border-secondary-200 bg-primary-100 rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-medium">Funding Round {index + 1}</h4>
                                    {index > 0 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setFundingEntries(entries => entries.filter((_, i) => i !== index))}
                                            className="text-red-500 hover:text-red-700 cursor-pointer"
                                        >
                                            <X className="h-4 w-4 mr-1" />
                                            Remove
                                        </Button>
                                    )}
                                </div>

                                {/* First row */}
                                <div className="flex flex-col gap-6 xl:flex-row">
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        control={form.control}
                                        name={`fundingEntries.${index}.fundingName`}
                                        label="Venture/Investor name"
                                        placeholder="Enter your venture/investor name"
                                    />
                                    <CustomFormField
                                        fieldType={FormFieldType.SELECT}
                                        control={form.control}
                                        name={`fundingEntries.${index}.fundingType`}
                                        label="Funding Type"
                                        placeholder="Select your funding type"
                                    >
                                        {FundingType.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                <div className="flex cursor-pointer items-center gap-2">
                                                    <p>{type}</p>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </CustomFormField>
                                </div>

                                {/* Second row */}
                                <div className="flex flex-col gap-6 xl:flex-row">
                                    <CustomFormField
                                        fieldType={FormFieldType.DATE_PICKER}
                                        control={form.control}
                                        name={`fundingEntries.${index}.fundingDate`}
                                        label="Funding Date"
                                    />
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        control={form.control}
                                        name={`fundingEntries.${index}.fundingAmount`}
                                        label="Funding Amount"
                                        placeholder="Enter your funding amount"
                                    />
                                </div>
                            </div>
                        ))}

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setFundingEntries(entries => [...entries, entries.length])}
                            className="gap-2 cursor-pointer"
                        >
                            <PlusCircle className="h-4 w-4" />
                            Add Funding Round
                        </Button>
                    </div>
                )}

                <CustomFormField
                    fieldType={FormFieldType.TEXTAREA}
                    control={form.control}
                    name="aboutCompany"
                    label="About Company*"
                    placeholder="Let us know about your company (max. 600 characters)"
                />

                <section className="space-y-4">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Personal Information</h2>
                    </div>
                </section>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="personalName"
                        label="Name*"
                        placeholder="Enter your name"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="designation"
                        label="Designation*"
                        placeholder="Enter your designation"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="personalEmail"
                        label="Email*"
                        placeholder="Enter your email"
                        iconSrc="/icons/email.svg"
                        iconAlt="email"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.PHONE_INPUT}
                        control={form.control}
                        name="personalPhone"
                        label="Phone Number*"
                        placeholder="Enter your phone number"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.DATE_PICKER}
                        control={form.control}
                        name="birthDate"
                        label="Date of Birth*"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.SKELETON}
                        control={form.control}
                        name="gender"
                        label="Gender*"
                        renderSkeleton={(field) => (
                            <FormControl>
                                <RadioGroup
                                    className="flex h-11 gap-6 xl:justify-between"
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    {Gender.map((option, i) => (
                                        <div key={option + i} className="radio-group">
                                            <RadioGroupItem value={option} id={option} />
                                            <Label htmlFor={option} className="cursor-pointer">{option}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        )}
                    />
                </div>



                <section className="space-y-4">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Product Information & Social Links</h2>
                    </div>
                </section>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="websiteUrl"
                        label="Website URL*"
                        placeholder="Enter your website url"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="androidLink"
                        label="Android App"
                        placeholder="Enter your android app link"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="iosLink"
                        label="IOS App"
                        placeholder="Enter your ios app link"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="linkedin"
                        label="LinkedIn*"
                        placeholder="Enter your LinkedIn link"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="instagram"
                        label="Instagram"
                        placeholder="Enter your Instagram link"
                    />
                </div>
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="x"
                        label="X"
                        placeholder="Enter your X link"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="facebook"
                        label="FaceBook"
                        placeholder="Enter your FaceBook link"
                    />
                </div>

                <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name="privacyConsent"
                />
                <SubmitButton isLoading={isLoading} isEmailVerified={isEmailVerified}>Apply Now</SubmitButton>
            </form>
        </Form >
    );
}

export default RegisterForm;