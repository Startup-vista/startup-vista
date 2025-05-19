// components/ContentSection.tsx
import React from 'react';
import Link from 'next/link';
import { Card } from './ui/card';
import { ArrowRight, Eye } from 'lucide-react';
import {formatViews} from "@/lib/utils";

interface CardItem {
  id: string;
  coverImageUrl: string;
  userId: string;
  brandName: string;
  companyLogo: string;
  createdAt: string;
  title: string;
  excerpt: string;
  views: number;
}

interface ContentSectionProps {
  title: string;
  cards: CardItem[];
  viewMoreUrl: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, cards, viewMoreUrl }) => {
  const hasAnyContent = cards && cards.length > 0;
  const hasEnoughForViewMore = cards && cards.length > 6;

  return (
      <div className="my-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-text-800">{title}</h2>
          {hasEnoughForViewMore && (
              <Link href={viewMoreUrl} className="flex items-center text-primary-500 text-sm font-medium hover:underline">
                View More
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
          )}
        </div>

        {hasAnyContent && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {cards.length >= 1 && (
                  <div className="sm:col-span-2 lg:col-span-3">
                    <CardItem card={cards[0]} large />
                  </div>
              )}
              {cards.length >= 2 && (
                  <div className="sm:col-span-1">
                    <CardItem card={cards[1]} />
                  </div>
              )}
              {cards.slice(2, 6).map((card) => (
                  <div key={card.id} className="col-span-1">
                    <CardItem card={card} />
                  </div>
              ))}
            </div>
        )}
      </div>
  );
};

const CardItem: React.FC<{ card: CardItem; large?: boolean }> = ({ card, large = false }) => {
  return (
      <Card className="overflow-hidden border-0 h-fit shadow-sm hover:shadow-md transition-shadow duration-200">
        <Link href={`/posts/${card.id}`} className="block h-full">
          <div className="relative">
            <div className={`relative border-secondary-200 ${large ? 'h-48 sm:h-56 md:h-64 lg:h-80' : 'h-40 sm:h-48 md:h-56'}`}>
              <img
                  src={card.coverImageUrl || '/images/placeholder.jpg'}
                  alt={card.title}
                  className="object-cover w-full h-full"
                  loading="lazy"
              />
            </div>

            <div className="p-4">
              <div className="flex items-center mb-2">
                  <div className="h-6 w-6 rounded-full bg-secondary-200 mr-2 overflow-hidden">
                    <Link href={`/profile/${card.userId}`}>
                      <img
                          src={card.companyLogo || '/images/placeholder.jpg'}
                          alt={card.brandName}
                          className="object-cover w-full h-full"
                      />
                    </Link>
                  </div>
                  <Link href={`/profile/${card.userId}`}>
                    <span className="text-xs font-medium text-text-600 hover:underline">{card.brandName}</span>
                  </Link>
                  <span className="text-xs text-secondary-300 mx-2">•</span>
                  <div className="flex items-center text-xs text-secondary-400">
                    <Eye className="h-3 w-3 mr-1" />
                    <span>{formatViews(card.views)} views</span>
                  </div>
              </div>

              <h3 className={`font-bold mb-2 text-text-800 line-clamp-2 hover:underline ${large ? 'text-lg sm:text-xl' : 'text-base'}`}>
                {card.title}
              </h3>

              <div className={`hidden sm:block text-sm text-text-600`}>
                <div className='line-clamp-2'>
                  {card.excerpt}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </Card>
  );
};

export default ContentSection;

//<span className="text-xs text-secondary-300 items-end">{card.createdAt}</span>
