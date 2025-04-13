"use client";

import Link from "next/link"
import { Form } from "./ui/form"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormValidation } from "@/lib/validation";
import CustomFormField from "./CustomFormField";
import { FormFieldType } from "./RegisterForm";
import SubmitButton from "./SubmitButton";

export const LoginForm = () => {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      password: "",
      email: "",
      phone: "",
    },
  })

  async function onSubmit({ password, email, phone }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    setIsLoading(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-text-800">Please enter details to log into your account</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="Enter your email"
          iconSrc="/icons/email.svg"
          iconAlt="email"
        />
        <div className="grid gap-3">
          <CustomFormField
            fieldType={FormFieldType.PWD}
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
            iconSrc="/icons/lock.svg"
            iconAlt="lock"
          />
          <Link
            href="/start-up/forgot-password"
            className="ml-auto text-sm text-primary-500 underline-offset-4 hover:underline"
          >
            Forgot your password?
          </Link>
        </div>
        <SubmitButton isLoading={isLoading}>Log into your account</SubmitButton>
      </form>
    </Form>
  )
}
