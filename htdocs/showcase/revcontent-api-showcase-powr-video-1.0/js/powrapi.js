/*
 Project: PowrApi
 Version: 1
 Author: deepak@revcontent.com
 */

 // universal module definition
( function( window, factory ) {
  // browser global
  window.PowrApi = factory(window, window.revUtils, window.revApi);
}( window, function factory(window, revUtils, revApi) {

  /**
   * id : id of the iframe to attach.
   */
  var PowrApi = function(config) {
      this.config = config;
      this.element = document.getElementById(this.config.id);
      this.window = this.element.contentWindow || this.element;
  };

  PowrApi.prototype.ping = function() {
    this.window.postMessage("ping", this.element.src);
  }

  PowrApi.prototype.play = function() {
    this.window.postMessage("play", this.element.src);
  }

  PowrApi.prototype.pause = function() {
    this.window.postMessage("pause", this.element.src);
  }

  PowrApi.prototype.duration = function(callback) {
    var id = this.config.id;
    this.window.postMessage("duration", this.element.src);
    window.addEventListener("message", function caller(e) {
      window.removeEventListener("message", caller, false);
      var data = JSON.parse(e.data);
      if(data.iframe_id === id) {
        callback(data.duration);
      }
    }, false);
  }

  PowrApi.prototype.requestUpdates = function (callback) {
    setInterval(function(me) {
      var id = me.config.id;
      me.window.postMessage("duration", me.element.src);
      window.addEventListener("message", function caller(e) {
        window.removeEventListener("message", caller, false);
        var data = JSON.parse(e.data);
        if(data.iframe_id === id) {
          callback(data.duration);
        }
      }, false);
    }, 5000, this);
  }

  PowrApi.prototype.log = function() {
    if ((typeof console) != "undefined") console.log(arguments);
  };

  return PowrApi;
}));
