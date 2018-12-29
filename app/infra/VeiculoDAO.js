function VeiculoDAO(connection) {
	this._connection = connection;
}

VeiculoDAO.prototype.salva = function(veiculo, callback){
	this._connection.query('insert into veiculo set ?', veiculo, callback);
}

VeiculoDAO.prototype.salvaImagem = function(imagem, callback){
	this._connection.query('insert into imagem set ?', imagem, callback);
}

VeiculoDAO.prototype.lista = function(callback){
	this._connection.query('select * from veiculo join imagem on veiculo.idVeiculo=imagem.idVeiculo', callback);
}

VeiculoDAO.prototype.listaId = function(id, callback){
	this._connection.query('select * from veiculo join imagem on veiculo.idVeiculo=imagem.idVeiculo where veiculo.idVeiculo =' + id , callback);
}

VeiculoDAO.prototype.listaImagemId = function(id, callback){
	this._connection.query('select imagem.path from imagem where imagem.idImagem =' + id , callback);
}

VeiculoDAO.prototype.atualiza = function(id ,veiculo, callback) {
	this._connection.query('update veiculo set ? where idVeiculo=' + id, veiculo, callback);
}

VeiculoDAO.prototype.atualizaImagem = function(id, imagem, callback) {
	this._connection.query('update imagem set ? where idImagem=' + id, imagem, callback);
}

VeiculoDAO.prototype.exclui = function(id, callback) {
	this._connection.query('delete from veiculo where idVeiculo=' + id, callback);
}

VeiculoDAO.prototype.excluiIamgem = function(id, callback){
	this._connection.query('select imagem.path from imagem where idVeiculo=' + id, callback);
}

module.exports = function(){
	return VeiculoDAO;
}