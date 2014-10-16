
'use strict';

var express = require('express'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	path = require('path'),
	app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

require('./routes')(app);

app.listen(8080)