function ImagemDAO(connection) {
	this._connection = connection;
}

ImagemDAO.prototype.salva = function(imagens, callback){
	for (var i = 0; i < imagens.length - 1; i++) {
		this._connection.query('insert into imagem set ?', imagens[i]);
	}
	this._connection.query('insert into imagem set ?', imagens[imagens.length - 1], callback);
}

ImagemDAO.prototype.lista = function(callback){
	this._connection.query('select * from imagem' , callback);
}

ImagemDAO.prototype.listaImagemIdVeiculo = function(id, callback){
	this._connection.query('select * from imagem where idVeiculo =' + id , callback);
}

ImagemDAO.prototype.listaImagemId = function(id, callback){
	this._connection.query('select * from imagem where imagem.idImagem =' + id , callback);
}

ImagemDAO.prototype.exclui = function(id, callback){
	this._connection.query('delete from imagem where idVeiculo =' + id, callback);
}


module.exports = function() {
	return ImagemDAO;
}