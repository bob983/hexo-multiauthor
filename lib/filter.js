'use strict';

module.exports = function (data) {
    if (data.authorId) {
        var Author = this.model('Author');
        data.author = Author.findOne({id: data.authorId});
    }
    return data;
};