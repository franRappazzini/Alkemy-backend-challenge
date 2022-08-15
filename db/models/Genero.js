module.exports = (sequelize, DataTypes) => {
  sequelize.define("Genero", {
    nombre: { type: DataTypes.STRING },
    imagen: { type: DataTypes.STRING },
  });
};
