import React from 'react';
import {Button} from "@/components/ui/button";
import Image from "next/image";

interface ButtonProps {
    isLoading: boolean,
    isEmailVerified: boolean,
    className?: string,
    children: React.ReactNode,
}

const SubmitButton = ({isLoading,isEmailVerified,className,children}: ButtonProps) => {
    return (
        <Button type="submit" disabled={!isEmailVerified || isLoading} className={className ?? "cursor-pointer shad-primary-btn w-full"}>
            {isLoading ? (
                <div className="flex items-center gap-4">
                    <Image
                        src="/icons/loader.svg"
                        alt="loader"
                        width={24}
                        height={24}
                        className="animate-spin"
                    />
                    Loading ...
                </div>
            ) : children }
        </Button>
    );
};

export default SubmitButton;