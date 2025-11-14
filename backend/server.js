const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Array para almacenar los turnos
let turnos = [];
let ultimosTurnosAtendidos = [];

// GET / - Ruta de prueba
app.get('/', (req, res) => {
    res.json({ 
        mensaje: 'Backend funcionando - Romario Ramírez 2890 18 11745',
        totalTurnos: turnos.length
    });
});

// POST /turnos - Agregar un turno
app.post('/turnos', (req, res) => {
    const { nombre, tramite, prioridad } = req.body;
    
    if (!nombre || !tramite || !prioridad) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const nuevoTurno = {
        id: turnos.length + 1,
        nombre,
        tramite,
        prioridad,
        fecha: new Date().toISOString()
    };

    turnos.push(nuevoTurno);
    
    console.log('Turno agregado:', nuevoTurno);
    res.status(201).json(nuevoTurno);
});

// GET /turnos/siguiente - Obtener siguiente turno
app.get('/turnos/siguiente', (req, res) => {
    if (turnos.length === 0) {
        return res.status(404).json({ error: 'No hay turnos en la cola' });
    }

    // Verificar si no hubo urgentes en los últimos 3 turnos atendidos
    const ultimosTres = ultimosTurnosAtendidos.slice(-3);
    const huboUrgentesRecientes = ultimosTres.some(turno => turno.prioridad === 'urgente');

    let siguienteTurno;

    if (!huboUrgentesRecientes) {
        // Forzar el turno más antiguo (primero en la cola)
        siguienteTurno = turnos[0];
    } else {
        // Buscar primero urgentes, luego normales
        const turnoUrgente = turnos.find(t => t.prioridad === 'urgente');
        if (turnoUrgente) {
            siguienteTurno = turnoUrgente;
        } else {
            siguienteTurno = turnos[0];
        }
    }

    // Remover el turno de la cola
    turnos = turnos.filter(t => t.id !== siguienteTurno.id);
    
    // Agregar a los últimos atendidos
    ultimosTurnosAtendidos.push(siguienteTurno);

    console.log('Siguiente turno:', siguienteTurno);
    res.json(siguienteTurno);
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});