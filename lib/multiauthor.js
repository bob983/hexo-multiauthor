'use strict';
require('./author');
var fs = require('hexo-fs');
var pathFn = require('path');
var yaml = require('js-yaml');
var Promise = require('bluebird');


function parseYaml(str) {
    var result = yaml.load(str);
    if (typeof result !== 'object') return;

    return result;
}

module.exports = function (locals) {
    var Author = this.model('author');

    var authorsDir = pathFn.join(this.source_dir, '_authors');

    var promises = fs.listDirSync(authorsDir).map(function (file) {
        var filepath = pathFn.join(authorsDir, file);
        var authorRawContent = fs.readFileSync(filepath);
        var authorData = parseYaml(authorRawContent);
        authorData['id'] = pathFn.basename(file, '.yml');
        return Author.insert(authorData);
    });


    return Promise.all(promises).then(function () {
        locals.posts.forEach(function (post) {
            var authors = Author.find({id: post.author});
            if (authors.length == 1) {
                post.author = authors.data[0];
                console.info('author', post.author);
            }
        });
    });


};