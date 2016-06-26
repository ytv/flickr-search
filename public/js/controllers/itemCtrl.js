App.controller('itemCtrl', ['$scope', 'likeService',
    function($scope, likeService){
        $scope.likeImg = function(id) {
            if(!$scope.item.liked) {
                likeService.sendLike(id).then(function() {
                    $scope.item.liked = !$scope.item.liked;
                });
            } else {
                likeService.removeLike(id).then(function() {
                    $scope.item.liked = !$scope.item.liked;
                });
            }
        };        
}]);
