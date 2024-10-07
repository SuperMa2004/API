// Importar dependencias
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Simulamos una base de datos simple con un arreglo
let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
];

// Leer (GET) todos los items
app.get('/api/items', (req, res) => {
  res.status(200).json(items);
});

// Crear (POST) un nuevo item
app.post('/api/items', (req, res) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'El nombre del item es obligatorio' });
  }
  
  const newItem = { id: items.length + 1, name };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Actualizar (PUT) un item por ID
app.put('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const { name } = req.body;
  const itemIndex = items.findIndex(item => item.id === itemId);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item no encontrado' });
  }
  
  if (!name) {
    return res.status(400).json({ error: 'El nombre del item es obligatorio' });
  }

  items[itemIndex].name = name;
  res.status(200).json(items[itemIndex]);
});

// Eliminar (DELETE) un item por ID
app.delete('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const itemIndex = items.findIndex(item => item.id === itemId);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item no encontrado' });
  }
  
  items.splice(itemIndex, 1); // Eliminar el item
  res.status(204).send(); // Responder con un código de éxito sin contenido
});

// Manejo de errores genérico
app.use((err, req, res, next) => {
  res.status(500).json({ message: 'Error interno del servidor' });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});
