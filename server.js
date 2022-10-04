const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const htmlRoutes = require('./routes/index.html');
const notes= require('./routes/notes.html');

app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));

app.use(express.json());


app.use('/', htmlRoutes);
app.use('/', notes);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}. Welcome!`);
  });