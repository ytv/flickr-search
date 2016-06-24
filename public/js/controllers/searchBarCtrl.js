App.controller('searchBarCtrl', ['$scope',
    function ($scope) {
        $scope.submitSearch = function($event) {
            var key = $event.which || $event.keyCode;
            if(key === 13) {
                $scope.getItems($scope.search);
            }
        };
}]);
