var cacheName = 'portfolio-V1';
var filesToCache = [
    '/',                
    '/*',                
    '/portfolio.js',
    '/assets/portfolio.css',
    '/assets/favicon.png',
    '/assets/favicon.ico',
    '/assets/profile_pic.jpg',
    '/assets/icons/*'
];

self.addEventListener('install', async function () {
    const cache = await caches.open(cacheName);
    cache.addAll(staticAssets);
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});
  
self.addEventListener('fetch', event => {
    const request = event.request;
    const url = new URL(request.url);
    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(request));
    } else {
        event.respondWith(networkFirst(request));
    }   
});

async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || fetch(request);
}
  
async function networkFirst(request) {
    const dynamicCache = await caches.open('bhaumik55231');
    try {
        const networkResponse = await fetch(request);
        dynamicCache.put(request, networkResponse.clone());
        return networkResponse;
    } catch (err) {
        const cachedResponse = await dynamicCache.match(request);
        return cachedResponse || await caches.match('./fallback.json');
    }
}