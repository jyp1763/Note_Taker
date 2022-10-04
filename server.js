const api = require('./routes/index.js');
const path = require('path');
const express = require('express');
const fs = require('fs');
const util=require('util');

let app = express();
let PORT = process.env.PORT || 3001;
app.use('/', htmlRoutes);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', api);
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
console.log('read');

app.get('/notes', (req,res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/server.js', (req,res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);


app.get('/', (req,res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get("/api/notes", (req, res) => {
    console.log(notes);
    return res.json(notes);
    });

app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "./public/index.html"));
    });

app.post("/api/notes", (req,res) => {
        let newNote = req.body;
        newNote.id = createId();
        notes.push(newNote);
        fs.writeFileSync("./db/db.json", JSON.stringify(notes));
        res.json(notes);
    })

app.listen(PORT, () =>
    console.log(`app listening at http://localhost:${PORT}`)
);