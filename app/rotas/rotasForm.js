module.exports = (app) => { 
	const fs = require('fs');
	
	// Configuração do Multer
	const multer = require('multer');
	const storage = multer.diskStorage({
		destination: function(req, file, callback){
			callback(null, './public/style/img9/');
		},
		filename: function(req, file, callback){
			callback(null, file.originalname);
		}
	});
	const upload = multer({storage: storage});

	// Página de Formulário do Veúclo
	app.get('/wb-admin/form',  function(req, res){
		res.render('wb-admin/formVeiculo', {lista: {} });
	});

	// Gravar no banco
	app.post('/wb-admin/form', upload.single('imagem'), function(req, res){
		var imagem = [];
		var connection = app.infra.connectionFactory();
		var veiculoDAO = new app.infra.VeiculoDAO(connection);
		var veiculo = req.body;
		var idVeiculo = veiculo.idVeiculo;
		var idImagem = veiculo.idImagem;


		if (req.body.idVeiculo) {
			// atualiza um veiculo do banco
			if (req.file != undefined) {
				imagem.push({
					idImagem: veiculo.idImagem,
					path: req.file.path,
					idVeiculo: veiculo.idVeiculo
				});
				veiculoDAO.listaImagemId(idImagem, function (erro, resultado) {
					for (var i = resultado.length - 1; i >= 0; i--) {
						fs.unlink(resultado[i].path, (erroFs) => {
							if (erroFs) throw erroFs;
						});
					}
				})
				veiculoDAO.atualizaImagem(idImagem, imagem, function(erro, resultado){});
			}
			
			delete veiculo.idVeiculo;
			delete veiculo.idImagem;

			veiculoDAO.atualiza(idVeiculo, veiculo, function(erro, resultado){veiculoDAO.atualizaImagem(idImagem, imagem, function(erro, resultado){
				res.redirect('/wb-admin/lista');
				connection.end();
			});
		});
		} else {
			// cria um novo veiculo no banco
			veiculo.idVeiculo = Math.floor(Math.random() * (1000 - 0)) + 1;

			imagem.push({
				path: req.file.path,
				idVeiculo: veiculo.idVeiculo
			});	
			veiculoDAO.salva(veiculo, function(erro, resultado){console.log('AQUI O ERRO MANO: ' + erro);});
			veiculoDAO.salvaImagem(imagem, function(erro, resultado){
				console.log('AQUI O ERRO MANO: ' + erro);
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
			console.log('AQUI O ERRO MANO: ' + erro);
			connection.end();
			res.render('wb-admin/listaVeiculo', {lista:resultado});
		});
	});

	// Deleta veículo
	app.get('/wb-admin/excluir/:id', function(req, res) {
		var connection = app.infra.connectionFactory();
		var veiculoDAO = new app.infra.VeiculoDAO(connection);
		veiculoDAO.excluiIamgem(req.params.id, function(erro, resultado) {
			console.log('AQUI O ERRO MANO: ' + erro);
			for (var i = resultado.length - 1; i >= 0; i--) {
				fs.unlink(resultado[i].path, (erroFs) => {
					if (erroFs) throw erroFs;
				});
			}
		});
		veiculoDAO.exclui(req.params.id, function(erro, resultado) {
			console.log('AQUI O ERRO MANO: ' + erro);
			connection.end();
			res.redirect('/wb-admin/lista');
		});
	});

	// Lista o veículo por ID
	app.get('/wb-admin/form/:id', function(req, res){
		var connection = app.infra.connectionFactory();
		var veiculoDAO = new app.infra.VeiculoDAO(connection);
		veiculoDAO.listaId(req.params.id, function(erro, resultado) {
			connection.end();
			res.render('wb-admin/formVeiculo', {lista:resultado});
		});
	});
}