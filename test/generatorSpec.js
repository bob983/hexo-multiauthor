'use strict';

var Hexo = require('hexo');
var assert = require("assert");
var hexo = new Hexo(__dirname, {silent: true});
var Author = hexo.model('Author');
var Post = hexo.model('Post');
var Promise = require('bluebird');


describe('Generator', function () {
    var generator = require('../lib/generator').bind(hexo);

    before(function () {
        var authorPromise = Author.insert(
            {id: 'ABC', name: 'Karel', source: 'blah'}
        );
        var postPromise = Post.insert([
                {id: 'ABC1', name: 'AaBbCc', source: 'blah', slug: 'blah', authorId: 'ABC', date: new Date(2014, 1, 2)},
                {id: 'ABC2', name: 'AaBbCc', source: 'blah', slug: 'blah', authorId: 'ABC', date: new Date(2014, 1, 3)}
            ]
        );
        return Promise.all([authorPromise, postPromise]).then(function () {

        }).done();
    });

    it('should group posts by author', function () {
        var content = generator();
        assert.equal(content.length, 1);
        var authorPage = content[0];

        assert.equal('author/ABC/', authorPage.path);
        assert.deepEqual(['author', 'index'], authorPage.layout);

        var posts = authorPage.data.posts.data;
        assert.equal(2, posts.length);

        assert.equal('ABC2', posts[0].id);
        assert.equal('ABC1', posts[1].id);
    });

    it('should add author data to each page', function () {
        var content = generator();
        assert.equal(content.length, 1);
        var data = content[0].data;
        assert.equal('Karel', data.author.name)
    });


});