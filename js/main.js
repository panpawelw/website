$(document).ready(function() {

	/* Add transparency effect to navbar once user starts scrolling down the page */
	$(window).scroll(function() {
		if($(this).scrollTop() > 80) {
			$('.navbar').addClass('transparent');
		} else {
			$('.navbar').removeClass('transparent');
		}
	});

	/* Add smooth scrolling effect to selected navigation links (cross-browser solution) */

	$("a").on('click', function() {

		/* Detect if link has "scrollto" class */
		if ($(this).hasClass('scrollto')) {

			/* Detect "home" link */
			if(this.hash === "#Home"){
				$(window).scrollTo(0,500);
			}else{
				$(window).scrollTo($(this.hash).offset().top - 53,500);
			}
		}
	});

	/* Open "About page" curtain */
	$('#aboutPageCurtainOpenButton').on('click', function() {
		document.getElementById('aboutPageCurtain').style.height = "100%";
	});

	/* Close when someone clicks on the "x" symbol inside the overlay */
	$('#aboutPageCurtainCloseButton').on('click', function() {
		document.getElementById('aboutPageCurtain').style.height = "0%";
	});

	/* Open "About me" curtain */
	$('#aboutMeCurtainOpenButton').on('click', function() {
		document.getElementById('aboutMeCurtain').style.height = "100%";
	});

	/* Close when someone clicks on the "x" symbol inside the overlay */
	$('#aboutMeCurtainCloseButton').on('click', function() {
		document.getElementById('aboutMeCurtain').style.height = "0%";
	});
});