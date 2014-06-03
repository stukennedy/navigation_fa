angular.module('integrationApp')
.controller('NavbarCtrl',function ($scope, $rootScope, $famous, $location) {
    var Transitionable  = $famous["famous/transitions/Transitionable"];
    var i;
    $scope.cursor = new Transitionable([0,0,0]);
    $scope.width = 130;
    $scope.height = 30;

    $scope.boxes = [{text: 'Home', url: '/', icon: 'home'},
                    {text: 'About', url: '/about', icon: 'user'},
                    {text: 'Projects', url: '/projects', icon: 'list'},
                    {text: 'Audio', url: '/audio', icon: 'headphones'},
                    {text: 'News', url: '/news', icon: 'warning-sign'},
                    {text: 'Contact', url: '/contact', icon: 'envelope'}];
    $scope.selected = null;

    for (i = 0; i < $scope.boxes.length; i++)
        $scope.boxes[i].trans = new Transitionable([0,0,0]);

    $scope.animate = function (index) {
        $scope.boxes[index].trans.set([30,0,50], {duration: 500, curve: 'easeOut'});

        $scope.cursor.set([0,index*($scope.height + 5),50], {duration: 500, curve: 'easeOut'});
        var pos_1 = Math.min(index,$scope.selected);
        var pos_2 = Math.max(index,$scope.selected);
        for (var i = pos_1 + 1; i < pos_2; i++) {
            $scope.boxes[i].trans.set([15,0,50], {duration: 500, curve: 'easeOut'});
            $scope.boxes[i].trans.set([0,0,50], {duration: 100, curve: 'easeOut'});
        }

        if (index != $scope.selected && $scope.selected !== null)
            $scope.boxes[$scope.selected].trans.set([0,0,0], {duration: 500, curve: 'easeOut'});
        $scope.selected = index;
    };

    $scope.click = function (index) {
        $location.path( $scope.boxes[index].url );
    };

    $rootScope.$on('$locationChangeStart', function(event) {
        $rootScope.$broadcast('transition_out');
    });

    $rootScope.$on('$locationChangeSuccess', function(event) {
        var i;
        $rootScope.$broadcast('transition_in');
        var url = $location.path();
        for (i = 0; i < $scope.boxes.length; i++) {
            if ($scope.boxes[i].url === url) {
                if($scope.selected !== i)
                    $scope.animate(i);
            }
        }
    });

});