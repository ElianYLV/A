DROP TABLE pokemon;

CREATE TABLE pokemon (
  num_pokedex SERIAL PRIMARY KEY,
  nombre VARCHAR(50),
  especie VARCHAR(100),
  altura VARCHAR(10),
  peso VARCHAR(10),
  descripcion TEXT,
  generacion INT
);


CREATE TABLE pokemongen1 (
  num_pokedex SERIAL PRIMARY KEY,
  nombre VARCHAR(50),
  especie VARCHAR(100),
  altura VARCHAR(10),
  peso VARCHAR(10),
  descripcion TEXT,
  generacion INT
);

CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  password VARCHAR(255)
);

INSERT INTO usuarios (nombre, password)
VALUES ('1234', '1234');

INSERT INTO pokemongen1 (nombre, especie, altura, peso, descripcion, generacion)
VALUES ('Bulbasaur', 'Pokémon Semilla', '0.7 m', '6.9 kg', 'Tiene una semilla en el lomo', 1);

INSERT INTO pokemon (nombre, especie, altura, peso, descripcion, generacion)
VALUES ('Charmander', 'Lagartija', '0.6 m', '8.5 kg', 'Tiene una llama en la cola', 1);