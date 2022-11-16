/* eslint-disable no-restricted-globals */
self.importScripts("/web.worker.umd.js");

/* eslint-disable no-restricted-globals */
self.addEventListener("activate", async () => {
    self.clients.claim();
    console.log("service worker activated");
});

self.addEventListener("fetch", function (event) {
    //
});

self.GlueWebWorker({
    platform: { openIfMissing: true }
});
