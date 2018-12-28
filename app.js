const app = require('./config/custom-express')();

app.listen(process.env.PORT || 3000, function() {
	console.log("server is running");
});