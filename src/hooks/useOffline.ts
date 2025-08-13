'use client';

import { useState, useEffect } from 'react';

export interface OfflineState {
  isOnline: boolean;
  isOffline: boolean;
  wasOffline: boolean;
  connectionType: string | null;
  effectiveType: string | null;
  downlink: number | null;
  rtt: number | null;
}

export function useOffline(): OfflineState {
  const [isOnline, setIsOnline] = useState(true);
  const [wasOffline, setWasOffline] = useState(false);
  const [connectionInfo, setConnectionInfo] = useState({
    connectionType: null as string | null,
    effectiveType: null as string | null,
    downlink: null as number | null,
    rtt: null as number | null,
  });

  useEffect(() => {
    // Initial state
    setIsOnline(navigator.onLine);

    // Get connection info if available
    const updateConnectionInfo = () => {
      const connection = (navigator as any).connection || 
                        (navigator as any).mozConnection || 
                        (navigator as any).webkitConnection;
      
      if (connection) {
        setConnectionInfo({
          connectionType: connection.type || null,
          effectiveType: connection.effectiveType || null,
          downlink: connection.downlink || null,
          rtt: connection.rtt || null,
        });
      }
    };

    updateConnectionInfo();

    // Event listeners
    const handleOnline = () => {
      setIsOnline(true);
      updateConnectionInfo();
      
      // Track analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'connection_restored', {
          event_category: 'connectivity',
          event_label: 'online'
        });
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setWasOffline(true);
      
      // Track analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'connection_lost', {
          event_category: 'connectivity',
          event_label: 'offline'
        });
      }
    };

    const handleConnectionChange = () => {
      updateConnectionInfo();
    };

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', handleConnectionChange);
    }

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      
      if (connection) {
        connection.removeEventListener('change', handleConnectionChange);
      }
    };
  }, []);

  return {
    isOnline,
    isOffline: !isOnline,
    wasOffline,
    connectionType: connectionInfo.connectionType,
    effectiveType: connectionInfo.effectiveType,
    downlink: connectionInfo.downlink,
    rtt: connectionInfo.rtt,
  };
}

// Hook for offline-first data fetching
export function useOfflineData<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: {
    staleTime?: number;
    cacheTime?: number;
    refetchOnReconnect?: boolean;
  } = {}
) {
  const { isOnline, wasOffline } = useOffline();
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isStale, setIsStale] = useState(false);

  const {
    staleTime = 5 * 60 * 1000, // 5 minutes
    cacheTime = 30 * 60 * 1000, // 30 minutes
    refetchOnReconnect = true
  } = options;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Try to get cached data first
        const cachedData = localStorage.getItem(`offline-data-${key}`);
        const cachedTimestamp = localStorage.getItem(`offline-timestamp-${key}`);
        
        if (cachedData && cachedTimestamp) {
          const age = Date.now() - parseInt(cachedTimestamp);
          const parsedData = JSON.parse(cachedData);
          
          setData(parsedData);
          setIsStale(age > staleTime);
          
          // If data is fresh enough and we're offline, use cached data
          if (age < cacheTime && !isOnline) {
            setIsLoading(false);
            return;
          }
        }

        // Fetch fresh data if online
        if (isOnline) {
          const freshData = await fetcher();
          setData(freshData);
          setIsStale(false);
          
          // Cache the fresh data
          localStorage.setItem(`offline-data-${key}`, JSON.stringify(freshData));
          localStorage.setItem(`offline-timestamp-${key}`, Date.now().toString());
        } else if (!cachedData) {
          throw new Error('No cached data available and device is offline');
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [key, isOnline, staleTime, cacheTime]);

  // Refetch when coming back online
  useEffect(() => {
    if (isOnline && wasOffline && refetchOnReconnect) {
      const fetchData = async () => {
        try {
          const freshData = await fetcher();
          setData(freshData);
          setIsStale(false);
          
          localStorage.setItem(`offline-data-${key}`, JSON.stringify(freshData));
          localStorage.setItem(`offline-timestamp-${key}`, Date.now().toString());
        } catch (err) {
          console.error('Failed to refetch data on reconnect:', err);
        }
      };

      fetchData();
    }
  }, [isOnline, wasOffline, refetchOnReconnect, key]);

  const refetch = async () => {
    if (!isOnline) {
      throw new Error('Cannot refetch while offline');
    }

    try {
      setIsLoading(true);
      const freshData = await fetcher();
      setData(freshData);
      setIsStale(false);
      
      localStorage.setItem(`offline-data-${key}`, JSON.stringify(freshData));
      localStorage.setItem(`offline-timestamp-${key}`, Date.now().toString());
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    error,
    isLoading,
    isStale,
    refetch
  };
}
