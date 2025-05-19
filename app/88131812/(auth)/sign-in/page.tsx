"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/CustomFormField";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminLoginSchema } from "@/lib/validation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { toast } from "sonner";
import {checkAdminVerificationStatus} from "@/services/authService";
import {FormFieldType} from "@/components/RegisterForm";


export default function AdminLogin() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof adminLoginSchema>>({
        resolver: zodResolver(adminLoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof adminLoginSchema>) {
        setIsLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );

            const isVerified = await checkAdminVerificationStatus(userCredential.user.uid);

            if (!isVerified) {
                await auth.signOut();
                throw new Error("Your admin account is not yet verified");
            }

            router.push("/88131812/dashboard");
        } catch (error: any) {
            toast.error("Login failed", {
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
                    <h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Access the admin dashboard
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

                        <Button type="submit" className="w-full cursor-pointer bg-primary-500 text-white" disabled={isLoading}>
                            {isLoading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
