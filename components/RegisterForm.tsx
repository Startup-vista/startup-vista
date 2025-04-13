"use client"

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
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof RegisterFormValidation>>({
        resolver: zodResolver(RegisterFormValidation),
        defaultValues: {
            ...RegisterFormValidation,
            password: "",
            email: "",
            phone: "",
        },
    })

    async function onSubmit(values: z.infer<typeof RegisterFormValidation>) {
        setIsLoading(true);

        setIsLoading(false);
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
                        label="Email"
                        placeholder="Enter your email"
                        iconSrc="/icons/email.svg"
                        iconAlt="email"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.PWD}
                        control={form.control}
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                        iconSrc="/icons/lock.svg"
                        iconAlt="lock"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="confirmPassword"
                        label="Confirm Password"
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
                        label="Company Logo"
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
                        label="Is your company registered ?"
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
                        label="Brand Name"
                        placeholder="Enter your brand name"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.DATE_PICKER}
                        control={form.control}
                        name="establishedDate"
                        label="Established Date"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        control={form.control}
                        name="industry"
                        label="Industry"
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
                        label="Team Size"
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
                        label="Funding Stage"
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
                    <>
                        <div className="flex flex-col gap-6 xl:flex-row">
                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                control={form.control}
                                name="fundingName"
                                label="Venture/Investor name"
                                placeholder="Enter your venture/investor name"
                            />
                            <CustomFormField
                                fieldType={FormFieldType.SELECT}
                                control={form.control}
                                name="fundingType"
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
                        <div className="flex flex-col gap-6 xl:flex-row">
                            <CustomFormField
                                fieldType={FormFieldType.DATE_PICKER}
                                control={form.control}
                                name="fundingDate"
                                label="Funding Date"
                            />
                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                control={form.control}
                                name="fundingAmount"
                                label="Funding Amount"
                                placeholder="Enter your funding amount"
                            />
                        </div>
                    </>
                )}

                <CustomFormField
                    fieldType={FormFieldType.TEXTAREA}
                    control={form.control}
                    name="aboutCompany"
                    label="About Company"
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
                        name="personalEmail"
                        label="Email"
                        placeholder="Enter your email"
                        iconSrc="/icons/email.svg"
                        iconAlt="email"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="designation"
                        label="Designation"
                        placeholder="Enter your designation"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.PHONE_INPUT}
                        control={form.control}
                        name="personalPhone"
                        label="Phone Number"
                        placeholder="Enter your phone number"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.DATE_PICKER}
                        control={form.control}
                        name="birthDate"
                        label="Date of Birth"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.SKELETON}
                        control={form.control}
                        name="gender"
                        label="Gender"
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
                        label="Website URL"
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
                        label="LinkedIn"
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
                <SubmitButton isLoading={isLoading}>Apply Now</SubmitButton>
            </form>
        </Form>
    );
}

export default RegisterForm;