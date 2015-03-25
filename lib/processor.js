var yaml = require('js-yaml');
var path = require('path');

function parseYaml(str) {
    var result = yaml.load(str);
    if (typeof result !== 'object') return;

    return result;
}

module.exports = function (file) {
    var Author = this.model('author');
    var doc = Author.findOne({source: file.path});

    if (file.type === 'skip' && doc) {
        return;
    } else if (file.type === 'delete') {
        if (doc) {
            return doc.remove();
        } else {
            return;
        }
    }

    return file.read().then(function (content) {
        var data = parseYaml(content);
        data.id = path.basename(file.path, '.yml');
        data.source = file.path;
        if (doc) {
            return doc.replace(data);
        } else {
            return Author.insert(data);
        }
    });

};