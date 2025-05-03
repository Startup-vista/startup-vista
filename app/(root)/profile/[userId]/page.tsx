"use client"

import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { ExternalLink } from 'lucide-react';
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link';
import { formatFirestoreDate } from '@/lib/utils';

interface FundingEntry {
    fundingName: string
    fundingType: string
    fundingDate: string
    fundingAmount: string
}

interface UserData {
    companyName?: string
    brandName: string
    establishedDate: string
    companyLogo: string
    registered: string
    industry: string
    teamSize: string
    fundingStage: string
    fundingEntries?: FundingEntry[]
    aboutCompany: string
    websiteUrl: string
    androidLink?: string
    iosLink?: string
    linkedin: string
    instagram?: string
    x?: string
    facebook?: string
    personalName: string
    designation: string
    personalEmail: string
    personalPhone: string
    birthDate: string
    gender: string
}

const OrganizationProfilePage = () => {
    const [userData, setUserData] = useState<UserData>();
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { userId } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) return;

            try {
                const docRef = doc(db, "users", userId as string);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUserData(docSnap.data() as UserData);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    const isFunded = userData?.fundingStage === 'Funding' ? "Yes" : "No";

    if (loading) {
        return (
             <div className="flex items-center flex-center h-screen text-[#2e2e2e] gap-4 text-2xl font-bold">
                <Image
                    src="/icons/loader.svg"
                    alt="loader"
                    width={48}
                    height={48}
                    className="animate-spin"
                />
                Loading ...
            </div>
    );
    }

    if (!userData) {
        return router.replace('/not-found');
    }

    return (
        <div className="flex flex-col w-full min-h-screen bg-primary-200">
            {/* Header with Wave Background */}
            <div className="relative w-full z-0 h-1/10 bg-primary-500 overflow-hidden">
                <Image
                    src="/images/profile_banner.png"
                    width={1000}
                    height={20}
                    alt='banner'
                    priority
                    className='w-full h-1/10 object-cover'
                />
            </div>

            {/* Profile Section */}
            <div className="container mx-auto px-6 -mt-20">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left Column - Logo and Company Info */}
                    <div className="flex flex-col items-start">
                        {/* Logo */}
                        <div className="w-40 h-40 z-20 rounded-full bg-white flex-center border-4 border-white">
                            <div className="text-white text-4xl font-bold">
                                <Image
                                    src={userData.companyLogo}
                                    alt="Logo"
                                    width={120}
                                    height={120}
                                    className="object-cover p-2"
                                />
                            </div>
                        </div>

                        {/* Company Name and Actions */}
                        <div className="mt-4">
                            <h1 className="text-3xl font-bold text-text-900">{userData.brandName}</h1>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-3 mt-3">
                                <Link href={userData.websiteUrl} className="flex items-center gap-2 px-4 py-2 rounded-md border border-text-800 text-text-800 bg-white">
                                    <ExternalLink size={18} />
                                    <span>Visit Website</span>
                                </Link>
                                {userData.androidLink && (
                                <button className="w-10 h-10 rounded-full bg-white  border border-text-800 flex-center">
                                    <Link href={userData?.androidLink} className="w-10 h-10 rounded-full flex-center">
                                        <Image src="/icons/android.svg" alt="android" width={20} height={20} />
                                    </Link>
                                </button>
                                )}
                                {userData.iosLink && (
                                <button className="w-10 h-10 rounded-full bg-white  border border-text-800 flex-center">
                                    <Link href={userData?.iosLink} className="w-10 h-10 rounded-full flex-center">
                                        <Image src="/icons/ios.svg" alt="ios" width={20} height={20} />
                                    </Link>
                                </button>
                                )}
                            </div>

                            {/* Social Media Icons */}
                            <div className="flex gap-3 mt-4">
                                <Link href={userData.linkedin} className="w-10 h-10 flex-center">
                                    <Image src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" width={28} height={28} />
                                </Link>
                                {userData.instagram && (
                                <Link href={userData.instagram} className="w-10 h-10 flex-center">
                                    <Image src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" width={28} height={28} />
                                </Link>
                                )}
                                {userData.x && (
                                <Link href={userData.x} className="w-10 h-10 flex-center">
                                    <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/X_logo.jpg/1200px-X_logo.jpg" alt="Twitter" width={28} height={28} />
                                </Link>
                                )}
                                {userData.facebook && (
                                <Link href={userData.facebook} className="w-10 h-10 flex-center">
                                    <Image src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" width={28} height={28} />
                                </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Organization Status */}
                    <div className="flex-1 mt-4 md:mt-0 md:ml-auto max-w-md">
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <h2 className="font-bold text-lg mb-4">Organization status</h2>

                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-text-800">Established</span>
                                    <span className="text-text-800 font-medium">{formatFirestoreDate(userData.establishedDate)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-text-800">Industry</span>
                                    <span className="text-text-800 font-medium">{userData.industry}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-text-800">Funded</span>
                                    <span className="text-text-800 font-medium">{isFunded}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* About Section */}
                <div className="mt-10">
                    <h2 className="font-bold text-2xl mb-4">About</h2>
                    <p className="text-text-800">
                        {userData.aboutCompany}
                    </p>
                </div>

                {/* Funding Section */}
                {userData.fundingStage === "Funding" && userData.fundingEntries && userData.fundingEntries.length > 0 && (
                <div className="my-10">
                    <h2 className="font-bold text-2xl mb-4">Funding</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {userData.fundingEntries.map((card, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                                <h3 className="font-black text-xl">{card.fundingName}</h3>
                                <div className="flex items-center mt-2">
                                    <span className="text-md font-bold">{card.fundingType}</span>
                                    <span className="text-sm text-gray-500 ml-2">{formatFirestoreDate(card.fundingDate)}</span>
                                </div>

                                <div className="flex justify-between items-center mt-4">
                                    <div>
                                        <div className="text-2xl font-bold">****</div>
                                        <div className="text-sm text-gray-500">Amount</div>
                                    </div>

                                    <div className="text-8xl font-light text-gray-300">₹</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                )}
            </div>
        </div>
    );
};

export default OrganizationProfilePage;
