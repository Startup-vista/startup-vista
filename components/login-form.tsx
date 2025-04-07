import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6 bg-white px-10 py-3", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <p className="text-text-800 text-sm text-balance">
        Welcome back ! Please Enter details
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Email" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input id="password" type="password" placeholder="Password" required />
            <a
              href="#"
              className="ml-auto text-sm text-primary-500 underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
        </div>
        <Button type="submit" className="w-full bg-primary-300 text-white">
          Login
        </Button>
      </div>
      <div className="text-center text-sm text-text-800">
        Don&apos;t have an account?{" "}
        <a href="#" className=" font-bold underline underline-offset-4">
          Sign up now
        </a>
      </div>
    </form>
  )
}
