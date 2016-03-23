/*
ooooooooo.                          .oooooo..o oooo   o8o        .o8
`888   `Y88.                       d8P'    `Y8 `888   `"'       "888
 888   .d88'  .ooooo.  oooo    ooo Y88bo.       888  oooo   .oooo888   .ooooo.  oooo d8b
 888ooo88P'  d88' `88b  `88.  .8'   `"Y8888o.   888  `888  d88' `888  d88' `88b `888""8P
 888`88b.    888ooo888   `88..8'        `"Y88b  888   888  888   888  888ooo888  888
 888  `88b.  888    .o    `888'    oo     .d8P  888   888  888   888  888    .o  888
o888o  o888o `Y8bod8P'     `8'     8""88888P'  o888o o888o `Y8bod88P" `Y8bod8P' d888b

Project: RevSlider
Version: 1
Author: michael@revcontent.com

RevSlider({
    api_key: 'your api_key',
    pub_id: pub_id,
    widget_id: widget_id,
    domain: 'widget domain',
    show_arrows: {
        mobile: false,
        desktop: true
    },
    rows: {
        xxs: 2,
        xs: 2,
        sm: 2,
        md: 2,
        lg: 2,
        xl: 2,
        xxl: 2
    },
    per_row: {
        xxs: 1,
        xs: 1,
        sm: 3,
        md: 4,
        lg: 5,
        xl: 6,
        xxl: 7
    },
    image_ratio: (revDetect.mobile() ? 'wide_rectangle' : 'rectangle'),
    rev_position: (revDetect.mobile() ? 'bottom_right' : 'top_right'),
    header: 'Trending Now',
    devices: [
        'phone', 'tablet', 'desktop'
    ],
    url: 'https://trends.revcontent.com/api/v1/',
    ad_border: true,
    disclosure_text: revDisclose.defaultDisclosureText,
    hide_provider: false
});
*/

