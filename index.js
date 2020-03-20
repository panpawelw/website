import 'bootstrap';
import $ from 'jquery';
import jQuery from 'jquery';
import 'popper.js';
import jump from 'jump.js';
import './slicebox/js/modernizr.js';
import './main.css';
import './slicebox/css/slicebox.css'
import './slicebox/css/demo.css'
import './slicebox/css/custom.css'

$(document).ready(function () {

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

    /* Event listeners for side navigation links */
    $('.anchor').on('click', function(){
       scroll(this.getAttribute('href'));
    });

    /* Event listeners for thumbnails */
    $('.screenshotThumbnail').on('click', function() {
        zoomScreenshot(this);
    });

    /* Event listeners for elements that trigger overlay show*/
    $('.open-overlay').on('click', function(){
        openOverlay(this.dataset.overlay);
    });

    /* Event listeners for elements that trigger overlay hide*/
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
            // $('a.nav-link').addClass('tan');
        }
        if (scrollPosition <= 200 && navbar.classList.contains('separated')) {
            navbar.style.setProperty('--navbarShort', mainContent.offsetWidth.toString() + 'px');
            navbar.classList.add('embedded');
            navbar.classList.remove('separated', 'fixed-top');
            // $('a.nav-link').removeClass('tan');
        }
    });
});

/* Scroll the page adjusting for navbar height if necessary */
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

/**
 * jquery.slicebox.js v1.1.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2012, Codrops
 * http://www.codrops.com
 */

