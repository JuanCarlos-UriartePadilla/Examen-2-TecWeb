const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Cargar habitaciones con su disponibilidad
let habitacionesDisponibles = {
  'Individual': 8,
  'Doble': 10,
  'Suite': 6,
  'Familiar': 3
};

// Middleware para poder recibir JSON
app.use(express.json());

// Ruta para servir los archivos estáticos
app.use(express.static(path.join(__dirname, 'dist/hotel')));

// Ruta para obtener las habitaciones ocupadas y disponibles
app.get('/api/habitaciones', (req, res) => {
  res.json(habitacionesDisponibles);
});

// Ruta para actualizar el número de habitaciones disponibles
app.post('/api/reservar', (req, res) => {
  const { habitacion } = req.body;
  
  if (habitacionesDisponibles[habitacion] > 0) {
    habitacionesDisponibles[habitacion]--;
    res.status(200).send({ message: 'Reserva realizada con éxito' });
  } else {
    res.status(400).send({ message: 'No hay habitaciones disponibles' });
  }
});

// Ruta para liberar una habitación
app.post('/api/liberar', (req, res) => {
  const { habitacion } = req.body;
  
  if (habitacionesDisponibles[habitacion] < 10) {  // Suponiendo que la máxima es 10
    habitacionesDisponibles[habitacion]++;
    res.status(200).send({ message: 'Habitación liberada con éxito' });
  } else {
    res.status(400).send({ message: 'No se puede liberar más habitaciones de las disponibles' });
  }
});

// Redirigir todas las demás rutas a index.html para Angular
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/hotel/index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
