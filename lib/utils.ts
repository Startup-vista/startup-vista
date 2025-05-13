import { type ClassValue, clsx } from "clsx";
import { Timestamp } from "firebase/firestore";
import { twMerge } from "tailwind-merge";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFirestoreDate(timestamp: Timestamp) {
  if (!timestamp?.seconds) return "N/A";
  const date = new Date(timestamp.seconds * 1000);
  const month = date.toLocaleString('en-IN', { month: 'long' });
  const year = date.getFullYear();
  return `${month}, ${year}`;
}

export const formatViews = (views: number): string => {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}k`;
  }
  return views.toString();
};

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const processEditorImages = async (htmlContent: string,id: string): Promise<string> => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  const images = doc.querySelectorAll('img');

  for (const img of Array.from(images)) {
    const src = img.getAttribute('src');

    // Skip if already a Firebase URL or data URL
    if (!src || src.includes('firebasestorage.googleapis.com')) {
      continue;
    }

    try {
      // Fetch the image
      const response = await fetch(src);
      const blob = await response.blob();

      // Upload to Firebase
      const storageRef = ref(storage, `users/${id}/posts/content-images/${Date.now()}`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      // Replace the src with Firebase URL
      img.setAttribute('src', downloadURL);
    } catch (error) {
      console.error('Error processing image:', error);
      // Remove the image if upload fails
      img.remove();
    }
  }

  return doc.body.innerHTML;
};