"use client";

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from "next/image";
import { convertFileToUrl } from "@/lib/utils";

type FileUploaderProps = {
    files: File[] | undefined,
    onChange: (files: File[]) => void,
    accept?: Record<string, string[]>,
}

const FileUploader = ({ files, onChange, accept }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        onChange(acceptedFiles);
    }, [onChange]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept,
    });

    const isImageFile = (file: File) => {
        return file.type.startsWith('image/');
    };

    return (
        <div {...getRootProps()} className="file-upload">
            <input {...getInputProps()} />
            {files && files?.length > 0 ? (
                <div className="flex flex-col items-center gap-2">
                    {isImageFile(files[0]) ? (
                        <Image
                            src={convertFileToUrl(files[0])}
                            alt="uploaded file"
                            width={500}
                            height={500}
                            className="max-h-[400px] overflow-hidden object-cover"
                        />
                    ) : (
                        <div className="flex items-center gap-2 p-2 rounded">
                            <span className="text-sm font-medium">{files[0].name}</span>
                        </div>
                    )}
                    <p className="text-xs text-gray-500">Click to replace or drag and drop</p>
                </div>
            ) : (
                <>
                    <Image
                        src="/icons/upload.svg"
                        alt="upload"
                        width={40}
                        height={40}
                    />
                    <div className="file-upload_label">
                        <p className="text-sm leading-4.5 font-normal">
                            <span className="text-primary-500">Click to upload</span> or drag and drop
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default FileUploader;