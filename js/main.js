$(document).ready(function () {

    /* Fade-in effect */
    $(function () {
        $('body').removeClass('fade-out');
    });

    /* Add transparency effect to navbar once user starts scrolling down the page */
    $(window).scroll(function () {
        if ($(this).scrollTop() > 80) {
            $('.navbar').addClass('transparent');
        } else {
            $('.navbar').removeClass('transparent');
        }
    });

    /* Add smooth scrolling effect to selected navigation links (cross-browser solution) */
    $("a").on('click', function () {

        /* Detect if link has "scrollto" class */
        if ($(this).hasClass('scrollto')) {

            /* Detect "home" link */
            if (this.hash === "#Home") {
                $(window).scrollTo(0, 500);
            } else {
                $(window).scrollTo($(this.hash).offset().top - 53, 500);
            }
        }
    });

    $('.screenshotThumbnail').on('click', function () {
        zoomScreenshot(this);
    });
});

function zoomScreenshot(screenshot) {
    var closestOverlay = screenshot.closest(".overlay-content");
    var closestScreenshotsContainer = closestOverlay.getElementsByClassName("screenshots-container")[0];
    var expandImg = closestScreenshotsContainer.getElementsByTagName("img")[0];
    var imgText = closestScreenshotsContainer.getElementsByClassName("screenshots-imgtext")[0];
    expandImg.src = screenshot.src;
    imgText.innerText = screenshot.alt;
}

/* Open overlay */
function openCurtain(curtainId) {
    document.getElementById(curtainId).style.height = "100%";
}

/* Close overlay */
function closeCurtain(curtainId) {
    document.getElementById(curtainId).style.height = "0%";
}