"use client";

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from "next/image";
import { convertFileToUrl } from "@/lib/utils";

type FileType = 'logo' | 'image' | 'document';

type FileUploaderProps = {
    files: File[] | undefined;
    onChange: (files: File[]) => void;
    accept?: Record<string, string[]>;
    fileType: FileType;
};

const FileUploader = ({ files, onChange, accept, fileType }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        onChange(acceptedFiles.slice(0, 1)); // Only allow one file
    }, [onChange]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept,
        maxFiles: 1,
    });

    const getFilePreview = () => {
        if (!files || files.length === 0) return null;

        const file = files[0];
        const fileUrl = convertFileToUrl(file);

        switch (fileType) {
            case 'logo':
                return (
                    <div className="flex flex-col items-center gap-2">
                        <Image
                            src={fileUrl}
                            alt="uploaded logo"
                            width={90}
                            height={90}
                            className="object-contain"
                        />
                        <p className="text-xs text-secondary-300">Click to replace or drag and drop</p>
                    </div>
                );
            case 'image':
                return (
                    <div className="flex flex-col items-center gap-2">
                        <Image
                            src={fileUrl}
                            alt="uploaded image"
                            width={500}
                            height={500}
                            className="max-h-[400px] w-full object-contain"
                        />
                        <p className="text-xs text-secondary-300">Click to replace or drag and drop</p>
                    </div>
                );
            case 'document':
                return (
                    <div className="flex flex-col items-center gap-2 p-2 rounded">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium truncate max-w-[200px]">
                                {file.name}
                            </span>
                        </div>
                        <p className="text-xs text-secondary-300">Click to replace or drag and drop</p>
                    </div>
                );
            default:
                return null;
        }
    };

    const getUploadPrompt = () => {
        switch (fileType) {
            case 'logo':
                return (
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
                            <p className="text-xs text-secondary-100">Use white background and size 500 × 500 px</p>
                        </div>
                    </>
                );
            case 'image':
                return (
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
                            <p className="text-xs text-secondary-300">PNG, JPG, JPEG, GIF up to 5MB</p>
                        </div>
                    </>
                );
            case 'document':
                return (
                    <>
                        <Image
                            src="/icons/document-upload.svg"
                            alt="upload"
                            width={40}
                            height={40}
                        />
                        <div className="file-upload_label">
                            <p className="text-sm leading-4.5 font-normal">
                                <span className="text-primary-500">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-secondary-300">PDF, DOC, DOCX up to 5MB</p>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div {...getRootProps()} className="file-upload">
            <input {...getInputProps()} />
            {files && files.length > 0 ? (
                getFilePreview()
            ) : (
                getUploadPrompt()
            )}
        </div>
    );
};

export default FileUploader;