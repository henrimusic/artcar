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

		console.log('a')
		veiculoDAO.lista(function(erro, resultado){
			console.log(resultado)
			if (erro) {
				res.send(erro)
			}
			for (var i = 0; i < resultado.length; i++) {
				if (resultado[i].base64 == null) {} else {resultado[i].base64 = Buffer.from(resultado[i].base64).toString('base64');}
			}
			res.status(200).send(resultado);
		});
		connection.end();
	});

	app.get('/marcas', function (req, res) {
		res.send("lista de marcas");
	});

	app.get('/contato', function (req, res) {
		res.send("contato");
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
	});
}