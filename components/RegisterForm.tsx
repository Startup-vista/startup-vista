"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {Form, FormControl} from "@/components/ui/form";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import CustomFormField from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import {useState} from "react";
import {RegisterFormValidation} from "@/lib/validation";
import {useRouter} from "next/navigation";
import {FundingStage,Gender,Industry} from "@/constants";
import {Label} from "@/components/ui/label";
import {SelectItem} from "@/components/ui/select";
import Image from "next/image";
import FileUploader from "@/components/FileUploader";

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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1 bg-white p-5 rounded-xl">
                <section className="space-y-4">
                    <h1 className="header">Create Your Account</h1>
                    <p className="text-text-800 text-lg">Please provide the required details</p>
                </section>

                <section className="space-y-4">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Personal Information</h2>
                    </div>
                </section>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="email"
                        label="Email"
                        placeholder="Enter your email"
                        iconSrc="/icons/email.svg"
                        iconAlt="email"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.PHONE_INPUT}
                        control={form.control}
                        name="phone"
                        label="Phone Number"
                        placeholder="Enter your phone number"
                    />

                    <CustomFormField
                    fieldType={FormFieldType.PWD}
                    control={form.control}
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    iconSrc="/icons/lock.svg"
                    iconAlt="user"
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
                                    {Gender.map((option,i) => (
                                        <div key={option+i} className="radio-group">
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
                        <h2 className="sub-header">Company Information</h2>
                    </div>
                </section>

                <CustomFormField
                    fieldType={FormFieldType.SKELETON}
                    control={form.control}
                    name="companyLogo"
                    label="Company Logo"
                    renderSkeleton={(field) => (
                        <FormControl>
                            <FileUploader files={field.value} onChange={field.onChange}/>
                        </FormControl>
                    )}
                />

                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="companyName"
                        label="Company Name"
                        placeholder="Enter your company name"
                        iconSrc="/icons/briefcase.svg"
                        iconAlt="name"
                    />

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.DATE_PICKER}
                        control={form.control}
                        name="foundingDate"
                        label="Founding Date"
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
                                    <Image
                                        src={industry.image}
                                        alt={industry.name}
                                        width={20}
                                        height={20}
                                        className="rounded-full border-0"
                                    />
                                    <p>{industry.name}</p>
                                </div>
                            </SelectItem>
                        ))}
                </CustomFormField>
                </div>

                <CustomFormField
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name="fundingStage"
                    label="Funding Stage"
                    placeholder="Select your funding stage"
                    iconSrc="/icons/dollar.svg"
                    iconAlt="industry"
                    >
                        {FundingStage.map((industry) => (
                            <SelectItem key={industry.name} value={industry.name}>
                                <div className="flex cursor-pointer items-center gap-2">
                                    <Image
                                        src={industry.image}
                                        alt={industry.name}
                                        width={20}
                                        height={20}
                                        className="border-0"
                                    />
                                    <p>{industry.name}</p>
                                </div>
                            </SelectItem>
                        ))}
                </CustomFormField>

            {form.watch("fundingStage") === "Funding" && (
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
                        iconSrc="/icons/rupee.svg"
                        iconAlt="funding"
                    />
                </div>
            )}

                <section className="space-y-4">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Product Information & Social Links</h2>
                    </div>
                </section>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="productUrl"
                        label="Product URL"
                        placeholder="Enter your product url"
                        iconSrc="/icons/link.png"
                        iconAlt="link"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="androidLink"
                        label="Android App"
                        placeholder="Enter your android app link"
                        iconSrc="/icons/android.svg"
                        iconAlt="android"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="iosLink"
                        label="IOS App"
                        placeholder="Enter your ios app link"
                        iconSrc="/icons/ios.svg"
                        iconAlt="ios"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="linkedin"
                        label="LinkedIn"
                        placeholder="Enter your LinkedIn link"
                        iconSrc="/icons/linkedin.svg"
                        iconAlt="linkedin"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="instagram"
                        label="Instagram"
                        placeholder="Enter your Instagram link"
                        iconSrc="/icons/instagram.svg"
                        iconAlt="instagram"
                    />
                </div>
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="x"
                        label="X"
                        placeholder="Enter your X link"
                        iconSrc="/icons/x.svg"
                        iconAlt="x"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="facebook"
                        label="FaceBook"
                        placeholder="Enter your FaceBook link"
                        iconSrc="/icons/meta.svg"
                        iconAlt="facebook"
                    />
                </div>

                <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name="privacyConsent"
                />
                <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
            </form>
        </Form>
    );
}

export default RegisterForm;