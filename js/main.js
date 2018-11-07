$(document).ready(function() {
	$(window).scroll(function() {
		if($(this).scrollTop() > 100) {
			$('.navbar').addClass('transparent');
		} else {
			$('.navbar').removeClass('transparent');
		}
	});
});