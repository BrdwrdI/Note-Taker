const htmlRoutes = require('express').Router();
const path = require('path');

htmlRoutes.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '../public/notes.html'))
);

htmlRoutes.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '../public/index.html'))
);

module.exports = htmlRoutes;