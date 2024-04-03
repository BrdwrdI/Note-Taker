const apiRoutes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');

apiRoutes.get('/notes', (req, res) => 
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

apiRoutes.post('/notes', (req, res) => {
    const { title, text } = req.body;
    
    if (req.body) {
        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        };
        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };
        res.json(response);
    } else {
        res.json('Error in posting Note');
    }
});

apiRoutes.delete('/notes/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.note_id !== noteId);
            
            writeToFile('./db/db.json', result);

            res.json(`Note ${noteId} has been deleted.`);
        });
});

module.exports = apiRoutes;