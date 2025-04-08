import React from 'react';
import Image from "next/image";
import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";

const Register = async () => {
    return (
        <div className="flex bg-primary-200 h-screen max-h-screen">
            <section className="remove-scrollbar container">
                <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
                    <Link href="/">
                        <div className="flex flex-row">
                            <Image
                                src="/images/logo.png"
                                alt="patient"
                                width={300}
                                height={100}
                                className="mb-12 h-10 w-fit"
                            />
                        </div>
                    </Link>
                    <RegisterForm />
                    <div className='flex flex-row justify-between'>
                        <p className="copyright text-text-800  py-12">
                            © 2025 StartupVista
                        </p>
                        <div className="text-center text-base text-text-800 py-12">
                            Already have an account?{" "}
                            <Link href="/start-up/login" className="text-primary-500 font-bold hover:underline">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <Image
                src="/images/login.png"
                alt="patient"
                width={1000}
                height={1000}
                className="side-img max-w-[390px]"
            />
        </div>
    );
};

export default Register;