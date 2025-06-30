self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('escape-ruta-v1').then(cache =>
      cache.addAll([
        './',
        './index.html',
        './estilos.css',
        './manifest.json',
        './notificaciones.js'
      ])
    )
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});