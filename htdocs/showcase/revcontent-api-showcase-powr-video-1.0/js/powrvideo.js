/*
 Project: PowrVideo
 Version: 1
 Author: harsh@revcontent.com
 */

// universal module definition
( function( window, factory ) {
    // browser global
    window.PowrVideo = factory(window, window.revUtils, window.revApi);

}( window, function factory(window, revUtils, revApi) {

    var PowrInitialized = false;
    /**
     * id : id of the div to attach.
     * tag : tag to use.
     * dfp : true/false
     * custom_logo : 
     * autoplay : "none|load|focus" [ Whether to autoplay video ]
     * videos : [ { "id" , "thumbnail" , "sd_url", "hd_url" } ]
     * float : {
          "desktop" : "bottom-right|none",
	  "mobile" : "top|none",
	  "minWidth" : 100,
	  "maxWidth" : 200
     * },
     * iframe_id : "id" // Incase we are inside an iframe. 
     * player_id : id to give the player we creating. 
     */
    var PowrVideo = function(config) {
        this.config = config;
	
	this.floatSettings = this.createFloatSettings();
	this.iframeSettings = this.createIframeSettings();
	
        this.fixedHeight = -1;
        this.element = document.getElementById(this.config.id);
	
        this.playerId = "content_video";
        if (config.playerId) {
            this.playerId = config.playerId;
        }
        this.viewed = false;
        this.playerWidth = this.element.clientWidth;
	if (this.config.fluid) {
            this.playerHeight = this.element.clientHeight;
	} else {
	    this.playerHeight = 0.5625 * this.playerWidth;
	}

        this.element.setAttribute("style", "width: 100%; height : " + parseInt(this.playerHeight) + "px; background-color : #EFEFEF;");

        this.videos = config.videos;
        this.currentContent = 0;

        this.options = {
            id : this.playerId,
            nativeControlForTouch: false
        };

        if (config.hasOwnProperty('preloaded') && config.preloaded) {
            this.setup();
        } else {
            this.init();
        }
    };

    PowrVideo.prototype.getAdTag = function(videoId) {
	if (this.dfp) {
            return "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=" + this.config.tag + "&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1"
		+ "&cust_params=p_width%3D" + parseInt(this.playerWidth) + "%26p_height%3D" + parseInt(this.playerHeight)
		+ "&description_url=" + encodeURI("http://alpha.powr.com/video/" + videoId);
	} else {
	    var tag = this.config.tag;
	    tag = tag.replace("REFERRER_URL", encodeURI(window.location.href));
	    tag = tag.replace("P_WIDTH", "" + parseInt(this.playerWidth));
	    tag = tag.replace("P_HEIGHT", "" + parseInt(this.playerHeight));
	    tag = tag.replace("CACHE_BUSTER", "" + new Date().getTime());
	    return tag;
	}
    };

    PowrVideo.prototype.init = function() {
        this.emitter = new EvEmitter();

        if (PowrInitialized) {
            this.setup();
            return;
        }

        revUtils.appendStyle('/* inject:css */[inject]/* endinject */', 'rev-powr-video');

        var that = this;
	
        this.floated = false;
	
        var imaCss = document.createElement("link");
        imaCss.setAttribute("href", "//cdnjs.cloudflare.com/ajax/libs/videojs-ima/0.6.0/videojs.ima.css");
        imaCss.setAttribute("type", "text/css");
        imaCss.setAttribute("rel", "stylesheet");
        revUtils.append(this.element, imaCss);

        var imaScript = document.createElement('script');
        imaScript.setAttribute('src', '//imasdk.googleapis.com/js/sdkloader/ima3.js');
        imaScript.setAttribute('async', true);
        imaScript.setAttribute('type', 'text/javascript');

        revUtils.addEventListener(imaScript, "load", function () {
            that.setup();
        });
        revUtils.append(this.element, imaScript);
    };

    PowrVideo.prototype.onResize = function() {
        var width = this.element.clientWidth;
        var height = this.fixedHeight;
        if (height == -1) {
            height = parseInt(0.5625 * width);
        }
        this.element.setAttribute("style", "width : 100%; height : " + height + "px; background-color : #EFEFEF");

        var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        var windowWidth = window.innerWidth|| document.documentElement.clientWidth || document.body.clientWidth;
        var newOrientation = '';
        if (windowWidth < windowHeight) {
            newOrientation = 'portrait';
        } else if (windowWidth > windowHeight) {
            newOrientation = 'landscape';
        }
        if (newOrientation != this.orientation) {
            this.orientation = newOrientation;
            this.orientationChanged();
        }
    }

    PowrVideo.prototype.setup = function () {
        var mobile = false;
        if (navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/Android/i)) {
            mobile = true;
        }

        this.container = document.createElement("div");
        this.container.className = 'powr_player';
        this.element.appendChild(this.container);

        this.attachVisibleListener();
        revUtils.addEventListener(window, 'resize', this.onResize.bind(this));
        this.orientation = 'none';
        this.onResize();

        var dumbPlayer = document.createElement('video');
        dumbPlayer.id = this.playerId;
        dumbPlayer.className = 'video-js vjs-default-skin vjs-big-play-centered vjs-fluid';
        dumbPlayer.setAttribute('width', this.playerWidth + 'px');
        dumbPlayer.setAttribute('height', this.playerHeight + 'px');
        dumbPlayer.setAttribute("controls", "true");
        dumbPlayer.setAttribute("preload", "auto");
        dumbPlayer.setAttribute("poster", this.videos[0].thumbnail);
        dumbPlayer.setAttribute("playsinline", "true");
        if (mobile && this.config.autoplay) {
            dumbPlayer.setAttribute("muted", "true");
        }
        var contentSrc = document.createElement('source');
        contentSrc.setAttribute('src', this.videos[0].sd_url);
        contentSrc.setAttribute('type', 'video/mp4');
        dumbPlayer.appendChild(contentSrc);

        this.container.appendChild(dumbPlayer);

        // videojs.support.requestFullScreen = false;

        this.player = videojs(this.playerId, {
            nativeControlForTouch: false
        });

        this.currentContent = 0;
	this.autoplaying = true;
        //
        //this.player.logobrand({
          //  image : this.config.custom_logo,
          //  destination : "http://alpha.powr.com/"
        //});

        var me = this;

        //revUtils.addEventListener(window, 'scroll', function () {
          //  if (me.player) {
          //      me.player.muted(false);
          //  }
        // });
        if (mobile && this.config.autoplay) {
            this.player.one("touchend", function () {
                if (me.player && me.player.muted()) {
                    me.player.muted(false);
                }
            });
            //revUtils.addEventListener(this.container, 'touchend', function () {
            //
            //});
        }


        this.player.ready(function () {
            var titleContent = me.videos[0].title;
            if (me.config.custom_logo) {
                titleContent = "<a class='rc-video-close' href='javascript:void(0)' class='close'><span class='label'>CLOSE | </span>X</a><img src='" + me.config.custom_logo + "'><span class='rc-video-title'>" + titleContent + "</span>";
            }

            me.player.overlay({
                align: "top",
                showBackground: true,
                class: "rc-video-overlay",
                content: titleContent,
                overlays: [{
                    start: "custom1",
                    end: "custom2"
                }]
            });
            me.player.overlays_[0].show();
            me.player.on('timeupdate', me.onUpdate.bind(me));

            me.player.on('play', me.onPlay.bind(me));
            me.player.on('pause', me.onPause.bind(me));
            me.player.on('useractive', me.onActive.bind(me));
            me.player.on('userinactive', me.onIdle.bind(me));
	    
            GlobalPlayer = me;
	    
            me.closeButton = me.container.querySelector(".rc-video-close");
            me.titleDom = me.container.querySelector(".rc-video-title");

            revUtils.addEventListener(me.closeButton, 'click', function () {
                me.floatSettings.landscape = false;//neverFloat = true;
		me.floatSettings.portrait = false;
		
                me.player.pause();
                me.unfloatPlayer();
            });
//            if (navigator.userAgent.match(/iPhone/i) ||
//                navigator.userAgent.match(/iPad/i) ||
//                navigator.userAgent.match(/Android/i)) {
//                me.player.one('touchend', function () {
//                    me.start(true);
//                    me.player.play();
//                });
//            } else {
            me.start(me.config.autoplay);
            if (!me.config.autoplay) {
                me.player.one('click', function () {
                    me.player.play();
                });
            }
//            }
        });
    };

    PowrVideo.prototype.onUpdate = function() {
        if (this.currentContent >= this.videos.length)
            return;
	if (!this.config.hasOwnProperty("tracking_url"))
	    return;
        var video = this.videos[this.currentContent];
        var d = this.player.currentTime();
        d = (d * 1.0) / video.duration;
        if (video.tracking['start'] && (d > 0)) {
            revApi.request(this.config.tracking_url + video.tracking['start'], function () { return ; });
            video.tracking['start'] = null;
        } else if (video.tracking['q_1'] && (d > 0.25)) {
            revApi.request(this.config.tracking_url + video.tracking['q_1'], function () { return ; });
            video.tracking['q_1'] = null;
        } else if (video.tracking['q_2'] && (d > 0.5)) {
            revApi.request(this.config.tracking_url + video.tracking['q_2'], function () { return ; });
            video.tracking['q_2'] = null;
        } else if (video.tracking['q_3'] && (d > 0.75)) {
            revApi.request(this.config.tracking_url + video.tracking['q_3'], function () { return ; });
            video.tracking['q_3'] = null;
        }
    };
    
    PowrVideo.prototype.start = function(playOnLoad) {
        this.player.ima(this.options, this.bind(this, this.adsManagerLoadedCallback));
        this.player.ima.initializeAdDisplayContainer();
        this.player.ima.setContentWithAdTag(this.videos[this.currentContent].sd_url, this.getAdTag(this.videos[this.currentContent].id), playOnLoad);
        this.player.poster(this.videos[this.currentContent].thumbnail);

        this.player.ima.requestAds();

        var me = this;
        this.player.ima.addContentEndedListener(function () {
            me.loadNextVideo();
        });
    };

    PowrVideo.prototype.loadNextVideo = function() {
        var video = this.videos[this.currentContent];
	if (this.config.hasOwnProperty("tracking_url")) {
            if (video.tracking['end']) {
		revApi.request(this.config.tracking_url + video.tracking['end'], function () { return ; });
		video.tracking['end'] = null;
            }
	}
        this.currentContent++;
        if (this.currentContent < this.videos.length) {
            this.player.ima.setContentWithAdTag(this.videos[this.currentContent].sd_url, this.getAdTag(this.videos[this.currentContent].id), true);
            this.player.poster(this.videos[this.currentContent].thumbnail);
            var titleContent = this.videos[this.currentContent].title;
            // this.player.overlays_[0].contentEl().innerHTML = titleContent;
            this.titleDom.innerHTML = titleContent;
            this.player.ima.requestAds();
        } else {
            this.currentContent--;
        }
    };

    PowrVideo.prototype.attachVisibleListener = function() {
        revUtils.addEventListener(window, 'scroll', this.checkVisible.bind(this));
        this.checkVisible();
    };

    PowrVideo.prototype.floatPlayer = function() {
        if (this.floated)
            return;
        if (this.orientation == "portrait" && !this.floatSettings.portrait)
            return;
	if (this.orientation == "landscape" && !this.floatSettings.landscape)
	    return;
	
        this.container.className = "rc-float-video powr_player";
        var styleString = "";
        var fs = this.floatSettings;
	
        var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        if (this.orientation == 'portrait') {
            styleString += "top : 0px;";
            styleString += "left : 0px; right : 0px; width : 100%; height : 176px;";
            this.player.fluid(false);
            this.player.dimensions(windowWidth, 176);

            // this.closeButton.setAttribute("style", "margin-top : 166px; margin-left : " + (windowWidth - 60) + "px");
            this.closeButton.setAttribute("style", "margin-top : 0px; margin-left : " + (windowWidth - 50) + "px");

        } else {
            this.player.fluid(true);
            if (fs.landscape_style.startsWith("top")) {
                styleString += "top : 0px;";
            } else {
                styleString += "bottom : 0px;";
            }

            if (fs.landscape_style.endsWith("right")) {
                styleString += "right : 0px;";
            } else {
                styleString += "left : 0px;";
            }
	    
            var r = this.element.getBoundingClientRect();
            var w = windowWidth - r.right;
            w = w - 20;
	    if (w < fs.min_width) {
		w = fs.min_width;
	    }
	    if (w > fs.max_width) {
		w = fs.max_width;
	    }
            styleString += "width : " + w + "px;";
	    
            var h = parseInt(0.5625 * w);
            if (fs.landscape_style.startsWith("top")) {
                this.closeButton.setAttribute("style", "margin-top : " + (h - 10) + "px;");            } else {
                this.closeButton.setAttribute("style", "margin-left : " + (w - 100) + "px; margin-top : -30px;");
            }
        }

        this.container.setAttribute("style", styleString);

        this.floated = true;
    };

    PowrVideo.prototype.unfloatPlayer = function() {
        if (this.floated) {
            this.container.className = 'powr_player';
            this.container.removeAttribute("style");
            this.floated = false;
            this.player.fluid(true);
        }
    };
    
    PowrVideo.prototype.setFixedHeight = function(h) {
        this.fixedHeight = h
    };

    PowrVideo.prototype.orientationChanged = function() {
        if (this.floated) {
            this.floated = false;
            // refloat player if orientation has changed.
            this.floatPlayer();
        }
    };

    PowrVideo.prototype.getTitle = function () {

    };

    PowrVideo.prototype.checkVisible = function() {
        var that = this;
        requestAnimationFrame(function() {
	    var ifs = that.iframeSettings;
	    if (ifs.true) {
		var element = window.parent.document.getElementById(ifs.id);
		var windowHeight = window.parent.innerHeight || window.parent.document.documentElement.clientHeight || window.parent.document.body.clientHeight;
		var elementHeight = element.getBoundingClientRect().height;
		var elementTop = element.getBoundingClientRect().top;
		var currentScroll = window.parent.pageYOffset || window.parent.document.documentElement.scrollTop || window.parent.document.body.scrollTop; 
		
		if (elementTop + elementHeight < 0) {
		    if (that.visible) {
			that.visible = false;
			that.onHidden();
		    }
		    /*
		    if (that.autoplaying && !that.player.paused()) {
			that.player.pause();
		    }
		    */
		} else if (elementTop + 30 < windowHeight) {
		    if (!that.visible) {
			that.visible = true;
			that.onVisible();
		    }
		    /*
		    if (that.autoplaying && that.player.paused()) {
			that.player.play();
		    }
		    */
		}
		
	    } else {
		// what percentage of the element should be visible
		// var visibleHeightMultiplier = (typeof percentVisible === 'number') ? (parseInt(percentVisible) * .01) : 0;
		// fire if within buffer
		// var bufferPixels = (typeof buffer === 'number') ? buffer : 0;
		var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		var scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
		var elementTop = that.element.getBoundingClientRect().top;
		var elementBottom = that.element.getBoundingClientRect().bottom;
		var elementVisibleHeight = that.element.offsetHeight * 0.50;

		if (elementTop + that.playerHeight < 0) {
		    if (that.visible) {
			that.visible = false;
			that.onHidden();
		    }
		} else if (elementTop + 30 < windowHeight) {
		    if (!that.visible) {
			that.visible = true;
			that.onVisible();
		    }
		}
		/*
		if ((elementTop + elementVisibleHeight) < windowHeight) {
                    that.registerView();
		}
		
		if (elementTop < 0 && (-1 * elementTop) > 0.2 * that.playerHeight) {
                    that.floatPlayer();
		} else {
                    that.unfloatPlayer();
		}
		*/
	    }
        });
    };

    PowrVideo.prototype.onVisible = function() {
	this.registerView();
	this.unfloatPlayer();
    };

    PowrVideo.prototype.onHidden = function() {
	this.floatPlayer();
    };
    
    PowrVideo.prototype.adsManagerLoadedCallback = function() {
        var me = this;
        this.player.ima.addEventListener(google.ima.AdEvent.Type.STARTED, function () {
            me.player.removeClass('vjs-ad-loading');
        });
        this.player.ima.startFromReadyCallback();
    };

    PowrVideo.prototype.registerView = function() {
	if (!this.config.hasOwnProperty("tracking_url"))
	    return;
        if (!this.viewed) {
            this.viewed = true;
            revApi.request(this.config.tracking_url + this.config.view_tracker, function() { return; });
        }
    };

    PowrVideo.prototype.bind = function(thisObj, fn, argument) {
        return function() {
            fn.apply(thisObj, [argument]);
        };
    };

    PowrVideo.prototype.onAdEvent = function (event) {

    };

    PowrVideo.prototype.onPlay = function() {

    };

    PowrVideo.prototype.onPause = function() {
        this.player.overlays_[0].show();
    };

    PowrVideo.prototype.onActive = function() {
        this.player.overlays_[0].show();
    };

    PowrVideo.prototype.onIdle = function() {
        if (!this.player.paused()) {
            this.player.overlays_[0].hide();
        }
    };

    PowrVideo.prototype.createFloatSettings = function() {
	var c = this.config;
	var ret = {
	    "landscape" : false,
	    "portrait" : false,
	    "min_width" : 200,
	    "max_width" : 400
	};
	if (!c.float) return ret;
	if (c.float.desktop && c.float.desktop != "none") {
	    ret.landscape = true;
	    ret.landscape_style = c.float.desktop;
	}
	if (c.float.mobile && c.float.mobile != "none") {
	    ret.portrait = true;
	    ret.portrait_style = c.float.mobile;
	}
	return ret;
    };

    PowrVideo.prototype.createIframeSettings = function() {
	var c = this.config;
	var ret = {
	    iframe : false
	};
	if (!c.iframe_id) return ret;
	ret.iframe = true;
	ret.id = c.iframe_id;
	return ret;
    };
    
    return PowrVideo;
}));
