$(document).ready(function () {

    const win = $(window);
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('row');

    /* Fade-in effect */
    $(function () {
        $('body').removeClass('fade-out');
        document.getElementById('theCarousel').classList.add('tilt-in-fwd-br');
    });

    /* detach navbar once user scrolls to main content, change it back when user scrolls back up */
    win.scroll(function () {
        if (win.scrollTop() > 200) {
            navbar.style.setProperty('--navbarShort', mainContent.offsetWidth.toString() + 'px');
            navbar.classList.remove('embedded');
            navbar.classList.add('separated', 'fixed-top');
            $('a.nav-link').addClass('tan');
        } else {
            if (navbar.classList.contains('separated')) {
                navbar.classList.add('embedded');
            }
            navbar.classList.remove('separated', 'fixed-top');
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