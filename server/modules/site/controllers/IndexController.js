var Controller = require('App/Controller'),
	Response = require('App/Controller/Response');

module.exports = Controller.extend({
	index: function() {
		
	},

	profile: function() {
		return this.response(201, {
			name: this.getParam('name'),
			age: 30,
			about: {
				birthday: new Date
			}
		});
	}
});