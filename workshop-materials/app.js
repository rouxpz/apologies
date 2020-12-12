const express = require('express')
const app = express();
app.use(express.static('public'));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine', 'ejs');
const { Client } = require('pg');
const rita = require('rita');
const port = 8000;

const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://localhost:5432/template1'
});

client.connect();

var apology = "";

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/generate', (req, res) => {
  var texts;
  var corpus = '';
  let rm = rita.RiMarkov(3);
  const regex = /.,/gi;

  client.query("SELECT * FROM apologies", (err, result) => {
    if (err) throw err;
    texts = result.rows;
    for (var i = 0; i < texts.length; i++) {
      corpus += " " + texts[i].column1;
    }
    // console.log(corpus);
    rm.loadText(corpus);
    let sentences = rm.generateSentences(5);
    let statement = sentences.join(' ');
    apology = statement;
    // console.log(apology);
    var apologyText = apology.split('. ');
    for (var i = 0; i < apologyText.length - 1; i++) {
      apologyText[i] += ". "
    }
    res.render('generate', {data: apologyText});
  });
})

app.get('/submit', (req, res) => {
  res.render('submit');
})

app.post('/submit', (req, res) => {
  console.log(req.body.submission);
  client.query('INSERT INTO apologies(column1) VALUES($1)', [req.body.submission]);
  res.redirect('/');
})

app.get('/prompts', (req, res) => {
  res.render('prompts');
})

app.listen(process.env.PORT || port);
