var mysql = require('mysql');

function createDBConnection() {
	return mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password :'root',
		database : 'artcar'
	});
}

module.exports = function() {
	return createDBConnection;
}

// CREATE SCHEMA `artcar`;

// CREATE TABLE `veiculo` (
//   `idVeiculo` int(11) NOT NULL,
//   `tipoVeiculo` varchar(255) DEFAULT NULL,
//   `marca` varchar(255) DEFAULT NULL,
//   `modelo` varchar(255) DEFAULT NULL,
//   `anoModelo` varchar(45) DEFAULT NULL,
//   `anoFabricacao` varchar(45) DEFAULT NULL,
//   `versao` varchar(255) DEFAULT NULL,
//   `cor` varchar(45) DEFAULT NULL,
//   `combustivel` varchar(45) DEFAULT NULL,
//   `cambio` varchar(45) DEFAULT NULL,
//   `portas` varchar(45) DEFAULT NULL,
//   `quilometragem` varchar(255) DEFAULT NULL,
//   `renavan` varchar(255) DEFAULT NULL,
//   PRIMARY KEY (`idVeiculo`));

// CREATE TABLE `artcar`.`imagem` (
//   `idImagem` INT NOT NULL AUTO_INCREMENT,
//   `path` VARCHAR(255) NULL,
//   `idVeiculo` INT(11) NOT NULL,
// PRIMARY KEY (`idImagem`));

// ALTER TABLE `artcar`.`imagem` 
// ADD INDEX `FK_IDVEICULO_IDVEICULO_idx` (`idVeiculo` ASC);
// ALTER TABLE `artcar`.`imagem` 
// ADD CONSTRAINT `FK_IDVEICULO_IDVEICULO`
//   FOREIGN KEY (`idVeiculo`)
//   REFERENCES `artcar`.`veiculo` (`idVeiculo`)
//   ON DELETE NO ACTION
//   ON UPDATE NO ACTION;