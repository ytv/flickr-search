describe('Flickr Search', function() {

    var items = element.all(by.repeater('item in loadedData'));

    var getRandomIndex = function() {
        return Math.floor(Math.random()*10);
    }

    var getRandomItem = function() {
        return element.all(by.repeater('item in loadedData').row(getRandomIndex()));
    }

    beforeEach(function() {
        browser.get('http://yingvuong.com/flickr-test/index.html');
    });

    // -----Search Function-----

    it('should display a "sunset" tag for each item on the inital load', function() {
        items.each(function(item) {
            item.all(by.repeater('tag in item.tag')).getText().then(function(text) {
                expect(text).toContain('sunset');
            });
        });
    });

    it('should display the search term in a tag for each search', function() {
        var searchTerm = 'basketball';

        element(by.model('search')).sendKeys(searchTerm);
        element(by.id('submitBtn')).click();

        items.each(function(item) {
            item.all(by.repeater('tag in item.tag')).getText().then(function(text) {
                expect(text).toContain(searchTerm);
            });
        });
    });

    it('should submit a search when a tag is clicked on for that specific tag, and then all items should display that tag', function() {
        var randomItem = getRandomItem(),
            tag = randomItem.all(by.repeater('tag in item.tags')).last();

        tag.getText().then(function(text) {
            var searchTerm = text;
            tag.click().then(function(){
                items.each(function(item) {
                    item.all(by.repeater('tag in item.tag')).getText().then(function(text) {
                        expect(text).toContain(searchTerm);
                    });
                });
            });
        });
    });

    // // -----Loading-----

    it('should load 10 items on the inital load', function() {
        expect(items.count()).toEqual(10);
    });

    it('should load 10 more items when scrolled to the bottom of the page', function() {
        // Click on any element to bring focus to window so browser can scroll down
        element(by.className('container')).click();

        browser.executeScript('window.scrollTo(0,document.body.scrollHeight);').then(function() {
            expect(items.count()).toEqual(20);
        });

    });

    it('should load 30 items total when scrolled to the bottom of the page twice', function() {
        // Click on any element to bring focus to window so browser can scroll down
        element(by.className('container')).click();

        browser.executeScript('window.scrollTo(0,document.body.scrollHeight);').then(function() {
            browser.executeScript('window.scrollTo(0,document.body.scrollHeight);').then(function() {
                expect(items.count()).toEqual(30);
            });
        });
    });

    // -----Liking an Image-----
    it('should change the heart to red when the user likes the image', function() {
        var randomHeartID = 'heart-' + getRandomIndex(),
            randomHeart = element(by.id(randomHeartID));

        randomHeart.click().then(function() {
            randomHeart.getCssValue('color').then(function(value) {
                expect(value.indexOf('rgba(255, 0, 0, 1)')).not.toBe(-1);
            });

        });
    });

});
