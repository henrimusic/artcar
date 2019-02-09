function VeiculoDAO(connection) {
	this._connection = connection;
}

VeiculoDAO.prototype.salva = function(veiculo, callback){
	this._connection.query('insert into veiculo set ?', veiculo, callback);
}

VeiculoDAO.prototype.lista = function(callback){
	const sql = 'SELECT * FROM veiculo a LEFT JOIN (SELECT MAX(imagem.base64) AS base64, imagem.idImagem, imagem.idVeiculo FROM imagem GROUP BY imagem.idVeiculo) b ON b.idVeiculo = a.idVeiculo;'; 
	this._connection.query(sql, callback);
}

VeiculoDAO.prototype.listaId = function(id, callback){
	this._connection.query('select * from veiculo where idVeiculo =' + id , callback)
}

VeiculoDAO.prototype.listaMarca = function(callback){
	const sql = 'SELECT DISTINCT a.marca FROM veiculo AS a;'; 
	this._connection.query(sql, callback);
}


VeiculoDAO.prototype.atualiza = function(id ,veiculo, callback) {
	this._connection.query('update veiculo set ? where idVeiculo=' + id, veiculo, callback);
}

VeiculoDAO.prototype.exclui = function(id, callback) {
	this._connection.query('delete from veiculo where idVeiculo=' + id, callback);
}

module.exports = function(){
	return VeiculoDAO;
}