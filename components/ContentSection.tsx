// components/ContentSection.tsx
import React from 'react';
import Link from 'next/link';
import { Card } from './ui/card';
import { ArrowRight } from 'lucide-react';

interface CardItem {
  id: number;
  coverImage: string;
  company: string;
  timePosted: string;
  title: string;
  subheading: string;
}

interface ContentSectionProps {
  title: string;
  cards: CardItem[];
  viewMoreUrl: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, cards, viewMoreUrl }) => {
  if (!cards || cards.length < 5) {
    return null;
  }

  const mainCard = cards[0];
  const sideCard = cards[1];
  const bottomCards = cards.slice(2, 6);

  return (
    <div className="my-8">
      {/* Header with title and view more link */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-text-800">{title}</h2>
        <Link href={viewMoreUrl} className="flex items-center text-primary-500 text-sm font-medium hover:underline">
          View More
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      {/* Responsive cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Main large card - full width on mobile, 2 cols on sm+, 2 cols on lg+ */}
        <div className="sm:col-span-2 lg:col-span-3">
          <CardItem card={mainCard} large />
        </div>

        {/* Side card - full width on mobile, 1 col on sm+, 1 col on lg+ */}
        <div className="sm:col-span-1">
          <CardItem card={sideCard} />
        </div>
        
        {/* Bottom cards - full width on mobile, 1 col on sm+ */}
        {bottomCards.map((card) => (
          <div key={card.id} className="col-span-1">
            <CardItem card={card} />
          </div>
        ))}
      </div>
    </div>
  );
};

const CardItem: React.FC<{ card: CardItem; large?: boolean }> = ({ card, large = false }) => {
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
          
          <div className="p-4 pb-0">
            <div className="flex items-center mb-2">
              <div className="h-6 w-6 rounded-full bg-secondary-200 mr-2" />
              <span className="text-xs font-medium text-text-600">{card.company}</span>
              <span className="text-xs text-secondary-300 ml-2">• {card.timePosted}</span>
            </div>
            
            <h3 className={`font-bold mb-2 text-text-800 line-clamp-2 ${large ? 'text-lg sm:text-xl' : 'text-base'}`}>
              {card.title}
            </h3>
            
            {/* Show subheading only on medium screens and up */}
            <p className="hidden sm:block text-sm text-text-600 line-clamp-2">
              {card.subheading}
            </p>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default ContentSection;