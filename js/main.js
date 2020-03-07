import jump from "./jump/jump.js"
import easeInOutQuad from "./jump/easing.js";

$(document).ready(function () {


    const win = $(window);
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('row');
    document.querySelector("#my-bar").addEventListener("input", scrollPage);

    /* Fade-in effect */
    $(function () {
        $('body').removeClass('fade-out');
        document.getElementById('theCarousel').classList.add('tilt-in-fwd-br');
    });

    /* detach navbar once user scrolls to main content, change it back when user scrolls back up */
    win.scroll(function () {
        const scrollPosition = document.body.scrollTop || document.documentElement.scrollTop;
        const websiteHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (scrollPosition / websiteHeight) * 100;
        document.getElementById("my-bar").style.width = scrolled + "%";
        const sliderPosition = document.getElementById("my-bar").value;
        // let howToCallThisDamnVariable = Math.trunc((sliderPosition / 10000) * websiteHeight);
        let scrollTolerance = (sliderPosition / 10000) / (scrollPosition / websiteHeight);
        console.log(sliderPosition, scrollTolerance);
        if(scrollTolerance < 1.1 && scrollTolerance > 0.9) {
            document.getElementById("my-bar").value = (scrollPosition / websiteHeight) * 10000;
        }
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

function scrollPage() {
    const currentPosition = document.body.scrollTop || document.documentElement.scrollTop;
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let sliderPosition = document.getElementById("my-bar").value;
    let endScrollPosition = Math.trunc((sliderPosition / 10000) * totalHeight);
    let jumpValue = endScrollPosition - currentPosition;
    jump(jumpValue, {
        duration: 0,
        offset: 0,
        callback: undefined,
        easing: undefined,
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