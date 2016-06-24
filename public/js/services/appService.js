App.service('AppService', [function() {
    this.processData = function(data) {
        let results = [];
        if(data.status === 200) {
            let items = data.data.items;
            for(let i = 0; i < items.length; i++) {
                // convert string of tags into array of tags
                let tags = items[i].tags.split(' ');
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
