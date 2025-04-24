"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import FileUploader from "@/components/FileUploader";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/firebase";

type PostData = {
    title: string;
    excerpt: string;
    content: string;
    coverImageUrl?: string;
    createdAt: any;
    updatedAt: any;
  };

export default function EditorPage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [coverImage, setCoverImage] = useState<File[]>([]);
    const [isSaving, setIsSaving] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
        // Upload cover image if exists
        let coverImageUrl = "";
        if (coverImage.length > 0) {
          const file = coverImage[0];
          const storageRef = ref(storage, `posts/cover-images/${file.name}`);
          await uploadBytes(storageRef, file);
          coverImageUrl = await getDownloadURL(storageRef);
        }
  
        // Prepare post data
        const postData: PostData = {
          title,
          excerpt,
          content,
          coverImageUrl: coverImageUrl || undefined,
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

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="border-secondary-200">
          <CardHeader>
            <CardTitle className="text-text-800 text-xl">Post Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-text-800">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
                className="shad-input"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt" className="text-text-800">
                Excerpt
              </Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A short description of your post"
                className="shad-textArea min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-secondary-200">
            <CardHeader>
                <CardTitle className="text-text-800 text-xl">Cover Image</CardTitle>
            </CardHeader>
            <CardContent>
                <FileUploader
                    files={coverImage}
                    onChange={setCoverImage}
                    accept={{
                        'image/*': ['.png', '.jpg', '.jpeg', '.gif']
                    }}
                />
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