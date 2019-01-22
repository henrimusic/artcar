module.exports = (app) => {
	//Site
	app.get('/', function (req, res) {
		var connection = app.infra.connectionFactory();
		var veiculoDAO = new app.infra.VeiculoDAO(connection);

		veiculoDAO.lista(function(erro, resultado){
			connection.end();
			if (erro) {
				res.send(erro)
			}
			for (var i = 0; i < resultado.length; i++) {
				if (resultado[i].base64 == null) {} else {resultado[i].base64 = Buffer.from(resultado[i].base64).toString('base64');}
			}
			res.render('home/home', {lista:resultado});
		});
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