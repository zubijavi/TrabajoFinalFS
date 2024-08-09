const express = require('express');
const router = express.Router();
const Famoso = require('../models/famoso');

// Obtener todos los famosos
router.get('/', async (req, res) => {
  try {
    const { nombre, profesion } = req.query;

    const filtro = {};
    if (nombre) filtro.nombre = new RegExp(nombre, 'i'); // Búsqueda insensible a mayúsculas
    if (profesion) filtro.profesion = profesion;

    const famosos = await Famoso.find(filtro);
    res.json(famosos);
  } catch (error) {
    console.error('Error al obtener los datos:', error.message);
    res.status(500).json({ message: 'Error al obtener los datos' });
  }
});

module.exports = router;
