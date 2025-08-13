'use client';

import { useOffline } from '@/hooks/useOffline';
import { useTranslations } from 'next-intl';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';

export function OfflineIndicator() {
  const { isOnline, isOffline, connectionType, effectiveType, downlink } = useOffline();
  const t = useTranslations('offline');

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-black px-4 py-3 shadow-lg">
      <AnimateOnScroll animation="slideInDown">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-yellow-800" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-semibold">
                {t('title', { defaultValue: 'You are offline' })}
              </p>
              <p className="text-sm opacity-90">
                {t('description', { defaultValue: 'Some features may be limited. Cached content is still available.' })}
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4 text-sm">
            {connectionType && (
              <div className="flex items-center space-x-1">
                <span className="opacity-75">Connection:</span>
                <span className="font-medium">{connectionType}</span>
              </div>
            )}
            {effectiveType && (
              <div className="flex items-center space-x-1">
                <span className="opacity-75">Speed:</span>
                <span className="font-medium">{effectiveType.toUpperCase()}</span>
              </div>
            )}
          </div>
        </div>
      </AnimateOnScroll>
    </div>
  );
}

// Connection Quality Indicator (Hidden by default - can be enabled for debugging)
export function ConnectionQuality({ show = false }: { show?: boolean }) {
  const { isOnline, effectiveType, downlink } = useOffline();
  const t = useTranslations('connection');

  // Don't show by default - only for debugging purposes
  if (!show || !isOnline || !effectiveType) return null;

  const getQualityInfo = () => {
    switch (effectiveType) {
      case 'slow-2g':
        return { quality: 'poor', color: 'red' };
      case '2g':
        return { quality: 'poor', color: 'red' };
      case '3g':
        return { quality: 'fair', color: 'yellow' };
      case '4g':
        return { quality: 'good', color: 'green' };
      default:
        return { quality: 'excellent', color: 'green' };
    }
  };

  const { quality, color } = getQualityInfo();

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <div className={`bg-${color}-100 border border-${color}-300 rounded-lg px-3 py-2 shadow-sm`}>
        <div className="flex items-center space-x-2 text-sm">
          <div className={`w-2 h-2 rounded-full bg-${color}-500`} />
          <span className={`text-${color}-800 font-medium text-xs`}>
            {t(quality, { defaultValue: quality })}
          </span>
          {downlink && (
            <span className={`text-${color}-600 text-xs`}>
              {downlink.toFixed(1)} Mbps
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// Offline Actions Queue
export function OfflineActionsQueue() {
  const { isOnline } = useOffline();
  const t = useTranslations('offline');

  // This would typically connect to a queue management system
  const queuedActions = []; // Placeholder

  if (isOnline || queuedActions.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-sm">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-lg">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-blue-800">
              {t('queueTitle', { defaultValue: 'Actions Queued' })}
            </h3>
            <p className="text-xs text-blue-600 mt-1">
              {t('queueDescription', { 
                defaultValue: '{count} actions will be processed when you\'re back online',
                count: queuedActions.length 
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Offline Storage Usage
export function OfflineStorageInfo() {
  const t = useTranslations('storage');

  const getStorageInfo = async () => {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      try {
        const estimate = await navigator.storage.estimate();
        return {
          used: estimate.usage || 0,
          available: estimate.quota || 0,
          percentage: estimate.usage && estimate.quota 
            ? (estimate.usage / estimate.quota) * 100 
            : 0
        };
      } catch (error) {
        console.error('Failed to get storage estimate:', error);
      }
    }
    return null;
  };

  return (
    <div className="text-xs text-gray-500 mt-2">
      {t('storageInfo', { defaultValue: 'Offline storage available' })}
    </div>
  );
}
