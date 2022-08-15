module.exports = (sequelize, DataTypes, Op) => {
  sequelize.define("Pelicula", {
    imagen: { type: DataTypes.STRING },
    titulo: { type: DataTypes.STRING },
    fecha: { type: DataTypes.DATEONLY },
    calificacion: { type: DataTypes.FLOAT, validate: { [Op.between]: [1, 5] } },
  });
};
