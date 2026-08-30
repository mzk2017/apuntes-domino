const CACHE = 'apuntes-domino-v32';
const FILES = ['.', 'index.html', 'manifest.json', 'opencv.js', 'count.js', 'pollona.mp4',
  'fb-app.js', 'fb-auth.js', 'fb-db.js', 'fb-appcheck.js',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-180.png',
  'sounds/ficha.mp3', 'sounds/puno.mp3',
  'sounds/gal01.mp3', 'sounds/gal02.mp3', 'sounds/gal03.mp3',
  'sounds/gal04.mp3', 'sounds/gal05.mp3',
  'sounds/chicken3.mp3', 'sounds/hen04.mp3', 'sounds/hen05.mp3',
  'sounds/hen06.mp3', 'sounds/hen07.mp3', 'sounds/hen08.mp3', 'sounds/hen09.mp3'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // La página principal: primero internet (para recibir actualizaciones al
  // instante), y si no hay conexión, la copia guardada.
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then((resp) => {
          const copy = resp.clone();
          caches.open(CACHE).then((c) => c.put('index.html', copy));
          return resp;
        })
        .catch(() =>
          caches.match('index.html').then((hit) => hit || caches.match('.'))
        )
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then((hit) => hit || fetch(e.request))
  );
});
