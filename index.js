import 'bootstrap';
import $ from 'jquery';
import 'popper.js';
import jump from 'jump.js';
import './main.css';
import './slicebox/css/slicebox.css'
import './slicebox/css/demo.css'
import './slicebox/css/custom.css'
import './slicebox/js/jquery.slicebox.js'

$(document).ready(function () {

    /* Initialize Slicebox carousel */
    $(function() {

        let Page = (function() {

            let $navArrows = $( '#nav-arrows' ).hide(),
                $shadow = $( '#shadow' ).hide(),
                slicebox = $( '#sb-slider' ).slicebox({
                    onReady : function() {

                        $navArrows.show();
                        $shadow.show();

                    },
                    orientation : 'r',
                    cuboidsRandom : true,
                    disperseFactor : 20,
                }),

                init = function() {

                    // add navigation events
                    $navArrows.children( ':first' ).on( 'click', function() {

                        slicebox.next();
                        return false;

                    } );

                    $navArrows.children( ':last' ).on( 'click', function() {

                        slicebox.previous();
                        return false;

                    } );
                };

            return { init : init };

        })();

        Page.init();

    });

    /* Fade-in effect */
    $('body').removeClass('fade-out');

    /* Initial animations */
    document.getElementById('theCarousel').classList.add('tilt-in-fwd-br');

    const win = $(window);
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('row');

    /* Event listeners for carousel and side navigation links */
    $('.anchor').on('click', function(){
        scroll(this.getAttribute('href'));
    });

    /* Event listeners for thumbnails */
    $('.screenshotThumbnail').on('click', function() {
        zoomScreenshot(this);
    });

    /* Event listeners for elements that trigger overlay showing*/
    $('.open-overlay').on('click', function(){
        openOverlay(this.dataset.overlay);
    });

    /* Event listeners for elements that trigger overlay hiding*/
    $('.close-overlay').on('click', function(){
        closeOverlay(this.dataset.overlay);
    });

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
        }
        if (scrollPosition <= 200 && navbar.classList.contains('separated')) {
            navbar.style.setProperty('--navbarShort', mainContent.offsetWidth.toString() + 'px');
            navbar.classList.add('embedded');
            navbar.classList.remove('separated', 'fixed-top');
        }
    });
});

/* Scroll the page to anchor adjusting for navbar height if necessary */
function scroll(target) {
    let offset = -90;
    if(document.getElementById('navbar').classList.contains('embedded')) {
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

/* Scroll easing function by Robert Penner */
const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
};

/* Open overlay */
function openOverlay(curtainId) {
    document.getElementById(curtainId).style.height = "100%";
}

/* Close overlay */
function closeOverlay(curtainId) {
    document.getElementById(curtainId).style.height = "0%";
}

/* Zoom screenshot in overlay */
function zoomScreenshot(screenshot) {
    const closestOverlay = screenshot.closest(".overlay-content");
    const closestScreenshotsContainer = closestOverlay.getElementsByClassName("screenshots-container")[0];
    const expandImg = closestScreenshotsContainer.getElementsByTagName("img")[0];
    const imgText = closestScreenshotsContainer.getElementsByClassName("screenshots-imgtext")[0];
    expandImg.src = screenshot.src;
    imgText.innerText = screenshot.alt;
}