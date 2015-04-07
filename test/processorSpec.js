var Hexo = require('hexo');
var assert = require("assert");
var pathFn = require('path');
var Promise = require('bluebird');
var fs = require('hexo-fs');

var hexo = new Hexo(__dirname, {silent: true});
var Author = hexo.model('Author');

describe('Processor', function () {

    var baseDir = pathFn.join(__dirname, 'author_test');
    var processor = require('../lib/processor');
    var process = Promise.method(processor.bind(hexo));
    var source = hexo.source;
    var File = source.File;

    function newFile(options) {
        var path = options.path;
        options.source = pathFn.join(source.base, options.path);

        options.params = {
            path: path
        };

        return new File(options);
    }

    before(function () {
        return fs.mkdirs(baseDir).then(function () {
            return hexo.init();
        });
    });

    after(function () {
        return fs.rmdir(baseDir);
    });

    beforeEach(function () {
        return Author.insert([
            {id: 'ABC', name: 'AaBbCc', source: 'ABC.yml'}
        ]);
    });

    afterEach(function () {
        var author = Author.findOne({id: 'ABC'});
        if (author) {
            author.remove();
        }
    });


    it('should skip file when marked as skip and Author exist in the model', function () {
        var body = 'name: Karel';
        var file = newFile({
            path: 'ABC.yml',
            type: 'skip',
            params: {
                '1': 'KRL'
            }
        });

        return fs.writeFile(file.source, body).then(function () {
            return process(file).then(function (returnVal) {
                assert.equal(returnVal, undefined);
            });
        })
    });

    it('should read Author and store to the model', function () {
        var body = 'name: Karel';

        var file = newFile({
            path: 'KRL.yml',
            type: 'create',
            params: {
                '1': 'KRL'
            }
        });

        return fs.writeFile(file.source, body).then(function () {
            return process(file);
        }).then(function () {
            var author = Author.findOne({id: 'KRL'});
            assert.equal(author.name, 'Karel');

            return Promise.all([
                author.remove(),
                fs.unlink(file.source)
            ]);
        });
    });

    it('should update Author in the model', function () {
        var author = Author.findOne({id: 'ABC'});
        assert.equal(author.name, 'AaBbCc');


        var body = 'name: Karel IV';
        var file = newFile({
            path: 'ABC.yml',
            type: 'update',
            params: {
                '1': 'KRL'
            }
        });

        return fs.writeFile(file.source, body).then(function () {
            return process(file);
        }).then(function () {
            var author = Author.findOne({id: 'ABC'});
            assert.equal(author.name, 'Karel IV');

            return Promise.all([
                author.remove(),
                fs.unlink(file.source)
            ]);
        });
    });

    it('should delete Author from the model', function () {
        var author = Author.findOne({id: 'ABC'});
        assert.equal(author.name, 'AaBbCc');

        var file = newFile({
            path: 'ABC.yml',
            type: 'delete',
            params: {
                '1': 'ABC'
            }
        });

        return process(file).then(function () {
            var author = Author.findOne({id: 'ABC'});
            assert.equal(author, null);
        });

    });

    it('should bypass when asked to delete non-existing Author', function () {

        var file = newFile({
            path: 'DEC.yml',
            type: 'delete',
            params: {
                '1': 'DEC'
            }
        });

        return process(file).then(function (resultVal) {
            assert.equal(resultVal, null);
        });

    });

});