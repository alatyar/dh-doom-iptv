'use client';

import { StarRating } from './StarRating';

export interface Review {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified?: boolean;
  service: 'doom-vip' | 'dh-plus-vip';
  location?: string;
}

interface ReviewCardProps {
  review: Review;
  className?: string;
}

export function ReviewCard({ review, className = '' }: ReviewCardProps) {
  const serviceColors = {
    'doom-vip': 'bg-gradient-to-r from-emerald-500 to-cyan-500',
    'dh-plus-vip': 'bg-gradient-to-r from-blue-500 to-purple-500'
  };

  const serviceNames = {
    'doom-vip': 'DOOM VIP',
    'dh-plus-vip': 'DH PLUS VIP'
  };

  return (
    <div className={`bg-white dark:bg-slate-700 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-slate-600 hover:shadow-xl transition-all duration-300 ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 dark:from-slate-500 dark:to-slate-600 flex items-center justify-center text-white font-semibold text-lg">
            {review.avatar ? (
              <img
                src={review.avatar}
                alt={review.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              review.name.charAt(0).toUpperCase()
            )}
          </div>

          {/* User info */}
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">{review.name}</h3>
              {review.verified && (
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">Verified</span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-slate-400">
              <span>{review.date}</span>
              {review.location && (
                <>
                  <span>•</span>
                  <span>{review.location}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Service badge */}
        <div className={`px-3 py-1 rounded-full text-white text-xs font-medium ${serviceColors[review.service]}`}>
          {serviceNames[review.service]}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-3">
        <StarRating rating={review.rating} showNumber size="sm" />
      </div>

      {/* Review title */}
      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{review.title}</h4>

      {/* Review content */}
      <p className="text-gray-700 dark:text-slate-300 leading-relaxed">{review.content}</p>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-600">
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-slate-400">
          <span>Was this review helpful?</span>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-1 hover:text-green-600 dark:hover:text-green-400 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L9 7m5 3v10M9 7H6a2 2 0 00-2 2v8a2 2 0 002 2h8.5" />
              </svg>
              <span>Yes</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-red-600 dark:hover:text-red-400 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L15 17m-5-3H9a2 2 0 00-2 2v8a2 2 0 002 2h8.5" />
              </svg>
              <span>No</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
