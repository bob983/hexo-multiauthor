'use strict';

var Schema = require('warehouse').Schema;

module.exports = function () {
    return new Schema({
        post_id: {type: Schema.Types.CUID, ref: 'Post'},
        author_id: {type: Schema.Types.CUID, ref: 'Author'}
    });
};