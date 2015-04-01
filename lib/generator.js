'use strict';

var _ = require('lodash');
var pagination = require('hexo-pagination');

module.exports = function (locals) {
    var Author = this.model('Author');
    var Post = this.model('Post');

    var allAuthors = Author.find({});
    var pagesArray = allAuthors.map(function (author) {
        var postsByAuthor = Post.find({authorId: author.id});
        return pagination('author/' + author.id, postsByAuthor, {
            layout: 'index'
        });
    });
    return _.flatten(pagesArray);
};