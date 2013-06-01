/**
 * Loads a module via require()
 */

var replaceRe = /\./g,
	logger = require('./node_modules/App/core/Logger');

module.exports.load = load = function(name) {
	var realPath = './node_modules/' + name.replace(replaceRe, '/');

	try {
		logger.log('Loading %s (%s)', name, realPath);
		return require(realPath);
	} catch (e) {
		logger.error('Module not found: ' + name);
		logger.debug(e);
		throw new Error('Module not found: ' + name);
	}
};

module.exports.use = function(list) {
	if (typeof list === 'string') {
		list = [list];
	}

	var result = {};
	list.forEach(function(name, id) {
		result[id] = load(name);
	});

	return result;
};
