const CACHE="atl-lab-shell-v1";
const CORE=["/","/index.html","/manifest.webmanifest","/icons/icon-192.png","/icons/icon-512.png"];
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE))));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener("fetch",event=>{const u=new URL(event.request.url);if(event.request.method!=="GET"||u.origin!==location.origin)return;event.respondWith(fetch(event.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(event.request,copy));return r;}).catch(()=>caches.match(event.request).then(r=>r||caches.match("/index.html"))));});
