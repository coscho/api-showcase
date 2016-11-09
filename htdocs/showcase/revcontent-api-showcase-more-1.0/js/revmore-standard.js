/*
ooooooooo.                         ooo        ooooo
`888   `Y88.                       `88.       .888'
 888   .d88'  .ooooo.  oooo    ooo  888b     d'888   .ooooo.  oooo d8b  .ooooo.
 888ooo88P'  d88' `88b  `88.  .8'   8 Y88. .P  888  d88' `88b `888""8P d88' `88b
 888`88b.    888ooo888   `88..8'    8  `888'   888  888   888  888     888ooo888
 888  `88b.  888    .o    `888'     8    Y     888  888   888  888     888    .o
o888o  o888o `Y8bod8P'     `8'     o8o        o888o `Y8bod8P' d888b    `Y8bod8P'

Project: RevMore
Version: 1
Author: michael@revcontent.com

RevMore({
    api_key: 'your api_key',
    pub_id: pub_id,
    widget_id: widget_id,
    domain: 'widget domain'
});
*/

// universal module definition
( function( window, factory ) {
    'use strict';
    // browser global
    window.RevMore = factory(window, window.revUtils, window.revDetect, window.revApi, window.revDialog);

}( window, function factory(window, revUtils, revDetect, revApi, revDialog) {
'use strict';

    var RevMore;
    var that;
    var defaults = {
        url: 'trends.revcontent.com',
        top_id: false,
        distance: 500,
        unlock_text: 'Read More...',
        gradient_height: 60,
        devices: [
            'phone', 'tablet', 'desktop'
        ],
        query_params: false
    };

    RevMore = function(opts) {
        if (that) {
            that.destroy();
            return new RevMore(opts);
        }

        // if it wasn't newed up
        if ( !( this instanceof RevMore ) ) {
            that = new RevMore(opts);
            return that;
        } else {
            that = this;
        }

        // merge options
        this.options = revUtils.extend(defaults, opts);

        // don't show for this device
        if (!revDetect.show(this.options.devices)) {
            return;
        }

        if (!this.options.widget_id) {
            return;
        }

        revUtils.appendStyle('/* inject:css */[inject]/* endinject */', 'rev-more');

        this.init = function() {

            this.checkPadding();

            this.createElements();

            this.setPadding();

            this.setTop();

            this.appendElements();

            this.innerWidget();

            this.attachButtonEvents();

            this.attachResizedEvents();
        };

        // we don't want any padding on the body
        this.checkPadding = function() {
            //IE9+
            this.padding = {
                top: getComputedStyle(document.body)['padding-top'],
                right: getComputedStyle(document.body)['padding-right'],
                bottom: getComputedStyle(document.body)['padding-bottom'],
                left: getComputedStyle(document.body)['padding-left']
            }
            //make sure we don't have any strange paddings
            document.body.style.paddingBottom = '0';
            document.body.style.paddingLeft = '0';
            document.body.style.paddingRight = '0';
        };

        this.setPadding = function() {
            if (!parseInt(this.padding.top, 10)) { // if there is not padding move along
                return;
            }
            this.wrapper.style.paddingTop = this.padding.top;
            this.wrapper.style.marginTop = '-' + this.padding.top;
        };

        // create the elements
        this.createElements = function() {
            this.wrapper = document.createElement("div");
            this.wrapper.id = "rev-more-wrapper";
            while (document.body.firstChild) {
                this.wrapper.appendChild(document.body.firstChild);
            }
            document.body.appendChild(this.wrapper);

            this.element = document.createElement('div');
            this.element.id = 'rev-more';
            this.element.innerHTML = '<div style="height:' + this.options.gradient_height + 'px; top:-'+ this.options.gradient_height +'px" id="rev-more-gradient"></div>';
            this.element.setAttribute('class', 'rev-more');

            this.unlockBtn = document.createElement('div');
            this.unlockBtn.id = 'rev-more-unlock';
            this.unlockBtn.innerHTML = this.options.unlock_text;

            this.containerElement = document.createElement('div');
            this.containerElement.className = 'rev-more-inner';

            this.innerWidgetElement = document.createElement('div');
        };

        // get the top position using marker if it exists or distance option
        this.setTop = function() {
            var marker = document.getElementById(this.options.top_id);

            this.top = marker ? marker.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop) : this.options.distance;

            this.element.style.top = this.top + this.options.gradient_height + 'px';
        };

        this.appendElements = function() {
            revUtils.append(this.containerElement, this.innerWidgetElement);
            revUtils.append(this.element, this.unlockBtn);
            revUtils.append(this.element, this.containerElement);

            revUtils.append(document.body, this.element);
        };

        this.innerWidget = function() {
            var serializedQueryParams = revUtils.serialize(this.options.query_params);
            var referer="";try{if(referer=document.referrer,"undefined"==typeof referer)throw"undefined"}catch(exception){referer=document.location.href,(""==referer||"undefined"==typeof referer)&&(referer=document.URL)}referer=referer.substr(0,700);
            this.standardScript = document.createElement("script");
            this.standardScript.id = 'rc_' + Math.floor(Math.random() * 1000);
            this.standardScript.type = 'text/javascript';
            this.standardScript.src = "//"+ this.options.url +"/serve.js.php?w=" +
                this.options.widget_id +
                "&t="+this.standardScript.id +
                "&c="+(new Date()).getTime() +
                "&width="+(window.outerWidth || document.documentElement.clientWidth) +
                "&referer="+referer +
                (serializedQueryParams ? ('&' + serializedQueryParams) : '');
            this.standardScript.async = true;
            // var rcds = document.getElementById("rcjsload_44c3e1");
            this.innerWidgetElement.appendChild(this.standardScript);

            // set the wrapper right away
            this.wrapperHeight();
            // check the wrapper height for size changes
            var that = this;
            this.standardScript.onload = function() {
                that.checkStandardWrapperHeight();
            }
        };

        this.checkStandardWrapperHeight = function() {
            var wrapperHeight;
            var count = 0;
            var checkInterval;
            var check = function() {
                var prevWrapperHeight = wrapperHeight;
                wrapperHeight = that.wrapperHeight();
                if (wrapperHeight == prevWrapperHeight) {
                    count++;
                } else {
                    count--;
                }
                if (count >= 10) {
                    clearInterval(checkInterval);
                }
            }
            // start the check
            checkInterval = setInterval(check, 40);
        }

        // set the wrapper equal to top + the element height
        this.wrapperHeight = function() {
            // subtract 20 to make up for bottom zone
            var height = (this.top - 20) + this.element.offsetHeight + this.options.gradient_height;
            this.wrapper.style.height = height + 'px';
            return height;
        };

        // unlock button
        this.attachButtonEvents = function() {
            this.unlockBtn.addEventListener('click', function() {
                that.wrapper.style.height = 'auto';
                that.wrapper.style.marginBottom = '0'; // remove buffer margin
                that.wrapper.style.overflow = 'visible';
                // reset any padding or margin set
                document.body.style.paddingBottom = that.padding.bottom;
                document.body.style.paddingLeft = that.padding.left;
                document.body.style.paddingRight = that.padding.right;
                that.wrapper.style.paddingTop = 0;
                that.wrapper.style.marginTop = 0;

                revUtils.addClass(that.element, 'unlocked');

                setTimeout(function() {
                    that.destroy(false);
                }, 1000);
            });
        };

        // reset the wrapper height on resize
        this.attachResizedEvents = function() {
            // attach to window resize
            this.resizeListener = this.resize.bind(this);
            revUtils.addEventListener(window, 'resize', this.resizeListener);
        };

        this.resize = function() {
            if ( this.resizeTimeout ) {
                clearTimeout( this.resizeTimeout );
            }

            var that = this;
            function delayed() {
                that.checkStandardWrapperHeight();
                delete that.resizeTimeout;
            }

            this.resizeTimeout = setTimeout( delayed, 100 );
        }

        this.destroy = function(destroySameWidget) {
            revUtils.remove(this.element);
            this.wrapper.style.height = 'auto';
            this.wrapper.style.overflow = 'visible';
            that = null;
        };

        this.init();
    };

    return RevMore;
}));
