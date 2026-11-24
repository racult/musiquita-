// musica-v13
const CACHE = 'musica-v13';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || r.headers.has('range')) return;
  e.respondWith(
    fetch(r, { cache: 'no-store' }).then(res => {
      if (res.ok && new URL(r.url).origin === location.origin) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(r, copy)); }
      return res;
    }).catch(() => caches.match(r).then(x => x || caches.match('./index.html')))
  );
});
