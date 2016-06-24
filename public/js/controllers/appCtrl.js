App.controller('AppCtrl', ['$scope', 'flickrService', 'AppService', '$anchorScroll', function ($scope, flickrService, AppService, $anchorScroll) {

    $scope.error = '';
    $scope.data = [];
    $scope.loadedData = [];
    let load = 8;

    $scope.init = function() {
        $scope.getItems('sunset');
    };

    $scope.getItems = function(search) {
        $anchorScroll();
        flickrService.getItems(search).then(function(data) {
            $scope.data = AppService.processData(data);
            $scope.loadedData = $scope.data.slice(0, load);
        }).catch(function(data) {
            $scope.error = "Error: Error retrieving data.  Status: " + data.status;
        });
    };

    /* Unfortunately, Flickr's public data feed only returns 20 images.
    Therefore in order to fully demonstrate this project, the same 20 images are
    repeatedly used to load the page. */
    $scope.loadMore = function() {
        let pointer = $scope.loadedData.length % $scope.data.length,
            dataLeftover = Math.min(load, $scope.data.length - pointer);

        for(var i = 0; i < dataLeftover; i++) {
            $scope.loadedData.push($scope.data[pointer + i]);
        }
    };
}]);
