"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/CustomFormField";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminSignupSchema } from "@/lib/validation";
import { toast } from "sonner";
import {createAdminUser} from "@/services/authService";
import {FormFieldType} from "@/components/RegisterForm";

export default function AdminSignup() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof adminSignupSchema>>({
        resolver: zodResolver(adminSignupSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            fullName: "",
        },
    });

    async function onSubmit(values: z.infer<typeof adminSignupSchema>) {
        setIsLoading(true);
        try {
            await createAdminUser({
                email: values.email,
                password: values.password,
                fullName: values.fullName,
            });

            toast.success("Admin account created successfully!");
            toast.info("Please wait for verification before accessing the dashboard");
            router.push("/admin/sign-in");
        } catch (error: any) {
            toast.error("Error creating admin account", {
                description: error.message,
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Sign Up</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Create an admin account (requires verification)
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <CustomFormField
                            control={form.control}
                            name="fullName"
                            label="Full Name"
                            placeholder="Enter your full name"
                            fieldType={FormFieldType.INPUT}
                        />

                        <CustomFormField
                            control={form.control}
                            name="email"
                            label="Email"
                            placeholder="Enter your email"
                            fieldType={FormFieldType.INPUT}
                        />

                        <CustomFormField
                            control={form.control}
                            name="password"
                            label="Password"
                            placeholder="Enter your password"
                            fieldType={FormFieldType.PWD}
                        />

                        <CustomFormField
                            control={form.control}
                            name="confirmPassword"
                            label="Confirm Password"
                            placeholder="Confirm your password"
                            fieldType={FormFieldType.PWD}
                        />

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Creating account..." : "Create Admin Account"}
                        </Button>
                    </form>
                </Form>

                <div className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Button
                        variant="link"
                        className="p-0 text-blue-600"
                        onClick={() => router.push("/admin/sign-in")}
                    >
                        Sign in
                    </Button>
                </div>
            </div>
        </div>
    );
}