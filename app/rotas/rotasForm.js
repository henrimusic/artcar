module.exports = (app) => { 
	// Configuração do File System
	const fs = require('fs');
	
	// Configuração do Multer
	const multer = require('multer');

	//  Configurações para armazenamento
	const storage = multer.diskStorage({
		destination: function(req, file, callback){
			callback(null, './public/style/img/');
		},
		filename: function(req, file, callback){
			callback(null, file.originalname);
		}
	});

	// Constante para trazer Multer
	const upload = multer({storage: storage});

	// Página de Formulário do Veúclo
	app.get('/wb-admin/form',  function(req, res){
		var veiculo = undefined;
		res.render('wb-admin/formVeiculo', {lista:veiculo});
	});

	// Gravar no banco
	app.post('/wb-admin/form', upload.any('imagem'), function(req, res){
		var imagens = [];
		var imagemBase64 = [];
		var veiculo = req.body;

		var connection = app.infra.connectionFactory();
		var veiculoDAO = new app.infra.VeiculoDAO(connection);
		var imagemDAO = new app.infra.ImagemDAO(connection);
		
		if (req.body.idVeiculo) {                  
			// atualiza um veiculo do banco
			if (req.files != undefined) {
				for (var i = 0; i < req.files.length; i++) {
					imagemBase64 = Buffer.from(fs.readFileSync(req.files[i].path), 'base64');

					imagens.push({
						base64: imagemBase64,
						idVeiculo: veiculo.idVeiculo
					});

					fs.unlink(req.files[i].path, (erroFs) => {
						if (erroFs) res.send(erroFs);
					});
				}

				imagemDAO.exclui(veiculo.idVeiculo, function(erro, resultado){
					if (erro) {res.send(erro)}
				});
				imagemDAO.salva(imagens, function(erro, resultado){
					if (erro) {res.send(erro)}
				});
			}

			var idVeiculo = veiculo.idVeiculo;
			delete veiculo.idVeiculo;

			veiculoDAO.atualiza(idVeiculo, veiculo, function(erro, resultado){
				connection.end();
				res.redirect('/wb-admin/lista');
			});
			
		} else {

			// Cria um novo Veículo
			veiculo.idVeiculo = Math.floor(Math.random() * (1000 - 0)) + 1;
			
			for (var i = 0; i < req.files.length; i++) {
				imagemBase64 = Buffer.from(fs.readFileSync(req.files[i].path), 'base64');

				imagens.push({
					base64: imagemBase64,
					idVeiculo: veiculo.idVeiculo
				});

				fs.unlink(req.files[i].path, (erroFs) => {
					if (erroFs) res.send(erroFs);
				});
			}
			veiculoDAO.salva(veiculo, function(erro){
				if (erro) {res.send(erro)}
			});
			imagemDAO.salva(imagens, function(erro){
				if (erro) {res.send(erro)}
					connection.end();
				res.redirect('/wb-admin/lista');
			});
		}
	});

	// Lista Veículos
	app.get('/wb-admin/lista', function(req, res){
		var connection = app.infra.connectionFactory();
		var veiculoDAO = new app.infra.VeiculoDAO(connection);

		veiculoDAO.lista(function(erro, resultado){
			connection.end();
			if (erro) {
				res.send(erro)
			}
			for (var i = 0; i < resultado.length; i++) {
				resultado[i].base64 = Buffer.from(resultado[i].base64).toString('base64');
			}
			res.render('wb-admin/listaVeiculo', {lista:resultado});
		});
		
	});

	// Deleta veículo
	app.get('/wb-admin/excluir/:id', function(req, res) {
		var connection = app.infra.connectionFactory();
		var veiculoDAO = new app.infra.VeiculoDAO(connection);
		veiculoDAO.exclui(req.params.id, function(erro, resultado) {
			connection.end();
			res.redirect('/wb-admin/lista');
		});
	});

	// Lista o veículo por ID
	app.get('/wb-admin/form/:id', function(req, res){
		var connection = app.infra.connectionFactory();
		var veiculoDAO = new app.infra.VeiculoDAO(connection);
		var imagemDAO = new app.infra.ImagemDAO(connection);
		
		veiculoDAO.listaId(req.params.id, function(erro, resultado) {
			var veiculo = resultado[0];
			imagemDAO.listaImagemIdVeiculo(req.params.id, function(erro, resultado){
				var imagens = [];
				for (var i = 0; i < resultado.length; i++) {
					imagens.push({
						idImagem: resultado[i].idImagem,
						foto: Buffer.from(resultado[i].base64).toString('base64')
					});
				}
				veiculo.fotos = imagens;
				res.render('wb-admin/formVeiculo', {lista:veiculo});
				connection.end();
			});
		});
	});
}