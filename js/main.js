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

	$('.section2ScreenshotsCurtainOpenButton').on('click', function() {
		document.getElementById('section2ScreenshotsCurtain').style.height = "100%";
	});

	$('.section2ScreenshotsCurtainCloseButton').on('click', function() {
		document.getElementById('section2ScreenshotsCurtain').style.height = "0%";
	});

	$('.section3ScreenshotsCurtainOpenButton').on('click', function() {
		document.getElementById('section3ScreenshotsCurtain').style.height = "100%";
	});

	$('.section3ScreenshotsCurtainCloseButton').on('click', function() {
		document.getElementById('section3ScreenshotsCurtain').style.height = "0%";
	});

	$('.section4ScreenshotsCurtainOpenButton').on('click', function() {
		document.getElementById('section4ScreenshotsCurtain').style.height = "100%";
	});

	$('.section4ScreenshotsCurtainCloseButton').on('click', function() {
		document.getElementById('section4ScreenshotsCurtain').style.height = "0%";
	});

	$('.section5ScreenshotsCurtainOpenButton').on('click', function() {
		document.getElementById('section5ScreenshotsCurtain').style.height = "100%";
	});

	$('.section5ScreenshotsCurtainCloseButton').on('click', function() {
		document.getElementById('section5ScreenshotsCurtain').style.height = "0%";
	});

	$('.section6ScreenshotsCurtainOpenButton').on('click', function() {
		document.getElementById('section6ScreenshotsCurtain').style.height = "100%";
	});

	$('.section6ScreenshotsCurtainCloseButton').on('click', function() {
		document.getElementById('section6ScreenshotsCurtain').style.height = "0%";
	});

	//TODO Fix warnings

    $('.screenshotThumbnail').on('click', function() {
        var expandImg = document.getElementById("screenshots-expandedImg");
        var imgText = document.getElementById("screenshots-imgtext");
        expandImg.src = this.src;
        imgText.innerHTML = this.alt;
        expandImg.parentElement.style.display = "block";
    });
});