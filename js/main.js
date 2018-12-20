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
	$('.aboutPageCurtainOpenButton').on('click', function() {
		document.getElementById('aboutMeCurtainShort').style.height = "0%";
		document.getElementById('aboutMeCurtainFull').style.height = "0%";
		document.getElementById('aboutPageCurtain').style.height = "100%";
	});

		/* Open "About me - short" curtain */
	$('.aboutMeShortCurtainOpenButton').on('click', function() {
		document.getElementById('aboutPageCurtain').style.height = "0%";
		document.getElementById('aboutMeCurtainFull').style.height = "0%";
		document.getElementById('aboutMeCurtainShort').style.height = "100%";
	});

	/* Open "About me - full" curtain */
	$('.aboutMeFullCurtainOpenButton').on('click', function() {
		document.getElementById('aboutPageCurtain').style.height = "0%";
		document.getElementById('aboutMeCurtainShort').style.height = "0%";
		document.getElementById('aboutMeCurtainFull').style.height = "100%";
	});

	/* Close when someone clicks on the "x" symbol inside the overlay */
	$('.curtainCloseButton').on('click', function() {
		document.getElementById('aboutPageCurtain').style.height = "0%";
		document.getElementById('aboutMeCurtainShort').style.height = "0%";
		document.getElementById('aboutMeCurtainFull').style.height = "0%";
	});
});