/**
 * Revcontent utils
 */

( function( window, factory ) {
  /*global define: false, module: false, require: false */
  'use strict';
  // universal module definition
    // browser global
    window.revUtils = factory(
      window,
      window.revOverlay
    );

}( window, function factory( window, revOverlay ) {

'use strict';

var utils = {};

utils.deprecateOptions = function(opts) {
    if (opts.overlay) {
        opts.image_overlay = opts.overlay;
    }

    if (opts.overlay_icons) {
        opts.image_overlay_icons = opts.overlay_icons;
    }

    if (opts.overlay_position) {
        opts.image_overlay_position = opts.overlay_position;
    }

    return opts;
};

utils.validateApiParams = function(params) {
    var errors = [];
    if (!params.api_key){
        errors.push('api_key');
    }

    if (params.rev_position) {
        var revPositions = ['top_right', 'bottom_left', 'bottom_right'];
        if (this.inArray(revPositions, params.rev_position) < 0) {
            errors.push('rev_position');
        }
    }

    if (!params.pub_id){
        errors.push('pub_id');
    }
    if (!params.widget_id){
        errors.push('widget_id');
    }
    if (!params.domain){
        errors.push('domain');
    }

    if (errors.length) {
        console.log(errors);
    }

    return errors;
};

utils.serialize = function(obj, prefix) {
    if (!obj) {
        return '';
    }
    var str = [];
    for(var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            var k = prefix ? prefix + "[" + prop + "]" : prop, v = obj[prop];
            str.push(typeof v == "object" &&
            (Object.prototype.toString.call(v) == "[object Object]") ? this.serialize(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
    }
    return str.join("&");
};

utils.appendStyle = function(style, namespace, extra) {
    var namespace = namespace + '-append-style';

    if (!document.getElementById(namespace)) {
        var el = document.createElement('style');
        el.type = 'text/css';
        el.id = namespace;
        el.innerHTML = style;
        document.getElementsByTagName('head')[0].appendChild(el);
    }

    if (extra && typeof extra === 'string') {
        var namespaceExtra = namespace + '-extra'
        var extraStyleElement = document.getElementById(namespaceExtra);

        if (extraStyleElement) {
            extraStyleElement.innerHTML += extra;
        } else {
            var el = document.createElement('style');
            el.type = 'text/css';
            el.id = namespaceExtra;
            el.innerHTML = extra;
            document.getElementsByTagName('head')[0].appendChild(el);
        }
    }
};

//b overwrites a only one level :/
utils.extend = function( a, b ) {
    var c = {};
    for (var prop in a) {
        c[prop] = a[prop];
    }

    for ( var prop in b ) {
        if (typeof b[prop] == 'object' &&
        (Object.prototype.toString.call(b[prop]) == "[object Object]")) { // if the prop is an obj recurse
            c[prop] = this.extend(c[prop], b[prop]);
        } else {
            c[prop] = b[prop];
        }
    }
    return c;
};

utils.merge = function(a, b) {
    for (var prop in b) {
        a[prop] = b[prop];
    }
    return a;
};

utils.inArray = function(array, item) {
    for (var i = 0; i < array.length; i++) {
    if (array[i] === item)
      return i;
    }
    return -1;
};

utils.setCookie = function(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    var cpath = "; path=/; domain=" + top.location.host;
    document.cookie = cname + "=" + cvalue + "; " + expires + cpath;
};

utils.getCookie = function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
};

utils.prepend = function(el, html) {
    el.insertBefore(html, el.firstChild);
};

utils.append = function(el, html) {
    el.appendChild(html);
};

utils.remove = function(el) {
    if (el && el.parentNode) {
        el.parentNode.removeChild(el);
    }
};

utils.wrap = function(el, wrapper) {
    var parent = el.parentNode;

    wrapper.appendChild(el);
    parent.appendChild(wrapper);
};

utils.next = function(el) {
    function nextElementSibling(el) {
        do { el = el.nextSibling; } while ( el && el.nodeType !== 1 );
        return el;
    }

    return el.nextElementSibling || nextElementSibling(el);
};

utils.hasClass = function(el, className) {
    if (!el) return false;
    if (el.classList)
      return el.classList.contains(className);
    else
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
};

utils.addClass = function(el, className) {
    if (!el) return false;

    if (el.classList) {
        el.classList.add(className);
    } else {
        this.removeClass(el, className); // make sure we don't double up
        el.className += ' ' + className;
    }
};

utils.removeClass = function(el, className, prefix) {
    if (!el) return false;

    var classes = el.className.trim().split(" ").filter(function(c) {
        if (prefix) {
            return c.lastIndexOf(className, 0) !== 0;
        }
        return c !== className;
    });

    el.className = classes.join(" ").trim();
};

utils.dispatchScrollbarResizeEvent = function() {
    var id = 'rc-scrollbar-resize-listener-frame';
    if (document.getElementById(id)) { // singleton
        return;
    }
    var iframe = document.createElement('iframe');
    iframe.id = id;
    iframe.style.cssText = 'height: 0; background-color: transparent; margin: 0; padding: 0; overflow: hidden; border-width: 0; position: absolute; width: 100%;';

    var that = this;
    // Register our event when the iframe loads
    iframe.onload = function() {
        // trigger resize event once when the iframe resizes
        var callback = function() {
            try {
                if (Event.prototype.initEvent) { // deprecated
                    var evt = document.createEvent('UIEvents');
                    evt.initUIEvent('resize', true, false, window, 0);
                } else {
                    var evt = new UIEvent('resize');
                }
                window.dispatchEvent(evt);
                // only trigger once
                that.removeEventListener(iframe.contentWindow, 'resize', callback);
            } catch(e) {
            }
        };

        that.addEventListener(iframe.contentWindow, 'resize', callback);
    };

    // Stick the iframe somewhere out of the way
    document.body.appendChild(iframe);
}

utils.addEventListener = function(el, eventName, handler, options) {
    if (!handler) {
        return;
    }

    var defaultOptions = false; // useCapture defaults to false
    if (this.eventListenerPassiveSupported()) {
        // passive by default
        var defaultOptions = {
          passive: (options && typeof options.passive !== 'undefined' ? options.passive : true)
        };
    }
    if (el.addEventListener) {
        el.addEventListener(eventName, handler, defaultOptions);
    } else {
        el.attachEvent('on' + eventName, function(){
            handler.call(el);
        });
    }
};

// if event listener does not preventDefault it should be passive
utils.eventListenerPassiveSupported = function() {
    var supportsCaptureOption = false;
    try {
      addEventListener("test", null, Object.defineProperty({}, 'passive', {get: function () {
        supportsCaptureOption = true;
      }}));
    } catch(e) {}

    return supportsCaptureOption
};

utils.removeEventListener = function(el, eventName, handler) {
    if (!handler) {
        return;
    }
    if (el.removeEventListener) {
        el.removeEventListener(eventName, handler);
    } else {
        el.detachEvent('on' + eventName, handler);
    }
};

utils.transformCss = function(el, css) {
    el.style.transform = css;
    el.style.MsTransform = css;
    el.style.WebkitTransform = css;
    el.style.OTransform = css;
};

utils.transitionCss = function(el, css) {
    el.style.transition = css;
    el.style.MsTransition = css;
    el.style.WebkitTransition = css;
    el.style.OTransition = css;
};

utils.transitionDurationCss = function(el, css) {
    el.style.transitionDuration = css;
    el.style.WebkitTransitionDuration = css;
    el.style.MozTransitionDuration = css;
    el.style.OTransitionDuration = css;
};

utils.ellipsisText = function(headlines) {
    for (var i = 0; i < headlines.length; i++) {
        var text,
            container = headlines[i],
            headline = container.children[0];
        while(container.clientHeight < (container.scrollHeight > container.clientHeight ? (container.scrollHeight - 1) : container.scrollHeight)) {
            text = headline.innerHTML.trim();
            if(text.split(' ').length <= 1) {
                break;
            }
            headline.innerHTML = text.replace(/\W*\s(\S)*$/, '...');
        }
    }
};

utils.imagesLoaded = function(images, emitter) {
    // emit done event when all images have finished loading

    if (!images.length) {
        emitter.emitEvent('imagesLoaded');
    }

    var maxMilliseconds = 4000;

    // LoadingImage code from https://github.com/desandro/imagesloaded
    function LoadingImage( img ) {
        this.img = img;
    }

    LoadingImage.prototype = new EventEmitter();

    LoadingImage.prototype.check = function() {
        // If complete is true and browser supports natural sizes,
        // try to check for image status manually.
        var isComplete = this.getIsImageComplete();
        if ( isComplete ) {
            // HACK check async to allow time to bind listeners
            var that = this;
            setTimeout(function() {
                // report based on naturalWidth
                that.confirm( that.img.naturalWidth !== 0, 'naturalWidth' );
            });
            return;
        }

        // If none of the checks above matched, simulate loading on detached element.
        this.proxyImage = new Image();
        utils.addEventListener(this.proxyImage, 'load', this);
        utils.addEventListener(this.proxyImage, 'error', this);
        // bind to image as well for Firefox. #191
        utils.addEventListener(this.img, 'load', this);
        utils.addEventListener(this.img, 'error', this);
        this.proxyImage.src = this.img.src;
    };

    LoadingImage.prototype.getIsImageComplete = function() {
        return this.img.complete && this.img.naturalWidth !== undefined;
    };

    LoadingImage.prototype.confirm = function( isLoaded, message ) {
        this.isLoaded = isLoaded;
        this.emit( 'progress', this, this.img, message );
    };

    // ----- events ----- //

    // trigger specified handler for event type
    LoadingImage.prototype.handleEvent = function( event ) {
        var method = 'on' + event.type;
        if ( this[ method ] ) {
          this[ method ]( event );
        }
    };

    LoadingImage.prototype.onload = function() {
        this.confirm( true, 'onload' );
        this.unbindEvents();
    };

    LoadingImage.prototype.onerror = function() {
        this.confirm( false, 'onerror' );
        this.unbindEvents();
    };

    LoadingImage.prototype.unbindEvents = function() {
        utils.removeEventListener(this.proxyImage, 'load', this);
        utils.removeEventListener(this.proxyImage, 'error', this);
        utils.removeEventListener(this.img, 'load', this);
        utils.removeEventListener(this.img, 'error', this);
    };

    var progressedCount = 0;

    for (var i=0; i < images.length; i++ ) {
        var loadingImage = new LoadingImage(images[i]);
        loadingImage.once( 'progress', function() {
            progressedCount++;
            if (progressedCount == images.length) {
                emitter.emitEvent('imagesLoaded');
            }
        });
        loadingImage.check();
    }

    // don't wait longer than maxMilliseconds, this is a safety for network slowness or other issues
    setTimeout(function() {
        emitter.emitEvent('imagesLoaded');
    }, maxMilliseconds);
}

utils.getComputedStyle = function (el, prop, pseudoElt) {
    if (getComputedStyle !== 'undefined') {
        return getComputedStyle(el, pseudoElt).getPropertyValue(prop);
    } else {
        return el.currentStyle[prop];
    }
};

utils.setImage = function(wrapperElement, src) {
    var img = document.createElement('img');
    img.src = src;
    this.append(wrapperElement, img);
};

utils.mergeOverlayIcons = function(icons) {
    this.merge(revOverlay.icons, icons);
};

utils.imageOverlay = function(image, content_type, overlay, position) {
    revOverlay.image(image, content_type, overlay, position);
};

utils.adOverlay = function(ad, content_type, overlay, position) {
    revOverlay.ad(ad, content_type, overlay, position);
};

utils.checkVisible = function(element, callback, percentVisible, buffer) {
    var that = this;
    requestAnimationFrame(function() {
        // what percentage of the element should be visible
        var visibleHeightMultiplier = (typeof percentVisible === 'number') ? (parseInt(percentVisible) * .01) : 0;
        // fire if within buffer
        var bufferPixels = (typeof buffer === 'number') ? buffer : 0;

        var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        var scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        var elementTop = element.getBoundingClientRect().top;
        var elementBottom = element.getBoundingClientRect().bottom;
        var elementVisibleHeight = element.offsetHeight * visibleHeightMultiplier;

        if ((scroll + windowHeight >= (elementTop + scroll + elementVisibleHeight - bufferPixels)) &&
            elementBottom > elementVisibleHeight) {
            callback.call(that);
        }
    });
};

utils.checkHidden = function(element, callback, percentHidden) {
    var that = this;
    requestAnimationFrame(function() {
        // what percentage of the element should be hidden
        var visibleHeightMultiplier = (typeof percentHidden === 'number') ? (parseInt(percentHidden) * .01) : 0;

        var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        var scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

        if ((scroll + windowHeight < element.getBoundingClientRect().top + scroll ||
            element.getBoundingClientRect().top + (element.offsetHeight * visibleHeightMultiplier) <= 0)) {
            callback.call(that);
        }
    });
};

// get all images above an element
utils.imagesAbove = function(element) {
    // get all images
    var images = document.querySelectorAll('img');
    // top position of show visible element
    var elementTop = element.getBoundingClientRect().top;
    // if show visible element is below image add to imagesAboveElement array
    var imagesAboveElement = [];
    for (var i = 0; i < images.length; i++) {
        if (images[i].getBoundingClientRect().top < elementTop) {
            imagesAboveElement.push(images[i]);
        }
    }
    return imagesAboveElement;
};

utils.throttle = function throttle(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last,
        deferTimer;
    return function () {
        var context = scope || this;

        var now = +new Date,
            args = arguments;
        if (last && now < last + threshhold) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = now;
                fn.apply(context, args);
            }, threshhold);
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
};

utils.siblingIndex = function(el) {
    if (!el) {
        return false;
    }
    var i = 0;
    while( (el = el.previousSibling) != null ) {
      i++;
    }
    return i;
}

utils.isArray = function(param) {
    return Object.prototype.toString.call(param) === '[object Array]';
}

utils.docReady = function(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        document.attachEvent('onreadystatechange', function() {
        if (document.readyState != 'loading')
            fn();
        });
    }
}

// -----  ----- //
return utils;

}));