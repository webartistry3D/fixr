const CACHE_NAME = 'fixr-v1';
const urlsToCache = [
  '/handymen.json'  // ONLY cache the JSON data
];

// Install event: cache handymen.json
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching handymen.json...');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Fetch event: only serve cached handymen.json, always fetch fresh pages
self.addEventListener('fetch', (event) => {
  const requestURL = new URL(event.request.url);

  // Only intercept /handymen.json requests
  if (requestURL.pathname === '/handymen.json') {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          // Return cached JSON immediately
          return response;
        }
        // Fetch from network if not cached
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        });
      })
    );
  } else {
    // For all other requests (HTML, CSS, JS), bypass cache
    event.respondWith(fetch(event.request));
  }
});

// Activate event: clean old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
  self.clients.claim();
});
