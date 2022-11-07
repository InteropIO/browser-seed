/* eslint-disable no-restricted-globals */
console.log("Service Worker initialized!");
self.addEventListener("install", event => {
  //console.log("??", "install", event);
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  //console.log("??", "activate", event);
  return self.clients.claim();
});

self.addEventListener("fetch", function(event) {
  //console.log("??", "fetch", event);
  // event.respondWith(fetch(event.request));
});

self.addEventListener("message", function(event) {
  //console.log(event.data);
  event.ports[0].postMessage({ test: "This is my response." });
});
