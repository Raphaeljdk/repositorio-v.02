// ==================== SERVICE WORKER - VERSÃO 4.0 ====================
// Portfolio PWA Service Worker - Versão Otimizada
// Autor: Raphael Freitas
// Versão: 4.0.0

// ==================== CONFIGURAÇÃO ====================
const CONFIG = {
    version: '4.0.0',
    cacheName: 'portfolio-raphael-v4',
    debug: false,
    
    // Estratégias de cache
    strategies: {
        html: 'stale-while-revalidate',
        static: 'cache-first',
        api: 'network-first',
        images: 'cache-first',
        fonts: 'cache-first'
    },
    
    // Limites de cache
    limits: {
        images: 50,
        api: 100,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
        maxItems: 200
    },
    
    // URLs para cache na instalação
    precacheUrls: [
        '/',
        '/index.html',
        '/offline.html',
        '/style.css',
        '/script.js',
        '/manifest.json',
        '/sw.js',
        
        // Assets essenciais
        '/assets/icons/favicon.ico',
        '/assets/icons/icon-192x192.png',
        '/assets/icons/icon-512x512.png',
        
        // Fonts e CDNs (apenas CSS, não os arquivos de fonte)
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
    ],
    
    // Padrões de URL para diferentes estratégias
    patterns: {
        html: /(\/|\.html)$/,
        static: /\.(js|css|json|xml|txt|map)$/,
        images: /\.(png|jpg|jpeg|gif|webp|svg|ico|avif)$/,
        fonts: /\.(woff|woff2|ttf|eot|otf)$|fonts\.(googleapis|gstatic)\.com/,
        api: /api\.|github\.com\/(users|repos)/,
        cdn: /cdn\.|jsdelivr\.net|cloudflare\.com|unpkg\.com/
    },
    
    // URLs que NÃO devem ser cacheadas
    excludeFromCache: [
        /chrome-extension:/,
        /google-analytics/,
        /gtag/,
        /analytics/,
        /sockjs-node/,
        /hot-update/,
        /livereload/
    ]
};

// ==================== UTILITÁRIOS ====================
class Logger {
    static log(...args) {
        if (CONFIG.debug) console.log(`[SW ${CONFIG.version}]`, ...args);
    }
    
    static error(...args) {
        console.error(`[SW ${CONFIG.version}]`, ...args);
    }
    
    static warn(...args) {
        console.warn(`[SW ${CONFIG.version}]`, ...args);
    }
    
    static info(...args) {
        console.info(`[SW ${CONFIG.version}]`, ...args);
    }
}

class CacheManager {
    constructor(cacheName) {
        this.cacheName = cacheName;
    }
    
    async open() {
        return await caches.open(this.cacheName);
    }
    
    async get(request) {
        try {
            const cache = await this.open();
            const response = await cache.match(request);
            
            if (response) {
                Logger.log('✅ Cache hit:', request.url);
            }
            
            return response;
        } catch (error) {
            Logger.error('❌ Cache get error:', error);
            return null;
        }
    }
    
    async put(request, response) {
        if (!response || !response.ok || response.status !== 200) {
            return;
        }
        
        // Verificar tamanho do cache
        if (response.headers) {
            const contentLength = response.headers.get('content-length');
            if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) {
                Logger.warn('⚠️ File too large for cache:', request.url);
                return;
            }
        }
        
