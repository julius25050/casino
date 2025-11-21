const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, '../public')));

// Ruta principal - sirve login.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

// Health check para Railway
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Iniciar servidor - escuchar en 0.0.0.0 para que funcione en Railway
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🎰 Servidor de Casino ejecutándose en puerto ${PORT}`);
});
