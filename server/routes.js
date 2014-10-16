
'use strict';

var flickr = require('./flickr');

module.exports = function(app) {
	app.get('/api/search', function(req, res) {
		flickr.search(req.query, function(response) {
			res.send(response);
		});
	});
};