        try {
            const cache = await this.open();
            
            // Limitar número de itens no cache
            const keys = await cache.keys();
            if (keys.length >= CONFIG.limits.maxItems) {
                const oldestKey = keys[0];
                await cache.delete(oldestKey);
                Logger.log('🗑️ Removed oldest cache item');
            }
            
            await cache.put(request, response.clone());
            Logger.log('💾 Cached:', request.url);
        } catch (error) {
            Logger.error('❌ Cache put error:', error);
        }
    }
    
    async delete(request) {
        try {
            const cache = await this.open();
            const deleted = await cache.delete(request);
            if (deleted) {
                Logger.log('🗑️ Deleted from cache:', request.url);
            }
            return deleted;
        } catch (error) {
            Logger.error('❌ Cache delete error:', error);
            return false;
        }
    }
    
    async clear() {
        try {
            await caches.delete(this.cacheName);
            Logger.info('🧹 Cache cleared:', this.cacheName);
        } catch (error) {
            Logger.error('❌ Cache clear error:', error);
        }
    }
    
    async cleanup(maxAge = CONFIG.limits.maxAge) {
        try {
            const cache = await this.open();
            const requests = await cache.keys();
            const now = Date.now();
            let deletedCount = 0;
            
            // Limitar número de imagens
            const imageRequests = requests.filter(req => 
                CONFIG.patterns.images.test(req.url)
            );
            
            if (imageRequests.length > CONFIG.limits.images) {
                const toDelete = imageRequests.slice(0, imageRequests.length - CONFIG.limits.images);
                for (const req of toDelete) {
                    await cache.delete(req);
                    deletedCount++;
                }
            }
            
            // Remover itens expirados
            for (const request of requests) {
                const response = await cache.match(request);
                if (response) {
                    const dateHeader = response.headers.get('date');
                    const cacheTime = dateHeader ? new Date(dateHeader).getTime() : now;
                    
                    if (now - cacheTime > maxAge) {
                        await cache.delete(request);
                        deletedCount++;
                    }
                }
            }
            
            if (deletedCount > 0) {
                Logger.info(`🧹 Cleaned up ${deletedCount} items`);
            }
        } catch (error) {
            Logger.error('❌ Cleanup error:', error);
        }
    }
    
    async getAllKeys() {
        try {
            const cache = await this.open();
            return await cache.keys();
        } catch (error) {
            Logger.error('❌ Get keys error:', error);
            return [];
        }
    }
}

// ==================== VERIFICAÇÕES DE URL ====================
function shouldCache(request) {
    const url = request.url;
    
    // Verificar exclusões
    for (const pattern of CONFIG.excludeFromCache) {
        if (pattern.test(url)) {
            Logger.log('⏭️ Excluded from cache:', url);
            return false;
        }
    }
    
    // Apenas GET
    if (request.method !== 'GET') {
        return false;
    }
    
    // Apenas HTTP/HTTPS
    if (!url.startsWith('http')) {
        return false;
    }
    
    return true;
}

function getStrategyForRequest(request) {
    const url = request.url;
    const destination = request.destination;
    
    // HTML - Stale While Revalidate
    if (CONFIG.patterns.html.test(url) || destination === 'document') {
        return 'staleWhileRevalidate';
    }
    
    // API e GitHub - Network First
    if (CONFIG.patterns.api.test(url)) {
        return 'networkFirst';
    }
    
    // Imagens - Cache First
    if (CONFIG.patterns.images.test(url) || destination === 'image') {
        return 'cacheFirst';
    }
    
    // Fontes - Cache First
    if (CONFIG.patterns.fonts.test(url) || destination === 'font') {
        return 'cacheFirst';
    }
    
    // Assets estáticos - Cache First
    if (CONFIG.patterns.static.test(url) || 
        ['script', 'style', 'manifest'].includes(destination)) {
        return 'cacheFirst';
    }
    
    // CDN - Cache First
    if (CONFIG.patterns.cdn.test(url)) {
        return 'cacheFirst';
    }
    
    // Default - Network First
    return 'networkFirst';
}

