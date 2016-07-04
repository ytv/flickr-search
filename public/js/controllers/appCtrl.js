App.controller('AppCtrl', ['$scope', 'flickrService', 'processDataService', 'likeService', '$anchorScroll',
function ($scope, flickrService, processDataService, likeService, $anchorScroll) {

    $scope.error = '';
    $scope.data = [];
    $scope.loadedData = [];
    var load = 10;

    $scope.init = function() {
        $scope.getItems('sunset');
    };

    $scope.getItems = function(search) {
        $scope.loadedData = [];
        $anchorScroll();
        $scope.spinner = !$scope.spinner;
        flickrService.getItems(search).then(function(data) {
            $scope.data = processDataService.processData(data);
            $scope.loadedData = $scope.data.slice(0, load);
        }).catch(function(err) {
            $scope.error = "Error retrieving data.  Status: " + err.status;
        }).then(function(){
            $scope.spinner = !$scope.spinner;
        });
    };

    /* Unfortunately, Flickr's public data feed only returns 20 images.
    Therefore in order to fully demonstrate this project, the same 20 images are
    repeatedly used to load the page. */
    $scope.loadMore = function() {
        var pointer = $scope.loadedData.length % $scope.data.length,
            dataLeftover = Math.min(load, $scope.data.length - pointer);

        for(var i = 0; i < dataLeftover; i++) {
            $scope.loadedData.push($scope.data[pointer + i]);
        }
    };
}]);
