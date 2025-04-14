import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { FormFieldType } from "./RegisterForm";
import { useState } from "react";
import CustomFormField from "./CustomFormField";
import { Check } from "lucide-react";
import { useFormContext } from "react-hook-form";
import {toast} from "sonner";

// Add this to your existing VerificationField props
interface VerificationFieldProps {
  name: string;
  label: string;
  control: any;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  fieldType?: FormFieldType;
  onVerificationComplete?: (isVerified: boolean) => void;
}

export const VerificationField = ({
  name,
  label,
  control,
  placeholder,
  iconSrc,
  iconAlt,
  fieldType = FormFieldType.INPUT,
  onVerificationComplete
}: VerificationFieldProps) => {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [error, setError] = useState("");
  const { getValues } = useFormContext();

  const handleVerify = async () => {
    const email = getValues(name);
    if (!email) {
      toast.error(`Please enter your ${label.toLowerCase()} first`);
      return;
    }

    try {
      setSendingOtp(true);
      setError("");
      
      const response = await fetch("/api/email-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          action: "generate",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send verification code");
      }

      setOpen(true);
      toast.success(`Verification code sent to ${email}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send verification code");
      toast.error("Failed to send verification code");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleSubmitCode = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      const email = getValues(name);
      
      const response = await fetch("/api/email-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code,
          action: "verify",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Verification failed");
      }
      
      setIsVerified(true);
      setOpen(false);
      onVerificationComplete?.(true);
      toast.success("Your email has been successfully verified");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
      toast.error("Verification failed");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex items-end gap-2 w-full flex-1">
      <CustomFormField
        fieldType={fieldType}
        control={control}
        name={name}
        label={label}
        placeholder={placeholder}
        iconSrc={iconSrc}
        iconAlt={iconAlt}
        disabled={isVerified}
      />

      <Button
        type="button"
        variant={isVerified ? "outline" : "ghost"}
        size="sm"
        className="mb-8 h-9 min-w-[90px] text-base text-primary-500 cursor-pointer data-[disabled]:opacity-100 data-[disabled]:text-primary-500"
        onClick={handleVerify}
        disabled={isVerified || sendingOtp}
      >
        {isVerified ? (
          <span className="flex items-center gap-1">
            <Check className="w-4 h-4" /> Verified
          </span>
        ) : sendingOtp ? (
          "Sending..."
        ) : (
          "Verify"
        )}
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="bg-primary-200 text-text-800">
          <AlertDialogHeader>
            <AlertDialogTitle>Verify Your {label}</AlertDialogTitle>
            <AlertDialogDescription>
              We've sent a 6-digit verification code to your {label.toLowerCase()}. Please enter it below.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter verification code"
              type="number"
              className="shad-input [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
            <Button
              onClick={handleSubmitCode}
              variant="default"
              className="cursor-pointer text-white bg-primary-500"
            >
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};