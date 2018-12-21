const express = require('express');
const load = require('express-load');
const bodyParser = require('body-parser');

module.exports = function() {
	var app = express();

	app.set('view engine', 'ejs');
	app.set('views', './app/views');

	app.use(express.static('./public'));
	app.use(bodyParser.urlencoded({extended: true}));
	
	load('rotas', {cwd:'app'}).then('infra').into(app);

	return app;
}