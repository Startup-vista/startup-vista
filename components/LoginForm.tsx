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
import { authService } from "@/services/authService";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

export const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  async function onSubmit({ password, email }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    try {
      const { user, isVerified } = await authService.signIn(email, password);
      
      if (!isVerified) {
        setShowVerificationDialog(true);
        await authService.signOut(); // Sign out if not verified
        return;
      }

      // If verified, proceed to dashboard or wherever
      router.push("/");
      toast.success("Login successful!");

    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
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
              href="/forgot-password"
              className="ml-auto text-sm text-primary-500 underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          
          <SubmitButton isLoading={isLoading} isEmailVerified={true}>Log into your account</SubmitButton>
        </form>
      </Form>

      {/* Verification Alert Dialog */}
      <AlertDialog open={showVerificationDialog} onOpenChange={setShowVerificationDialog}>
        <AlertDialogContent className="bg-primary-100">
          <AlertDialogHeader>
            <AlertDialogTitle>Account Not Verified</AlertDialogTitle>
            <AlertDialogDescription>
              Your account is pending verification. Please wait for admin approval before logging in.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="cursor-pointer" 
              onClick={() => {
                setShowVerificationDialog(false);
                router.push("/");
              }}
            >
              Return to Home
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};