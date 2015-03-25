'use strict';

var _ = require('lodash');

module.exports = function (locals) {

    var postsByAuthor = _.groupBy(locals.posts, function (post) {
        return post.author ? post.author.id : null;
    });

    return _.forEach(postsByAuthor, function (posts, author) {
        console.info('author', author, 'posts', posts);
        return {
            path: 'author/' + author,
            data: posts
        };
    });

};