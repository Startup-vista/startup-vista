// components/AdContainer.tsx
import React from 'react';

interface AdContainerProps {
  position: 'before-section' | 'after-section';
}

const AdContainer: React.FC<AdContainerProps> = ({ position }) => {
  return (
    <div className="my-8 bg-secondary-200 border border-secondary-200 rounded-lg shadow-sm">
      <div className="h-24 md:h-32 flex items-center justify-center text-secondary-300">
      </div>
    </div>
  );
};

export default AdContainer;