const app = require('./config/custom-express')();

app.listen(process.env.PORT || 21147, function() {
	console.log("server is running");
});