"use client";

import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Control } from "react-hook-form";
import { FormFieldType } from "@/components/RegisterForm";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css';
import { E164Number } from "libphonenumber-js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode,
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
    const { fieldType, placeholder, iconSrc, iconAlt, disabled, dateFormat, renderSkeleton } = props;

    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className="flex rounded-md border h-fit border-[#2E2E2E] bg-white">
                    {iconSrc && (
                        <Image
                            src={iconSrc}
                            alt={iconAlt || 'icon'}
                            height={20}
                            width={20}
                            className="ml-2 object-fit"
                        />
                    )}
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            disabled={props.disabled}
                            {...field}
                            className="shad-input border-0"
                        />
                    </FormControl>
                </div>
            )
        case FormFieldType.PWD:
            return (
                <div className="flex rounded-md border border-[#2E2E2E] bg-white">
                    {iconSrc && (
                        <Image
                            src={iconSrc}
                            alt={iconAlt || 'icon'}
                            height={20}
                            width={20}
                            className="ml-2 object-fit"
                        />
                    )}
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            type='password'
                            {...field}
                            className="shad-input border-0"
                        />
                    </FormControl>
                </div>
            )
        case FormFieldType.PHONE_INPUT:
            return (
                <PhoneInput
                    defaultCountry="IN"
                    placeholder={placeholder}
                    international
                    withCountryCallingCode
                    value={field.value as E164Number | undefined}
                    onChange={field.onChange}
                    className="input-phone"
                />
            );
        case FormFieldType.DATE_PICKER:
            return (
                <div className="flex rounded-md border bg-white">
                    <Image
                        src="/icons/calendar.svg"
                        width={20}
                        height={20}
                        alt="calendar"
                        className="ml-2"
                    />
                    <FormControl>
                        <DatePicker
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            showTimeSelect={false}
                            dateFormat={dateFormat ?? 'dd/MM/yyyy'}
                            placeholderText="DD/MM/YYYY"
                            wrapperClassName="date-picker bg-white w-full"
                        />
                    </FormControl>
                </div>
            );
        case FormFieldType.SKELETON:
            return renderSkeleton ? renderSkeleton(field) : null
        case FormFieldType.SELECT:
            return (
                <div className="flex rounded-md border h-fit border-[#2E2E2E] bg-white">
                    {iconSrc && (
                        <Image
                            src={iconSrc}
                            alt={iconAlt || 'icon'}
                            height={20}
                            width={20}
                            className="ml-2  object-fit"
                        />
                    )}
                    <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger className="shad-select-trigger cursor-pointer">
                                    <SelectValue placeholder={placeholder} />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent className="shad-select-content cursor-pointer">{props.children}</SelectContent>
                        </Select>
                    </FormControl>
                </div>
            );
        case FormFieldType.TEXTAREA:
            return (
                <FormControl>
                    <Textarea
                        placeholder={placeholder}
                        {...field}
                        className="shad-textArea"
                        disabled={props.disabled}
                    />
                </FormControl>
            );
        case FormFieldType.CHECKBOX:
            return (
                <FormControl>
                    <div className="flex items-center gap-4 text-text-800">
                        <Checkbox
                            id={props.name}
                            value={field.value}
                            onCheckedChange={field.onChange}
                        />
                        <label htmlFor={props.name} className="text-base font-medium cursor-pointer">
                            I acknowledge that I have reviewed the{" "}
                            <a
                                href="/terms-and-conditions"
                                className="text-primary-500 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()} // Prevent checkbox toggle when clicking link
                            >
                                terms and conditions
                            </a>{" "}
                            and agree to the{" "}
                            <a
                                href="/privacy-policy"
                                className="text-primary-500 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()} // Prevent checkbox toggle when clicking link
                            >
                                privacy policy
                            </a>
                        </label>
                    </div>
                </FormControl>
            );
        default:
            break;
    }
}

const CustomFormField = (props: CustomProps) => {
    const { control, fieldType, name, label } = props;

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1 flex flex-col">
                    {fieldType !== FormFieldType.CHECKBOX && label && (
                        <FormLabel>{label}</FormLabel>
                    )}
                    <div className="relative">
                        <RenderField field={field} props={props} />
                    </div>
                    <div className="min-h-[20px]">
                        <FormMessage className="text-xs text-red-500 empty:invisible" />
                    </div>
                </FormItem>
            )}
        />
    );
};

export default CustomFormField;