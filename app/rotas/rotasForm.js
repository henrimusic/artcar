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
		res.render('wb-admin/formVeiculo', {lista: {} });
	});

	// Gravar no banco
	app.post('/wb-admin/form', upload.single('imagem'), function(req, res){
		var imagem = [];
		var imagemBase64;
		var veiculo = req.body;

		var connection = app.infra.connectionFactory();
		var veiculoDAO = new app.infra.VeiculoDAO(connection);
		var imagemDAO = new app.infra.ImagemDAO(connection);
		
		if (req.body.idVeiculo) {
			var idVeiculo = req.body.idVeiculo;
			var idImagem = req.body.idImagem

			// atualiza um veiculo do banco
			if (req.file != undefined) {
				imagemBase64 = Buffer.from(fs.readFileSync(req.file.path), 'base64');

				imagem.push({
					idImagem: idImagem,
					base64: imagemBase64,
					idVeiculo: idVeiculo
				});
				imagemDAO.atualiza(idImagem, imagem, function(erro, resultado){
					fs.unlink(req.file.path, (erroFs) => {
						if (erroFs) res.send(erroFs);
					});
				});
			}

			delete veiculo.idVeiculo;
			delete veiculo.idImagem;

			veiculoDAO.atualiza(idVeiculo, veiculo, function(erro, resultado){
				connection.end();
				res.redirect('/wb-admin/lista');
			});
			
		} else {

			// Cria um novo Veículo
			veiculo.idVeiculo = Math.floor(Math.random() * (1000 - 0)) + 1;
			imagemBase64 = Buffer.from(fs.readFileSync(req.file.path), 'base64');

			imagem.push({
				base64: imagemBase64,
				idVeiculo: veiculo.idVeiculo
			});

			veiculoDAO.salva(veiculo, function(erro, resultado){});
			imagemDAO.salva(imagem, function(erro, resultado){
				connection.end();
				fs.unlink(req.file.path, (erroFs) => {
					if (erroFs) res.send(erroFs);
				});	
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
			var imagem = btoa(resultado.base64);
			resultado.base64 = imagem;
			res.render('wb-admin/listaVeiculo', {lista:resultado});
		});
		
	});

	// Deleta veículo
	app.get('/wb-admin/excluir/:id', function(req, res) {
		var connection = app.infra.connectionFactory();
		var veiculoDAO = new app.infra.VeiculoDAO(connection);
		veiculoDAO.exclui(req.params.id, function(erro, resultado) {
			res.redirect('/wb-admin/lista');
		});
	});

	// Lista o veículo por ID
	app.get('/wb-admin/form/:id', function(req, res){
		var connection = app.infra.connectionFactory();
		var veiculoDAO = new app.infra.VeiculoDAO(connection);
		veiculoDAO.listaId(req.params.id, function(erro, resultado) {
			res.render('wb-admin/formVeiculo', {lista:resultado});
		});
	});
}