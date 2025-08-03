const CACHE_NAME = "movie-app-cache-v1";
const urlsToCache = ["/", "/index.html", "/offline.html"];

// 安装阶段：预缓存
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

// 捕获网络请求
self.addEventListener("fetch", event => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request).then(response => {
                return response || caches.match("/offline.html");
            });
        })
    );
});

// 激活阶段：清理旧缓存
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) return caches.delete(cache);
                })
            );
        })
    );
});
