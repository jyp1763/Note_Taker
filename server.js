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

app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname,  "./db/db.json"), 'utf8', (err, data) => {
      if (err) throw err;
      res.json(JSON.parse(data));
    });
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

  app.post('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname,  "./db/db.json"), 'utf8', (err, data) => {
      let db = JSON.parse(data);
      db.push({
        id: uuid.v4(),
        ...req.body,
      });
      fs.writeFile(
        path.join(__dirname,  "./db/db.json"),
        JSON.stringify(db, null, 2),
        (err, data) => {
          if (err) throw err;
          res.json(db);
        }
      );
    });
  });

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}. Welcome!`);
  });