// Asignar nombre y versión de la cache
var CACHE_NAME = 'v1_Cache_Nestor';

// Ficheros a cachear
var urlsToCache = [
	'./',
	'./css/styles.css',
	'./img/favicon.png',
	'./img/1.png',
	'./img/2.png',
	'./img/3.png',
	'./img/4.png',
	'./img/5.png',
	'./img/6.png',
	'./img/facebook.png',
	'./img/instagram.png',
	'./img/twitter.png',
	'./img/favicon-1024.png',
	'./img/favicon-512.png',
	'./img/favicon-384.png',
	'./img/favicon-256.png',
	'./img/favicon-192.png',
	'./img/favicon-128.png',
	'./img/favicon-96.png',
	'./img/favicon-64.png',
	'./img/favicon-32.png',
	'./img/favicon-16.png'
];

//Evento Install
// Instalación del service worker y guardar en cache los recursos estaticos
self.addEventListener('install', function (e) {
	e.waitUntil(
		caches.open(CACHE_NAME)
					.then(function (cache) {
						return cache.addAll(urlsToCache)
												.then(function () {
													self.skipWaiting();
												});
					})
					.catch( function (err) {
						console.log('No se ha registrado el cache');
						return err;
					})
	);
});

// Evento Activate
// Que la App funcione sin conexión
self.addEventListener('activate', function(e){
	var cacheWhitelist = [CACHE_NAME];
	e.waitUntil(
		caches.keys()
					.then(function (cacheNames) {
						return Promise.all(
							cacheNames.map(function (cacheName) {
								if ( cacheWhitelist.indexOf ( cacheName ) === -1 ) {
									// Borrar elementos que no se necesiten
									return caches.delete(cacheName);
								}
							})
						);
					})
					.then( function () {
						self.clients.claim();
					})
	);
});

// Evento Fetch
self.addEventListener('fetch', function (e) {
	e.respondWith(
		caches.match(e.request)
					.then(function (res) {
						if (res) {
							// Devuelvo datos desde cache
							return res;
						}
						return fetch(e.request);
					})
	);
});



