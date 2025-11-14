const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Array para almacenar los turnos
let turnos = [];

app.get('/', (req, res) => {
    res.json({ mensaje: 'Backend funcionando - Romario Ramírez 2890 18 11745' });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});