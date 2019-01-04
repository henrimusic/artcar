module.exports = (app) => {
	// Página de Administrador
	app.get('/wb-admin', function (req, res) {
		res.render('wb-admin/wb-admin');
	});

	// Metodo para Logar
	app.post('/wb-admin', function(req, res){
		var login = req.body;
		if (login.login == 'adm@artcar' && login.senha == 'admin') {
			res.redirect('/wb-admin/menu');	
		} else {
			console.log(login);
			res.status(401).render('wb-admin/wb-admin');
		}
	});

	// Página do menu
	app.get('/wb-admin/menu', function (req, res) {
		res.render('wb-admin/menu');
	});
	
}