// ==================== ESTRATÉGIAS DE CACHE ====================
const strategies = {
    // Cache First: Ideal para assets estáticos
    async cacheFirst(request) {
        const cachedResponse = await cacheManager.get(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        try {
            const networkResponse = await fetch(request, {
                mode: 'cors',
                credentials: 'same-origin'
            });
            
            if (networkResponse && networkResponse.ok) {
                await cacheManager.put(request, networkResponse);
            }
            
            return networkResponse;
        } catch (error) {
            Logger.error('❌ Network error (cache-first):', error);
            
            // Retornar fallback para imagens
            if (request.destination === 'image') {
                return createOfflineImage();
            }
            
            throw error;
        }
    },
    
    // Network First: Ideal para APIs
    async networkFirst(request) {
        const timeout = 5000; // 5 segundos timeout
        
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);
            
            const networkResponse = await fetch(request, {
                signal: controller.signal,
                mode: 'cors',
                credentials: 'same-origin'
            });
            
            clearTimeout(timeoutId);
            
            if (networkResponse && networkResponse.ok) {
                await cacheManager.put(request, networkResponse);
                return networkResponse;
            }
            
            throw new Error('Network response not ok');
        } catch (error) {
            Logger.warn('⚠️ Network failed, falling back to cache:', request.url);
            
            const cachedResponse = await cacheManager.get(request);
            if (cachedResponse) {
                return cachedResponse;
            }
            
            // Para APIs, retornar dados mockados se disponível
            if (CONFIG.patterns.api.test(request.url)) {
                const mockResponse = createMockApiResponse(request.url);
                if (mockResponse) return mockResponse;
            }
            
            throw error;
        }
    },
    
    // Stale While Revalidate: Ideal para HTML
    async staleWhileRevalidate(request) {
        const cachedResponse = await cacheManager.get(request);
        
        // Buscar atualização em background
        const fetchPromise = fetch(request, {
            mode: 'same-origin',
            credentials: 'same-origin'
        })
            .then(async (networkResponse) => {
                if (networkResponse && networkResponse.ok) {
                    await cacheManager.put(request, networkResponse);
                    Logger.log('🔄 Background updated:', request.url);
                }
                return networkResponse;
            })
            .catch(error => {
                Logger.warn('⚠️ Background fetch failed:', error);
                return null;
            });
        
        // Retornar cache imediatamente ou esperar rede
        return cachedResponse || fetchPromise;
    },
    
    // Cache Only
    async cacheOnly(request) {
        const cachedResponse = await cacheManager.get(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        throw new Error('Not in cache');
    },
    
    // Network Only
    async networkOnly(request) {
        return await fetch(request);
    }
};

// ==================== RESPOSTAS FALLBACK ====================
function createOfflineImage() {
    const svg = `
        <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#1e293b;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#0f172a;stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#grad)"/>
            <text x="200" y="140" text-anchor="middle" fill="#3b82f6" font-family="system-ui" font-size="24" font-weight="bold">
                📷 Imagem Offline
            </text>
            <text x="200" y="170" text-anchor="middle" fill="#6b7280" font-family="system-ui" font-size="14">
                Conecte-se para carregar
            </text>
        </svg>
    `;
    
    return new Response(svg, {
        status: 200,
        headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': 'no-cache'
        }
    });
}

function createOfflinePage() {
    return new Response(
        `<!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Offline - Raphael Freitas</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    font-family: 'Inter', system-ui, sans-serif;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    margin: 0;
                    background: linear-gradient(135deg, #0a0c10 0%, #1a1f2e 100%);
                    color: #fff;
                    padding: 20px;
                }
                .offline-container {
                    text-align: center;
                    padding: 40px;
                    max-width: 500px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 20px;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .icon {
                    font-size: 4rem;
                    margin-bottom: 20px;
                }
                h1 { 
                    font-size: 2.5rem; 
                    margin-bottom: 15px;
                    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                p { 
                    color: #9ca3af; 
                    margin-bottom: 30px;
                    line-height: 1.6;
                    font-size: 1.1rem;
                }
                .btn-group {
                    display: flex;
                    gap: 10px;
                    justify-content: center;
                    flex-wrap: wrap;
                }
                .btn {
                    display: inline-block;
                    padding: 12px 24px;
                    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
                    color: white;
                    text-decoration: none;
                    border-radius: 30px;
                    font-weight: 600;
                    transition: all 0.3s;
                    border: none;
                    cursor: pointer;
                    font-size: 1rem;
                }
                .btn-outline {
                    background: transparent;
                    border: 2px solid #3b82f6;
                    color: #3b82f6;
                }
                .btn:hover { 
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
                }
                .btn-outline:hover {
                    background: rgba(59, 130, 246, 0.1);
                }
                .status { 
                    margin-top: 25px; 
                    font-size: 0.85rem;
                    color: #6b7280;
                }
                .features {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    margin: 20px 0;
                }
                .feature {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 5px;
                }
                .feature-icon {
                    font-size: 1.5rem;
                }
                .feature-text {
                    font-size: 0.75rem;
                    color: #6b7280;
                }
            </style>
        </head>
        <body>
            <div class="offline-container">
                <div class="icon">📡</div>
                <h1>Modo Offline</h1>
                <p>Você está sem conexão com a internet. Alguns recursos do portfólio podem estar indisponíveis.</p>
                
                <div class="features">
                    <div class="feature">
                        <span class="feature-icon">📁</span>
                        <span class="feature-text">Projetos</span>
                    </div>
                    <div class="feature">
                        <span class="feature-icon">📊</span>
                        <span class="feature-text">Skills</span>
                    </div>
                    <div class="feature">
                        <span class="feature-icon">📝</span>
                        <span class="feature-text">Blog</span>
                    </div>
                </div>
                
                <div class="btn-group">
                    <button onclick="location.reload()" class="btn">🔄 Tentar novamente</button>
                    <a href="/" class="btn btn-outline">🏠 Início</a>
                </div>
                
                <div class="status">
                    Service Worker v${CONFIG.version} • Raphael Freitas
                </div>
            </div>
            
            <script>
                // Verificar conexão periodicamente
                let checkInterval = setInterval(() => {
                    if (navigator.onLine) {
                        location.reload();
                    }
                }, 5000);
                
                // Limpar intervalo se sair da página
                window.addEventListener('beforeunload', () => {
                    clearInterval(checkInterval);
                });
            </script>
        </body>
        </html>`,
        {
            status: 200,
            statusText: 'OK',
            headers: {
                'Content-Type': 'text/html',
                'Cache-Control': 'no-cache'
            }
        }
    );
}

