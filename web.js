//var load = require(__dirname + '/application/classloader').load,

var express = require('express'),
	fs = require('fs'),
	Loader = require('./server/node_modules/App/ClassLoader'),
	lib = new Loader(__dirname + '/server/node_modules/App/');
	Application = lib.require('Application'),
	Config = lib.require('Config');

/**
 * Env: process.env or './.env' file or 'production'
 */
var env = (process.env.NODE_ENV || (fs.existsSync('./.env') && fs.readFileSync('./.env').toString()) || 'production');

/**
 * App config:
 */
var config = new Config('./server/config.json').getSection(env) || {};

/**
 * Start application
 */
var app = new Application(config, env);

// adds a stdout log
app.use(express.logger())
// enable compression
.use(express.compress())
// cookie parser (req.cookies)
.use(express.cookieParser())
// favicon
.use(express.favicon())
// serve statics
.use(express.static(__dirname + '/client'))
// enable session support
.use(express.session({
	secret: 'llap!',
	cookie: {
		maxAge: 60000
	}
}))

// and voila!
.listen(process.env.PORT || config.serverPort);
