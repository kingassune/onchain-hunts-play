// Offline fallback for an Onchain Hunts loader (one per game directory).
// Network first for this directory's page navigations; the last good loader is
// kept so a revisit without a connection still starts, and the loader then
// shows its own verified copy of the app (see loader.html). Never touches
// cross-origin requests (RPC) or anything but same-origin GET navigations.
const CACHE = "onchain-loader-v1";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (e) => {
  const r = e.request;
  if (r.method !== "GET" || r.mode !== "navigate" || new URL(r.url).origin !== location.origin) return;
  e.respondWith((async () => {
    const key = new URL(r.url); key.search = ""; key.hash = "";
    try {
      const res = await fetch(r);
      if (res.ok && res.type === "basic") { const c = await caches.open(CACHE); await c.put(key.href, res.clone()); }
      return res;
    } catch (err) {
      const hit = await (await caches.open(CACHE)).match(key.href);
      if (hit) return hit;
      throw err;
    }
  })());
});
