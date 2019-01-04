var mysql = require('mysql');

function createDBConnection() {
	return mysql.createConnection({
		host : 'us-mm-dca-71301b8e103e.g5.cleardb.net',
		user : 'artcaruser',
		password :'artcaruser',
		database : 'artcar'
	});
}

module.exports = function() {
	return createDBConnection;
}