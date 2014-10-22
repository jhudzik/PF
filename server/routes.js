
'use strict';

var flickr = require('./flickr');

module.exports = function(app) {
	app.get('/api/*', function(req, res) {
		flickr.request(req.query, function(response) {
			res.send(response);
		});
	});
};