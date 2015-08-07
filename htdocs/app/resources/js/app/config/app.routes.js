app.config(['$stateProvider', '$locationProvider', '$urlMatcherFactoryProvider', function($stateProvider, $locationProvider, $urlMatcherFactoryProvider) {

    $urlMatcherFactoryProvider.strictMode(false)

    $locationProvider.html5Mode({
        enabled: true
    });

    // Now set up the states
    $stateProvider
        .state('home', {
            url: "/",
            sticky: true,
            views: {
                main: {
                    templateUrl: "app/resources/js/app/grid/grid.html",
                    controller: 'GridCtrl'
                }
            }
        })
        .state('docs', {
            url: "/docs",
            sticky: true,
            views: {
                main: {
                    templateUrl: "app/resources/js/app/docs/docs.html",
                    controller: 'DocsCtrl'
                }
            }
        })
        .state('post', {
            url: "/{id:.*}",
            onEnter: ['$stateParams', '$rootScope', '$state', '$mdDialog', '$location', '$mdCardContent', function($stateParams, $rootScope, $state, $mdDialog, $location, $mdCardContent) {

                var plugins = {
                    instream: {
                        title: 'In-stream',
                        img: 'instream.jpg',
                        description: 'In-stream native sponsored content can look, feel, and function seamlessly across mobile, desktop, or tablet. With the API you\'re in full control of the integration on your web property, inject targeted content in-stream on your homepage, mobile view, or where it fits best for your users.',
                        link: 'revcontent-api-showcase-instream-1.0',
                    },
                    'end-of-gallery': {
                        title: 'End of Gallery',
                        img: 'eog.jpg',
                        description: 'Keep the engagement going long after the last page of your gallery. Using our API on the last page of your photo galleries, top 10 lists, or quizes is a great way to guide your users to their next destination.',
                        link: 'revcontent-api-showcase-endofgallery-1.0',
                    },
                    'scrolling-exp': {
                        title: 'Scrolling Experience',
                        img: 'grid.jpg',
                        description: 'AJAX-powered infinite scrolling UI’s are everywhere these days, with our API you can easily integrate sponsored content into your own implementation. Utilizing our count and offset request parameters to fuel the implementation, you can create a truly native experience that will engage user’s as they scroll.',
                        link: 'revcontent-api-showcase-scrollingexp-1.0',
                    },
                    toaster: {
                        title: 'Toaster',
                        img: 'toast.jpg',
                        description: 'Pop! Content toasters are an engaging way to interact with your readers, once they scroll past 50% of your page’s content, a toaster appears in the lower right corner - or the bottom of the screen in mobile. There are many ways to use content toasters on your site, and with the API, sponsored content can easily be integrated into your own implementation.',
                        link: 'revcontent-api-showcase-toaster-1.0',
                    },
                    'exit-pop': {
                        title: 'Exit Pop',
                        img: 'exitpop.jpg',
                        description: 'Exit Pop is an API implementation that pops up on a user\'s first impression every 24 hours for non-touch enabled devices (e.g. desktops). When the user mouses off the page they are usually trying to close the window or navigate away from the page. Exit Pop is a great way to give these users one more chance to view your RevContent API widget.',
                        link: 'revcontent-api-showcase-exitpop-1.0',
                    },
                    slider: {
                        title: 'Slider',
                        img: 'slider.jpg',
                        description: 'Slider or sometimes called a carousel is an engaging way to showcase RevContent ads on your site! Give your readers the ability to navigate through all of the ads availible to your widget. Fully responsive and configurable to display as many rows and columns as you like at various breakpoints. Slider is a great choice for any site!',
                        link: 'revcontent-api-showcase-slider-1.0',
                    },
                    toaster2: {
                        title: 'Toaster',
                        img: 'toaster2.jpg',
                        description: 'Pop! Content toasters are an engaging way to interact with your readers, once they scroll past 50% of your page’s content, a toaster appears in the lower right corner - or the bottom of the screen in mobile. There are many ways to use content toasters on your site, and with the API, sponsored content can easily be integrated into your own implementation.',
                        link: 'revcontent-api-showcase-toaster-2.0',
                    }
                };

                var plugin = plugins[$stateParams.id];

                $mdDialog.show({
                    templateUrl: 'app/resources/js/app/dialog/post.html',
                    targetEvent: $mdCardContent.getClickEvent(),
                    controller: function($scope) {
                        $scope.post = plugin;
                    },
                    onComplete: function() {
                    }
                })
                .then(function(answer) { //close
                    $location.path('/');
                }, function() { //cancel
                    $location.path('/');
                });
            }]
        });
}]);