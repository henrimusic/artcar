var mysql = require('mysql');

function createDBConnection() {
	return mysql.createConnection({
		host : 'us-cdbr-iron-east-03.cleardb.net',
		user : 'b8423443422de2',
		password :'75b9f065',
		database : 'heroku_ec2292d2a11de58'
	});
}

module.exports = function() {
	return createDBConnection;
}