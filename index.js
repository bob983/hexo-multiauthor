'use strict';

// Model
hexo.database.model('Author', require('./lib/model'));

//Processor - to load and parse authors
hexo.extend.processor.register('_authors/*.yml', require('./lib/processor'));

//Filter - to add author data to Post
hexo.extend.filter.register('before_post_render', require('./lib/filter.js'));