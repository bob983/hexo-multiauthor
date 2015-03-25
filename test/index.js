var Hexo = require('hexo');
var assert = require("assert");
var pathFn = require('path');
var Promise = require('bluebird');
var fs = require('hexo-fs');

var hexo = new Hexo(__dirname, {silent: true});
var Author = hexo.model('author');

describe('Filter', function () {
    var filter = require('../lib/filter').bind(hexo);

    before(function () {
        return Author.insert([
            {id: 'ABC', name: 'AaBbCc', source: 'blah'}
        ]);
    });

    it('should replace author code with author object', function () {
        var testPost = {author : 'ABC'};
        var filteredPost = filter(testPost);
        assert.equal(filteredPost.author.name, 'AaBbCc');
        assert.equal(filteredPost.author.id, 'ABC');
    });

    it('should remove author if not found in model', function() {
        var testPost = {author : 'XYZ'};
        var filteredPost = filter(testPost);
        assert.equal(filteredPost.author, null);
    });
});

describe('Processor', function() {

    var baseDir = pathFn.join(__dirname, 'author_test');
    var processor = require('../lib/processor');
    var process = Promise.method(processor.bind(hexo));
    var source = hexo.source;
    var File = source.File;

    function newFile(options){
        var path = options.path;
        options.source = pathFn.join(source.base, options.path);

        options.params = {
            path: path
        };

        return new File(options);
    }
    before(function(){
        return fs.mkdirs(baseDir).then(function(){
            return hexo.init();
        });
    });

    after(function(){
        return fs.rmdir(baseDir);
    });

    it('should read author and store to model', function(){
        var body = 'name: Karel';

        var file = newFile({
            path: 'KRL.yml',
            type: 'create',
            params : {
                '1' : 'KRL'
            }
        });

        return fs.writeFile(file.source, body).then(function(){
            return process(file);
        }).then(function(){
            var author = Author.findOne({id: 'KRL'});

            assert.equal(author.name, 'Karel');

            return Promise.all([
                author.remove(),
                fs.unlink(file.source)
            ]);
        });
    });


});