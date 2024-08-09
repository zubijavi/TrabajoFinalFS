import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const port = process.env.PORT || 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

app.use(express.json());

// Configuración de Multer 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, process.env.UPLOADS_DIR);
    
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); 
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Usa un nombre único para evitar sobrescribir archivos
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/famosos')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión', err));

// Esquema y modelo para los famosos
const famosoSchema = new mongoose.Schema({
  nombre: String,
  profesion: String,
  image: String,
});

const Famoso = mongoose.model('Famoso', famosoSchema);

// Ruta para obtener famosos
app.get('/api/famosos', async (req, res) => {
  try {
    const { nombre, profesion } = req.query;
    let query = {};
    if (nombre) {
      query.nombre = new RegExp(nombre, 'i'); // Búsqueda insensible a mayúsculas/minúsculas
    }
    if (profesion) {
      query.profesion = profesion;
    }
    const famosos = await Famoso.find(query);
    res.json(famosos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
});

// Ruta para agregar un nuevo famoso
app.post('/api/famosos', upload.single('image'), async (req, res) => {
  try {
    const { nombre, profesion } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : '';
    const nuevoFamoso = new Famoso({ nombre, profesion, image: imagePath });
    await nuevoFamoso.save();
    res.status(201).json(nuevoFamoso);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el nuevo famoso' });
  }
});

// Ruta para actualizar un famoso
app.put('/api/famosos/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, profesion } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updateFields = { nombre, profesion };
    if (imagePath) {
      updateFields.image = imagePath;
    }

    const actualizadoFamoso = await Famoso.findByIdAndUpdate(id, updateFields, { new: true });
    if (!actualizadoFamoso) {
      return res.status(404).json({ error: 'Famoso no encontrado' });
    }
    res.json(actualizadoFamoso);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el famoso' });
  }
});


// Ruta para eliminar un famoso
app.delete('/api/famosos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const famoso = await Famoso.findByIdAndDelete(id);
    if (!famoso) {
      return res.status(404).json({ error: 'Famoso no encontrado' });
    }
    res.json({ message: 'Famoso eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el famoso' });
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
