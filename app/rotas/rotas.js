const path = require("path");

module.exports = (app) => {
	//chamadas das pages
	app.get('/',(req, res) => {
		res.sendFile(path.join(__dirname + '../../public/index.html'));
	})
	app.get('/veiculos',(req, res) => {
		res.sendFile(path.join(__dirname + '../../public/index.html'));
	})
	app.get('contato',(req, res) => {
		res.sendFile(path.join(__dirname + '../../public/index.html'));
	})

	//chamadas rest
	app.get('/list-home', function (req, res) {
		var connection = app.infra.connectionFactory();
		var veiculoDAO = new app.infra.VeiculoDAO(connection);

		veiculoDAO.lista(function(erro, resultado){
			if (erro) {
				res.send(erro)
			}
			var veiculos = [];
			for (var i = 0; i < 8; i++) {
				if (resultado[i].base64 == null) {} else {resultado[i].base64 = Buffer.from(resultado[i].base64).toString('base64');}
				veiculos[i] = resultado[i];
			}
			res.json(veiculos);
		});
		connection.end();
	});

	app.get('/list-marca', function (req, res) {
		var connection = app.infra.connectionFactory();
		var veiculoDAO = new app.infra.VeiculoDAO(connection);

		veiculoDAO.listaMarca(function(erro, resultado){
			if (erro) {res.send(erro)}

			var marcas = [];

			for (var i = 0; i < resultado.length; i++) {
				marcas[i] = resultado[i]
			}
			res.json(marcas);
		});
		connection.end();
	});

	app.get('/veiculo/:id', function (req, res) {
		var connection = app.infra.connectionFactory();
		var veiculoDAO = new app.infra.VeiculoDAO(connection);
		veiculoDAO.listaId(function(erro, resultado){
			if (erro) {
				res.send(erro);
			} 
			res.status(200).send(resultado);
		});
		connection.end();
	})
}