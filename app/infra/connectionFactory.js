var mysql = require('mysql');

function createDBConnection() {
	return mysql.createConnection({
		host : 'artcar.mysql.uhserver.com',
		user : 'artcar',
		password :'474109Has@',
		database : 'artcar'
	});
}

module.exports = function() {
	return createDBConnection;
}
