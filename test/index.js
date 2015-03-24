var should = require('chai').should();
var Hexo = require('hexo');
var pathFn = require('path');
var fs = require('fs');
var assert = require("assert");

describe('Multiauthor support', function () {
    var hexo = new Hexo(__dirname, {silent: true});
    var Post = hexo.model('Post');
    var multiauthor = require('../lib/multiauthor').bind(hexo);
    var posts;
    var locals;

    before(function () {
        return Post.insert([
            {author: 'ABC', source: 'blah', slug: 'blah'}
        ]).then(function (data) {
            posts = Post.sort('-date');
            locals = hexo.locals.toObject();
        });
    });

    it('should replace author code with author object', function () {
        multiauthor(locals);
        var post = locals.posts;
        console.info('post', post);
        assert.equal(post.author.name, 'Abee C');
    })
});