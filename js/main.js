$(document).ready(function () {

    const win = $(window);
    const navbar = $('.navbar');

    /* Fade-in effect */
    $(function () {
        $('body').removeClass('fade-out');
        document.getElementById('theCarousel').classList.add('tilt-in-fwd-br');
    });

    /* Add transparency effect to navbar once user starts scrolling down the page */
    win.scroll(function () {
        if (win.scrollTop() > 200) {
            navbar.removeClass('embedded');
            navbar.addClass('separated border rounded fixed-top');
            $('a.nav-link').addClass('tan');
        } else {
            if (navbar.hasClass('separated')) {
            navbar.addClass('embedded');
        }
            navbar.removeClass('separated border rounded fixed-top');
            $('a.nav-link').removeClass('tan');
        }
    });

    $('.screenshotThumbnail').on('click', function () {
        zoomScreenshot(this);
    });
});

function zoomScreenshot(screenshot) {
    const closestOverlay = screenshot.closest(".overlay-content");
    const closestScreenshotsContainer = closestOverlay.getElementsByClassName("screenshots-container")[0];
    const expandImg = closestScreenshotsContainer.getElementsByTagName("img")[0];
    const imgText = closestScreenshotsContainer.getElementsByClassName("screenshots-imgtext")[0];
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