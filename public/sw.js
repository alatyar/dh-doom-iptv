const CACHE_NAME = 'doom-vip-iptv-v1';
const STATIC_CACHE_NAME = 'doom-vip-static-v1';
const DYNAMIC_CACHE_NAME = 'doom-vip-dynamic-v1';

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/en',
  '/ar',
  '/en/pricing',
  '/ar/pricing',
  '/en/downloads',
  '/ar/downloads',
  '/en/faq',
  '/ar/faq',
  '/en/contact',
  '/ar/contact',
  '/manifest.json',
  '/offline.html',
  '/images/favicon.ico',
  '/images/favicon-16x16.png',
  '/images/favicon-32x32.png',
  '/images/apple-touch-icon.png',
  '/images/android-chrome-192x192.png',
  '/images/android-chrome-512x512.png',
  '/images/DH-Plus-vip-logo.webp',
  '/images/doom_smarter_vip-logo.avif',
  '/images/doom-vip-back.webp',
  '/images/DH-Plus-vip-back.jpg'
];

// Runtime caching strategies
const CACHE_STRATEGIES = {
  images: {
    cacheName: 'images-cache',
    maxEntries: 50,
    maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
  },
  api: {
    cacheName: 'api-cache',
    maxEntries: 20,
    maxAgeSeconds: 5 * 60 // 5 minutes
  },
  fonts: {
    cacheName: 'fonts-cache',
    maxEntries: 10,
    maxAgeSeconds: 365 * 24 * 60 * 60 // 1 year
  }
};

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Service Worker: Static files cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Error caching static files', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external requests (except for fonts and APIs we want to cache)
  if (url.origin !== location.origin && !shouldCacheExternal(url)) {
    return;
  }

  // Different strategies for different types of requests
  if (request.destination === 'image') {
    event.respondWith(handleImageRequest(request));
  } else if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request));
  } else if (request.destination === 'font') {
    event.respondWith(handleFontRequest(request));
  } else {
    event.respondWith(handlePageRequest(request));
  }
});

// Check if external URL should be cached
function shouldCacheExternal(url) {
  const allowedDomains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com'
  ];
  return allowedDomains.some(domain => url.hostname.includes(domain));
}

// Handle page requests (Cache First with Network Fallback)
async function handlePageRequest(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('Service Worker: Serving page from cache', request.url);
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Network failed, serving offline page');
    if (request.mode === 'navigate') {
      return caches.match('/offline.html');
    }
    throw error;
  }
}

// Handle image requests (Cache First)
async function handleImageRequest(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.status === 200) {
      const cache = await caches.open(CACHE_STRATEGIES.images.cacheName);
      cache.put(request, networkResponse.clone());

      // Clean up old entries
      cleanupCache(CACHE_STRATEGIES.images.cacheName, CACHE_STRATEGIES.images.maxEntries);
    }
    return networkResponse;
  } catch (error) {
    // Return a placeholder image or cached version
    return caches.match('/images/placeholder.png') || new Response('', { status: 404 });
  }
}

// Handle API requests (Network First with Cache Fallback)
async function handleApiRequest(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.status === 200) {
      const cache = await caches.open(CACHE_STRATEGIES.api.cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Handle font requests (Cache First, Long Term)
async function handleFontRequest(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.status === 200) {
      const cache = await caches.open(CACHE_STRATEGIES.fonts.cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    throw error;
  }
}

// Clean up cache entries
async function cleanupCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();

  if (keys.length > maxEntries) {
    const keysToDelete = keys.slice(0, keys.length - maxEntries);
    await Promise.all(keysToDelete.map(key => cache.delete(key)));
  }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle background sync tasks
      console.log('Service Worker: Performing background sync')
    );
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push received');
  
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/images/android-chrome-192x192.png',
    badge: '/images/favicon-32x32.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Details',
        icon: '/images/favicon-16x16.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/images/favicon-16x16.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('DOOM VIP IPTV', options)
  );
});

// Notification click
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked');
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
