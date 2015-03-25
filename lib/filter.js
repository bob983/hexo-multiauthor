'use strict';

module.exports = function(data) {
    if(data.author) {
        var Author = this.model('author');
        data.author = Author.findOne({id: data.author});
    }
    return data;
};