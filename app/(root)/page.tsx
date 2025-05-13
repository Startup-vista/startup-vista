"use client";

import { useState, useEffect } from 'react';
import ContentSection from '@/components/ContentSection';
import AdContainer from '@/components/AdContainer';
import {collection, getDocs, query, orderBy, limit, where, getDoc, doc} from 'firebase/firestore';
import { db } from '@/firebase';
import {formatDistanceToNow} from "date-fns";


interface Post {
  id: string;
  title: string;
  excerpt: string;
  coverImageUrl: string;
  createdAt: any;
  views: number;
  category: string;
  userId: string;
}

interface UserData {
  brandName: string;
  companyLogo: string;
}

interface Section {
  id: string;
  title: string;
  cards: Post[];
  viewMoreUrl: string;
}

export default function HomePage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const postsRef = collection(db, "posts");

        // Define queries for each category section
        const sectionQueries = [
          {
            id: "trending",
            title: "Trending News",
            query: query(
                postsRef,
                orderBy("views", "desc"),
                limit(8)
            ),
            viewMoreUrl: "/section/trending"
          },
          {
            id: "funding",
            title: "Funding",
            query: query(
                postsRef,
                where("category", "==", "Funding"),
                orderBy("createdAt", "desc"),
                limit(8)
            ),
            viewMoreUrl: "/section/funding"
          },
          {
            id: "finance",
            title: "Finance Insights",
            query: query(
                postsRef,
                where("category", "==", "Finance"),
                orderBy("createdAt", "desc"),
                limit(8)
            ),
            viewMoreUrl: "/section/finance"
          },
          {
            id: "market",
            title: "Market Trends",
            query: query(
                postsRef,
                where("category", "==", "Market Trends"),
                orderBy("createdAt", "desc"),
                limit(8)
            ),
            viewMoreUrl: "/section/market"
          },
          {
            id: "founder",
            title: "Founder Stories",
            query: query(
                postsRef,
                where("category", "==", "Founder Story"),
                orderBy("createdAt", "desc"),
                limit(8)
            ),
            viewMoreUrl: "/section/founder"
          },
          {
            id: "indepth",
            title: "In-depth Analysis",
            query: query(
                postsRef,
                where("category", "==", "In depth"),
                orderBy("createdAt", "desc"),
                limit(8)
            ),
            viewMoreUrl: "/section/indepth"
          }
        ];

        // Execute all queries in parallel
        const querySnapshots = await Promise.all(
            sectionQueries.map(section => getDocs(section.query))
        );

        // Get unique user IDs from all posts
        const userIds = Array.from(new Set(
            querySnapshots.flatMap(snapshot =>
                snapshot.docs.map(doc => doc.data().userId)
            )
        ));

        // Fetch user data for all unique user IDs
        const userDataPromises = userIds.map(async userId => {
          const userDoc = await getDoc(doc(db, "users", userId));
          return {
            userId,
            data: userDoc.exists() ? userDoc.data() as UserData : null
          };
        });

        const userDataResults = await Promise.all(userDataPromises);
        const userDataMap = new Map<string, UserData>();
        userDataResults.forEach(result => {
          if (result.data) {
            userDataMap.set(result.userId, result.data);
          }
        });

        // Process results into sections with user data
        const loadedSections = sectionQueries.map((section, index) => ({
          ...section,
          cards: querySnapshots[index].docs.map(doc => {
            const postData = doc.data();
            const userData = userDataMap.get(postData.userId);
            return {
              id: doc.id,
              ...postData,
              userId: postData.userId,
              createdAt: postData.createdAt?.toDate()
                  ? formatDistanceToNow(postData.createdAt.toDate(), { addSuffix: true })
                  : "Recently",
              brandName: userData?.brandName || "Unknown Brand",
              companyLogo: userData?.companyLogo || "/images/placeholder.jpg"
            };
          })
        }));


        setSections(loadedSections);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
        <div className="min-h-screen bg-primary-200 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-primary-200 text-text-800">
        <main className="container mx-auto px-4 py-8">
          <AdContainer position="before-section" />

          {sections.map((section) => (
              <div key={section.id}>
                {section.cards.length > 0 && (
                    <>
                      <ContentSection
                          title={section.title}
                          cards={section.cards}
                          viewMoreUrl={section.viewMoreUrl}
                      />
                      <AdContainer position="after-section" />
                    </>
                )}
              </div>
          ))}
        </main>
      </div>
  );
}