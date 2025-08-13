'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ReviewCard, Review } from './ReviewCard';
import { StarRating } from './StarRating';

// Sample reviews data
const sampleReviews: Review[] = [
  {
    id: '1',
    name: 'Ahmed M.',
    rating: 5,
    title: 'Excellent IPTV Service!',
    content: 'I have been using DOOM VIP for 6 months now and I am extremely satisfied. The channel quality is excellent, no buffering issues, and customer support is very responsive. Highly recommended!',
    date: 'January 15, 2025',
    verified: true,
    service: 'doom-vip',
    location: 'UAE'
  },
  {
    id: '2',
    name: 'Sarah K.',
    rating: 5,
    title: 'Best IPTV I have used',
    content: 'DH PLUS VIP is amazing! Works perfectly on all my devices - Smart TV, phone, and tablet. The setup was very easy and the channel selection is incredible. Worth every penny!',
    date: 'January 12, 2025',
    verified: true,
    service: 'dh-plus-vip',
    location: 'USA'
  },
  {
    id: '3',
    name: 'Mohammed A.',
    rating: 5,
    title: 'Perfect for families',
    content: 'Great service with excellent Arabic and international channels. My family loves it! The anti-freeze technology really works - no more interruptions during important matches.',
    date: 'January 10, 2025',
    verified: true,
    service: 'doom-vip',
    location: 'Saudi Arabia'
  },
  {
    id: '4',
    name: 'Lisa R.',
    rating: 4,
    title: 'Good value for money',
    content: 'Very good IPTV service with lots of channels and movies. Sometimes there are minor issues but customer support fixes them quickly. Overall very satisfied with the purchase.',
    date: 'January 8, 2025',
    verified: true,
    service: 'dh-plus-vip',
    location: 'Canada'
  },
  {
    id: '5',
    name: 'Omar H.',
    rating: 5,
    title: 'Reliable and stable',
    content: 'Been using DOOM VIP for over a year. Very reliable service with 99.9% uptime as promised. The 4K quality is amazing and works great on my Fire TV Stick.',
    date: 'January 5, 2025',
    verified: true,
    service: 'doom-vip',
    location: 'Egypt'
  },
  {
    id: '6',
    name: 'Jennifer L.',
    rating: 5,
    title: 'Outstanding customer service',
    content: 'Not only is the IPTV service excellent, but their customer service is outstanding. They helped me set up everything via WhatsApp in just a few minutes. Highly professional!',
    date: 'January 3, 2025',
    verified: true,
    service: 'dh-plus-vip',
    location: 'UK'
  }
];

export function ReviewsSection() {
  const t = useTranslations('reviews');
  const [filter, setFilter] = useState<'all' | 'doom-vip' | 'dh-plus-vip'>('all');
  const [showAll, setShowAll] = useState(false);

  const filteredReviews = filter === 'all' 
    ? sampleReviews 
    : sampleReviews.filter(review => review.service === filter);

  const displayedReviews = showAll ? filteredReviews : filteredReviews.slice(0, 3);

  const averageRating = sampleReviews.reduce((sum, review) => sum + review.rating, 0) / sampleReviews.length;
  const totalReviews = sampleReviews.length;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
    const count = sampleReviews.filter(review => review.rating === rating).length;
    const percentage = (count / totalReviews) * 100;
    return { rating, count, percentage };
  });

  return (
    <section className="py-16 bg-gray-50 dark:bg-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('title', { defaultValue: 'Customer Reviews' })}
          </h2>
          <p className="text-xl text-gray-600 dark:text-slate-300 max-w-3xl mx-auto">
            {t('subtitle', { defaultValue: 'See what our customers say about our IPTV services' })}
          </p>
        </div>

        {/* Rating Summary */}
        <div className="bg-white dark:bg-slate-700 rounded-2xl shadow-lg p-8 mb-8 transition-colors duration-300">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                {averageRating.toFixed(1)}
              </div>
              <StarRating rating={averageRating} size="lg" className="justify-center mb-2" />
              <p className="text-gray-600 dark:text-slate-300">
                {t('basedOn', { defaultValue: 'Based on {count} reviews', count: totalReviews })}
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700 dark:text-slate-300 w-8">
                    {rating}★
                  </span>
                  <div className="flex-1 bg-gray-200 dark:bg-slate-600 rounded-full h-2">
                    <div
                      className="bg-yellow-400 dark:bg-yellow-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-slate-300 w-8">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-slate-700 rounded-lg p-1 shadow-md transition-colors duration-300">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-emerald-500 text-white'
                  : 'text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {t('allReviews', { defaultValue: 'All Reviews' })}
            </button>
            <button
              onClick={() => setFilter('doom-vip')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === 'doom-vip'
                  ? 'bg-emerald-500 text-white'
                  : 'text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              DOOM VIP
            </button>
            <button
              onClick={() => setFilter('dh-plus-vip')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === 'dh-plus-vip'
                  ? 'bg-emerald-500 text-white'
                  : 'text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              DH PLUS VIP
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Show More Button */}
        {filteredReviews.length > 3 && (
          <div className="text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              {showAll
                ? t('showLess', { defaultValue: 'Show Less' })
                : t('showMore', { defaultValue: 'Show More Reviews' })
              }
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-600 dark:to-cyan-600 rounded-2xl p-8 text-center text-white mt-12">
          <h3 className="text-2xl font-bold mb-4">
            {t('ctaTitle', { defaultValue: 'Join Thousands of Satisfied Customers' })}
          </h3>
          <p className="text-lg mb-6 opacity-90">
            {t('ctaDescription', { defaultValue: 'Experience premium IPTV service with 99.9% uptime and 24/7 support' })}
          </p>
          <a
            href="https://wa.me/13322662387"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white dark:bg-slate-100 text-emerald-600 dark:text-emerald-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-slate-200 transition-colors inline-flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            <span>{t('orderNow', { defaultValue: 'Order Now' })}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
