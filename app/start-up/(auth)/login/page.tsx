
import { LoginForm } from "@/components/LoginForm"
import Image from "next/image"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex h-screen max-h-screen bg-primary-200">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="patient"
              width={300}
              height={100}
              className="mb-12 h-10 w-fit"
            />
          </Link>
          <LoginForm />
          <div className="text-sm leading-4.5 font-normal mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2025 StartupVista
            </p>
            <div>
              Don&apos;t have an account?{" "}
              <Link href="/start-up/register" className="text-primary-500 font-bold hover:underline">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Image
        src="/images/login.png"
        alt="login"
        width={1000}
        height={1000}
        className="side-img max-w-[50%]"
        priority
      />
    </div>
  )
}
