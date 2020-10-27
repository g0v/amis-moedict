const CACHE_NAME = 'cache-v1';
self.addEventListener('install', function() {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll([
        '/js/deps.js',
        '/s/revdict-amis-def.txt',
        '/s/revdict-amis-ex.txt',
        '/s/stem-words.json',
        '/s/index.json'
    ]);
});
self.addEventListener('fetch', function(event) {
    if (event.request.method != 'GET') return;

    event.respondWith(async function() {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(event.request);

        if (cachedResponse) {
            event.waitUntil(cache.add(event.request));
            return cachedResponse;
        }

        return fetch(event.request).then(function (response) {
            if (response && response.status === 200) {
                cache.put(event.target, response.clone());
            }

            return response;
        });
    }());
});
