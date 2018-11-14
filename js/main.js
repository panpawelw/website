$(document).ready(function() {

	/* Add transparency effect to navbar once user starts scrolling down the page */
	$(window).scroll(function() {
		if($(this).scrollTop() > 80) {
			$('.navbar').addClass('transparent');
		} else {
			$('.navbar').removeClass('transparent');
		}
	});

	/* Add smooth scrolling effect to all navigation links (cross-browser solution */
	$("a").on('click', function() {

		// Make sure this.hash has a value before overriding default behavior
		// Also skip links with #nocroll hash
		if ($(this).hasClass('scrollto')) {

			$(window).scrollTo($(this).attr("href"),500,{offset:-53});

			// // Prevent default anchor click behavior
			// event.preventDefault();
			//
			// // Store hash
			// let hash = this.hash;
			//
			// //Shift by offset
			// let targetOffset = $(hash).offset().top - 60;
			//
			// // Using jQuery's animate() method to add smooth page scroll
			// // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
			// $('html, body').animate({
			// 	scrollTop: targetOffset
			// }, 500, function(){
			//
			// 	// Add hash (#) to URL when done scrolling (default click behavior)
			// 	window.location.hash = hash;
			// });
		} // End if
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