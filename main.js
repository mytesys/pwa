/* Service Worker */
if ('serviceWorker' in navigator) {
	//console.log("Puedes Usar Service Worker");
	navigator.serviceWorker.register('./sw.js')
													.then(function (res) {console.log('serviceWorker Cargado . . .'); return res; })
													.catch(function (err) {console.log('serviceWorker No Cargado'); return err; });
} else {
	console.log("NO Puedes Usar Service Worker");
}


/* Scroll Suavizado */
$(document).ready(function () {
	$ ( "#menu a" ).click(function (e) {
		e.preventDefault();
		$("html, body").animate({
			scrollTop: $($(this).attr('href')).offset().top
		});
		return false;
	});
});