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
            {id: 'ABC', name: 'AaBbCc', source: 'blah'}
        );
        var postPromise = Post.insert([
                {id: 'ABC1', name: 'AaBbCc', source: 'blah', slug: 'blah', authorId: 'ABC'},
                {id: 'ABC2', name: 'AaBbCc', source: 'blah', slug: 'blah', authorId: 'ABC'}
            ]
        );
        return Promise.all([authorPromise, postPromise]).then(function () {

        }).done();
    });

    it('should group posts by author', function () {
        var content = generator();
        assert.equal(content.length, 1);
    });


});