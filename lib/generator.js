'use strict';

var _ = require('lodash');
var pagination = require('hexo-pagination');

module.exports = function (locals) {
    var Author = this.model('Author');

    var postsByAuthor = _.groupBy(locals.posts.data, function (post) {
        return post.authorId;
    });

    var data = [];

    _.forEach(postsByAuthor, function (posts, author) {
        var au = Author.findOne({id: author});
        var ax = pagination('author/' + author, posts, {
            data: {tag: au.name},
            layout : 'author'

        });

        data = data.concat(ax);
    });

    console.info('data', data);

    return data;
};