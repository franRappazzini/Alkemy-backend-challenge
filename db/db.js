require("dotenv").config();
const { Op } = require("sequelize");
const { Sequelize, DataTypes } = require("sequelize");
const modelPersonaje = require("./models/Personaje");
const modelPelicula = require("./models/Pelicula");
const modelGenero = require("./models/Genero");
const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const sequelize = new Sequelize(
  // TODO hacer env
  `postgres://${DB_USER}:${DB_PASSWORD}@localhost:5432/${DB_NAME}`,
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
