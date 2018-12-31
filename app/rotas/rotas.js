module.exports = (app) => {
	//Site
	app.get('/home', function (req, res) {
		res.send("home");
	});

	app.get('/marcas', function (req, res) {
		res.send("lista de marcas");
	});

	app.get('/contato', function (req, res) {
		res.send("contato");
	});

	app.get('/veiculo', function (req, res) {
		res.send("veiculo");
	});
}