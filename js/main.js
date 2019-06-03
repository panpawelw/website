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

    /* Open "About page" curtain */
    $('.aboutPageCurtainOpenButton').on('click', function () {
        document.getElementById('aboutMeCurtain').style.height = "0%";
        document.getElementById('aboutPageCurtain').style.height = "100%";
    });

    /* Open "About me" curtain */
    $('.aboutMeCurtainOpenButton').on('click', function () {
        document.getElementById('aboutPageCurtain').style.height = "0%";
        document.getElementById('aboutMeCurtain').style.height = "100%";
    });

    /* Close when someone clicks on the "back" symbol inside the overlay */
    $('.curtainCloseButton').on('click', function () {
        document.getElementById('aboutPageCurtain').style.height = "0%";
        document.getElementById('aboutMeCurtain').style.height = "0%";
    });

    $('.section2ScreenshotsCurtainOpenButton').on('click', function () {
        $('#section2ScreenshotsCurtain').css('height', '100%');
    });

    $('.section2ScreenshotsCurtainCloseButton').on('click', function () {
        document.getElementById('section2ScreenshotsCurtain').style.height = "0%";
    });

    $('.section3ScreenshotsCurtainOpenButton').on('click', function () {
        document.getElementById('section3ScreenshotsCurtain').style.height = "100%";
    });

    $('.section3ScreenshotsCurtainCloseButton').on('click', function () {
        document.getElementById('section3ScreenshotsCurtain').style.height = "0%";
    });

    $('.section4ScreenshotsCurtainOpenButton').on('click', function () {
        document.getElementById('section4ScreenshotsCurtain').style.height = "100%";
    });

    $('.section4ScreenshotsCurtainCloseButton').on('click', function () {
        document.getElementById('section4ScreenshotsCurtain').style.height = "0%";
    });

    $('.section5ScreenshotsCurtainOpenButton').on('click', function () {
        document.getElementById('section5ScreenshotsCurtain').style.height = "100%";
    });

    $('.section5ScreenshotsCurtainCloseButton').on('click', function () {
        document.getElementById('section5ScreenshotsCurtain').style.height = "0%";
    });

    $('.section6ScreenshotsCurtainOpenButton').on('click', function () {
        document.getElementById('section6ScreenshotsCurtain').style.height = "100%";
    });

    $('.section6ScreenshotsCurtainCloseButton').on('click', function () {
        document.getElementById('section6ScreenshotsCurtain').style.height = "0%";
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

function openCurtain(curtainId) {
    document.getElementById(curtainId).style.height = "100%";
}

function closeCurtain(curtainId) {
    document.getElementById(curtainId).style.height = "0%";
}