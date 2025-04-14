// components/ContentSection.tsx
import React from 'react';
import Link from 'next/link';
import { Card } from './ui/card';
import { AlertTriangle, ArrowRight, Eye, FileX } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Image from 'next/image';

interface CardItem {
  id: number;
  coverImage: string;
  company: string;
  timePosted: string;
  title: string;
  subheading: string;
  views: number;
}

interface ContentSectionProps {
  title: string;
  cards: CardItem[];
  viewMoreUrl: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, cards, viewMoreUrl }) => {
  // Check if cards array exists and has any items
  const hasAnyContent = cards && cards.length > 0;
  
  // Check if we have enough content to warrant a "View More" link
  const hasEnoughForViewMore = cards && cards.length > 6;

  return (
    <div className="my-8">
      {/* Header with title and view more link */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-text-800">{title}</h2>
        {hasEnoughForViewMore && (
          <Link href={viewMoreUrl} className="flex items-center text-primary-500 text-sm font-medium hover:underline">
            View More
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        )}
      </div>

      {hasAnyContent ? (
        // Responsive cards grid
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Main large card - always show if at least 1 card exists */}
          {cards.length >= 1 && (
            <div className="sm:col-span-2 lg:col-span-3">
              <CardItem card={cards[0]} large />
            </div>
          )}

          {/* Side card - only show if at least 2 cards exist */}
          {cards.length >= 2 && (
            <div className="sm:col-span-1">
              <CardItem card={cards[1]} />
            </div>
          )}
          
          {/* Bottom cards - show as many as we have (up to 4) */}
          {cards.slice(2, 6).map((card) => (
            <div key={card.id} className="col-span-1">
              <CardItem card={card} />
            </div>
          ))}
        </div>
      ) : (
        // No content message - only show when there are zero cards
        <div className="flex flex-col justify-center items-center py-12 px-4">
          <Image src="/images/nodata.png" width={150} height={150} alt='no data' />
          <Alert variant="default" className="max-w-md border-0">
            <AlertDescription className='text-text-800 pl-8 font-semibold text-lg'>There are currently no articles in this section.</AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

const CardItem: React.FC<{ card: CardItem; large?: boolean }> = ({ card, large = false }) => {
  // Format views count (e.g., 1500 -> 1.5k)
  const formatViews = (views: number): string => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  return (
    <Card className="overflow-hidden border-0 h-fit shadow-sm hover:shadow-md transition-shadow duration-200">
      <Link href={`/article/${card.id}`} className="block h-full">
        <div className="relative">
          {/* Responsive image height */}
          <div className={`relative border-secondary-200 ${large ? 'h-48 sm:h-56 md:h-64 lg:h-80' : 'h-40 sm:h-48 md:h-56'}`}>
            <img 
              src={card.coverImage || '/images/placeholder.jpg'} 
              alt={card.title}
              className="object-cover w-full h-full"
              loading="lazy"
            />
          </div>
          
          <div className="p-4">
            <div className="flex items-center mb-2">
              <div className="h-6 w-6 rounded-full bg-secondary-200 mr-2" />
              <span className="text-xs font-medium text-text-600 hover:underline">{card.company}</span>
              <span className="text-xs text-secondary-300 mx-2">•</span>
              <span className="text-xs text-secondary-300">{card.timePosted}</span>
            </div>
            
            <h3 className={`font-bold mb-2 text-text-800 line-clamp-2 hover:underline ${large ? 'text-lg sm:text-xl' : 'text-base'}`}>
              {card.title}
            </h3>
            
            {/* Subheading with proper line clamping */}
            <div className={`hidden sm:block text-sm text-text-600 mb-3`}>
              <div className='line-clamp-2'>
                {card.subheading}
              </div>
            </div>
            
            {/* Views count */}
            <div className="flex items-center text-xs text-secondary-400">
              <Eye className="h-3 w-3 mr-1" />
              <span>{formatViews(card.views)} views</span>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default ContentSection;