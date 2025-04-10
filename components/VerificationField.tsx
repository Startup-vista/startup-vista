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

export const VerificationField = ({
  name,
  label,
  control,
  placeholder,
  iconSrc,
  iconAlt,
  fieldType = FormFieldType.INPUT
}: {
  name: string;
  label: string;
  control: any;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  fieldType?: FormFieldType;
}) => {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = () => {
    setOpen(true);
  };

  const handleSubmitCode = async () => {
    setIsLoading(true);
    try {
      // Simulate verification API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsVerified(true);
      setOpen(false);
    } catch (error) {
      console.error("Verification failed:", error);
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
      />

      <Button
        type="button"
        variant={isVerified ? "outline" : "ghost"}
        size="sm"
        className="mb-1 h-9 min-w-[90px] text-primary-500 cursor-pointer data-[disabled]:opacity-100 data-[disabled]:text-primary-500"
        onClick={handleVerify}
        disabled={isVerified}
      >
        {isVerified ? (
          <span className="flex items-center gap-1">
            <Check className="w-4 h-4" /> Verified
          </span>
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