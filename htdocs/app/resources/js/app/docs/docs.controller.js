app.controller('DocsCtrl', function($stateParams, $mdToast, $rootScope, $scope, $http, $timeout, $mdBottomSheet) {
    $scope.active = {
        request: 'http',
        response: 'json'
    };
});