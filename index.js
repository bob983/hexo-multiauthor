'use strict';

// Model
hexo.database.model('Author', require('./lib/model-author'));

//Processor - to load and parse authors
hexo.extend.processor.register('_authors/*.yml', require('./lib/processor'));

//Filter - to add author data to Post
hexo.extend.filter.register('before_post_render', require('./lib/filters/add-author-to-post'));
hexo.extend.filter.register('template_locals', require('./lib/filters/add-author-to-locals'));



//Generator
hexo.extend.generator.register('multiauthor', require('./lib/generator'));
