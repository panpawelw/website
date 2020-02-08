$(document).ready(function () {

    let win = $(window);

    /* Fade-in effect */
    $(function () {
        $('body').removeClass('fade-out');
    });

    /* Add transparency effect to navbar once user starts scrolling down the page */
    win.scroll(function () {
        if (win.scrollTop() > 80) {
            $('.navbar').addClass('transparent');
        } else {
            $('.navbar').removeClass('transparent');
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