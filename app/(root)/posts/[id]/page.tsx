"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {Calendar, Share2, Eye, AlertCircleIcon} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { doc, getDoc, updateDoc, increment, collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { toast } from "sonner";
import AdContainer from "@/components/AdContainer";
import Link from "next/link";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {reportCategories} from "@/constants";

interface UserData {
    brandName: string;
    companyLogo: string;
}

export default function BlogPostPage() {
    const router = useRouter();
    const params = useParams();
    const [post, setPost] = useState<any>(null);
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [reportOpen, setReportOpen] = useState(false);
    const [reportCategory, setReportCategory] = useState("");
    const [reportDetails, setReportDetails] = useState("");

    useEffect(() => {
        const fetchPostAndIncrementViews = async () => {
            if (!params.id) return;

            try {
                const postId = params.id as string;
                const postRef = doc(db, "posts", postId);

                // First fetch the post
                const postSnap = await getDoc(postRef);

                if (postSnap.exists()) {
                    const postData = postSnap.data();
                    getUserData(postData.userId);

                    // Update the post in state
                    setPost({
                        id: postSnap.id,
                        ...postData,
                        // If views don't exist yet, show as 1 (current view)
                        views: (postData.views || 0) + 1
                    });

                    // Then update the view count
                    await updateDoc(postRef, {
                        views: increment(1)
                    });
                } else {
                    setError("Post not found");
                }
            } catch (err) {
                console.error("Error fetching post:", err);
                setError("Failed to load post");
            } finally {
                setLoading(false);
            }
        };

        fetchPostAndIncrementViews();
    }, [params.id]);

    async function getUserData(userId: string) {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        setUser(docSnap.data() as UserData);
    }

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: post.title,
                text: post.excerpt,
                url: window.location.href,
            }).catch(err => console.error("Error sharing:", err));
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard");
        }
    };

    const handleReportSubmit = async () => {
        if (!reportCategory) {
            toast.error("Please select a report category");
            return;
        }

        if (reportCategory === "other" && !reportDetails.trim()) {
            toast.error("Please provide details for your report");
            return;
        }

        try {
            await addDoc(collection(db, `reports`), {
                postId: params.id,
                category: reportCategory,
                details: reportCategory === "other" ? reportDetails : "",
                createdAt: new Date(),
                status: "pending"
            });

            toast.success("Report submitted successfully");
            setReportOpen(false);
            setReportCategory("");
            setReportDetails("");
        } catch (error) {
            console.error("Error submitting report:", error);
            toast.error("Failed to submit report");
        }
    };

    // Function to process HTML content and ensure proper heading rendering
    const processContent = (html: string) => {
        // This ensures headings have proper styling
        return html.replace(/<h1/g, '<h1 class="text-3xl font-bold my-4"')
            .replace(/<h2/g, '<h2 class="text-2xl font-bold my-3"')
            .replace(/<h3/g, '<h3 class="text-xl font-bold my-2"');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-primary-200 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (error) {
        router.push("/error");
    }

    if (!post)  {
        router.push("/not-found");
    }

    return (
        <div className="w-full sub-container max-w-5xl">
            <AdContainer position="before-section" />
            <Card className="border-secondary-200 overflow-hidden">
                <div className="relative w-full h-64 md:h-96">
                    <Image
                        src={post.coverImageUrl}
                        alt={post.title}
                        fill
                        className="object-cover w-full h-full"
                        priority
                    />
                </div>

                <CardContent className="pt-6 pb-8 px-4 md:px-8">
                    <h1 className="text-4xl font-bold mb-3">{post.title}</h1>
                    <p className="text-lg text-text-600 mb-6">{post.excerpt}</p>
                    <div className="flex items-center gap-4 mb-6 text-lg font-bold text-primary-500 flex-wrap">
                        Category : {post.category}
                    </div>
                    <div className="flex flex-wrap gap-4 mb-4 items-center justify-between">
                        <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center gap-2 text-text-600">
                                <Calendar className="h-4 w-4" />
                                <span className="text-sm">
                                  {post.createdAt?.toDate()
                                      ? formatDistanceToNow(post.createdAt.toDate(), { addSuffix: true })
                                      : "Recently"}
                                </span>
                            </div>

                            <Link href={`/profile/${post.userId}`}>
                                <div className="flex items-center gap-2 text-text-600 cursor-pointer">
                                    <Image src={user?.companyLogo} alt="logo" width={32} height={32} className="rounded-full" />
                                    <span className="text-sm hover:underline">{user?.brandName}</span>
                                </div>
                            </Link>

                            <div className="flex items-center gap-2 text-text-600">
                                <Eye className="h-4 w-4" />
                                <span className="text-sm">{post.views || 1} views</span>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleShare}
                                title="Share"
                                className="cursor-pointer"
                            >
                                <Share2 className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="default"
                                size="icon"
                                onClick={() => setReportOpen(true)}
                                title="Report"
                                className="cursor-pointer w-auto p-2 border border-red-600 text-red-500"
                            >
                                <AlertCircleIcon className="h-5 w-5" />
                                Report
                            </Button>
                        </div>
                    </div>

                    <Separator className="my-6" />

                    <div
                        className="blog-content prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: processContent(post.content) }}
                    />
                    <div className="flex items-center gap-4 pt-5 flex-wrap">
                        {post.tags?.map((tag: string, index: number) => (
                            <span key={index} className="text-sm text-white bg-primary-500 px-2 py-1 rounded-md">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Report Dialog */}
            <AlertDialog open={reportOpen} onOpenChange={setReportOpen}>
                <AlertDialogContent className="bg-primary-100">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Report Post</AlertDialogTitle>
                        <AlertDialogDescription>
                            Please select the reason for reporting this post.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="space-y-4">
                        <Select onValueChange={setReportCategory} value={reportCategory}>
                            <SelectTrigger className="w-full bg-white">
                                <SelectValue placeholder="Select a reason" />
                            </SelectTrigger>
                            <SelectContent className="w-full bg-white cursor-pointer">
                                {reportCategories.map((category) => (
                                    <Tooltip key={category.value}>
                                        <TooltipTrigger asChild>
                                            <SelectItem value={category.value} className="cursor-pointer">
                                                {category.label}
                                            </SelectItem>
                                        </TooltipTrigger>
                                        <TooltipContent side="top" className="border bg-white">
                                            {category.description}
                                        </TooltipContent>
                                    </Tooltip>
                                ))}
                            </SelectContent>
                        </Select>

                        {reportCategory === "other" && (
                            <Textarea
                                placeholder="Please provide details about your report"
                                value={reportDetails}
                                onChange={(e) => setReportDetails(e.target.value)}
                                className="mt-2 bg-white"
                            />
                        )}
                    </div>

                    <AlertDialogFooter>
                        <Button variant="outline" onClick={() => setReportOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleReportSubmit} className="shad-primary-btn">
                            Submit Report
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}