// universal module definition
( function( window, factory ) {
    'use strict';
    // browser global
    window.RevSlider = factory(window, window.revUtils, window.revDetect, window.revApi, window.revDisclose);

}( window, function factory(window, revUtils, revDetect, revApi, revDisclose) {
'use strict';

    var RevSlider = function(opts) {

        var defaults = {
            visible: true,
            element: false,
            rows: {
                xxs: 2,
                xs: 2,
                sm: 2,
                md: 2,
                lg: 2,
                xl: 2,
                xxl: 2
            },
            per_row: {
                xxs: 1,
                xs: 2,
                sm: 3,
                md: 4,
                lg: 5,
                xl: 6,
                xxl: 7
            },
            is_resize_bound: true,
            image_ratio: (revDetect.mobile() ? 'wide_rectangle' : 'rectangle'),
            header: 'Trending Now',
            rev_position: (revDetect.mobile() ? 'bottom_right' : 'top_right'),
            show_arrows: {
                mobile: true,
                desktop: true
            },
            internal: false,
            devices: [
                'phone', 'tablet', 'desktop'
            ],
            url: 'https://trends.revcontent.com/api/v1/',
            ad_border: true,
            headline_size: 2,
            max_headline: false,
            text_overlay: false,
            vertical: false,
            page_increment: true,
            wrap_pages: true,
            wrap_reverse: true, // if page_increment is false, this must be false
            show_padding: true,
            pages: 4,
            text_right: false,
            text_right_height: 100,
            transition_duration: 0,
            multipliers: {
                font_size: 0,
                margin: 0,
                padding: 0
            },
            buttons: {
                forward: true,
                back: true,
                size: 40,
                position: 'inside',
                dual: false
            },
            disclosure_text: revDisclose.defaultDisclosureText,
            hide_provider: false,
            hide_header: false
        };

        // merge options
        this.options = revUtils.extend(defaults, opts);

        if (revUtils.validateApiParams(this.options).length) {
            return;
        }

        // don't show for this device
        if (!revDetect.show(this.options.devices)) {
            return;
        }

        var that = this;

        this.mobile = (revDetect.mobile()) ? true : false;

        revUtils.appendStyle('/* inject:css */#rev-slider a,#rev-slider a:focus,#rev-slider a:hover{text-decoration:none}#rev-slider,#rev-slider #rev-slider-grid-container{padding:0;width:100%}#rev-slider #rev-slider-grid{padding:0}#rev-slider #rev-slider-grid-container{clear:both;position:relative;width:100%;-webkit-transition:-webkit-transform;transition:transform;-webkit-transition-timing-function:ease-in-out;transition-timing-function:ease-in-out}#rev-slider #rev-slider-container,#rev-slider #rev-slider-inner{width:100%;clear:both;overflow:hidden;position:relative}#rev-slider{clear:both}#rev-slider *{box-sizing:border-box;font-size:inherit;line-height:inherit;margin:0;padding:0}#rev-slider #rev-slider-container .rev-btn-wrapper .rev-chevron{display:inline-block;height:36px;top:50%;margin-top:-18px;position:absolute;left:50%;margin-left:-18px;fill:#fff}#rev-slider #rev-slider-container .rev-btn-wrapper{cursor:pointer;position:absolute;height:100%;width:40px;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-transition:opacity .5s ease-in-out;transition:opacity .5s ease-in-out;z-index:10000000000;top:0}#rev-slider.rev-slider-vertical #rev-slider-container .rev-btn-wrapper{width:100%}#rev-slider.rev-slider-vertical #rev-slider-container .rev-btn-wrapper-forward.rev-btn-wrapper{bottom:0;top:auto}#rev-slider #rev-slider-container .rev-btn-container{position:relative;background-color:#333;opacity:.3;-webkit-transition:opacity .5s ease-in-out;transition:opacity .5s ease-in-out;height:100%;text-align:center;border-radius:5px}#rev-slider #rev-slider-container .rev-btn-container label{cursor:pointer}#rev-slider #rev-slider-container .rev-btn-container:hover{opacity:.8}#rev-slider #rev-slider-container .rev-btn-dual{position:absolute;left:5px;z-index:1;background:#fff;box-shadow:0 0 2px 0 rgba(89,89,89,1);top:50%;margin-top:-36px;border-radius:2px;opacity:0;-webkit-transition:opacity .2s;transition:opacity .2s}#rev-slider #rev-slider-container .rev-btn-dual .rev-btn-wrapper{position:static;width:auto;height:auto;top:auto}#rev-slider #rev-slider-container .rev-btn-dual .rev-btn-container{background-color:inherit;opacity:1;height:36px;border-radius:0}#rev-slider #rev-slider-container:hover .rev-btn-dual{opacity:1}#rev-slider #rev-slider-container .rev-btn-dual.rev-btn-dual-right{right:5px;left:auto}#rev-slider #rev-slider-container .rev-btn-dual .rev-btn-wrapper.rev-btn-wrapper-back{border-bottom:1px solid #ddd}#rev-slider #rev-slider-container .rev-btn-dual .rev-btn-wrapper .rev-chevron{display:inline-block;top:auto;margin-top:0;position:static;left:auto;margin-left:0;fill:#ccc}#rev-slider #rev-slider-container .rev-btn-dual .rev-btn-wrapper:hover .rev-chevron{fill:#aaa}#rev-slider #rev-slider-container:hover .rev-btn-wrapper{opacity:1!important}#rev-slider.rev-slider-text-right .rev-image{float:left;margin-right:5px}#rev-slider.rev-slider-text-right .rev-ad a .rev-headline{margin-top:0!important}#rev-slider a{color:inherit}#rev-slider:focus{outline:0}#rev-slider .rev-header{float:left;font-size:22px;line-height:32px;margin-bottom:0;text-align:left;width:auto}#rev-slider .rev-sponsored{line-height:24px;font-size:12px}#rev-slider .rev-sponsored.bottom-right,#rev-slider .rev-sponsored.top-right{float:right}#rev-slider .rev-sponsored.top-right a{vertical-align:-5px}#rev-slider .rev-sponsored a{color:#999}#rev-slider .rev-ad a{display:block;height:100%;color:#222}#rev-slider .rev-image{position:relative;-webkit-transition:background .5s ease-in-out;transition:background .5s ease-in-out;background:#eee;overflow:hidden}#rev-slider .rev-image img{position:absolute;top:0;left:0;width:100%;-webkit-transition:opacity .5s ease-in-out;transition:opacity .5s ease-in-out;opacity:0;display:block;max-width:100%;height:auto}#rev-slider.loaded .rev-image{background:0 0}#rev-slider.loaded .rev-image img{opacity:1}#rev-slider .rev-headline,#rev-slider .rev-provider{margin:0 10px;text-align:left}#rev-slider .rev-headline{margin-top:12px;overflow:hidden}#rev-slider .rev-headline h3{font-size:16px;font-weight:500;letter-spacing:.2px;line-height:20px;margin:0}#rev-slider .rev-provider{font-size:12px;color:#888;line-height:30px;height:30px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}#rev-slider .rev-ad{border-radius:5px;overflow:hidden;background:#fff;z-index:1}#rev-slider .rev-ad img{border-top-left-radius:5px;border-top-right-radius:5px}#rev-slider .rev-content.blur{-webkit-filter:blur(3px);filter:blur(3px)}#rev-slider .rev-content{-webkit-transition-property:opacity;transition-property:opacity;-webkit-transition-duration:.5s;transition-duration:.5s;opacity:1}#rev-slider .rev-content.rev-next{-webkit-transition-property:opacity;transition-property:opacity;-webkit-transition-duration:.5s;transition-duration:.5s;opacity:.5}#rev-slider.rev-slider-text-overlay .rev-ad{position:relative}#rev-slider.rev-slider-text-overlay .rev-ad a{height:100%}#rev-slider.rev-slider-text-overlay .rev-ad .rev-headline-brand{position:absolute;bottom:4px;color:#fff;text-shadow:1px 1px rgba(0,0,0,.8)}#rev-slider.rev-slider-text-overlay .rev-ad .rev-headline-brand .rev-provider{display:none}#rev-slider.rev-slider-text-overlay .rev-ad .rev-overlay,#rev-slider.rev-slider-text-overlay .rev-ad .rev-overlay:after,#rev-slider.rev-slider-text-overlay .rev-ad .rev-overlay:before{border-radius:5px;position:absolute;top:0;height:100%;width:100%}#rev-slider.rev-slider-text-overlay .rev-ad .rev-overlay:after,#rev-slider.rev-slider-text-overlay .rev-ad .rev-overlay:before{-webkit-transition:all .5s ease-in-out;transition:all .5s ease-in-out;content:"";display:block}#rev-slider.rev-slider-text-overlay .rev-ad .rev-overlay:after{background:-webkit-linear-gradient(top,rgba(0,0,0,.1) 0,rgba(0,0,0,.65) 100%);background:linear-gradient(to bottom,rgba(0,0,0,.1) 0,rgba(0,0,0,.65) 100%)}#rev-slider.rev-slider-text-overlay .rev-ad .rev-overlay:before{opacity:0;background:-webkit-linear-gradient(top,rgba(0,0,0,0) 0,rgba(0,0,0,.4) 100%);background:linear-gradient(to bottom,rgba(0,0,0,0) 0,rgba(0,0,0,.4) 100%)}#rev-slider.rev-slider-text-overlay .rev-ad a:hover .rev-overlay:after{opacity:0}#rev-slider.rev-slider-text-overlay .rev-ad a:hover .rev-overlay:before{opacity:1}#rev-opt-out .rd-close-button{position:absolute;cursor:pointer;right:10px;z-index:10}#rev-opt-out a{cursor:pointer!important}#rev-opt-out .rd-box-wrap{display:none;z-index:2147483641}#rev-opt-out .rd-box-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#000;opacity:.5;filter:alpha(opacity=50);z-index:2147483641}#rev-opt-out .rd-vertical-offset{position:fixed;display:table-cell;top:0;width:100%;z-index:2147483642}#rev-opt-out .rd-box{position:absolute;vertical-align:middle;background-color:#fff;padding:10px;border:1px solid #555;border-radius:12px;-webkit-border-radius:12px;-moz-border-radius:12px;overflow:auto;box-shadow:3px 3px 10px 4px #555}#rev-opt-out .rd-normal{min-width:270px;max-width:435px;width:90%;margin:10px auto}#rev-opt-out .rd-full-screen{position:fixed;right:15px;left:15px;top:15px;bottom:15px}#rev-opt-out .rd-header{height:20px;position:absolute;right:0}#rev-opt-out .rd-about{font-family:Arial,sans-serif;font-size:14px;text-align:left;box-sizing:content-box;color:#333;padding:15px}#rev-opt-out .rd-about .rd-logo{background:url(https://serve.revcontent.com/assets/img/rc-logo.png) bottom center no-repeat;width:220px;height:48px;display:block;margin:0 auto}#rev-opt-out .rd-about p{margin:16px 0;color:#555;font-size:14px;line-height:16px}#rev-opt-out .rd-about p#main{text-align:left}#rev-opt-out .rd-about h2{color:#777;font-family:Arial,sans-serif;font-size:16px;line-height:18px}#rev-opt-out .rd-about a{color:#00cb43}#rev-opt-out .rd-well{border:1px solid #E0E0E0;padding:20px;text-align:center;border-radius:2px;margin:20px 0 0}#rev-opt-out .rd-well h2{margin-top:0}#rev-opt-out .rd-well p{margin-bottom:0}#rev-opt-out .rd-opt-out{text-align:center}#rev-opt-out .rd-opt-out a{margin-top:6px;display:inline-block}/* endinject */', 'rev-slider');

        this.contentItems = [];

        this.containerElement = document.createElement('div');
        this.containerElement.id = 'rev-slider';
        revUtils.addClass(this.containerElement, 'rev-slider-' + (this.options.vertical ? 'vertical' : 'horizontal'));
        revUtils.addClass(this.containerElement, 'rev-slider-' + (this.options.text_right ? 'text-right' : 'text-bottom'));

        this.innerContainerElement = document.createElement('div');
        this.innerContainerElement.id = 'rev-slider-container';

        this.innerElement = document.createElement('div');
        this.innerElement.id = 'rev-slider-inner';

        this.gridContainerElement = document.createElement('div');
        this.gridContainerElement.id = 'rev-slider-grid-container';

        this.gridElement = document.createElement('div');
        this.gridElement.id = 'rev-slider-grid';

        this.element = this.options.element ? this.options.element[0] : document.getElementById(this.options.id);
        this.element.style.width = '100%';

        revUtils.append(this.containerElement, this.innerContainerElement);

        revUtils.append(this.innerContainerElement, this.innerElement);

        revUtils.append(this.innerElement, this.gridContainerElement);

        revUtils.append(this.gridContainerElement, this.gridElement);

        revUtils.append(this.element, this.containerElement);

        this.grid = new AnyGrid(this.gridElement, this.gridOptions());

        this.grid.on('resized', function() {
            that.resize();
        });

        this.setMultipliers();

        this.grid.option({gutter: this.getPadding()});

        this.page = 1;
        this.previousPage = 0;

        this.setUp();

        this.getData();

        this.appendElements();

        this.createCells();

        this.textOverlay();

        this.grid.reloadItems();
        this.grid.layout();

        if (this.options.vertical && this.options.buttons.position == 'outside') { // buttons outside for vertical only
            this.innerContainerElement.style.padding = (this.options.buttons.back ? (this.options.buttons.size + 'px') : '0') + ' 0 ' + (this.options.buttons.forward ? (this.options.buttons.size + 'px') : '0');
        }

        this.initButtons();

        this.impressionTracker = [];
    };

    RevSlider.prototype.createCells = function() {
        for (var i = 0; i < this.limit; i++) {
            this.gridElement.appendChild(this.createNewCell());
        }
    };

    RevSlider.prototype.getPadding = function() {
        this.padding = ((this.grid.columnWidth * this.marginMultiplier).toFixed(2) / 1);
        return this.padding;
    };

    RevSlider.prototype.setMultipliers = function() {
        this.fontSizeMultiplier = Math.round( (.044 + Number((this.options.multipliers.font_size * .01).toFixed(2))) * 1000 ) / 1000;
        this.marginMultiplier = Math.round( (.05 + Number((this.options.multipliers.margin * .01).toFixed(2))) * 1000 ) / 1000;
        this.paddingMultiplier = Math.round( (.01 + Number((this.options.multipliers.padding * .01).toFixed(2))) * 1000 ) / 1000;
    };

    RevSlider.prototype.gridOptions = function() {
        return { masonry: false, perRow: this.options.per_row, transitionDuration: this.options.transition_duration, isResizeBound: this.options.is_resize_bound, adjustGutter:true, removeVerticalGutters: true, gutter: this.padding };
    };

    // RevSlider.prototype.getAnimationDuration = function() {
    //     var duration = 0.5;
    //     if (this.options.vertical) {
    //         var gridRows = this.options.rows[this.grid.getBreakPoint()];
    //         if (gridRows >= 7) {
    //             duration = 2;
    //         } else if (gridRows >= 6) {
    //             duration = 1.75;
    //         } else if (gridRows >= 5) {
    //             duration = 1.5;
    //         } else if (gridRows >= 4) {
    //             duration = 1.25;
    //         } else if (gridRows >= 3) {
    //             duration = 1;
    //         } else if (gridRows >= 2) {
    //             duration = 0.75;
    //         }
    //     } else {
    //         var gridWidth = this.grid.containerWidth;

    //         if (gridWidth >= 1500) {
    //             duration = 2;
    //         } else if (gridWidth >= 1250) {
    //             duration = 1.75;
    //         } else if (gridWidth >= 1000) {
    //             duration = 1.5;
    //         } else if (gridWidth >= 750) {
    //             duration = 1.25;
    //         } else if (gridWidth >= 500) {
    //             duration = 1;
    //         } else if (gridWidth >= 250) {
    //             duration = 0.75;
    //         }
    //     }
    //     if (!this.options.page_increment) {
    //         duration = duration * .5;
    //     }
    //     return duration;
    // };

    RevSlider.prototype.createNextPageGrid = function() {
        var containerWidth = this.innerElement.offsetWidth;
        var containerHeight = this.innerElement.offsetHeight;

        var animationDuration = 1.75; //this.getAnimationDuration(); TODO: make dynamic

        if (this.page > this.previousPage) { // slide left or up
            var insert = 'append';
            if (this.options.vertical) { // up
                var margin = 'marginBottom';
                var gridContainerTransform = 'translateY(-'+ (containerHeight + (this.padding * 2)) +'px)';
            } else { // left
                var margin = 'marginRight';
                var gridContainerTransform = 'translateX(-'+ (containerWidth + (this.padding * 2)) +'px)';
            }
        } else { // Slide right or down
            var insert = 'prepend';
            if (this.options.vertical) { // down
                var margin = 'marginTop';
                this.gridContainerElement.style.transform = 'translateY(-'+ (containerHeight + (this.padding * 2)) +'px)';
                this.gridContainerElement.style.MsTransform = 'translateY(-'+ (containerHeight + (this.padding * 2)) +'px)';
                this.gridContainerElement.style.WebkitTransform = 'translateY(-'+ (containerHeight + (this.padding * 2)) +'px)';
                var gridContainerTransform = 'translateY(0px)';
            } else { // right
                var margin = 'marginLeft';
                this.gridContainerElement.style.transform = 'translateX(-'+ (containerWidth + (this.padding * 2)) +'px)';
                this.gridContainerElement.style.MsTransform = 'translateX(-'+ (containerWidth + (this.padding * 2)) +'px)';
                this.gridContainerElement.style.WebkitTransform = 'translateX(-'+ (containerWidth + (this.padding * 2)) +'px)';
                var gridContainerTransform = 'translateX(0px)';
            }
        }

        var oldGrid = this.grid;

        this.gridElement.style[margin] = (this.padding * 2) + 'px';

        this.gridElement = document.createElement('div');
        this.gridElement.id = 'rev-slider-grid';

        revUtils[insert](this.gridContainerElement, this.gridElement);

        var options = this.gridOptions();
        options.isResizeBound = false;
        this.grid = new AnyGrid(this.gridElement, options);

        if (!this.options.vertical) {
            oldGrid.element.style.width = containerWidth + 'px';
            oldGrid.element.style.float = 'left';

            this.grid.element.style.width = containerWidth + 'px';
            this.grid.element.style.float = 'left';

            this.gridContainerElement.style.width = ((containerWidth * 2) + (this.padding * 2)) + 'px';
        }

        this.createCells();

        this.textOverlay();

        this.grid.reloadItems();
        this.grid.layout();

        this.updateDisplayedItems(true);

        this.gridContainerElement.style.transitionDuration = animationDuration + 's';
        this.gridContainerElement.style.WebkitTransitionDuration = animationDuration + 's';
        this.gridContainerElement.style.transform = gridContainerTransform;
        this.gridContainerElement.style.MsTransform = gridContainerTransform;
        this.gridContainerElement.style.WebkitTransform = gridContainerTransform;

        var that = this;
        setTimeout(function() {
            that.updateGrids(oldGrid);
        }, animationDuration * 1000);
    };

    RevSlider.prototype.updateGrids = function(oldGrid) {
        this.gridElement.style.transform = 'none';
        this.gridElement.style.MsTransform = 'none';
        this.gridElement.style.WebkitTransform = 'none';
        this.gridElement.className = '';

        this.gridContainerElement.style.transitionDuration = '0s';
        this.gridContainerElement.style.WebkitTransitionDuration = '0s';

        this.gridContainerElement.style.transform = 'none';
        this.gridContainerElement.style.MsTransform = 'none';
        this.gridContainerElement.style.WebkitTransform = 'none';

        oldGrid.remove();
        oldGrid.destroy();
        revUtils.remove(oldGrid.element);

        if (!this.options.vertical) {
            this.grid.element.style.width = 'auto';
            this.grid.element.style.float = 'none';

            this.gridContainerElement.style.width = '100%';
        }

        var that = this;
        this.grid.bindResize();
        this.grid.on('resized', function() {
            that.resize();
        });

        this.updating = false;
    };

    RevSlider.prototype.setUp = function() {
        this.grid.layout();
        this.limit = this.getLimit();
        var rowsCols = (this.options.vertical) ? this.grid.perRow : this.options.rows[this.grid.getBreakPoint()];
        this.increment = (this.options.page_increment) ? this.limit : rowsCols;

        if (this.options.image_ratio == 'square') {
            this.imageHeight = 400;
            this.imageWidth = 400;
        } else if (this.options.image_ratio == 'rectangle') {
            this.imageHeight = 300;
            this.imageWidth = 400;
        } else if (this.options.image_ratio == 'wide_rectangle') {
            this.imageHeight = 450;
            this.imageWidth = 800;
        }

        this.preloaderHeight = Math.round((this.grid.columnWidth - (this.padding * 2) - ( this.options.ad_border ? 2 : 0 )) * (this.imageHeight / this.imageWidth));

        if (this.options.text_right) {
            this.preloaderHeight = this.options.text_right_height;
            this.preloaderWidth = Math.round(this.preloaderHeight * (this.imageWidth / this.imageHeight) * 100) / 100;
        }

        this.headlineFontSize = Math.max(14, ((this.grid.columnWidth * this.fontSizeMultiplier).toFixed(2) / 1));

        this.headlineLineHeight = ((this.headlineFontSize * 1.25).toFixed(2) / 1);
        this.headlineHeight = ((this.headlineLineHeight * this.options.headline_size).toFixed(2) / 1);

        this.headlineMarginTop = ((this.headlineLineHeight * .4).toFixed(2) / 1);

        this.providerFontSize = ((this.headlineLineHeight / 2).toFixed(2)) / 1;
        this.providerFontSize = this.providerFontSize < 11 ? 11 : this.providerFontSize;

        this.providerLineHeight = Math.round(((this.providerFontSize * 1.8).toFixed(2) / 1));

        this.innerMargin = Math.max(0, ((this.grid.columnWidth * this.paddingMultiplier).toFixed(2) / 1));
    };

    RevSlider.prototype.initButtons = function() {
        var chevronUp    = '<path d="M18 12l-9 9 2.12 2.12L18 16.24l6.88 6.88L27 21z"/>';
        var chevronDown  = '<path d="M24.88 12.88L18 19.76l-6.88-6.88L9 15l9 9 9-9z"/><path d="M0 0h36v36H0z" fill="none"/>';
        var chevronLeft  = '<path d="M23.12 11.12L21 9l-9 9 9 9 2.12-2.12L16.24 18z"/>';
        var chevronRight = '<path d="M15 9l-2.12 2.12L19.76 18l-6.88 6.88L15 27l9-9z"/>';

        var btnHeight = this.options.buttons.dual ? 'auto' : (this.options.vertical ? this.options.buttons.size + 'px' : '100%');

        this.backBtn = document.createElement('div');
        this.backBtn.id = "back-wrapper";
        this.backBtn.setAttribute('class', 'rev-btn-wrapper rev-btn-wrapper-back');
        this.backBtn.style.height = btnHeight;
        this.backBtn.style.left = this.options.buttons.dual ? 'auto' : '0';
        this.backBtn.innerHTML = '<div id="back-btn-container" class="rev-btn-container" style="right: ' + (this.options.buttons.dual ? 'auto' : '0px') +';">' +
            '<label id="btn-back" class="rev-chevron">' +
                '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">' + (this.options.vertical ? chevronUp : chevronLeft) + '</svg>' +
            '</label></div>';

        this.forwardBtn = document.createElement('div');
        this.forwardBtn.id = "forward-wrapper";
        this.forwardBtn.setAttribute('class', 'rev-btn-wrapper rev-btn-wrapper-forward');
        this.forwardBtn.style.height = btnHeight;
        this.forwardBtn.style.right = this.options.buttons.dual ? 'auto' : '0';
        this.forwardBtn.innerHTML = '<div id="forward-btn-container" class="rev-btn-container" style="right: ' + (this.options.buttons.dual ? 'auto' : '0px') + ';">' +
            '<label id="btn-forward" class="rev-chevron">' +
                '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">' + (this.options.vertical ? chevronDown : chevronRight) + '</svg>' +
            '</label></div>';

        if (this.options.buttons.dual) {
            this.btnContainer = document.createElement('div');
            this.btnContainer.setAttribute('class', 'rev-btn-dual');
            revUtils.append(this.btnContainer, this.backBtn);
            revUtils.append(this.btnContainer, this.forwardBtn);
            revUtils.append(this.innerContainerElement, this.btnContainer);
        } else {
            if (this.mobile) {
                this.forwardBtn.style.opacity = 1;
                this.backBtn.style.opacity = 1;
            } else {
                this.forwardBtn.style.opacity = 0;
                this.backBtn.style.opacity = 0;
            }

            if (this.options.buttons.back) {
                revUtils.append(this.innerContainerElement, this.backBtn);
            }

            if (this.options.buttons.forward) {
                revUtils.append(this.innerContainerElement, this.forwardBtn);
            }
        }

        this.attachButtonEvents();
    };

    RevSlider.prototype.textOverlay = function() {
        var ads = this.containerElement.querySelectorAll('.rev-ad');
        if (this.options.text_overlay) {
            revUtils.addClass(this.containerElement, 'rev-slider-text-overlay');
            for (var i = 0; i < ads.length; i++) {
                var ad = ads[i];
                ad.style.height = this.preloaderHeight + 'px';
                if (!ad.querySelectorAll('.rev-overlay').length) { // add rev-overlay if not already there
                    ad.querySelectorAll('img')[0].insertAdjacentHTML('afterend', '<div class="rev-overlay"></div>');
                }
            }
        } else {
            revUtils.removeClass(this.containerElement, 'rev-slider-text-overlay');
            for (var i = 0; i < ads.length; i++) {
                var ad = ads[i];
                //ad.style.height = 'auto';
            }
        }
    };

    RevSlider.prototype.appendElements = function() {

        if (!this.options.hide_header) {
            if (this.head) {
                revUtils.remove(this.head);
            }
            this.head = document.createElement('div');
            revUtils.addClass(this.head, 'rev-head');
            revUtils.prepend(this.containerElement, this.head);

            this.header = document.createElement('h2');
            this.header.innerHTML = this.options.header;
            revUtils.addClass(this.header, 'rev-header');
            revUtils.append(this.head, this.header);
        }

        if (this.foot) {
            revUtils.remove(this.foot);
        }
        var sponsoredFoot = (this.options.rev_position == 'bottom_left' || this.options.rev_position == 'bottom_right');
        if (sponsoredFoot) {
            this.foot = document.createElement('div');
            revUtils.addClass(this.foot, 'rev-foot');
            revUtils.append(this.containerElement, this.foot);
        }

        this.sponsored = document.createElement('div');

        revUtils.addClass(this.sponsored, 'rev-sponsored');
        this.sponsored.innerHTML = revDisclose.getDisclosure(this.options.disclosure_text);

        if (this.options.rev_position == 'top_right') {
            revUtils.addClass(this.sponsored, 'top-right');
            revUtils.prepend(this.head, this.sponsored);
        } else if (sponsoredFoot) {
            revUtils.addClass(this.sponsored, this.options.rev_position.replace('_', '-'));
            revUtils.append(this.foot, this.sponsored);
        }
    };


    RevSlider.prototype.update = function(newOpts, oldOpts) {
        oldOpts = oldOpts ? oldOpts : this.options;

        this.options = revUtils.extend(this.options, newOpts);

        if ((this.options.size !== oldOpts.size) ||
            (this.options.realSize !== oldOpts.realSize) ||
            (this.options.per_row !== oldOpts.per_row) ||
            (this.options.rows !== oldOpts.rows) ||
            (this.options.headline_size !== oldOpts.headline_size) ||
            (this.options.vertical !== oldOpts.vertical) ||
            (this.options.page_increment !== oldOpts.page_increment) ||
            (this.options.show_padding !== oldOpts.show_padding)) {
            this.options.perRow = this.options.per_row; // AnyGrid needs camels
            this.resize();
        }

        if (!this.options.page_increment) {
            this.options.wrap_reverse = false;
        }

        if ((this.options.header !== oldOpts.header) || this.options.rev_position !== oldOpts.rev_position) {
            this.appendElements();
        }

        if (this.options.text_overlay !== oldOpts.text_overlay) {
            this.textOverlay();
            this.grid.reloadItems();
            this.grid.layout();
        }
        if (this.options.text_right !== oldOpts.text_right) {
            this.grid.reloadItems();
            this.grid.layout();
        }

        if (this.options.pages !== oldOpts.pages) {
            this.getData();
        }
    };

    RevSlider.prototype.getCellHeight = function() {
        var cellHeight = this.preloaderHeight;
        if (!this.options.text_overlay && !this.options.text_right) {
            cellHeight += this.headlineHeight +
            this.headlineMarginTop + this.providerLineHeight;
            cellHeight += (this.options.ad_border) ? 2 : 0;
        }
        return cellHeight;
    };

    RevSlider.prototype.resize = function() {
        var that = this;
        var oldLimit = this.limit;
        this.grid.option({transitionDuration: 0});
        this.setUp();

        var reconfig = 0;// how many to add or remove

        if (oldLimit != this.limit) {
            reconfig = (this.limit - oldLimit);
        }

        if (reconfig !== 0) {
            var nodes = this.element.querySelectorAll('.rev-content');
            if (reconfig < 0) {
                for (var i = 0; i < nodes.length; i++) {
                    if (i >= this.limit) {
                        this.grid.remove(nodes[i]);
                    }
                }
            } else {
                for (var i = 0; i < (this.limit - nodes.length); i++) {
                    this.gridElement.appendChild(this.createNewCell());
                }
                this.previousPage = 0;
                this.page = 1;
                this.updateDisplayedItems(false);
            }
        }

        if (this.options.max_headline) {
            this.headlineHeight = this.getMaxHeadlineHeight(this.displayedItems);
        }

        var ads = this.element.querySelectorAll('.rev-ad');

        for (var i = 0; i < ads.length; i++) {
            var ad = ads[i];

            ad.style.height = this.getCellHeight() + 'px';

            ad.querySelectorAll('.rev-image')[0].style.height = this.preloaderHeight + 'px';
            ad.querySelectorAll('.rev-headline')[0].style.maxHeight = this.headlineHeight + 'px';
            ad.querySelectorAll('.rev-headline')[0].style.margin = this.headlineMarginTop +'px ' + this.innerMargin + 'px 0';
            ad.querySelectorAll('.rev-headline h3')[0].style.fontSize = this.headlineFontSize +'px';
            ad.querySelectorAll('.rev-headline h3')[0].style.lineHeight = this.headlineLineHeight +'px';

            if(that.options.hide_provider === false) {
                ad.querySelectorAll('.rev-provider')[0].style.margin = this.providerMargin + 'px ' + this.innerMargin + 'px ' + this.providerMargin + 'px';
                ad.querySelectorAll('.rev-provider')[0].style.fontSize = this.providerFontSize + 'px';
                ad.querySelectorAll('.rev-provider')[0].style.lineHeight = this.providerLineHeight + 'px';
                ad.querySelectorAll('.rev-provider')[0].style.height = this.providerLineHeight + 'px';
            }

            ad.querySelectorAll('.rev-headline h3')[0].innerHTML = this.displayedItems[i].headline;
        }
        this.textOverlay();
        this.checkEllipsis();

        this.grid.reloadItems();
        this.grid.layout();
        this.grid.option({transitionDuration: this.options.transition_duration});
    };

    RevSlider.prototype.checkEllipsis = function() {
        if (this.options.max_headline && !this.options.text_right) { // text_right should be limited, but don't waste for max_headline only
            return;
        }
        var headlines = this.gridElement.querySelectorAll('.rev-content .rev-headline');
        for (var i = 0; i < headlines.length; i++) {
            var text,
                container = headlines[i],
                headline = container.children[0];
            while(container.clientHeight < container.scrollHeight) {
                text = headline.innerHTML.trim();
                if(text.split(' ').length <= 1) {
                    break;
                }
                headline.innerHTML = text.replace(/\W*\s(\S)*$/, '...');
            }
        }
    };

    RevSlider.prototype.getLimit = function() {
        // can pass object for rows or just single value for all breakpoints
        return this.grid.getPerRow() * (this.options.rows[this.grid.getBreakPoint()] ? this.options.rows[this.grid.getBreakPoint()] : this.options.rows);
    };

    RevSlider.prototype.createNewCell = function() {
        var imgWidth = typeof this.preloaderWidth === 'undefined' ? 'width:auto;' : 'width:' + this.preloaderWidth + 'px;';
        var html = '<div class="rev-ad" style="height: '+ this.getCellHeight() + 'px;' + (this.options.ad_border ? 'border:1px solid #eee' : '') +'">' +
            '<a href="" target="_blank">' +
            '<div class="rev-image" style="'+ imgWidth +'height:'+ this.preloaderHeight +'px">' +
            '<img src=""/>' +
            '</div>' +
            '<div class="rev-headline-brand">' +
            '<div class="rev-headline" style="max-height:'+ this.headlineHeight +'px; margin:'+ this.headlineMarginTop +'px ' + this.innerMargin + 'px' + ' 0;">' +
            '<h3 style="font-size:'+ this.headlineFontSize +'px; line-height:'+ this.headlineLineHeight +'px;"></h3>' +
            '</div>' +
            '<div style="margin:0 '  + this.innerMargin + 'px 0;font-size:'+ this.providerFontSize +'px;line-height:'+ this.providerLineHeight +'px;height:'+ this.providerLineHeight +'px;" class="rev-provider"></div>' +
            '</div>' +
            '</a>' +
            '</div>';

            var cell = document.createElement('div');

            cell.style.padding = this.padding + 'px';

            revUtils.addClass(cell, 'rev-content');

            cell.innerHTML = html;

            return cell;
    };

    RevSlider.prototype.getData = function() {
        var sponsoredCount = this.options.pages * this.limit;
        var url = this.options.url + '?api_key='+ this.options.api_key +'&uitm=true&pub_id='+ this.options.pub_id +'&widget_id='+ this.options.widget_id +'&domain='+ this.options.domain +'&internal_count=0'+'&sponsored_count=' + sponsoredCount;

        var that = this;

        revApi.request(url, function(resp) {
            that.contentItems = resp;
            that.updateDisplayedItems(that.options.visible);

            imagesLoaded( that.gridElement, function() {
                revUtils.addClass(that.containerElement, 'loaded');
            });
        });
    };

    RevSlider.prototype.registerImpressions = function() {
        if (this.impressionTracker[this.offset + '_' + this.count]) {
            return; // impressions already tracked
        }

        var impressionsUrl = this.options.url + '?&api_key='+ this.options.api_key +'&pub_id='+ this.options.pub_id +'&widget_id='+ this.options.widget_id +'&domain='+ this.options.domain +'&api_source=flick';

        impressionsUrl += '&sponsored_count=' + (this.options.internal ? 0 : this.count) + '&internal_count=' + (this.options.internal ? this.count : 0) + '&sponsored_offset='+ (this.options.internal ? 0 : this.offset) +'&internal_offset=' + (this.options.internal ? this.offset : 0);

        var that = this;
        // don't do the same one twice, this could be improved I am sure
        revApi.request(impressionsUrl, function() {
            that.impressionTracker[that.offset + '_' + that.count] = true;
        });
    };

    RevSlider.prototype.updateDisplayedItems = function(registerImpressions) {
        var correctedPage = Math.abs(this.page);
        this.offset = ((correctedPage * this.increment) - this.increment);
        var endIndex = this.offset + this.limit;
        var moreItemsNeeded = 0;
        if (endIndex > this.contentItems.length) {
            endIndex = this.contentItems.length;
            moreItemsNeeded = this.limit - (endIndex - this.offset);
        }
        this.displayedItems = [];
        for (var i = 0; this.offset < endIndex; i++, this.offset++) {
            this.displayedItems[i] = this.contentItems[this.offset];
        }
        for (var i = 0; i < moreItemsNeeded; i++) {
            this.displayedItems[this.displayedItems.length] = this.contentItems[i];
        }

        if (this.options.max_headline) {
            this.headlineHeight = this.getMaxHeadlineHeight(this.displayedItems);
        }

        var ads = this.gridElement.querySelectorAll('.rev-ad');

        var contentIndex = 0;
        var rowCount = 0;
        var contentIncrement = (this.options.vertical) ? 1 : ((typeof this.options.rows == 'object') ? this.options.rows[this.grid.getBreakPoint()] : this.options.rows);
        for (var i = 0; i < this.limit; i++) {
            var ad = ads[i],
                data = this.displayedItems[contentIndex];

            ad.style.height = this.getCellHeight() + 'px';

            ad.querySelectorAll('a')[0].setAttribute('href', data.url.replace('&uitm=1', '').replace('uitm=1', ''));
            ad.querySelectorAll('a')[0].title = data.headline;
            ad.querySelectorAll('img')[0].setAttribute('src', data.image);
            ad.querySelectorAll('.rev-headline h3')[0].innerHTML = data.headline;
            ad.querySelectorAll('.rev-provider')[0].innerHTML = data.brand;
            ad.querySelectorAll('.rev-image')[0].style.height = this.preloaderHeight + 'px';
            ad.querySelectorAll('.rev-headline')[0].style.maxHeight = this.headlineHeight + 'px';
            ad.querySelectorAll('.rev-headline')[0].style.margin = this.headlineMarginTop +'px ' + this.innerMargin + 'px 0';
            ad.querySelectorAll('.rev-headline h3')[0].style.fontSize = this.headlineFontSize +'px';
            ad.querySelectorAll('.rev-headline h3')[0].style.lineHeight = this.headlineLineHeight +'px';
            ad.querySelectorAll('.rev-provider')[0].style.margin = '0 '  + this.innerMargin + 'px 0';
            ad.querySelectorAll('.rev-provider')[0].style.fontSize = this.providerFontSize +'px';
            ad.querySelectorAll('.rev-provider')[0].style.lineHeight = this.providerLineHeight + 'px';
            ad.querySelectorAll('.rev-provider')[0].style.height = this.providerLineHeight +'px';
            contentIndex += contentIncrement;
            if (!this.options.vertical && contentIndex > this.limit - 1) {
                contentIndex = ++rowCount;
            }
        }

        if (registerImpressions) {
            this.registerImpressions(this.offset, this.limit);
        }

        this.grid.reloadItems();
        this.grid.layout();
        this.checkEllipsis();
    };

    RevSlider.prototype.hasNextPage = function() {
        //var pageOffset = (this.options.page_increment) ? 0 : this.limit;
        var correctedPage = Math.abs(this.page);
        return this.contentItems.length  >= (correctedPage * this.increment) + this.increment;
    };

    RevSlider.prototype.hasPreviousPage = function() {
        var correctedPage = Math.abs(this.page);
        return (correctedPage - 1) > 0;
    };

    RevSlider.prototype.hasMorePages = function() {
        var correctedPage = Math.abs(this.page);
        return this.contentItems.length  >= (correctedPage * this.increment) + this.increment;
    };

    RevSlider.prototype.attachButtonEvents = function() {
        var that = this;
        if (this.options.buttons.dual && !revDetect.mobile()) {
            this.containerElement.addEventListener('mousemove', function(e) {
                // get left or right cursor position
                if ((e.clientX - that.containerElement.getBoundingClientRect().left) > (that.containerElement.offsetWidth / 2)) {
                    revUtils.addClass(that.btnContainer, 'rev-btn-dual-right');
                } else {
                    revUtils.removeClass(that.btnContainer, 'rev-btn-dual-right');
                }
            });
        }

        this.forwardBtn.addEventListener('click', function() {
            that.showNextPage();
        });

        this.backBtn.addEventListener('click', function() {
            that.showPreviousPage();
        });
    };

    RevSlider.prototype.showNextPage = function() {
        if (!this.updating) {
            this.updating = true;
            if (this.options.wrap_pages) {
                if (!this.hasMorePages() || this.page === -1) {
                    // wrap or reverse
                    this.page = (this.options.wrap_reverse) ? this.page * -1 : 0;
                }
            }
            this.previousPage = this.page;
            this.page = this.page + 1;
            this.createNextPageGrid();
            if (!this.hasNextPage() && !this.options.wrap_pages) {
                // Disable forward button
                this.forwardBtn.style.display = 'none';
            }
            if (this.hasPreviousPage()) {
                this.backBtn.style.display = 'block';
            }
        }
    };

    RevSlider.prototype.showPreviousPage = function() {
        if (!this.updating) {
            this.updating = true;
            if (this.options.wrap_pages) {
                if (this.options.wrap_reverse) {
                    if (!this.hasMorePages() || this.page === 1) {
                        // Reverse direction
                        this.page = this.page * -1;
                    }
                } else if (!this.hasPreviousPage()) {
                    // Wrap to end
                    this.page = Math.floor(this.contentItems.length / this.increment);
                    // Add 1 here as it will be subtracted below.
                    this.page += 1;
                }
            }
            this.previousPage = this.page;
            this.page = this.page - 1;
            this.createNextPageGrid();
            if (!this.hasPreviousPage() && !this.options.wrap_pages) {
                // Disable back button
                this.backBtn.style.display = 'none';
            } else {
                this.forwardBtn.style.display = 'block';
            }
        }
    };

    RevSlider.prototype.getMaxHeadlineHeight = function() {
        var maxHeight = 0;
        if (this.options.text_right) { // based on preloaderHeight/ ad height
            var verticalSpace = this.preloaderHeight - this.providerLineHeight;
            var headlines = Math.floor(verticalSpace / this.headlineLineHeight);
            maxHeight = headlines * this.headlineLineHeight;
        } else {
            var ads = this.gridElement.querySelectorAll('.rev-ad');
            for (var i = 0; i < this.limit; i++) {
                var ad = ads[i];
                var el = document.createElement('div');
                el.style.position = 'absolute';
                el.style.zIndex = '100';
                el.style.margin = this.headlineMarginTop +'px ' + this.innerMargin + 'px 0';
                el.innerHTML = '<h3 style="font-size:'+ this.headlineFontSize + 'px;line-height:'+ this.headlineLineHeight +'px">'+ this.displayedItems[i].headline + '</h3>';
                revUtils.prepend(ad, el); // do it this way b/c changin the element height on the fly needs a repaint and requestAnimationFrame is not avail in IE9
                maxHeight = Math.max(maxHeight, el.clientHeight);
                revUtils.remove(el);
            }
        }
        return maxHeight;
    };

    return RevSlider;
}));