DROP DATABASE IF EXISTS connect4;
CREATE DATABASE connect4;
USE connect4;

CREATE TABLE partides(
  id_partida INT PRIMARY KEY AUTO_INCREMENT,
  data VARCHAR(100),
  host VARCHAR(100),
  guest VARCHAR(100),
  torn INT,
  winner INT
);

CREATE TABLE moviments(
  id_moviment INT PRIMARY KEY AUTO_INCREMENT,
  jugador VARCHAR(100),
  columna_moviment INT,
  id_partida INT,
  FOREIGN KEY (id_partida) REFERENCES partides(id_partida)
)