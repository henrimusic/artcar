function ImagemDAO(connection) {
	this._connection = connection;
}

ImagemDAO.prototype.salva = function(imagem, callback){
	this._connection.query('insert into imagem set ?', imagem, callback);
}	

ImagemDAO.prototype.lista = function(callback){
	this._connection.query('select * from imagem' , callback);
}

ImagemDAO.prototype.listaImagemIdVeiculo = function(id, callback){
	this._connection.query('select * from imagem where imagem.idVeiculo =' + id , callback);
}

ImagemDAO.prototype.listaImagemId = function(id, callback){
	this._connection.query('select * from imagem where imagem.idImagem =' + id , callback);
}

ImagemDAO.prototype.atualiza = function(id, imagem, callback) {
	this._connection.query('update imagem set ? where idImagem=' + id, imagem, callback);
}

module.exports = function() {
	return ImagemDAO;
}