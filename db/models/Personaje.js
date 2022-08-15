module.exports = (sequelize, DataTypes) => {
  sequelize.define("Personaje", {
    imagen: { type: DataTypes.STRING },
    nombre: { type: DataTypes.STRING },
    edad: { type: DataTypes.INTEGER },
    peso: { type: DataTypes.FLOAT },
    historia: { type: DataTypes.STRING },
  });
};
