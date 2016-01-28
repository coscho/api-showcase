/**
 * RevDisclose (Branding + Disclosure Options)
 *
 */

(function (window, document, undefined) {
    'use strict';
    console.log("Entering RevDisclose Namespace...");
    var RevDisclose = function () {
        var self = this;
        self.plainText = false;
        self.disclosureText = null;
        self.disclosureHtml = '';
        self.defaultDisclosureText = 'Sponsored by Revcontent';
        self.disclosureTextLimit = 50;
        self.onClickHandler = false;
        self.onClickHandlerObject = null;
        self.defaultOnClick = function () {

        };
        self.hooks = [];
        self.init();
    };

    RevDisclose.prototype.init = function () {
        console.log("RevDisclose: Initializing...");
        var self = this;
        document.onreadystatechange = function () {
            if (document.readyState == "complete") {
                console.log("RevDisclose: Document is READY!...");

            }
        }
    };

    RevDisclose.prototype.truncateDisclosure = function () {
        console.log("RevDisclose: Initializing...");
        var self = this;
        self.disclosureText = self.disclosureText.toString().substring(0, self.disclosureTextLimit).replace(/['"]+/g, '');
    };

    RevDisclose.prototype.setDisclosureText = function(disclosure){
        console.log("RevDisclose: Setting Disclosure Text Label to: "  + disclosure.toString());
        var self = this;
        self.disclosureText = (disclosure.length > 2) ? disclosure.toString() : self.defaultDisclosureText;
        self.truncateDisclosure();
    };

    RevDisclose.prototype.setOnClickHandler = function (handler, handlerObject) {
        console.log("RevDisclose: Setting onClick Handler for Disclosure text...");
        var self = this;
        if (typeof handler === 'function') {
            self.onClickHandler = handler;
        }
        if (typeof handlerObject === 'object') {
            self.onClickHandlerObject = handlerObject;
        }
    };

    RevDisclose.prototype.getSponsorTemplate = function () {
        console.log("RevDisclose: Building Disclosure HTML...");
        var self = this;
        self.disclosureHtml = '<a href="javascript:;" onclick="revDisclose.onClickHandler(revDisclose.onClickHandlerObject ? revDisclose.onClickHandlerObject : null);">' + self.disclosureText + '</a>';
        console.log("RevDisclose: " + self.disclosureHtml);
        return self.plainText ? self.disclosureText : self.disclosureHtml;
    };

    RevDisclose.prototype.getDisclosure = function (disclosureText, onClickHandler, HandlerObject) {
        console.log("RevDisclose: Attaching Disclosure Text and onClick Event Function...");
        var self = this;
        self.setDisclosureText(disclosureText);
        self.setOnClickHandler(onClickHandler, HandlerObject);
        return self.getSponsorTemplate();
    };

    RevDisclose.prototype.getProviderTemplate = function(className, styles){
        var self = this;
        var providerHtml = '<div class="' + className + '" style="' + styles + '"></div>';
        return providerHtml;
    };

    RevDisclose.prototype.getProvider = function(className, styles) {
        var self = this;
        return self.getProviderTemplate(className, styles);
    };

    window.revDisclose = new RevDisclose();

    return window.revDisclose;

}(window, document));