function createMockApiResponse(url) {
    // Mock para GitHub API
    if (url.includes('api.github.com/users')) {
        const mockData = {
            login: 'Raphaeljdk',
            name: 'Raphael Freitas',
            bio: 'Desenvolvedor Full Stack | SAP | TMS | JavaScript | Java',
            public_repos: 25,
            followers: 50,
            following: 30
        };
        
        return new Response(JSON.stringify(mockData), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'X-SW-Mock': 'true'
            }
        });
    }
    
    // Mock para repositórios
    if (url.includes('api.github.com/users') && url.includes('repos')) {
        const mockRepos = [
            { name: 'portfolio', description: 'Meu portfólio profissional', stargazers_count: 5 },
            { name: 'sap-integration', description: 'Projeto de integração SAP', stargazers_count: 3 },
            { name: 'tms-dashboard', description: 'Dashboard para TMS', stargazers_count: 2 }
        ];
        
        return new Response(JSON.stringify(mockRepos), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'X-SW-Mock': 'true'
            }
        });
    }
    
    return null;
}

// ==================== INSTÂNCIA DO CACHE MANAGER ====================
const cacheManager = new CacheManager(CONFIG.cacheName);

// ==================== INSTALAÇÃO ====================
self.addEventListener('install', (event) => {
    Logger.info('🚀 Installing Service Worker', CONFIG.version);
    
    event.waitUntil(
        (async () => {
            try {
                // Pular waiting e ativar imediatamente
                await self.skipWaiting();
                
                const cache = await cacheManager.open();
                
                // Precache em lotes para não sobrecarregar
                Logger.info(`📦 Precaching ${CONFIG.precacheUrls.length} URLs...`);
                
                const batchSize = 3;
                let successCount = 0;
                let failCount = 0;
                
                for (let i = 0; i < CONFIG.precacheUrls.length; i += batchSize) {
                    const batch = CONFIG.precacheUrls.slice(i, i + batchSize);
                    
                    const results = await Promise.allSettled(
                        batch.map(async (url) => {
                            try {
                                const response = await fetch(url, {
                                    mode: 'cors',
                                    credentials: 'same-origin'
                                });
                                
                                if (response && response.ok) {
                                    await cache.put(url, response);
                                    successCount++;
                                    Logger.log(`  ✓ ${url}`);
                                } else {
                                    failCount++;
                                    Logger.warn(`  ⚠️ ${url} (${response?.status})`);
                                }
                            } catch (error) {
                                failCount++;
                                Logger.warn(`  ✗ ${url} (${error.message})`);
                            }
                        })
                    );
                    
                    // Pequena pausa entre lotes
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
                
                Logger.info(`✅ Installation complete (${successCount} cached, ${failCount} failed)`);
                
            } catch (error) {
                Logger.error('❌ Install error:', error);
            }
        })()
    );
});

// ==================== ATIVAÇÃO ====================
self.addEventListener('activate', (event) => {
    Logger.info('🎯 Activating Service Worker', CONFIG.version);
    
    event.waitUntil(
        (async () => {
            try {
                // Limpar caches antigos
                const cacheNames = await caches.keys();
                const oldCaches = cacheNames.filter(name => 
                    name.startsWith('portfolio-') && name !== CONFIG.cacheName
                );
                
                if (oldCaches.length > 0) {
                    Logger.info(`🗑️ Deleting ${oldCaches.length} old caches...`);
                    
                    await Promise.all(
                        oldCaches.map(async (name) => {
                            await caches.delete(name);
                            Logger.log(`  ✓ Deleted: ${name}`);
                        })
                    );
                }
                
                // Limpar itens expirados do cache atual
                await cacheManager.cleanup();
                
                // Reivindicar todos os clientes
                await self.clients.claim();
                
                Logger.info('✅ Activation complete - controlling all clients');
                
                // Notificar clientes sobre ativação
                const clients = await self.clients.matchAll();
                clients.forEach(client => {
                    client.postMessage({
                        type: 'SW_ACTIVATED',
                        version: CONFIG.version,
                        timestamp: Date.now()
                    });
                });
                
            } catch (error) {
                Logger.error('❌ Activation error:', error);
            }
        })()
    );
});

// ==================== FETCH ====================
self.addEventListener('fetch', (event) => {
    const request = event.request;
    
    // Verificar se deve cachear
    if (!shouldCache(request)) {
        return;
    }
    
    const strategy = getStrategyForRequest(request);
    
    event.respondWith(
        (async () => {
            try {
                const response = await strategies[strategy](request);
                return response;
            } catch (error) {
                Logger.error('❌ Fetch error:', error);
                
                // Fallback para navegação offline
                if (request.mode === 'navigate' || request.destination === 'document') {
                    // Tentar página offline cacheada primeiro
                    const offlinePage = await caches.match('/offline.html');
                    if (offlinePage) {
                        return offlinePage;
                    }
                    
                    // Criar página offline inline
                    return createOfflinePage();
                }
                
                // Fallback para imagens
                if (request.destination === 'image') {
                    return createOfflineImage();
                }
                
                // Resposta de erro padrão
                return new Response('Offline - Recurso não disponível', {
                    status: 503,
                    statusText: 'Service Unavailable',
                    headers: {
                        'Content-Type': 'text/plain',
                        'Cache-Control': 'no-cache'
                    }
                });
            }
        })()
    );
});

// ==================== MESSAGE HANDLER ====================
self.addEventListener('message', (event) => {
    const data = event.data;
    const client = event.source;
    
    if (!data || !data.type) return;
    
    Logger.log('📨 Message received:', data.type);
    
    switch (data.type) {
        case 'SKIP_WAITING':
            self.skipWaiting();
            client?.postMessage({ type: 'SKIP_WAITING_DONE' });
            break;
            
        case 'CLEAR_CACHE':
            event.waitUntil(
                (async () => {
                    await cacheManager.clear();
                    client?.postMessage({ 
                        type: 'CACHE_CLEARED',
                        timestamp: Date.now()
                    });
                })()
            );
            break;
            
        case 'CLEANUP_CACHE':
            event.waitUntil(
                (async () => {
                    await cacheManager.cleanup();
                    client?.postMessage({ 
                        type: 'CACHE_CLEANED',
                        timestamp: Date.now()
                    });
                })()
            );
            break;
            
        case 'CACHE_URL':
            if (data.url) {
                event.waitUntil(
                    (async () => {
                        try {
                            const response = await fetch(data.url);
                            if (response.ok) {
                                await cacheManager.put(new Request(data.url), response);
                                client?.postMessage({ 
                                    type: 'URL_CACHED', 
                                    url: data.url,
                                    success: true
                                });
                            }
                        } catch (error) {
                            Logger.error('Failed to cache URL:', error);
                            client?.postMessage({ 
                                type: 'URL_CACHED', 
                                url: data.url,
                                success: false,
                                error: error.message
                            });
                        }
                    })()
                );
            }
            break;
            
        case 'GET_VERSION':
            client?.postMessage({ 
                type: 'VERSION', 
                version: CONFIG.version,
                cacheName: CONFIG.cacheName
            });
            break;
            
        case 'GET_CACHE_STATS':
            event.waitUntil(
                (async () => {
                    const keys = await cacheManager.getAllKeys();
                    const stats = {
                        totalItems: keys.length,
                        version: CONFIG.version,
                        cacheName: CONFIG.cacheName
                    };
                    client?.postMessage({ 
                        type: 'CACHE_STATS', 
                        stats
                    });
                })()
            );
            break;
            
        case 'CHECK_UPDATE':
            event.waitUntil(
                (async () => {
                    try {
                        const response = await fetch('/sw.js', { 
                            cache: 'no-cache' 
                        });
                        
                        if (response.ok) {
                            const text = await response.text();
                            const versionMatch = text.match(/version:\s*['"]([^'"]+)['"]/);
                            const newVersion = versionMatch ? versionMatch[1] : null;
                            
                            client?.postMessage({ 
                                type: 'UPDATE_STATUS', 
                                hasUpdate: newVersion && newVersion !== CONFIG.version,
                                currentVersion: CONFIG.version,
                                newVersion
                            });
                        }
                    } catch (error) {
                        Logger.error('Update check failed:', error);
                        client?.postMessage({ 
                            type: 'UPDATE_STATUS', 
                            error: error.message
                        });
                    }
                })()
            );
            break;
            
        case 'TRACK_EVENT':
            if (data.event) {
                event.waitUntil(
                    (async () => {
                        try {
                            const cache = await caches.open('analytics-queue');
                            const eventData = {
                                ...data.event,
                                timestamp: Date.now(),
                                offline: !navigator.onLine,
                                swVersion: CONFIG.version
                            };
                            
                            await cache.put(
                                new Request(`/analytics/${Date.now()}`),
                                new Response(JSON.stringify(eventData))
                            );
                            
                            Logger.log('📊 Event queued for sync');
                            
                            // Tentar registrar sync
                            if ('sync' in self.registration) {
                                await self.registration.sync.register('sync-analytics');
                            }
                            
                            client?.postMessage({ 
                                type: 'EVENT_QUEUED',
                                success: true
                            });
                        } catch (error) {
                            Logger.error('Failed to queue event:', error);
                            client?.postMessage({ 
                                type: 'EVENT_QUEUED',
                                success: false,
                                error: error.message
                            });
                        }
                    })()
                );
            }
            break;
            
        case 'PRECACHE_PROJECTS':
            if (data.projects && Array.isArray(data.projects)) {
                event.waitUntil(
                    (async () => {
                        const imageUrls = data.projects
                            .map(p => p.image || p.thumbnail || p.images?.thumbnail)
                            .filter(url => url && typeof url === 'string');
                        
                        Logger.info(`📸 Precaching ${imageUrls.length} project images...`);
                        
                        let cached = 0;
                        for (const url of imageUrls) {
                            try {
                                const response = await fetch(url);
                                if (response.ok) {
                                    await cacheManager.put(new Request(url), response);
                                    cached++;
                                }
                            } catch (error) {
                                Logger.warn('Failed to precache image:', url);
                            }
                        }
                        
                        client?.postMessage({ 
                            type: 'PROJECTS_PRECACHED',
                            total: imageUrls.length,
                            cached
                        });
                    })()
                );
            }
            break;
            
        default:
            Logger.warn('Unknown message type:', data.type);
    }
});

// ==================== BACKGROUND SYNC ====================
self.addEventListener('sync', (event) => {
    Logger.log('🔄 Sync event:', event.tag);
    
    switch (event.tag) {
        case 'sync-analytics':
            event.waitUntil(syncAnalytics());
            break;
            
        case 'sync-comments':
            event.waitUntil(syncComments());
            break;
            
        case 'sync-all':
            event.waitUntil(syncAllData());
            break;
            
        default:
            if (event.tag.startsWith('sync-')) {
                event.waitUntil(syncGenericData(event.tag));
            }
    }
});

async function syncAnalytics() {
    try {
        const cache = await caches.open('analytics-queue');
        const requests = await cache.keys();
        
        if (requests.length === 0) return;
        
        Logger.info(`📊 Syncing ${requests.length} analytics events`);
        
        let synced = 0;
        for (const request of requests) {
            try {
                const response = await cache.match(request);
                const data = await response.json();
                
                // Enviar para o endpoint de analytics
                const syncResponse = await fetch('/api/analytics', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                
                if (syncResponse.ok) {
                    await cache.delete(request);
                    synced++;
                }
            } catch (error) {
                Logger.warn('Failed to sync analytics event:', error);
            }
        }
        
        Logger.info(`✅ Synced ${synced}/${requests.length} analytics events`);
    } catch (error) {
        Logger.error('❌ Analytics sync error:', error);
    }
}

async function syncComments() {
    try {
        const cache = await caches.open('comments-queue');
        const requests = await cache.keys();
        
        if (requests.length === 0) return;
        
        for (const request of requests) {
            try {
                const response = await cache.match(request);
                const data = await response.json();
                
                const syncResponse = await fetch('/api/comments', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                
                if (syncResponse.ok) {
                    await cache.delete(request);
                }
            } catch (error) {
                Logger.warn('Failed to sync comment:', error);
            }
        }
    } catch (error) {
        Logger.error('❌ Comments sync error:', error);
    }
}

async function syncAllData() {
    await Promise.allSettled([
        syncAnalytics(),
        syncComments()
    ]);
}

async function syncGenericData(tag) {
    Logger.log('Syncing generic data:', tag);
    // Implementação para outros tipos de sync
}

// ==================== PUSH NOTIFICATIONS ====================
self.addEventListener('push', (event) => {
    Logger.log('📬 Push received');
    
    let data = {
        title: 'Raphael Freitas | Portfólio',
        body: 'Novidade no portfólio!',
        icon: '/assets/icons/icon-192x192.png',
        badge: '/assets/icons/icon-96x96.png',
        image: '/assets/images/og-image.jpg',
        vibrate: [200, 100, 200],
        data: {
            url: '/',
            dateOfArrival: Date.now()
        },
        actions: [
            { action: 'open', title: '👀 Ver agora' },
            { action: 'close', title: '✕ Fechar' }
        ],
        tag: 'portfolio-update',
        renotify: true,
        requireInteraction: false,
        silent: false
    };
    
    if (event.data) {
        try {
            const payload = event.data.json();
            data = { ...data, ...payload };
        } catch (e) {
            data.body = event.data.text();
        }
    }
    
    event.waitUntil(
        self.registration.showNotification(data.title, data)
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    const action = event.action;
    const url = event.notification.data?.url || '/';
    
    Logger.log('🔔 Notification clicked:', action);
    
    if (action === 'close') {
        return;
    }
    
    event.waitUntil(
        clients.matchAll({ 
            type: 'window', 
            includeUncontrolled: true 
        }).then((windowClients) => {
            // Verificar se já existe uma janela aberta
            for (const client of windowClients) {
                if (client.url.includes(url) && 'focus' in client) {
                    return client.focus();
                }
            }
            // Abrir nova janela
            return clients.openWindow(url);
        })
    );
});

// ==================== PERIODIC SYNC ====================
self.addEventListener('periodicsync', (event) => {
    Logger.log('⏰ Periodic sync:', event.tag);
    
    if (event.tag === 'content-sync') {
        event.waitUntil(syncContent());
    } else if (event.tag === 'cache-cleanup') {
        event.waitUntil(cacheManager.cleanup());
    }
});

async function syncContent() {
    try {
        Logger.info('🔄 Syncing content...');
        
        // Atualizar dados do GitHub
        const username = 'Raphaeljdk';
        const githubResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
        
        if (githubResponse.ok) {
            const cache = await cacheManager.open();
            await cache.put('github-repos', githubResponse.clone());
            Logger.info('✅ GitHub data synced');
        }
        
        // Limpar cache antigo
        await cacheManager.cleanup();
        
    } catch (error) {
        Logger.error('❌ Content sync error:', error);
    }
}

// ==================== EXPORTAÇÃO ====================
// Expor para debug (apenas em desenvolvimento)
if (CONFIG.debug) {
    self.CONFIG = CONFIG;
    self.cacheManager = cacheManager;
    self.Logger = Logger;
}