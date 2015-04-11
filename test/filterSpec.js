var Hexo = require('hexo');
var assert = require("assert");
var hexo = new Hexo(__dirname, {silent: true});
var Author = hexo.model('Author');

describe('Post filter', function () {
    var filter = require('../lib/filters/add-author-to-post').bind(hexo);

    before(function () {
        return Author.insert([
            {id: 'ABC', name: 'AaBbCc', source: 'blah'}
        ]);
    });

    it('should add author object', function () {
        var testPost = {authorId : 'ABC'};
        var filteredPost = filter(testPost);
        assert.equal(filteredPost.author.name, 'AaBbCc');
        assert.equal(filteredPost.author.id, 'ABC');
    });

    it('should bypass if author not found in model', function() {
        var testPost = {authorId : 'XYZ'};
        var filteredPost = filter(testPost);
        assert.equal(filteredPost.author, null);
    });

    it('should bypass filter is there is no author in the post', function() {
        var testPost = {};
        var filteredPost = filter(testPost);
        assert.equal(filteredPost, testPost);
    });
});

describe('Locals filter', function () {
    var filter = require('../lib/filters/add-author-to-locals').bind(hexo);

    it('should add author flog to local', function () {
        var filteredLocals = filter({});
        assert.equal(filteredLocals.author, true);
    });
});

