var mysql = require('mysql');

function createDBConnection() {
	return mysql.createConnection({
		host : 'us-cdbr-iron-east-01.cleardb.net',
		user : 'b64517496e31a0',
		password :'de486284',
		database : 'heroku_794eccd31961e57'
	});
}

module.exports = function() {
	return createDBConnection;
}