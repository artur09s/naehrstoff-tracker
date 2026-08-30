const CACHE="naehrstoff-v12";
const CORE=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)))});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",event=>{
 if(event.request.method!=="GET")return;
 if(event.request.mode==="navigate"){
   event.respondWith(fetch(event.request,{cache:"no-store"}).then(r=>{let c=r.clone();caches.open(CACHE).then(cache=>cache.put("./index.html",c));return r}).catch(()=>caches.match("./index.html")));
   return;
 }
 event.respondWith(fetch(event.request,{cache:"no-store"}).then(r=>{let c=r.clone();caches.open(CACHE).then(cache=>cache.put(event.request,c));return r}).catch(()=>caches.match(event.request)));
});