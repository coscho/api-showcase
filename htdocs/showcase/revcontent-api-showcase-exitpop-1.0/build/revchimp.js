/**
 * RevChimp.js
 *
 * @author     Julien Chinapen <julien@revcontent.com>
 * @copyright  2015 Integraclick Inc.
 * @license    http://www.integraclick.com Integraclick License
 * @link       http://www.revcontent.com
 * @todo       Remove console.logs
 * @todo       Integrate with Gulp build process
 * @todo       Finalize CDN Endpoint for Subscription URL!
 */
(function ($, window, document, undefined) {

    var RevChimp = {
        formName: 'form_revsubscriber',
        subscription_url: 'http://trends-stg.revcontent.com/rx_subscribe.php?callback=revchimpCallback',
        apiKey: null,
        listID: null,
        email: null,
        subscriberElement: $('.revexitsubscriber:first'),
        selectElement: $("#RevChimpInputSelect"),
        inputElement: $("#RevChimpInputEmail"),
        submitElement: $("#RevChimpSubscribeButton"),
        alertElement: null,
        spinnerElement: null,
        message: "",
        serviceUnavailable: "Server endpoint unavailable, please try again later.",
        subscriber: null,
        styles: '/* inject:css */.revexititem{position:relative;overflow:hidden}.revexititem .revexitsubscriber.hidden{top:-500px}.revexititem .revexitsubscriber{width:100%;height:100%;overflow:hidden;font-size:13px;color:#676767;z-index:2147483605;position:absolute;top:0;left:0;font-family:Montseratt,Arial,sans-serif;border:1px solid transparent;padding:8px;box-sizing:border-box;-webkit-transition:all .5s ease-in-out;transition:all .5s ease-in-out;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAFoCAYAAADttMYPAAAAGXRFW…Zt27bD2rZt23ZY27Zt27Yd1rZt27Zth7Vt27Y/1v4lwABrGsduKxaPMQAAAABJRU5ErkJggg==)}.revexititem .revexitsubscriber.successful{background-color:#dff0d8;border-color:#d6e9c6;color:#3c763d}.revexititem .revexitsubscriber.successful:before{font-size:18px;content:" Subscription Confirmed ";font-weight:700;margin:0 0 10px;display:block;color:#3c763d}.revexititem .revexitsubscriber.successful .subscribe-header,.revexititem .revexitsubscriber.successful .subscribe-message{display:none}.revexititem .revexitsubscriber.failed{background-color:#f2dede;border-color:#ebccd1;color:#a94442}.revexititem .revexitsubscriber.failed:before{font-size:18px;content:" Try again... ";font-weight:700;margin:0 0 10px;display:block;color:#a94442}.revexititem .revexitsubscriber.failed .subscribe-header,.revexititem .revexitsubscriber.failed .subscribe-message{display:none;color:#a94442}.revexititem .revexitsubscriber>*{box-sizing:border-box}.revexititem .revexitsubscriber div{margin:0;padding:0}.revexititem .revexitsubscriber .subscribe-close{position:absolute;right:10px;bottom:10px;width:16px;height:16px;display:block;cursor:pointer;z-index:2147483605;background-color:#111;color:#ddd;-webkit-transition:all .5s ease-in-out;transition:all .5s ease-in-out;line-height:16px;text-align:center;border-radius:2px;-webkit-border-radius:2px;-moz-border-radius:2px;-o-border-radius:2px}.revexititem .revexitsubscriber .subscribe-close:hover{background-color:#4cc93d;color:#fff}.revexititem .revexitsubscriber .subscribe-close:after{content:" x "}.revexititem .revexitsubscriber .subscribe-alert{color:inherit;paddding:5px;font-size:14px}.revexititem .revexitsubscriber .subscribe-header{font-weight:700;font-size:18px;line-height:120%;margin-bottom:10px;color:#444;text-transform:none}.revexititem .revexitsubscriber .subscribe-message{font-size:14px;color:inherit}.revexititem .revexitsubscriber .subscribe-button,.revexititem .revexitsubscriber .subscribe-input{display:block;width:100%;font-size:12px;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;-o-border-radius:3px;height:32px;line-height:32px;padding:0 10px;z-index:inherit;outline:0;-webkit-transition:all .5s ease-in;transition:all .5s ease-in}.revexititem .revexitsubscriber .subscribe-input:focus{border-color:#4cc93d}.revexititem .revexitsubscriber .subscribe-input{border:1px solid #ddd;margin:7px 0;color:#444}.revexititem .revexitsubscriber .subscribe-button{border:1px solid #555;background-color:#333;color:#fff;text-transform:uppercase;letter-spacing:1px;font-weight:700;cursor:pointer;font-size:14px}.revexititem .revexitsubscriber .subscribe-button:hover{background-color:#4cc93d}.revexititem .revexitsubscriber .subscribe-loader{display:none;position:absolute;left:8px;bottom:18px;width:50px;height:16px;border:0;z-index:2147483605}.chimploader{list-style:none;margin:0;padding:0;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%);font-size:0}.chimploader.reversed li{border:3px solid #fff;-webkit-animation:LOADINGREV 2s infinite;animation:LOADINGREV 2s infinite}.chimploader.reversed li:nth-child(1n){-webkit-animation-delay:0s;animation-delay:0s}.chimploader.reversed li:nth-child(2n){-webkit-animation-delay:.2s;animation-delay:.2s}.chimploader.reversed li:nth-child(3n){-webkit-animation-delay:.4s;animation-delay:.4s}.chimploader li{position:absolute;top:50%;left:0;margin:0;height:10px;width:10px;border:3px solid #4cc93d;border-radius:100%;-webkit-transform:transformZ(0);-ms-transform:transformZ(0);transform:transformZ(0);-webkit-animation:LOADING 2s infinite;animation:LOADING 2s infinite}.chimploader li:nth-child(1n){left:-20px;-webkit-animation-delay:0s;animation-delay:0s}.chimploader li:nth-child(2n){left:0;-webkit-animation-delay:.2s;animation-delay:.2s}.chimploader li:nth-child(3n){left:20px;-webkit-animation-delay:.4s;animation-delay:.4s}.grid-row:after{content:"";display:table;clear:both}.grid-row .col{position:absolute;top:0;left:0;bottom:0;width:50%}.grid-row .col+.col{background:#2b8ccd;left:auto;right:0}@-webkit-keyframes LOADING{0%{-webkit-transform:scale(.5);transform:scale(.5);background:#2b8ccd}50%{-webkit-transform:scale(1);transform:scale(1);background:#fff}100%{-webkit-transform:scale(.5);transform:scale(.5);background:#4cc93d}}@keyframes LOADING{0%,100%{-webkit-transform:scale(.5);transform:scale(.5);background:#4cc93d}50%{-webkit-transform:scale(1);transform:scale(1);background:#fff}}@-webkit-keyframes LOADINGREV{0%,100%{-webkit-transform:scale(.5);transform:scale(.5);background:#fff}50%{-webkit-transform:scale(1);transform:scale(1);background:#4cc93d}}@keyframes LOADINGREV{0%,100%{-webkit-transform:scale(.5);transform:scale(.5);background:#fff}50%{-webkit-transform:scale(1);transform:scale(1);background:#4cc93d}}#revexitunit{transition:all .3s ease-out;-moz-transition:all .3s ease-out;-webkit-transition:all .3s ease-out;-o-transition:all .3s ease-out}.modal-hd.taskbar-theme #revexitunit{width:956px;max-width:956px;padding:0;transition:all .3s ease-out;-moz-transition:all .3s ease-out;-webkit-transition:all .3s ease-out;-o-transition:all .3s ease-out}.modal-hd.taskbar-theme #revexitadpanel{width:956px;max-width:956px;margin:0;transition:all .3s ease-out;-moz-transition:all .3s ease-out;-webkit-transition:all .3s ease-out;-o-transition:all .3s ease-out}.modal-hd.taskbar-theme #revexitadpanel.white-bg{background-color:rgba(255,255255,.9)}.modal-hd.taskbar-theme #revexitheader{margin:0;padding:0 18px;height:40px;line-height:40px;font-size:23px;background-color:#eee;border-bottom:1px solid #4cc93d;transition:all .3s ease-out;-moz-transition:all .3s ease-out;-webkit-transition:all .3s ease-out;-o-transition:all .3s ease-out}.modal-hd.taskbar-theme #revexitcloseme{right:20px;background-size:contain;width:15px;height:15px;margin-top:15px}.modal-hd.taskbar-theme .revexititem{margin-right:0;margin-bottom:0}#revexitmask.modal-hd.taskbar-theme>#revexitunit.revexitunitwrap{background:0 0;padding:0}#revexitmask.modal-hd.taskbar-theme>#revexitunit.revexitunitwrap.white-bg{padding:0}.modal-hd.taskbar-theme #revexitheader.white-bg{background-color:#fff;border-bottom:1px solid #fff}#revtaskbar.revtaskbar{display:block;width:100%;padding:0;top:0;min-height:92px;box-sizing:border-box;background-color:#252525;border-top:1px solid #4cc93d;color:#eee;font-family:Montsteratt,sans-serif;position:relative;opacity:1;transition:all .3s ease-out;-moz-transition:all .3s ease-out;-webkit-transition:all .3s ease-out;-o-transition:all .3s ease-out}#revtaskbar.revtaskbar.hidden{top:-50px;opacity:0;transition:all .3s ease-out;-moz-transition:all .3s ease-out;-webkit-transition:all .3s ease-out;-o-transition:all .3s ease-out}#revtaskbar.revtaskbar.detached{top:50px;opacity:0}#revtaskbar.revtaskbar p{margin:0 0 10px;padding:0}#revtaskbar.revtaskbar:before{content:"";width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid #4cc93d;position:absolute;top:0;left:46%}#revtaskbar.revtaskbar:hover{border-top:6px solid #4cc93d}#revtaskbar.revtaskbar .padder{padding:18px}#revtaskbar.revtaskbar button,#revtaskbar.revtaskbar input,#revtaskbar.revtaskbar select,#revtaskbar.revtaskbar textarea{height:28px;line-height:28px;padding:0 6px;border:1px solid #666;margin-right:15px;border-radius:4px;outline:0!important;box-sizing:border-box;font-size:15px;box-shadow:3px 3px 1px rgba(0,0,0,.25);-webkit-box-shadow:3px 3px 1px rgba(0,0,0,.25);-moz-box-shadow:3px 3px 1px rgba(0,0,0,.25);-o-box-shadow:3px 3px 1px rgba(0,0,0,.25);transition:all .3s ease-out;-moz-transition:all .3s ease-out;-webkit-transition:all .3s ease-out;-o-transition:all .3s ease-out;font-family:Montsteratt,sans-serif;color:#333}#revtaskbar.revtaskbar select{float:left;width:200px}#revtaskbar.revtaskbar input{float:left;width:200px;margin-right:0;border-top-right-radius:0;border-bottom-right-radius:0;border-right:0}#revtaskbar.revtaskbar input:focus{border-color:#4cc93d}#revtaskbar .subscribe-loader{display:none;position:absolute;right:36px;bottom:26px;width:50px;height:16px;border:0;z-index:2147483605}#revtaskbar.revtaskbar button{float:left;border-top-left-radius:0;border-bottom-left-radius:0;border-left:0;cursor:pointer;padding:0 10px;text-transform:uppercase;font-weight:700}#revtaskbar.revtaskbar button:hover{background-color:#4cc93d;color:#fff}#revtaskbar.revtaskbar .subscribe-alert{position:absolute;top:0;left:0;width:100%;display:block;height:100%;opacity:.8;padding:18px;text-align:center;font-size:16px;color:#444;background-color:rgba(220,220,220,.9)}#revtaskbar.revtaskbar .subscribe-alert.failed-subscription{color:#676767;background-color:rgba(220,220,220,.95)}#revtaskbar.revtaskbar .subscribe-alert.failed-subscription:before{content:"Error! ";font-weight:700}#revtaskbar.revtaskbar .subscribe-alert.successful-subscription{color:#3c763d;background-color:rgba(223,240,216,.95)}#revtaskbar.revtaskbar .subscribe-alert.successful-subscription:before{content:"Success! ";font-weight:700}#revtaskbar.revtaskbar .subscribe-message{margin-bottom:10px}/* endinject */',
        init: function () {
            console.log("RevChimp: Initializing Revchimp");
            window.RevChimp = RevChimp;
        },
        loadSettings: function(subscription_settings){
            console.log("RevChimp: Loading Settings: ", subscription_settings);
            this.settings = subscription_settings;
        },
        selectUI: function(parent_node){
            console.log("RevChimp: Selecting UI Theme");
            this.taskbarUI(parent_node);
        },
        render: function(subscription_settings){
            console.log("RevChimp: Rendering UI ...");
            console.log("RevChimp: Associating Parent Node: " + $("#revexitunit").attr('id'));
            var that = this;

            that.loadSettings(subscription_settings);
            that.selectUI($("#revexitunit"));
            that.renderStyles();
            that.setupBindings();
            that.setProperties();
        },
        renderStyles: function(){
            console.log("RevChimp: Injecting Stylesheets..");
            var styles = $('<style type="text/css" id="revexit_styles_alt" />');
            styles.html(this.styles);
            $('body').append(styles);
        },
        setProperties: function () {
            console.log("RevChimp: Setup Internal Properties");
            this.email = this.inputElement.val();
            this.apiKey = this.subscriberElement.attr("data-apikey");
            this.listID = this.subscriberElement.attr("data-listid");
            this.message = this.subscriberElement.attr("data-message");

        },
        setupBindings: function () {
            console.log("RevChimp: Setup Event Bindings");
            this.subscriberElement = $('.revexitsubscriber:first');
            this.selectElement = $("#RevChimpInputSelect");
            this.inputElement = $("#RevChimpInputEmail");
            this.submitElement = $("#RevChimpSubscribeButton");
            this.alertElement = this.subscriberElement.find('.subscribe-alert');
            this.spinnerElement = this.subscriberElement.find('.subscribe-loader');
            this.submitElement.on('click', this.subscribe);
        },
        subscribe: function () {
            console.log("RevChimp: Subscription Request Started...");
            var that = RevChimp;
            that.setProperties();
            var subscribe_ajax = $.ajax({
                url: that.subscription_url,
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                dataType: 'jsonp',
                jsonp: false,
                jsonpCallback: "revchimpCallback",
                type: 'post',
                data: {api_key: that.apiKey, list_id: that.listID, email: that.email},
                beforeSend: function () {
                    that.submitElement.addClass("disabled").attr({disabled: true});
                    that.spinnerElement.fadeIn(300);
                },
                success: function (subscription_response) {
                    that.spinnerElement.fadeOut(300, function () {
                        if (subscription_response.subscribed == true) {
                            console.log("RevChimp: Completed subscription....");
                            that.subscriberElement.find('.subscribe-message').fadeOut(200);
                            that.inputElement.fadeOut(200);
                            that.selectElement.fadeOut(200);
                            that.submitElement.removeClass("disabled").attr({disabled: false}).fadeOut(200);
                            that.subscriberElement.removeClass("failed").addClass("successful");
                            that.alertElement.removeClass("failed-subscription").addClass("successful-subscription").text(subscription_response.message).fadeIn(200, function(){
                                $(this).delay(5000).fadeOut(200, function(){

                                });

                                setTimeout(function(){

                                    that.subscriber.addClass("detached");
                                    //$('#revexitmask').removeClass("taskbar-theme");
                                    //$('#revexitunit, #revexitheader').addClass("white-bg");
                                    that.subscriber.detach();
                                    $('#revexitmask').removeClass("taskbar-theme");
                                   // $('#revexitunit, #revexitadpanel').animate({width: '992px'}, 600, function(){
                                        //var unit = $(this);
                                        $('.revexititem').animate({margin:'4px 4px'}, 500, function(){
                                            //unit.addClass('white-bg');
                                            $('#revexitheader').addClass("white-bg");
                                            $('#revexitadpanel').addClass("white-bg");

                                        });

                                    //});

                                }, 3000);
                            });

                        } else {
                            console.log("RevChimp: Failed subscription....");
                            that.inputElement.fadeIn(200);
                            that.selectElement.fadeIn(200);
                            that.submitElement.removeClass("disabled").attr({disabled: false});
                            that.subscriberElement.removeClass("successful").addClass("failed");
                            that.subscriberElement.find('.subscribe-alert').removeClass("successful-subscription").addClass("failed-subscription").text(subscription_response.message).fadeIn(200).delay(3000).fadeOut();
                        }
                    });
                },
                error: function (subscription_response) {
                    console.log("RevChimp: Connection failed....");
                    that.spinnerElement.fadeOut(300, function () {
                        that.inputElement.fadeIn(200);
                        that.selectElement.fadeIn(200);
                        that.submitElement.removeClass("disabled").attr({disabled: false});
                        that.subscriberElement.addClass("failed");
                        that.subscriberElement.find('.subscribe-alert').removeClass("successful-subscription").addClass("failed-subscription").text(that.serviceUnavailable).fadeIn(200).delay(3000).fadeOut();
                    });
                }

            });
        },
        taskbarUI: function (parent_node) {
            console.log("RevChimp: Build Taskbar UI...");
            $('.revexitsubscriber').detach();
            if (typeof parent_node == "object") {
                console.log("RevChimp: Attaching to Parent Node..." + parent_node.id);
                $("#revexitmask").addClass("taskbar-theme");
                var subscriber_taskbar = $('<div />'),
                    subscriber_form = $('<form method="post" action="' + this.subscription_url + '" name="' + this.formName + '" id="' + this.formName + '" />'),
                    subscriber_padder = $('<div />').addClass('padder'),
                    subscriber_alert = $('<div />').addClass("subscribe-alert").hide(),
                    subscriber_choice = $('<select />').attr({id: "RevChimpInputSelect"}).append(['<option>Candidate A</option>', '<option>Candidate B</option>', '<option>Candidate B</option>']),
                    subscriber_loader = $('<div />').addClass("subscribe-loader").hide().append($('<ul />').addClass("chimploader").append(['<li></li>', '<li></li>', '<li></li>'])),
                    subscriber_message = $('<div />').addClass("subscribe-message").text(this.settings.message),

                    subscriber_input = $('<input />').addClass("subscribe-input").attr({
                        'id': 'RevChimpInputEmail',
                        'name': 'RevChimpInputEmail',
                        'type': 'text',
                        'placeholder': 'E-mail Address'
                    }),
                    subscriber_button = $('<button />').addClass("subscribe-button").attr({
                        'id': 'RevChimpSubscribeButton',
                        'name': 'RevChimpSubscribeButton',
                        'type': 'button'
                    }).text("Subscribe"),
                    clearfix = $('<div />').attr('style', 'clear:both;display:block;');
                    subscriber_taskbar.attr({"id": "revtaskbar"}).addClass("revtaskbar revexitsubscriber hidden").append([subscriber_alert, subscriber_loader, subscriber_padder.append([subscriber_form.append([subscriber_message, subscriber_choice, subscriber_input, subscriber_button])], clearfix)]).attr({
                        'data-apikey': this.settings.apiKey,
                        'data-listid': this.settings.listID
                    });

                this.subscriber = subscriber_taskbar;
                parent_node.append(this.subscriber);

                var that = this;
                setTimeout(function () {
                    that.subscriber.removeClass("hidden");
                }, 2000);
            }
        }
    };

    $(window).load(RevChimp.init);


}(jQuery, window, document));


