const CACHE_NAME = 'escape-rooms-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './imagenes/icon-192.png',
  './imagenes/icon-512.png',
  // Aquí añade más recursos estáticos que uses, por ejemplo CSS, JS, imágenes
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request);
    })
  );
});