App.service('likeService', ['$q', function($q) {
    this.sendLike = function(id) {
        const promise = $q(function(resolve, reject) {
            /* TODO: Need to hook this service up to a real like API.
            Temporarily faking it for UI development.*/
            resolve(true);
        });
        return promise;
    };

    this.removeLike = function(id) {
        const promise = $q(function(resolve, reject) {
            /* TODO: Need to hook this service up to a real like API.
            Temporarily faking it for UI development.*/
            resolve(true);
        });
        return promise;
    };
}]);
