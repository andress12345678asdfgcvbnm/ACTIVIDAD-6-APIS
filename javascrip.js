const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let items = [
    { id: '1', name: 'Item 1', description: 'Descripción del Item 1' },
    { id: '2', name: 'Item 2', description: 'Descripción del Item 2' }
];

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API REST de Items');
});

// Obtener todos los items
app.get('/items', (req, res) => {
    res.json(items);
});

// Obtener un item por ID
app.get('/items/:id', (req, res) => {
    const itemId = req.params.id;
    const item = items.find(i => i.id === itemId);
    if (!item) {
        return res.status(404).json({ message: 'Item no encontrado' });
    }
    res.json(item);
});

// Crear un nuevo item
app.post('/items', (req, res) => {
    const { id, name, description } = req.body;
    const newItem = { id, name, description };
    items.push(newItem);
    res.status(201).json(newItem);
});

// Actualizar un item existente
app.put('/items/:id', (req, res) => {
    const itemId = req.params.id;
    const { name, description } = req.body;
    let foundItem = items.find(i => i.id === itemId);
    if (!foundItem) {
        return res.status(404).json({ message: 'Item no encontrado' });
    }
    foundItem.name = name;
    foundItem.description = description;
    res.json(foundItem);
});

// Eliminar un item existente
app.delete('/items/:id', (req, res) => {
    const itemId = req.params.id;
    items = items.filter(i => i.id !== itemId);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
