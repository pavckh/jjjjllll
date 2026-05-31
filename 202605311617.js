// 安装阶段：预缓存关键文件
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll(['./', 'index.html', 'manifest.json']);
    })
  );
});

// 拦截请求：优先返回缓存，没有缓存才联网
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
