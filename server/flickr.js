
'use strict';

var request = require('request'),
	FLICKR = 'https://api.flickr.com/services/rest/?',
	API_KEY = '43fcaa99a8127f1cbfda7475e24ea3d7';

var buildQuery = function(params) {
	var queryString = 'api_key=' + API_KEY;
	for(var param in params) {
		queryString += '&' + param + '=' + params[param];
	}
	return queryString;
};

module.exports = {
	request: function(params, cb) {
		var req = FLICKR + buildQuery(params);
		request(req, function(err, body, response) {
			if(typeof cb === 'function') {
				if(err) {
					cb(err);
				}
				else {
					cb(response);
				}
			}
		});
	}
};