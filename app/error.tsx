"use client";

import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { AlertTriangle, RefreshCw } from 'lucide-react';

const ServerErrorPage: React.FC = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <Head>
        <title>Server Error</title>
        <meta name="description" content="Something went wrong on our end" />
      </Head>
      
      <div className="flex flex-col min-h-screen bg-primary-200">
        <div className="container mx-auto px-6 flex flex-col items-center justify-center flex-grow -mt-10">
          <div className="bg-white rounded-lg shadow-sm p-10 max-w-md w-full text-center">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle size={40} className="text-red-600" />
              </div>
            </div>
            
            <h1 className="header text-text-900 mt-6">Server Error</h1>
            
            <p className="text-text-600 mt-4">
              Something went wrong on our end. We're working to fix the issue. Please try again.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleRefresh}
                className="shad-primary-btn flex items-center justify-center gap-2 px-6 py-3 rounded-md w-full"
              >
                <RefreshCw size={18} />
                <span>Try again</span>
              </button>
              
              <Link 
                href="/"
                className="shad-gray-btn flex items-center justify-center gap-2 px-6 py-3 rounded-md w-full"
              >
                <span>Go to homepage</span>
              </Link>
            </div>
          </div>
          
          <div className="mt-6 text-text-600">
            <p className="text-sm">
              If the problem persists, please contact our support team.
            </p>
          </div>
          
          <div className="mt-10 text-text-600 copyright">
            © {new Date().getFullYear()} StartupVista. All rights reserved.
          </div>
        </div>
      </div>
    </>
  );
};

export default ServerErrorPage;