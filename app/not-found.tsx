"use client";

import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { FileQuestion, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
        <meta name="description" content="The page you're looking for doesn't exist" />
      </Head>
      
      <div className="flex flex-col min-h-screen bg-primary-200">
        <div className="container mx-auto px-6 flex flex-col items-center justify-center flex-grow -mt-10">
          <div className="bg-white rounded-lg shadow-sm p-10 max-w-md w-full text-center">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center">
                <FileQuestion size={40} className="text-primary-500" />
              </div>
            </div>
            
            <h1 className="header text-text-900 mt-6">Page Not Found</h1>
            
            <p className="text-text-600 mt-4">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="mt-8">
              <Link href="/" className="shad-primary-btn flex items-center justify-center gap-2 px-6 py-3 rounded-md w-full">
                <ArrowLeft size={18} />
                <span>Go back home</span>
              </Link>
            </div>
          </div>
          
          <div className="mt-10 text-text-600 copyright">
            © {new Date().getFullYear()} StartupVista All rights reserved.
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;