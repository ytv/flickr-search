App.controller('searchBarCtrl', ['$scope', '$timeout',
    function ($scope, $timeout) {
        let searchDelay = 500,
            previousTerm,
            timeout;

        // Triggers 'enter' key
        $scope.submitSearch = function($event) {
            var key = $event.which || $event.keyCode;
            if(key === 13) {
                $scope.getItems($scope.search);
            }
        };

        /*Auto search triggers in searchDelay ms when:
        - search term is at least 3 chars in length
        - search term does not equal the previous searched term
        - user has not typed anything in the last searchDelay ms*/
        $scope.onSearchChange = function() {
            if(timeout)
                $timeout.cancel(timeout);
            if($scope.search.length > 2 && $scope.search !== previousTerm) {
                timeout = $timeout(function() {
                    $scope.getItems($scope.search);
                    previousTerm = $scope.search;
                    timeout = null;
                }, searchDelay);
            }
        }
}]);
