self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("iq-game-cache").then(cache => {
      return cache.addAll(["./", "./index.html", "./script.js", "./questions.js", "./logo.png"]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});