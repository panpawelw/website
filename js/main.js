$(document).ready(function() {
	$(window).scroll(function() {
		if($(this).scrollTop() > 100) {
			$('.navbar').addClass('transparent');
		} else {
			$('.navbar').removeClass('transparent');
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