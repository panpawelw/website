import 'bootstrap';
import $ from 'jquery';
import 'popper.js';
import jump from 'jump.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import './fonts/fa-custom/fa-custom.css';
import './slicebox/css/slicebox.css';
import './slicebox/js/jquery.slicebox.js';

$(function () {

    /* FADE-IN EFFECT */
    $('body').removeClass('fade-out');

    /* ANIMATE SLOGAN */
    /* split slogan paragraph into spans (one word each) */
    let p = document.querySelector('#jumbotron-about-me-text');
    p.innerHTML = p.innerHTML.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g,
        '$1<span>$2</span>');

    /* generate an array of translateZ values for each of spans */
    const spans = p.children;
    let spansTranslateZArray = new Array(spans.length);
    for (let i = 0; i < spans.length; i++) {
        let random = Math.floor(Math.random() * -10000);
        spansTranslateZArray[i] = random;
        spans[i].style.transform = "translateZ(" + random + "px)";
    }

    /* at the end of animation gradually reduce translateZ values to 0 */
    document.querySelector('#jumbotron-about-me')
        .addEventListener("animationend", function () {
            for (let i = 1; i < 15; i++) {
                setTimeout(() => {
                    for (let j = 0; j < spansTranslateZArray.length; j++) {
                        let translateZ = spansTranslateZArray[j];
                        if (translateZ < -100) {
                            translateZ = Math.trunc(translateZ / 1.5);
                            spansTranslateZArray[j] = translateZ;
                        } else {
                            spansTranslateZArray[j] = 0;
                        }
                        spans[j].style.transform = "translateZ(" + translateZ + "px)";
                    }
                }, i * 50);
            }
        });

    /* INITIALIZE SLICEBOX CAROUSEL */
    let Page = (function () {
        let $navArrows = $('#nav-arrows').hide(),
            $navDots = $('#nav-dots').hide(),
            $nav = $navDots.children('span'),
            $shadow = $('#shadow').hide(),
            slicebox = $('#sb-slider').slicebox({
                onReady: function () {
                    $navArrows.show();
                    $navDots.show();
                    $shadow.show();
                },
                onBeforeChange: function (pos) {
                    $nav.removeClass('nav-dot-current');
                    $nav.eq(pos).addClass('nav-dot-current');
                },
                orientation: 'r',
                cuboidsRandom: true,
                disperseFactor: 15,
                autoplay: true,
                interval: 4000,
            }),

            init = function () {
                slicebox.isPlaying = true;
                // add navigation events
                $navArrows.children(':first').on('click', function () {
                    slicebox.previous();
                    return false;
                });
                $navArrows.children(':last').on('click', function () {
                    slicebox.next();
                    return false;
                });
                $('#play').on('click', function () {
                    slicebox.play();
                });
                $('#pause').on('click', function () {
                    slicebox.pause();
                });
            };
        // navigation dots events
        $nav.each(function (i) {
            $(this).on('click', function () {
                let $dot = $(this);
                if (!slicebox.isActive()) {
                    $nav.removeClass('nav-dot-current');
                    $dot.addClass('nav-dot-current');
                }
                slicebox.jump(i + 1);
                return false;
            });
        });
        return {init: init};
    })();
    Page.init();


    /* EVENT HANDLERS */
    /* for navigation links */
    $('.anchor').on('click', function () {
        scroll(this.getAttribute('href'));
    });

    /* for elements that trigger overlays*/
    $('.open-overlay').on('click', function () {
        const overlay = document.getElementById(this.dataset.overlay);
        const scrollableElement = overlay.querySelector('.overlay-scrollable');
        if (scrollableElement !== null) {
            console.log(scrollableElement);
            scrollableElement.style.overflow = 'hidden';
            window.setTimeout(function() {
                scrollableElement.style.overflow = 'auto'}, 333)
        }
        overlay.style.height = '100%';
    });

    /* for elements that trigger closing overlays */
    $('.close-overlay').on('click', function () {
        const overlay = document.getElementById(this.dataset.overlay);
        const scrollableElement = overlay.querySelector('.overlay-scrollable');
        if (scrollableElement !== null) {
            scrollableElement.style.overflow = 'hidden';
            window.setTimeout(function() {
                scrollableElement.style.overflow = 'auto'}, 333)
        }
        overlay.style.height = '0%';
    });

    /* ESC key closes overlays */
    document.onkeyup = function (e) {
        if (e.code === 'Escape') {
            const overlays = document.getElementsByClassName('overlay');
            for (let i = 0; i < overlays.length; i++) {
                if (overlays[i].style.height === '100%') {
                    overlays[i].style.height = '0%';
                }
            }
        }
    };

    /* for screenshot thumbnails in overlays */
    $('.screenshotThumbnail').on('click', function () {
        const closestOverlay = this.closest(".overlay-content");
        const closestScreenshotsContainer = closestOverlay.getElementsByClassName("screenshots-container")[0];
        const expandImg = closestScreenshotsContainer.getElementsByTagName("img")[0];
        const imgText = closestScreenshotsContainer.getElementsByClassName("screenshots-imgtext")[0];
        expandImg.src = this.src;
        imgText.innerText = this.alt;
    });

    /* detach navbar once user scrolls to main content, change it back when user scrolls back up */
    const navbar = document.getElementById('navbar');
    const row = document.getElementById('row');
    const dropdown = document.getElementById('dropdown-menu');
    window.onscroll = () => {
        const scrollPosition = document.body.scrollTop || document.documentElement.scrollTop;
        const websiteHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (scrollPosition / websiteHeight) * 100;
        document.getElementById("my-bar").style.width = scrolled + "%";
        if (scrollPosition > (window.innerHeight * 0.85)) {
            navbar.style.setProperty('--navbarShort', row.offsetWidth.toString() + 'px');
            if (dropdown.classList.contains('show')
                && !navbar.classList.contains('fixed-top')) {
                dropdown.classList.add('dark-dropdown');
                dropdown.addEventListener('animationend', function () {
                    dropdown.classList.remove('dark-dropdown');
                });
            }
            navbar.classList.remove('embedded');
            navbar.classList.add('fixed-top');
            row.style.paddingTop = '60px';
        } else {
            if (navbar.classList.contains('fixed-top')) {
                navbar.style.setProperty('--navbarShort', row.offsetWidth.toString() + 'px');
                navbar.classList.add('embedded');
                navbar.classList.remove('fixed-top');
                row.style.paddingTop = '0';
                if (dropdown.classList.contains('show')) {
                    dropdown.classList.add('light-dropdown');
                    dropdown.addEventListener('animationend', function () {
                        dropdown.classList.remove('light-dropdown');
                    });
                }
            }
        }
    };

    /* correct navbar width on window resize */
    window.onresize = () => navbar.style.setProperty('--navbarShort',
        row.offsetWidth.toString() + 'px');

    /* send a message via "Contact me" form */
    $('#contact-form').on("submit", function (e) {
        const name = document.getElementById('input-name');
        const email = document.getElementById('input-email');
        const message = document.getElementById('input-message');
        const status = document.getElementById('form-status');
        const button = document.getElementById('form-button');
        if (!name.value || !email.value || !message.value) {
            e.preventDefault();
            status.innerHTML = status.dataset.error;
        } else {
            $.ajax({
                    url: 'https://formspree.io/xnqbyzrp',
                    method: 'POST',
                    data: $(this).serialize(),
                    dataType: 'json'
                }
            ).then(() => {
                button.style.display = 'none';
                status.innerHTML = status.dataset.success;
                $(this).get(0).reset();
            }, () => {
                status.innerHTML = status.dataset.fail;
            });
            e.preventDefault();
        }
        setTimeout(() => {
            status.innerHTML = '';
            button.style.display = 'inline-block'
        }, 5000);
    })
});

/* AUXILLIARY FUNCTIONS */

/* Scroll the page to anchor adjusting for navbar height if necessary */
function scroll(target) {
    let offset = -90;
    if (target === '#start-here') {
        offset = -40;
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