'use strict';

// Model
hexo.database.model('Author', require('./lib/model-author'));
hexo.database.model('PostAuthor', require('./lib/model-post-author'));

Post.virtual('path').get(function(){
    var path = ctx.execFilterSync('post_permalink', this, {context: ctx});
    return typeof path === 'string' ? path : '';
});


//Processor - to load and parse authors
hexo.extend.processor.register('_authors/*.yml', require('./lib/processor'));

//Filter - to add author data to Post
hexo.extend.filter.register('before_post_render', require('./lib/filter.js'));

//Generator
hexo.extend.generator.register('multiauthor', require('./lib/generator'));