;( function( $, window, undefined ) {

    'use strict';

    /*
    * debouncedresize: special jQuery event that happens once after a window resize
    *
    * latest version and complete README available on Github:
    * https://github.com/louisremi/jquery-smartresize/blob/master/jquery.debouncedresize.js
    *
    * Copyright 2011 @louis_remi
    * Licensed under the MIT license.
    */
    let $event = $.event,
        $special,
        resizeTimeout;

    $special = $event.special.debouncedresize = {
        setup: function() {
            $( this ).on( "resize", $special.handler );
        },
        teardown: function() {
            $( this ).off( "resize", $special.handler );
        },
        handler: function( event, execAsap ) {
            // Save the context
            let context = this,
                args = arguments,
                dispatch = function() {
                    // set correct event type
                    event.type = "debouncedresize";
                    $event.dispatch.apply( context, args );
                };

            if ( resizeTimeout ) {
                clearTimeout( resizeTimeout );
            }

            execAsap ?
                dispatch() :
                resizeTimeout = setTimeout( dispatch, $special.threshold );
        },
        threshold: 50
    };

    // ======================= imagesLoaded Plugin ===============================
    // https://github.com/desandro/imagesloaded

    // $('#my-container').imagesLoaded(myFunction)
    // execute a callback when all images have loaded.
    // needed because .load() doesn't work on cached images

    // callback function gets image collection as argument
    //  this is the container

    // original: mit license. paul irish. 2010.
    // contributors: Oren Solomianik, David DeSandro, Yiannis Chatzikonstantinou

    // blank image data-uri bypasses webkit log warning (thx doug jones)
    let BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

    $.fn.imagesLoaded = function( callback ) {
        let $this = this,
            deferred = $.isFunction($.Deferred) ? $.Deferred() : 0,
            hasNotify = $.isFunction(deferred.notify),
            $images = $this.find('img').add( $this.filter('img') ),
            loaded = [],
            proper = [],
            broken = [];

        // Register deferred callbacks
        if ($.isPlainObject(callback)) {
            $.each(callback, function (key, value) {
                if (key === 'callback') {
                    callback = value;
                } else if (deferred) {
                    deferred[key](value);
                }
            });
        }

        function doneLoading() {
            let $proper = $(proper),
                $broken = $(broken);

            if ( deferred ) {
                if ( broken.length ) {
                    deferred.reject( $images, $proper, $broken );
                } else {
                    deferred.resolve( $images );
                }
            }

            if ( $.isFunction( callback ) ) {
                callback.call( $this, $images, $proper, $broken );
            }
        }

        function imgLoaded( img, isBroken ) {
            // don't proceed if BLANK image, or image is already loaded
            if ( img.src === BLANK || $.inArray( img, loaded ) !== -1 ) {
                return;
            }

            // store element in loaded images array
            loaded.push( img );

            // keep track of broken and properly loaded images
            if ( isBroken ) {
                broken.push( img );
            } else {
                proper.push( img );
            }

            // cache image and its state for future calls
            $.data( img, 'imagesLoaded', { isBroken: isBroken, src: img.src } );

            // trigger deferred progress method if present
            if ( hasNotify ) {
                deferred.notifyWith( $(img), [ isBroken, $images, $(proper), $(broken) ] );
            }

            // call doneLoading and clean listeners if all images are loaded
            if ( $images.length === loaded.length ){
                setTimeout( doneLoading );
                $images.unbind( '.imagesLoaded' );
            }
        }

        // if no images, trigger immediately
        if ( !$images.length ) {
            doneLoading();
        } else {
            $images.bind( 'load.imagesLoaded error.imagesLoaded', function( event ){
                // trigger imgLoaded
                imgLoaded( event.target, event.type === 'error' );
            }).each( function( i, el ) {
                let src = el.src;

                // find out if this image has been already checked for status
                // if it was, and src has not changed, call imgLoaded on it
                let cached = $.data( el, 'imagesLoaded' );
                if ( cached && cached.src === src ) {
                    imgLoaded( el, cached.isBroken );
                    return;
                }

                // if complete is true and browser supports natural sizes, try
                // to check for image status manually
                if ( el.complete && el.naturalWidth !== undefined ) {
                    imgLoaded( el, el.naturalWidth === 0 || el.naturalHeight === 0 );
                    return;
                }

                // cached images don't fire load sometimes, so we reset src, but only when
                // dealing with IE, or image is complete (loaded) and failed manual check
                // webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
                if ( el.readyState || el.complete ) {
                    el.src = BLANK;
                    el.src = src;
                }
            });
        }

        return deferred ? deferred.promise( $this ) : $this;
    };

    // global
    let $window = $( window ),
        Modernizr = window.Modernizr;

    $.Slicebox = function( options, element ) {

        this.$el = $( element );
        this._init( options );

    };

    $.Slicebox.defaults = {
        // (v)ertical, (h)orizontal or (r)andom
        orientation : 'v',
        // perspective value
        perspective : 1200,
        // number of slices / cuboids
        // needs to be an odd number 15 => number > 0 (if you want the limit higher, change the _validate function).
        cuboidsCount : 5,
        // if true then the number of slices / cuboids is going to be random (cuboidsCount is overwitten)
        cuboidsRandom : false,
        // the range of possible number of cuboids if cuboidsRandom is true
        // it is strongly recommended that you do not set a very large number :)
        maxCuboidsCount : 5,
        // each cuboid will move x pixels left / top (depending on orientation). The middle cuboid doesn't move. the middle cuboid's neighbors will move disperseFactor pixels
        disperseFactor : 0,
        // color of the hidden sides
        colorHiddenSides : '#222',
        // the animation will start from left to right. The left most cuboid will be the first one to rotate
        // this is the interval between each rotation in ms
        sequentialFactor : 150,
        // animation speed
        // this is the speed that takes "1" cuboid to rotate
        speed : 600,
        // transition easing
        easing : 'ease',
        // if true the slicebox will start the animation automatically
        autoplay : false,
        // time (ms) between each rotation, if autoplay is true
        interval: 3000,
        // the fallback will just fade out / fade in the items
        // this is the time fr the fade effect
        fallbackFadeSpeed : 300,
        // callbacks
        onBeforeChange : function( position ) { return false; },
        onAfterChange : function( position ) { return false; },
        onReady : function() { return false; },
        //reverse direction of rotation
        reverse : false,
    };

    $.Slicebox.prototype = {

        _init : function( options ) {

            // options
            this.options = $.extend( true, {}, $.Slicebox.defaults, options );

            this._validate();

            // all the items
            this.$items = this.$el.children( 'li' );

            // total number of items
            this.itemsCount = this.$items.length;
            // if there's no items return
            if(this.itemsCount === 0 ) {

                return false;

            }

            // suport for css 3d transforms and css transitions
            this.support = Modernizr.csstransitions && Modernizr.csstransforms3d;

            // current image index
            this.current = 0;

            // control if the slicebox is animating
            this.isAnimating = false;

            // control if slicebox is ready (all images loaded)
            this.isReady = false;

            // preload the images
            let self = this;
            this.$el.imagesLoaded( function() {

                // we need to hide the items except first one (current default value)
                let $current = self.$items.eq( self.current ).css( 'display', 'block' ).addClass( 'sb-current' );

                // get real size of image
                let i = new Image();
                i.src = $current.find( 'img' ).attr( 'src' );
                self.realWidth = i.width;

                // assuming all images with same size
                self._setSize();
                self._setStyle();
                self._initEvents();

                self.options.onReady();
                self.isReady = true;

                if( self.options.autoplay ) {

                    self._startSlideshow();

                }

            });

        },
        _validate			: function( options ) {

            if( this.options.cuboidsCount < 0 ){

                this.options.cuboidsCount = 1;

            }
            else if( this.options.cuboidsCount > 15 ) {

                this.options.cuboidsCount = 15;

            }
            else if( this.options.cuboidsCount %2 === 0 ) {

                ++this.options.cuboidsCount;

            }

            if( this.options.maxCuboidsCount < 0 ){

                this.options.maxCuboidsCount = 1;

            }
            else if( this.options.maxCuboidsCount > 15 ) {

                this.options.maxCuboidsCount = 15;

            }
            else if( this.options.maxCuboidsCount %2 === 0 ) {

                ++this.options.maxCuboidsCount;

            }

            if( this.options.disperseFactor < 0 ) {

                this.options.disperseFactor = 0;

            }

            if( this.options.orientation !== 'v' && this.options.orientation !== 'h' && this.options.orientation !== 'r' ) {

                this.options.orientation = 'v';

            }

        },
        _setSize : function() {

            let $visible = this.$items.eq( this.current ).find( 'img' );

            this.size = {
                width	: $visible.width(),
                height	: $visible.height()
            };

        },
        _setStyle : function() {

            // max-width is the real size of the images
            this.$el.css( {
                'max-width' : this.realWidth
            } );

        },
        _initEvents : function() {

            let self = this;

            $window.on( 'debouncedresize.slicebox', function( event ) {

                // assuming all images with same size
                self._setSize();

            } );

        },
        _startSlideshow: function() {

            let self = this;

            this.slideshow = setTimeout( function() {

                self._navigate( 'next' );

                if ( self.options.autoplay ) {

                    self._startSlideshow();

                }

            }, this.options.interval );

        },
        _stopSlideshow: function() {

            if ( this.options.autoplay ) {

                clearTimeout( this.slideshow );
                this.isPlaying = false;
                this.options.autoplay = false;

            }

        },
        _navigate : function( dir, pos ) {

            if( this.isAnimating || !this.isReady || this.itemsCount < 2 ) {

                return false;

            }

            this.isAnimating = true;

            // current item's index
            this.prev = this.current;

            // if position is passed
            if( pos !== undefined ) {

                this.current = pos;

            }
            // if not check the boundaries
            else if( dir === 'next' ) {

                this.current = this.current < this.itemsCount - 1 ? this.current + 1 : 0;

            }
            else if( dir === 'prev' ) {

                this.current = this.current > 0 ? this.current - 1 : this.itemsCount - 1;

            }

            // callback trigger
            this.options.onBeforeChange( this.current );

            if( !this.support ) {

                this._fade( dir );

            }
            else {

                this._layout( dir );
                this._rotate();

            }

        },
        _fade : function( dir ) {

            let self = this,
                $visible = this.$items.eq( this.prev ),
                h = $visible.find( 'img' ).height();

            this.$el.css( 'height', h );
            this.$items.css( 'position', 'absolute' );

            this.$items.eq( this.current ).fadeIn( this.options.fallbackFadeSpeed, function() {

                $( this ).css( 'display', 'block' ).addClass( 'sb-current' );
                self.$el.css( 'height', 'auto' );
                self.$items.css( 'position', 'relative' );
                self.isAnimating = false;

            } );
            self.$items.eq( self.prev ).removeClass( 'sb-current' ).fadeOut( this.options.fallbackFadeSpeed );

        },
        _layout : function( dir ) {

            // create a structure like this and append it to the main container (this.$el):
            // <div>	wrapper with perspective
            //   <div>
            //     <div></div> front side
            //     <div></div> back side
            //     <div></div> right side
            //     <div></div> left side
            //     <div></div> top side
            //     <div></div> bottom side
            //   </div>
            //   <div>..</div>
            //   <div>..</div>
            //   <div>..</div>
            //   ...	number of slices defined in options
            // </div>

            let orientation = this.options.orientation;

            if( orientation === 'r' ) {

                orientation = Math.floor( Math.random() * 2 ) === 0 ? 'v' : 'h';

            }

            if( this.options.cuboidsRandom ) {

                this.options.cuboidsCount = Math.floor((Math.random() * 3) + 1) * 2 + 1;

            }

            this._validate();

            let boxStyle = {
                    'width' : this.size.width,
                    'height' : this.size.height,
                    'perspective' : this.options.perspective + 'px'
                },
                config = $.extend( this.options, {
                    size : this.size,
                    items : this.$items,
                    direction : dir,
                    prev : this.prev,
                    current : this.current,
                    o : orientation
                } ),
                self = this;

            this.$box = $('<div>').addClass( 'sb-perspective' ).css( boxStyle ).appendTo( this.$el );

            this.cuboids = [];

            this.$el.css( 'overflow', 'visible' );

            for( let i = 0; i < this.options.cuboidsCount; ++i ) {

                let cuboid = new $.Cuboid( config, i );

                this.$box.append( cuboid.getEl() );

                this.cuboids.push( cuboid );

            }

        },
        _rotate : function() {

            // hide current item
            this.$items.eq( this.prev ).removeClass( 'sb-current' ).hide();

            for( let i = 0; i < this.options.cuboidsCount; ++i ) {

                let cuboid = this.cuboids[ i ],
                    self = this;

                cuboid.rotate( function( pos ) {

                    if( pos === self.options.cuboidsCount - 1 ) {

                        self.$el.css( 'overflow', 'hidden' );
                        self.isAnimating = false;
                        self.$box.remove();
                        let $current = self.$items.eq( self.current );
                        $current.css( 'display', 'block' ); // show() makes it inline style
                        setTimeout(function() {
                            $current.addClass( 'sb-current' );
                        } , 0 );
                        self.options.onAfterChange( self.current );

                    }

                });

            }

        },
        _destroy : function( callback ) {

            this.$el.off( '.slicebox' ).removeData( 'slicebox' );
            $window.off( '.slicebox' );
            callback.call();

        },
        // public methos: adds more items to the slicebox
        add : function( $items, callback ) {

            this.$items = this.$items.add( $items );
            this.itemsCount = this.$items.length;

            if ( callback ) {

                callback.call( $items );

            }

        },
        // public method: shows next image
        next : function() {

            this.options.reverse = true;
            this._stopSlideshow();
            this._navigate( 'next' );

        },
        // public method: shows previous image
        previous : function() {

            this.options.reverse = false;
            this._stopSlideshow();
            this._navigate( 'prev' );

        },
        // public method: goes to a specific image
        jump : function( pos ) {

            pos -= 1;

            if( pos === this.current || pos >= this.itemsCount || pos < 0 ) {

                return false;

            }

            this._stopSlideshow();
            this._navigate( pos > this.current ? 'next' : 'prev', pos );

        },
        // public method: starts the slideshow
        // any call to next(), previous() or jump() will stop the slideshow
        play : function() {

            if( !this.isPlaying ) {

                this.isPlaying = true;

                this._navigate( 'next' );
                this.options.autoplay = true;
                this._startSlideshow();

            }

        },
        // publicc methos: pauses the slideshow
        pause : function() {

            if( this.isPlaying ) {

                this._stopSlideshow();

            }

        },
        // public method: check if isAnimating is true
        isActive : function() {

            return this.isAnimating;

        },
        // publicc methos: destroys the slicebox instance
        destroy : function( callback ) {

            this._destroy( callback );

        }

    };

    $.Cuboid = function( config, pos ) {

        this.config = config;
        this.pos = pos;
        this.side = 1;
        this._setSize();
        this._configureStyles();

    };

    $.Cuboid.prototype = {

        _setSize : function() {

            this.size = {
                width : this.config.o === 'v' ? Math.floor( this.config.size.width / this.config.cuboidsCount ) : this.config.size.width,
                height : this.config.o === 'v' ? this.config.size.height : Math.floor( this.config.size.height / this.config.cuboidsCount )
            };
            // extra space to fix gaps
            this.extra = this.config.o === 'v' ? this.config.size.width - ( this.size.width * this.config.cuboidsCount ) : this.config.size.height - ( this.size.height * this.config.cuboidsCount );

        },
        _configureStyles : function() {

            // style for the cuboid element
            // set z-indexes based on the cuboid's position
            let middlepos = Math.ceil( this.config.cuboidsCount / 2 ),
                positionStyle = this.pos < middlepos ? {
                    zIndex : ( this.pos + 1 ) * 100,
                    left : ( this.config.o === 'v' ) ? this.size.width * this.pos : 0,
                    top : ( this.config.o === 'v' ) ? 0 : this.size.height * this.pos
                } : {
                    zIndex : (this.config.cuboidsCount - this.pos) * 100,
                    left : ( this.config.o === 'v' ) ? this.size.width * this.pos : 0,
                    top : ( this.config.o === 'v' ) ? 0 : this.size.height * this.pos
                };

            // how much this cuboid is going to move (left or top values)
            this.disperseFactor = this.config.disperseFactor * ( ( this.pos + 1 ) - middlepos );

            this.style = $.extend( {
                '-webkit-transition' : '-webkit-transform ' + this.config.speed + 'ms ' + this.config.easing,
                '-moz-transition' : '-moz-transform ' + this.config.speed + 'ms ' + this.config.easing,
                '-o-transition' : '-o-transform ' + this.config.speed + 'ms ' + this.config.easing,
                '-ms-transition' : '-ms-transform ' + this.config.speed + 'ms ' + this.config.easing,
                'transition' : 'transform ' + this.config.speed + 'ms ' + this.config.easing
            }, positionStyle, this.size );

            let rotationDirection = this.config.reverse ? '' : '-'; //default negative
            let oppositeRotationDirection = this.config.reverse ? '-' : ''; //default positive

            this.animationStyles = {
                side1 : ( this.config.o === 'v' ) ? { 'transform' : 'translate3d( 0, 0, -' + ( this.size.height / 2 ) + 'px )' } : { 'transform' : 'translate3d( 0, 0, -' + ( this.size.width / 2 ) + 'px )' },
                side2 : ( this.config.o === 'v' ) ? { 'transform' : 'translate3d( 0, 0, -' + ( this.size.height / 2 ) + 'px ) rotate3d( 1, 0, 0, ' + rotationDirection + '90deg )' } : { 'transform' : 'translate3d( 0, 0, -' + ( this.size.width / 2 ) + 'px ) rotate3d( 0, 1, 0, ' + rotationDirection + '90deg )' },
                side3 : ( this.config.o === 'v' ) ? { 'transform' : 'translate3d( 0, 0, -' + ( this.size.height / 2 ) + 'px ) rotate3d( 1, 0, 0, ' + rotationDirection + '180deg )' } : { 'transform' : 'translate3d( 0, 0, -' + ( this.size.width / 2 ) + 'px ) rotate3d( 0, 1, 0, ' + rotationDirection + '180deg )' },
                side4 : ( this.config.o === 'v' ) ? { 'transform' : 'translate3d( 0, 0, -' + ( this.size.height / 2 ) + 'px ) rotate3d( 1, 0, 0, ' + rotationDirection + '270deg )' } : { 'transform' : 'translate3d( 0, 0, -' + ( this.size.width / 2 ) + 'px ) rotate3d( 0, 1, 0, ' + rotationDirection + '270deg )' }
            };

            let measure = ( this.config.o === 'v' ) ? this.size.height : this.size.width;

            this.sidesStyles = {
                frontSideStyle : {
                    width : ( this.config.o === 'v' ) ? this.size.width + this.extra : this.size.width,
                    height : ( this.config.o === 'v' ) ? this.size.height : this.size.height + this.extra,
                    backgroundColor : this.config.colorHiddenSides,
                    transform : 'rotate3d( 0, 1, 0, 0deg ) translate3d( 0, 0, ' + ( measure / 2 ) + 'px )'
                },
                backSideStyle : {
                    width : this.size.width,
                    height : this.size.height,
                    backgroundColor : this.config.colorHiddenSides,
                    transform : 'rotate3d( 0, 1, 0, ' + oppositeRotationDirection + '180deg ) translate3d( 0, 0, ' + ( measure / 2 ) + 'px ) rotateZ( ' + oppositeRotationDirection + '180deg )'
                },
                rightSideStyle : {
                    width : measure,
                    height : ( this.config.o === 'v' ) ? this.size.height : this.size.height + this.extra,
                    left : ( this.config.o === 'v' ) ? this.size.width / 2 - this.size.height / 2 : 0,
                    backgroundColor : this.config.colorHiddenSides,
                    transform : 'rotate3d( 0, 1, 0, ' + oppositeRotationDirection + '90deg ) translate3d( 0, 0, ' + ( this.size.width / 2 ) + 'px )'
                },
                leftSideStyle : {
                    width : measure,
                    height : ( this.config.o === 'v' ) ? this.size.height : this.size.height + this.extra,
                    left : ( this.config.o === 'v' ) ? this.size.width / 2 - this.size.height / 2  : 0,
                    backgroundColor : this.config.colorHiddenSides,
                    transform : 'rotate3d( 0, 1, 0, ' + rotationDirection + '90deg ) translate3d( 0, 0, ' + ( this.size.width / 2 ) + 'px )'
                },
                topSideStyle : {
                    width : ( this.config.o === 'v' ) ? this.size.width + this.extra : this.size.width,
                    height : measure,
                    top : ( this.config.o === 'v' ) ? 0 : this.size.height / 2 - this.size.width / 2,
                    backgroundColor : this.config.colorHiddenSides,
                    transform : 'rotate3d( 1, 0, 0, ' + oppositeRotationDirection + '90deg ) translate3d( 0, 0, ' + ( this.size.height / 2 ) + 'px )'
                },
                bottomSideStyle : {
                    width : ( this.config.o === 'v' ) ? this.size.width + this.extra : this.size.width,
                    height : measure,
                    top : ( this.config.o === 'v' ) ? 0 : this.size.height / 2 - this.size.width / 2,
                    backgroundColor : this.config.colorHiddenSides,
                    transform : 'rotate3d( 1, 0, 0, ' + rotationDirection + '90deg ) translate3d( 0, 0, ' + ( this.size.height / 2 ) + 'px )'
                }
            };

        },
        getEl : function() {

            this.$el = $('<div/>').css( this.style )
                .css( this.animationStyles.side1 )
                .append( $('<div/>').addClass('sb-side').css( this.sidesStyles.frontSideStyle ) )
                .append( $('<div/>').addClass('sb-side').css( this.sidesStyles.backSideStyle ) )
                .append( $('<div/>').addClass('sb-side').css( this.sidesStyles.rightSideStyle ) )
                .append( $('<div/>').addClass('sb-side').css( this.sidesStyles.leftSideStyle ) )
                .append( $('<div/>').addClass('sb-side').css( this.sidesStyles.topSideStyle ) )
                .append( $('<div/>').addClass('sb-side').css( this.sidesStyles.bottomSideStyle ) );

            this._showImage( this.config.prev );

            return this.$el;

        },
        _showImage : function( imgPos ) {

            let sideIdx,
                $item = this.config.items.eq( imgPos ),
                imgParam = {
                    'background-size' : this.config.size.width + 'px ' + this.config.size.height + 'px'
                };

            imgParam.backgroundImage = 'url(' + $item.find( 'img' ).attr('src') + ')';

            switch( this.side ) {

                case 1 : sideIdx = 0; break;
                case 2 : sideIdx = ( this.config.o === 'v' ) ? 4 : 2; break;
                case 3 : sideIdx = 1; break;
                case 4 : sideIdx = ( this.config.o === 'v' ) ? 5 : 3; break;

            }

            imgParam.backgroundPosition = ( this.config.o === 'v' ) ? - ( this.pos * this.size.width ) + 'px 0px' : '0px -' + ( this.pos * this.size.height ) + 'px';
            this.$el.children().eq( sideIdx ).css( imgParam );

        },
        rotate : function( callback ) {

            let self = this, animationStyle;

            setTimeout(function() {

                switch( self.side ) {
                   case 1 : animationStyle = self.animationStyles.side2; self.side = 2; break;
                   case 2 : animationStyle = self.animationStyles.side3; self.side = 3; break;
                   case 3 : animationStyle = self.animationStyles.side4; self.side = 4; break;
                   case 4 : animationStyle = self.animationStyles.side1; self.side = 1; break;
                }

                self._showImage( self.config.current );

                let animateOut 	= {}, animateIn	= {};

                if( self.config.o === 'v' ) {

                    animateOut.left = '+=' + self.disperseFactor + 'px';
                    animateIn.left = '-=' + self.disperseFactor + 'px';

                }
                else if( self.config.o === 'h' ) {

                    animateOut.top = '+=' + self.disperseFactor + 'px';
                    animateIn.top = '-=' + self.disperseFactor + 'px';

                }

                self.$el.css( animationStyle ).animate( animateOut, self.config.speed / 2 ).animate( animateIn, self.config.speed / 2 , function() {

                    if( callback ) {

                        callback.call( self, self.pos );

                    }

                });

            }, this.config.sequentialFactor * this.pos + 30 );

        }

    };

    let logError = function( message ) {

        if ( window.console ) {

            window.console.error( message );

        }

    };

    $.fn.slicebox = function( options ) {

        let self = $.data( this, 'slicebox' );

        if ( typeof options === 'string' ) {

            let args = Array.prototype.slice.call( arguments, 1 );

            this.each(function() {

                if ( !self ) {

                    logError( "cannot call methods on slicebox prior to initialization; " +
                        "attempted to call method '" + options + "'" );
                    return;

                }

                if ( !$.isFunction( self[options] ) || options.charAt(0) === "_" ) {

                    logError( "no such method '" + options + "' for slicebox self" );
                    return;

                }

                self[ options ].apply( self, args );

            });

        }
        else {

            this.each(function() {

                if ( self ) {

                    self._init();

                }
                else {

                    self = $.data( this, 'slicebox', new $.Slicebox( options, this ) );

                }

            });

        }

        return self;

    };

} )( jQuery, window );