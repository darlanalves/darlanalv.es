var load = require(__dirname + '/application/classloader').load,
	express = require('express'),
	fs = require('fs'),

	// TODO enable after moving to a lib
	//Application = require('App/core/Application'),
	//Config = require('App/core/ConfigLoader'),
	Application = load('App.core.Application'),
	Config = load('App.core.ConfigLoader');

var config = new Config(__dirname + '/application/config.json');
var env = 'production';
if (fs.existsSync(__dirname + '/.env')) {
	env = fs.readFileSync(__dirname + '/.env').toString();
}

if (fs.existsSync(__dirname + '/application/config.' + env + '.json')) {
	var envConfig = new Config(__dirname + '/application/config.' + env + '.json');
	config.append(envConfig.getConfig());
}

// start application
var app = new Application(config);
var e = app.getExpress();

// adds a stdout log
e.use(express.logger());

// enable compression
e.use(express.compress());

// cookie parser (req.cookies)
e.use(express.cookieParser());

// favicon
e.use(express.favicon());

// serve statics
e.use(express.static(__dirname + '/public'));

// enable session support
e.use(express.session({ secret: 'llap!', cookie: { maxAge: 60000 }}));

// and voila!
app.listen(process.env.PORT || config.getConfig().serverPort || 5100);