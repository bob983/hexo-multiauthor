# Multi author support for Hexo #

[![Build Status](https://travis-ci.org/bob983/hexo-multiauthor.svg?branch=master)](https://travis-ci.org/bob983/hexo-multiauthor) [![Coverage Status](https://coveralls.io/repos/bob983/hexo-multiauthor/badge.svg)](https://coveralls.io/r/bob983/hexo-multiauthor)
[![Code Climate](https://codeclimate.com/github/bob983/hexo-multiauthor/badges/gpa.svg)](https://codeclimate.com/github/bob983/hexo-multiauthor)

## Description
 
This plugin adds support for multiple authors. You can add author to a post by adding `authorId` to frontmatter.
 

    title: Sample post
    date: 2014/01/10 12:00
    tags: [hexo]
    authorId: LSK
 
At this point, this plugin expects a file `source/_authors/LSK.yml` exists. Following content is supported:
  

	name: Luke Skywalker
	about: Pilot

When the public content is generated, plugin will group posts by authors and generate pages for each author. In order to reach the author page, you need to tweak the templates.

`layout/partial/post/title.ejs`:

	<% if (item.link){ %>
	  <% if (item.title){ %>
	    <h1 class="title"><a href="<%- item.link %>" target="_blank"><%= item.title %></a></h1>
	  <% } else { %>
	    <h1 class="title"><a href="<%- item.link %>" target="_blank"><%= item.link %></a></h1>
	  <% } %>
	<% } else { %>
	  <% if (index){ %>
	    <h1 class="title"><a href="<%- config.root %><%- item.path %>"><%= item.title %></a></h1>
	  <% } else { %>
	    <h1 class="title"><%= item.title %></h1>
	  <% } %>
	   <% if (author && item.author) { %>
	    <a href="<%- config.root %><%- 'author/' + item.authorId %>"><h4><%= item.author.name %></h4></a>
	   <% } %>
	<% } %> 

 



