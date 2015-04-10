<!DOCTYPE html>
<html ng-app="app">
    <head>
        <!-- Force latest IE rendering engine or ChromeFrame if installed -->
        <!--[if IE]>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <![endif]-->
        <base href="/">

        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>RevContent API Showcase</title>

        <link rel="shortcut icon" href="/app/resources/img/favicon.ico">

        <link rel="stylesheet" href="//f.fontdeck.com/s/css/uH5+KWQnibDTJRYggGJ9XZLTAgw/api.showcase.mosterhout.dev2.dev.internal/47418.css" type="text/css" />

        <script src="app/resources/vendor/jquery/dist/jquery.js"></script>
        <script src="app/resources/vendor/angular/angular.js"></script>
        <script src="app/resources/vendor/angular-aria/angular-aria.js"></script>
        <script src="app/resources/vendor/angular-animate/angular-animate.js"></script>
        <script src="app/resources/vendor/angular-ui-router/release/angular-ui-router.js"></script>
        <script src="app/resources/vendor/ui-router-extras/release/modular/ct-ui-router-extras.core.js"></script>
        <script src="app/resources/vendor/ui-router-extras/release/modular/ct-ui-router-extras.sticky.js"></script>
        <script src="app/resources/vendor/angular-material/angular-material.js"></script>
        <script src="app/resources/vendor/angular-messages/angular-messages.js"></script>
        <script src="app/resources/vendor/imagesloaded/imagesloaded.pkgd.js"></script>
        <script src="app/resources/vendor/bootpag/lib/jquery.bootpag.js"></script>
        <script src="app/resources/vendor/lodash/dist/lodash.js"></script>

        <!-- plugin js -->
        <script src="showcase/revcontent-api-showcase-grid-1.0/js/grid.js"></script>
        <script src="showcase/revcontent-api-showcase-carousel-1.0/js/shoveler.js"></script>
        <!-- toaster no plugin js -->

        <!-- app js -->
        <script src="app/resources/js/app/app.module.js"></script>
        <script src="app/resources/js/app/config/app.config.js"></script>
        <script src="app/resources/js/app/config/app.routes.js"></script>
        <script src="app/resources/js/app/app.filters.js"></script>
        <script src="app/resources/js/app/app.directives.js"></script>
        <script src="app/resources/js/app/grid/grid.controller.js"></script>

        <!-- plugin css -->
        <link rel="stylesheet" type="text/css" href="showcase/revcontent-api-showcase-grid-1.0/css/grid.css">
        <link rel="stylesheet" type="text/css" href="showcase/revcontent-api-showcase-carousel-1.0/css/carousel.css">
        <link rel="stylesheet" type="text/css" href="showcase/revcontent-api-showcase-toaster-1.0/css/toaster.css">

        <link href="app/resources/vendor/sanitize-css/dist/sanitize.css" rel="stylesheet" type="text/css" media="screen" />
        <link href="app/resources/vendor/angular-material/angular-material.css" rel="stylesheet" type="text/css" media="screen" />
        <link href="app/resources/css/app.css" rel="stylesheet" type="text/css" media="screen" />

    </head>
    <body>
        <div id="wrapper" layout="column" layout-fill>
            <header>
                <md-toolbar class="md-primary">
                    <div class="md-toolbar-tools container md-toolbar-tools-bottom" flex="" tabindex="0">
                        <div layout="row" flex="">

                            <div flex style="position:absolute;">
                                <h1>RevContent API Showcase</h1>
                                <a class="logo" href="/">
                                    <img src="/app/resources/img/revcontent-logo-dark.png">
                                </a>
                            </div>

                            <div flex=""></div>

                            <a class="md-button" target="_self" ng-href="" tabindex="0" style="margin-right:8px;">
                                <span>Docs</span>
                                <md-tooltip>Read Up!</md-tooltip>
                            </a>

                            <a class="md-button" target="_self" ng-href="" tabindex="0">
                                <span>Support</span>
                                <md-tooltip>How can we help?</md-tooltip>
                            </a>

                        </div>
                    </div>
                </md-toolbar>
            </header>

            <main class="container">
                <div ui-view="main"></div>
            </main>

            <footer>
                <div class="container">
                    © 2015, rev:content All Rights Reserved. <span class="padding">&middot;</span> <a href="404.html" title=""><strong>Legal Notice</strong></a>
                </div>
            </footer>
        </div>
    </body>
</html>
