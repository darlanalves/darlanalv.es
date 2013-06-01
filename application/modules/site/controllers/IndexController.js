var c = require('jn-classjs');
var Controller = require('App/core/Controller');

module.exports = c.extend(Controller, {
	index: function(params) {
		this.getResponse().send(200, 'hello world');
	},

	showName: function(params) {
		this.getResponse().send(200, params.name);
	}
});