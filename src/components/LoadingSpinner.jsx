// components/LoadingSpinner.jsx
import React from 'react';
import { Loader2, Plane } from 'lucide-react';

const LoadingSpinner = ({ 
  size = 'md', 
  text = 'Loading your itinerary...', 
  variant = 'default' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  if (variant === 'travel') {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="relative">
          <div className="animate-spin">
            <Plane className={`${sizeClasses[size]} text-blue-600`} />
          </div>
          <div className="absolute inset-0 animate-ping opacity-30">
            <Plane className={`${sizeClasses[size]} text-blue-400`} />
          </div>
        </div>
        {text && (
          <p className={`mt-4 text-gray-600 ${textSizeClasses[size]} animate-pulse`}>
            {text}
          </p>
        )}
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        {text && (
          <p className={`mt-4 text-gray-600 ${textSizeClasses[size]}`}>
            {text}
          </p>
        )}
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className={`${sizeClasses[size]} text-blue-600 animate-spin`} />
        {text && (
          <span className={`ml-3 text-gray-600 ${textSizeClasses[size]}`}>
            {text}
          </span>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-lg">
      <div className="relative">
        <div className="animate-spin">
          <Loader2 className={`${sizeClasses[size]} text-blue-600`} />
        </div>
      </div>
      {text && (
        <p className={`mt-4 text-gray-600 ${textSizeClasses[size]} text-center max-w-xs`}>
          {text}
        </p>
      )}
    </div>
  );
};

// Updated skeleton loading component for activity cards with images
export const ActivityCardSkeleton = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden animate-pulse">
      <div className="flex">
        {/* Image Skeleton */}
        <div className="w-24 h-24 bg-gray-300 flex-shrink-0"></div>
        
        {/* Content Skeleton */}
        <div className="flex-grow p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-grow">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="flex space-x-3">
                <div className="h-3 bg-gray-200 rounded w-16"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-12 ml-2"></div>
          </div>
          <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
          <div className="flex items-center justify-between">
            <div className="h-3 bg-gray-200 rounded w-20"></div>
            <div className="h-5 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Skeleton loading component for day sections
export const DaySectionSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
      <div className="flex items-center mb-6 pb-4 border-b border-gray-100">
        <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
        <div>
          <div className="h-6 bg-gray-300 rounded w-32 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
      <div className="space-y-4">
        <ActivityCardSkeleton />
        <ActivityCardSkeleton />
        <ActivityCardSkeleton />
      </div>
    </div>
  );
};

// Full page loading component
export const FullPageLoader = ({ text = 'Planning your perfect trip...' }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner variant="travel" size="xl" text={text} />
      </div>
    </div>
  );
};

export default LoadingSpinner;