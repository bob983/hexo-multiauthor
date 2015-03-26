'use strict';

var Schema = require('warehouse').Schema;

module.exports = function (ctx) {
    var Author = new Schema({
        id: {type: String, required: true},
        name: String,
        source: String
    });

    Author.virtual('author').get(function () {
        var PostAuthor = ctx.model('PostAuthor');
        var Author = ctx.model('Author');

        var author_id = PostAuthor.findOne({post_id: this._id}).map(function(item){
            return item.author_id;
        });

        return Author.findOne({_id: author_id});
    });
};