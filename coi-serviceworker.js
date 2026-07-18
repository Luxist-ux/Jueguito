/*! coi-serviceworker v0.1.7 | MIT License | https://github.com/gzguidoti/coi-serviceworker */
if (typeof window === 'undefined') {
    self.addEventListener('install', () => self.skipWaiting());
    self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
    self.addEventListener('fetch', (e) => {
        if (e.request.cache === 'only-if-cached' && e.request.mode !== 'same-origin') return;
        e.respondWith(
            fetch(e.request)
                .then((r) => {
                    if (r.status === 0) return r;
                    const h = new Headers(r.headers);
                    h.set('Cross-Origin-Embedder-Policy', 'require-corp');
                    h.set('Cross-Origin-Opener-Policy', 'same-origin');
                    return new Response(r.body, { status: r.status, statusText: r.statusText, headers: h });
                })
                .catch((err) => console.error(err))
        );
    });
} else {
    const s = document.currentScript;
    if (s && s.hasAttribute('data-coi-file')) {
        const script = document.createElement('script');
        script.src = s.getAttribute('data-coi-file');
        document.head.appendChild(script);
    } else {
        navigator.serviceWorker.register(window.location.pathname + 'coi-serviceworker.js');
    }
}
