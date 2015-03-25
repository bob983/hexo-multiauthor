'use strict';

var Hexo = require('hexo');
var assert = require("assert");
var hexo = new Hexo(__dirname, {silent: true});
var Author = hexo.model('author');

describe('Generator', function () {
    var generator = require('../lib/generator').bind(hexo);


    it('should group posts by author', function () {
        var locals = {
            posts: [{
                author: {id: 'ABC'}
            }, {
                author: {id: 'ABC'}
            },
                {
                    author: {id: 'XYZ'}
                }]
        };
        var content = generator(locals);
        console.info('content', content);
    });

});