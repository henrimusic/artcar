const path = require("path");
const mailer = require('nodemailer');

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

		veiculoDAO.listaMarcas(function(erro, resultado){
			if (erro) {res.send(erro)}

			var marcas = [];

			for (var i = 0; i < resultado.length; i++) {
				marcas[i] = resultado[i]
			}
			res.json(marcas);
		});
		connection.end();
	});

	app.get('/list-marca/:id', function (req, res) {
		var connection = app.infra.connectionFactory();
		var veiculoDAO = new app.infra.VeiculoDAO(connection);
		
		veiculoDAO.listaMarcaId(req.params.id, function(erro, resultado){
			
			if (erro) {
				res.send(erro);
			}
			
			for (var i = 0; i < resultado.length; i++) {
				if (resultado[i].base64 == null) {} else {resultado[i].base64 = Buffer.from(resultado[i].base64).toString('base64');}
			}
			res.status(200).send(JSON.stringify(resultado));
		});
		connection.end();
	});

	app.get('/veiculo/:id', function (req, res) {
		var connection = app.infra.connectionFactory();
		var veiculoDAO = new app.infra.VeiculoDAO(connection);
		veiculoDAO.listaId(req.params.id, function(erro, resultado){
			if (erro) {
				res.send(erro);
			} 
			res.status(200).send(JSON.stringify(resultado));
		});
		connection.end();
	})

	app.get('/veiculo/imagens/:id', function(req, res) {
		var connection = app.infra.connectionFactory();
		var imagemDAO = new app.infra.ImagemDAO(connection);
		imagemDAO.listaImagemIdVeiculo(req.params.id, function(erro, resultado) {
			if(erro){
				res.send(erro);
			}
			var imagens = [];
			for (var i = 0; i < resultado.length; i++) {
				if (resultado[i].base64 == null) {} else {resultado[i].base64 = Buffer.from(resultado[i].base64).toString('base64');}
				imagens[i] = resultado[i];
			}
			res.status(200).send(JSON.stringify(imagens));
		});
		connection.end();
	});

	app.post('/contato', function(req, res){
		
		let transporter = mailer.createTransport(
	        {
	            service: 'gmail',
	            host: 'smtp.gmail.com',
	            auth: {
	                user: 'henrimus.96@gmail.com',
	                pass: '474109has'
	            }
	        }
	    );

	    let message = {
	        // Comma separated list of recipients
	        to: 'artcar.vendas@gmail.com', // artcar.vendas@gmail.com

	        // Subject of the message
	        subject: req.body.assunto,

	        // plaintext body
	        text: req.body.msg + ' | | ' + req.body.email,
	    };


	  	transporter.sendMail(message, (error, info) => {
	        if (error) {
	            console.log('Error occurred');
	            console.log(error.message);
	            return process.exit(1);
	        }

	        console.log('Message sent successfully!');
	        // only needed when using pooled connections
	        transporter.close();
	    });

		res.status(200).send('ok');

	});
}