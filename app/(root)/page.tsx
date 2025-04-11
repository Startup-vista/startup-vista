"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import ContentSection from '@/components/ContentSection';
import AdContainer from '@/components/AdContainer';

// Mock data for initial sections
const initialSections = [
  {
    id: 1,
    title: "Trending News",
    cards: [
      {
        id: 1,
        coverImage: "/images/news1.jpg",
        company: "Avocado tech",
        timePosted: "4 hours ago",
        title: "Section 1.10.32 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC",
        subheading: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        views: 12500
      },
      {
        id: 2,
        coverImage: "/images/news2.jpg",
        company: "Avocado tech",
        timePosted: "4 hours ago",
        title: "Section 1.10.32 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC",
        subheading: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        views: 9800
      },
      {
        id: 3,
        coverImage: "/images/news3.jpg",
        company: "Avocado tech",
        timePosted: "4 days ago",
        title: "Section 1.10.32 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC",
        subheading: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        views: 24500
      },
      {
        id: 4,
        coverImage: "/images/news4.jpg",
        company: "Avocado tech",
        timePosted: "20 Feb 2025",
        title: "Section 1.10.32 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC",
        subheading: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        views: 35600
      },
      {
        id: 5,
        coverImage: "/images/news5.jpg",
        company: "Avocado tech",
        timePosted: "20 Feb 2025",
        title: "Section 1.10.32 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC",
        subheading: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        views: 28700
      },
      {
        id: 6,
        coverImage: "/images/news6.jpg",
        company: "Avocado tech",
        timePosted: "20 Feb 2025",
        title: "Section 1.10.32 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC",
        subheading: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        views: 31200
      }
    ]
  },
  {
    id: 2,
    title: "Tech Updates",
    cards: [
      {
        id: 1,
        coverImage: "/images/tech1.jpg",
        company: "Avocado tech",
        timePosted: "4 hours ago",
        title: "Section 1.10.32 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC",
        subheading: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        views: 18500
      },
      {
        id: 2,
        coverImage: "/images/tech2.jpg",
        company: "Avocado tech",
        timePosted: "4 hours ago",
        title: "Section 1.10.32 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC",
        subheading: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        views: 14200
      },
      {
        id: 3,
        coverImage: "/images/tech3.jpg",
        company: "Avocado tech",
        timePosted: "4 days ago",
        title: "Section 1.10.32 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC",
        subheading: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        views: 27500
      },
      {
        id: 4,
        coverImage: "/images/tech4.jpg",
        company: "Avocado tech",
        timePosted: "20 Feb 2025",
        title: "Section 1.10.32 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC",
        subheading: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        views: 42100
      },
      {
        id: 5,
        coverImage: "/images/tech5.jpg",
        company: "Avocado tech",
        timePosted: "20 Feb 2025",
        title: "Section 1.10.32 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC",
        subheading: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        views: 38900
      },
      {
        id: 6,
        coverImage: "/images/tech6.jpg",
        company: "Avocado tech",
        timePosted: "20 Feb 2025",
        title: "Section 1.10.32 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC",
        subheading: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        views: 36500
      }
    ]
  }
];

export default function HomePage() {
  const [sections, setSections] = useState(initialSections);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  
  // Reference for the last item to detect when to load more content
  // const { targetRef } = useIntersectionObserver({
  //   onIntersect: loadMoreSections,
  //   threshold: 0.5,
  // });

  // // Simulated function to fetch more sections from an API
  // async function loadMoreSections() {
  //   if (loading) return;
    
  //   setLoading(true);
    
  //   // Simulate API call
  //   await new Promise(resolve => setTimeout(resolve, 1000));
    
  //   // Add more mock sections
  //   const newSections = [
  //     {
  //       id: sections.length + 1,
  //       title: `Section ${sections.length + 1}`,
  //       cards: [
  //         {
  //           id: 1,
  //           coverImage: "/images/placeholder.jpg",
  //           company: "Avocado tech",
  //           timePosted: "4 hours ago",
  //           title: "Section 1.10.32 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC",
  //           subheading: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
  //         },
  //         {
  //           id: 2,
  //           coverImage: "/images/placeholder.jpg",
  //           company: "Avocado tech",
  //           timePosted: "4 hours ago",
  //           title: "Section 1.10.32 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC",
  //           subheading: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
  //         },
  //         {
  //           id: 3,
  //           coverImage: "/images/placeholder.jpg",
  //           company: "Avocado tech",
  //           timePosted: "4 days ago",
  //           title: "Section 1.10.32 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC",
  //           subheading: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
  //         },
  //         {
  //           id: 4,
  //           coverImage: "/images/placeholder.jpg",
  //           company: "Avocado tech",
  //           timePosted: "20 feb 2025",
  //           title: "Section 1.10.32 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC",
  //           subheading: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
  //         },
  //         {
  //           id: 5,
  //           coverImage: "/images/placeholder.jpg",
  //           company: "Avocado tech",
  //           timePosted: "20 feb 2025",
  //           title: "Section 1.10.32 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC",
  //           subheading: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
  //         },
  //         {
  //           id: 5,
  //           coverImage: "/images/placeholder.jpg",
  //           company: "Avocado tech",
  //           timePosted: "20 feb 2025",
  //           title: "Section 1.10.32 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC",
  //           subheading: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
  //         }
  //       ]
  //     }
  //   ];
    
  //   setSections(prev => [...prev, ...newSections]);
  //   setPage(prev => prev + 1);
  //   setLoading(false);
  // }

  return (
    <div className="min-h-screen bg-primary-200 text-text-800">
      <main className="container mx-auto px-4 py-8">
        <AdContainer position="before-section" />
        {sections.map((section, index) => (
          <div key={section.id}>
            <ContentSection 
              title={section.title} 
              cards={section.cards} 
              viewMoreUrl={`/section/${section.id}`} 
            />
            <AdContainer position="after-section" />
          </div>
        ))}
        {/* {loading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        )} */}
      </main>
    </div>
  );
}