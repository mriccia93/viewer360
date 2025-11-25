// Service Worker per Viewer 360 Pro
const CACHE_NAME = 'viewer-360-v2';
const urlsToCache = [
  './',
  './index.html',
  './viewer-360-perfect.html',
  './manifest.json',
  'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js'
];

// Installazione - caching risorse
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching files');
        // Prova a cachare, ma non bloccare se fallisce
        return Promise.allSettled(
          urlsToCache.map(url => 
            cache.add(url).catch(err => {
              console.warn('Failed to cache:', url, err);
            })
          )
        );
      })
      .then(() => self.skipWaiting())
  );
});

// Attivazione - pulizia cache vecchie
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch - strategia cache-first per offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - ritorna dalla cache
        if (response) {
          return response;
        }
        
        // Non in cache - fetch dalla rete
        return fetch(event.request).then(response => {
          // Verifica risposta valida
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clona risposta per cache
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          
          return response;
        });
      })
      .catch(() => {
        // Offline e non in cache - ritorna pagina di fallback
        return caches.match('./viewer-360-perfect.html');
      })
  );
});
