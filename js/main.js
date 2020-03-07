import jump from "./jump/jump.js"
import easeInOutQuad from "./jump/easing.js";

const win = $(window);
const navbar = document.getElementById('navbar');
const mainContent = document.getElementById('row');

$(document).ready(function () {

    /* Fade-in effect */
    $(function () {
        $('body').removeClass('fade-out');
        document.getElementById('theCarousel').classList.add('tilt-in-fwd-br');
    });

    document.getElementById("sidebar-0")
        .addEventListener("click", function(){scroll("#theCarousel")});
    document.getElementById("sidebar-1")
        .addEventListener("click", function(){scroll("#Section1")});
    document.getElementById("sidebar-2")
        .addEventListener("click", function(){scroll("#Section2")});
    document.getElementById("sidebar-3")
        .addEventListener("click", function(){scroll("#Section3")});
    document.getElementById("sidebar-4")
        .addEventListener("click", function(){scroll("#Section4")});
    document.getElementById("sidebar-5")
        .addEventListener("click", function(){scroll("#Section5")});
    document.getElementById("sidebar-6")
        .addEventListener("click", function(){scroll("#Section6")});
    document.getElementById("sidebar-7")
        .addEventListener("click", function(){scroll("#Section7")});

    /* detach navbar once user scrolls to main content, change it back when user scrolls back up */
    win.scroll(function () {
        const scrollPosition = document.body.scrollTop || document.documentElement.scrollTop;
        const websiteHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (scrollPosition / websiteHeight) * 100;
        document.getElementById("my-bar").style.width = scrolled + "%";
        if (scrollPosition > 200 && navbar.classList.contains('embedded')) {
            navbar.style.setProperty('--navbarShort', mainContent.offsetWidth.toString() + 'px');
            navbar.classList.remove('embedded');
            navbar.classList.add('separated', 'fixed-top');
            // $('a.nav-link').addClass('tan');
        }
        if (scrollPosition <= 200 && navbar.classList.contains('separated')) {
            navbar.style.setProperty('--navbarShort', mainContent.offsetWidth.toString() + 'px');
            navbar.classList.add('embedded');
            navbar.classList.remove('separated', 'fixed-top');
            // $('a.nav-link').removeClass('tan');
        }
    });

    $('.screenshotThumbnail').on('click', function () {
        zoomScreenshot(this);
    });
});

function scroll(target) {
    let offset = -90;
    if(navbar.classList.contains('embedded')) {
        offset = -160;
    }
    jump(target, {
        duration: 500,
        offset: offset,
        callback: undefined,
        easing: easeInOutQuad,
        a11y: false
    });
}

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