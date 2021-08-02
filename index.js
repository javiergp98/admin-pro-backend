require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Configuración CORS
app.use(cors());

// Lectura y parse del body
app.use(express.json());
// Base de datos
dbConnection();

// Directorio Público
app.use(express.static('public'));

// Rutas
app.get('/', (req, res) => {
    res.json(
        {
            ok: true,
            msg: 'Hola mundo'
        }
    );
});
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/uploads', require('./routes/uploads'));


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});