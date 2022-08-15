const { Op } = require("sequelize");
const { Sequelize, DataTypes } = require("sequelize");
const modelPersonaje = require("./models/Personaje");
const modelPelicula = require("./models/Pelicula");
const modelGenero = require("./models/Genero");

const sequelize = new Sequelize(
  // TODO hacer env
  "postgres://postgres:123456@localhost:5432/alkemy_backend",
  {
    logging: false,
  }
);

modelPersonaje(sequelize, DataTypes);
modelPelicula(sequelize, DataTypes, Op);
modelGenero(sequelize, DataTypes);

// associations
const { Personaje, Pelicula, Genero } = sequelize.models;
Pelicula.belongsToMany(Personaje, { through: "Pelicula_Personaje" });
Personaje.belongsToMany(Pelicula, { through: "Pelicula_Personaje" });
Pelicula.belongsToMany(Genero, { through: "Pelicula_Genero" });
Genero.belongsToMany(Pelicula, { through: "Pelicula_Genero" });

module.exports = { sequelize, ...sequelize.models, Op };
