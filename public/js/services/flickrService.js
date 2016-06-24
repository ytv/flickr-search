App.factory('flickrService', ['$http', function($http) {
    var getItems = function(search) {
        let url = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json';
        if(search)
            url += '&tags=' + search;
        url += '&jsoncallback=JSON_CALLBACK';
        return $http.jsonp(url);
    };
    return {getItems: getItems};
}]);
