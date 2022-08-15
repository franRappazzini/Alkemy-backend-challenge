const { Router } = require("express");
const { Personaje, Pelicula, Op } = require("../../db/db");
const char = Router();

char.get("", async (req, res) => {
  try {
    const response = await Personaje.findAll({
      attributes: ["imagen", "nombre"],
    });

    res.json(response);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

char.post("", async (req, res) => {
  // suposiscion: peliculas es un array de strings (nombres de las peliculas)
  const { imagen, nombre, edad, peso, historia, peliculas } = req.body;
  const newCharacter = { imagen, nombre, edad, peso, historia };

  try {
    const character = await Personaje.create(newCharacter);

    if (peliculas && peliculas.length) {
      const filmsId = await Pelicula.findAll({
        attributes: ["id"],
        where: { titulo: { [Op.or]: peliculas } },
      });

      await character.addPeliculas(filmsId);
    }

    res.status(201).json({ success: "Character has created!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

char.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Personaje.destroy({ where: { id } });

    res.status(200).json({ success: "Character has deleted!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

char.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { imagen, nombre, edad, peso, historia } = req.body;

  try {
    // TODO poner findByPk
    const character = await Personaje.findOne({ where: { nombre: id } });
    const options = {};
    if (imagen) options.imagen = imagen;
    if (nombre) options.nombre = nombre;
    if (edad) options.edad = edad;
    if (peso) options.peso = peso;
    if (historia) options.historia = historia;

    await character.update(options);
    await character.save();

    res.status(200).json({ success: "Character has updated!" });
  } catch (err) {
    res.status(400).json({ success: err.message });
  }
});

module.exports = char;
