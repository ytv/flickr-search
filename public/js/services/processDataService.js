App.service('processDataService', [function() {
    this.processData = function(data) {
        var results = [];
        if(data.status === 200) {
            var items = data.data.items;
            for(var i = 0; i < items.length; i++) {
                // convert string of tags into array of tags
                var tags = items[i].tags.split(' ');
                results.push({
                    img: items[i].media.m,
                    url: items[i].link,
                    date: items[i].published,
                    title: items[i].title,
                    tags: tags
                })
            }
            return results;
        } else {
            return 'error';
        }
    };
}]);
