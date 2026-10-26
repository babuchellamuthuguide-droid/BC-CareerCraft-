// BC CareerCraft service worker: lets the app open and work offline.
// Pages and scripts are fetched from the network first (so updates show up),
// and the last good copy is used when the phone is offline.
// The large college list is kept on the device after the first download.

const CACHE = "bc-careercraft-v1";
const CORE = [
  "./", "index.html", "style.css", "script.js", "data.js",
  "favicon.svg", "manifest.webmanifest", "icon-192.png", "icon-512.png"
];
const BIG_FILE = "colleges.json";

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(CORE);
    try {
      await cache.add(BIG_FILE); // nice to have; ignore if it fails
    } catch (error) {
      // The college list will be cached the first time it is used.
    }
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(
      names
        .filter(name => name.startsWith("bc-careercraft-") && name !== CACHE)
        .map(name => caches.delete(name))
    );
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(handleRequest(request, url));
});

async function handleRequest(request, url) {
  const cache = await caches.open(CACHE);

  // Big file: use the saved copy right away, refresh it quietly in the background.
  if (url.pathname.endsWith("/" + BIG_FILE)) {
    const saved = await cache.match(request);
    if (saved) {
      fetch(request)
        .then(fresh => { if (fresh && fresh.ok) cache.put(request, fresh); })
        .catch(() => {});
      return saved;
    }
  }

  try {
    const fresh = await fetch(request);
    if (fresh && fresh.ok) cache.put(request, fresh.clone());
    return fresh;
  } catch (error) {
    const saved = await cache.match(request, { ignoreSearch: true });
    if (saved) return saved;

    if (request.mode === "navigate") {
      const page = await cache.match("index.html");
      if (page) return page;
    }
    throw error;
  }
}
