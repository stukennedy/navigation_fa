angular.module('integrationApp')
.controller('ContentCtrl',function ($scope, $rootScope, $famous) {
    var Transitionable  = $famous["famous/transitions/Transitionable"];
    $scope.opacity = new Transitionable(0);
    $rootScope.$on('transition_out', function () {
        $scope.opacity.set(0);
    });

    $rootScope.$on('transition_in', function () {
        $scope.opacity.set(1, {duration: 3000, curve: 'easeOut'});
    });
});