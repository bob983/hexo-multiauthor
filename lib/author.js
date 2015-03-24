var Schema = require('warehouse').Schema;

module.exports = function (ctx) {
    return new Schema({
        id: String,
        name: {type: String, default: ''}
    });
};
