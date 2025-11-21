const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde la carpeta actual
app.use(express.static(path.join(__dirname)));

// Ruta principal - sirve login.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🎰 Servidor de Casino ejecutándose en puerto ${PORT}`);
});
