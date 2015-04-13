'use strict';

var Schema = require('warehouse').Schema;

module.exports = function () {
    return new Schema({
        id: {type: String, required: true},
        name: String,
        source: String
    });
};