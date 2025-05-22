"use client";

import { useState, useEffect } from "react";
import { useRouter} from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {ArrowRightIcon, Loader2} from "lucide-react";
import 'react-quill-new/dist/quill.snow.css';
import FileUploader from "@/components/FileUploader";
import {addDoc, collection, doc, getDoc, serverTimestamp} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {auth, db, storage} from "@/firebase";
import {processEditorImages} from "@/lib/utils";
import {onAuthStateChanged} from "firebase/auth";
import Image from "next/image";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {PostCategory} from "@/constants";
import Link from "next/link";
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
});

type PostData = {
    title: string;
    summary: string;
    content: any;
    coverImageUrl: string;
    category: string;
    tags: string[];
    isVisible: boolean;
    userId: string;
    createdAt: any;
    updatedAt: any;
  };

export default function EditorPage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [coverImage, setCoverImage] = useState<File[]>([]);
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [isVerified, setIsVerified] = useState<boolean | null>(null);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);
    const [errors, setErrors] = useState({
        title: false,
        summary: false,
        coverImage: false,
        category: false
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userDoc = await getDoc(doc(db, "users", user.uid));
                    if (userDoc.exists()) {
                        setUserId(user.uid);
                        setIsVerified(userDoc.data().isVerified);
                    } else {
                        setUserId(null);
                        setIsVerified(false);
                    }
                } catch (error) {
                    console.error("Error checking user verification:", error);
                    setIsVerified(false);
                }
            } else {
                setIsVerified(false);
                setUserId(null);
            }
            setLoadingAuth(false);
        });

        return () => unsubscribe();
    }, []);

    const validateForm = () => {
        const newErrors = {
            title: !title.trim(),
            summary: !summary.trim(),
            coverImage: coverImage.length === 0,
            category: !category.trim()
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(Boolean);
    };

    const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
    ],
    clipboard: {
      matchVisual: false,
    },
    history: {
        delay: 2000,
        maxStack: 100,
        userOnly: true
    },
  };

  // Quill formats configuration
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
    "background",
  ];

    const handleAddTag = () => {
        if (tagInput.trim() && tags.length < 4) {
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
                setTagInput("");
            } else {
                toast.warning("Tag already exists");
            }
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleTagKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag();
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!userId) {
            toast.error("You must be signed in to create a post");
            return;
        }

        if (!validateForm()) {
            toast.error("Please fill all required fields");
            return;
        }

        if (tags.length > 4) {
            toast.error("Maximum of 4 tags allowed");
            return;
        }

        setIsSaving(true);
        try {
            // Upload cover image
            const file = coverImage[0];
            const storageRef = ref(storage, `users/${userId}/posts/cover-images/${file.name}-${Date.now()}`);
            await uploadBytes(storageRef, file);
            const coverImageUrl = await getDownloadURL(storageRef);

            // Process content images
            const processedContent = await processEditorImages(content,userId as string);

            // Prepare post data
            const postData: PostData = {
                title,
                summary,
                content: processedContent,
                coverImageUrl,
                userId: userId as string,
                category: category,
                tags: tags,
                isVisible: false,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };

            // Save to Firestore
            const docRef = await addDoc(collection(db, "posts"), postData);

            toast.success("Post saved successfully");
            router.push(`/posts/${docRef.id}`);
        } catch (error) {
            console.error("Error saving post:", error);
            toast.error("Failed to save post");
        } finally {
            setIsSaving(false);
        }
    };

    if (loadingAuth) {
        return (
            <div className="min-h-screen bg-primary-200 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (!isVerified || !userId) {
       router.replace("/not-found");
    }

  return (
    <div className="flex bg-primary-200">
    <section className="container mx-auto px-4 py-8">
      <div className="mb-3 gap-3">
        <h1 className="text-4xl md:text-5xl font-bold text-text-800">Create New Post</h1>
        <p className="text-lg text-text-600">
          Write your content and arrange elements directly in the editor
        </p>
      </div>
      <Separator className="mb-8 border-secondary-200" />

        {/* New Guide Card */}
        <Card className="mb-8 border-2 border-primary-500 bg-gradient-to-r from-[#243799] to-[#1C4BC6] hover:shadow-lg transition-all duration-300">
            <CardContent className="p-1 px-5">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2">Need Help Creating Your Article?</h3>
                        <p className="text-white mb-4">
                            Use our step-by-step guide to craft perfect posts with ChatGPT!
                        </p>
                    </div>
                    <Button asChild className="bg-primary-600 hover:bg-primary-700 border border-white text-white px-6 py-3 whitespace-nowrap">
                        <Link href="/start-up/how-to-create-a-post">
                            View Complete Guide <ArrowRightIcon className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="border-secondary-200">
          <CardHeader>
            <CardTitle className="text-text-800 text-xl">Post Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
              <div className="space-y-2">
                  <Label htmlFor="title" className="text-text-800">
                      Title *
                  </Label>
                  <Input
                      id="title"
                      value={title}
                      onChange={(e) => {
                          setTitle(e.target.value);
                          setErrors(prev => ({...prev, title: false}));
                      }}
                      placeholder="Enter post title"
                      className={`shad-input ${errors.title ? 'border-red-500' : ''}`}
                  />
                  {errors.title && <p className="text-xs mt-1 text-red-500">Title is required</p>}
              </div>

              <div className="space-y-2">
                  <Label htmlFor="summary" className="text-text-800">
                      Summary *
                  </Label>
                  <Textarea
                      id="summary"
                      value={summary}
                      onChange={(e) => {
                          setSummary(e.target.value);
                          setErrors(prev => ({...prev, summary: false}));
                      }}
                      placeholder="A short description of your post"
                      className={`shad-textArea min-h-[100px] ${errors.summary ? 'border-red-500' : ''}`}
                  />
                  {errors.summary && <p className="text-xs text-red-500">Summary is required</p>}
              </div>
              <div className="space-y-2">
                  <Label htmlFor="category" className="text-text-800">
                      Category *
                  </Label>
                  <Select
                      value={category}
                      onValueChange={(value) => {
                          setCategory(value);
                          setErrors(prev => ({ ...prev, category: false }));
                      }}
                  >
                      <SelectTrigger className={`shad-select-content ${errors.category ? 'border-red-500' : ''}`}>
                          <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="shad-select-content">
                          {PostCategory.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                  {cat}
                              </SelectItem>
                          ))}
                      </SelectContent>
                  </Select>
                  {errors.category && <p className="text-xs text-red-500">Category is required</p>}
              </div>
          </CardContent>
        </Card>

        <Card className="border-secondary-200">
            <CardHeader>
                <CardTitle className="text-text-800 text-xl">Cover Image*</CardTitle>
            </CardHeader>
            <CardContent>
                <FileUploader
                    files={coverImage}
                    fileType="image"
                    onChange={(files) => {
                        setCoverImage(files);
                        setErrors(prev => ({...prev, coverImage: false}));
                    }}
                    accept={{
                        'image/*': ['.png', '.jpg', '.jpeg']
                    }}
                />
                {errors.coverImage && <p className="text-xs text-red-500 mt-2">Cover image is required</p>}
                {coverImage.length > 0 && (
                    <p className="text-xs text-secondary-300 mt-2">
                        Image selected: {coverImage[0].name}
                    </p>
                )}
            </CardContent>
        </Card>

        <Card className="border-secondary-200">
          <CardHeader>
            <CardTitle className="text-text-800 text-xl">Content Editor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="quill-container rounded-lg border border-secondary-200">
            <ReactQuill theme="snow" value={content} onChange={setContent} modules={modules} formats={formats} placeholder="Write your content here..."/>
            </div>
          </CardContent>
        </Card>

          <Card className="border-secondary-200">
              <CardHeader>
                  <CardTitle className="text-text-800 text-xl">Tags *</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="space-y-2">
                      <div className="flex gap-2">
                          <Input
                              value={tagInput}
                              onChange={(e) => setTagInput(e.target.value)}
                              onKeyDown={handleTagKeyDown}
                              placeholder="Add a tag and press Enter (Max 4 tags)"
                              className="shad-input"
                              disabled={tags.length >= 4}
                          />
                          <Button
                              type="button"
                              onClick={handleAddTag}
                              disabled={!tagInput.trim() || tags.length >= 4}
                              className="shad-primary-btn h-11"
                          >
                              Add
                          </Button>
                      </div>
                      {tags.length >= 4 && (
                          <p className="text-xs text-secondary-300">Maximum of 4 tags reached</p>
                      )}
                      <div className="flex flex-wrap gap-2 mt-2">
                          {tags.map((tag) => (
                              <div key={tag} className="flex items-center bg-secondary-100 px-3 py-1 rounded-full">
                                  <span className="text-sm text-text-800">{tag}</span>
                                  <button
                                      type="button"
                                      onClick={() => handleRemoveTag(tag)}
                                      className="ml-2 text-text-600 hover:text-text-800"
                                  >
                                      ×
                                  </button>
                              </div>
                          ))}
                      </div>
                  </div>
              </CardContent>
          </Card>

        <div className="flex items-center gap-4">
          <Button
            type="submit"
            className="shad-primary-btn"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Post"
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="shad-gray-btn"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </form>

      <style jsx global>{`
        /* Quill editor styles */
        .quill-container {
          background-color: var(--white);
        }
        
        .ql-toolbar {
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          border-color: var(--secondary-200) !important;
          background-color: var(--primary-200);
        }
        
        .ql-container {
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          border-color: var(--secondary-200) !important;
          font-family: var(--font-roboto);
          font-size: var(--text-base);
          min-height: 300px;
        }
        
        .ql-editor {
          min-height: 300px;
          color: var(--text-800);
        }
        
        .ql-editor.ql-blank::before {
          color: var(--secondary-300);
          font-style: normal;
        }
        
        /* Toolbar buttons */
        .ql-snow .ql-stroke {
          stroke: var(--text-800);
        }
        
        .ql-snow .ql-fill {
          fill: var(--text-800);
        }
        
        .ql-snow .ql-picker {
          color: var(--text-800);
        }
        
        /* Active toolbar buttons */
        .ql-snow .ql-active .ql-stroke {
          stroke: var(--primary-500);
        }
        
        .ql-snow .ql-active .ql-fill {
          fill: var(--primary-500);
        }
        
        .ql-snow .ql-picker-label.ql-active {
          color: var(--primary-500);
        }
        
        /* Dropdown options */
        .ql-snow .ql-picker-options {
          background-color: var(--white);
          border-color: var(--secondary-200);
        }
        
        /* Link tooltip */
        .ql-snow .ql-tooltip {
          background-color: var(--white);
          border-color: var(--secondary-200);
          color: var(--text-800);
        }
        
        .ql-snow .ql-tooltip input {
          border-color: var(--secondary-200);
        }
        
        /* Placeholder text */
        .ql-editor p,
        .ql-editor ol,
        .ql-editor ul,
        .ql-editor pre,
        .ql-editor blockquote,
        .ql-editor h1,
        .ql-editor h2,
        .ql-editor h3 {
          margin-bottom: 1rem;
        }
      `}</style>
    </section>
    </div>
  );
}
