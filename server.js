const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fetch = require('node-fetch');

const PORT = 3051;

bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());

app.use(express.static('./'));

async function getName() {
  try {
    const response = await fetch('http://localhost:3052/myname');
    const results = await response.json();
    console.log('results', results);
    return results;
  } catch (e) {
    console.log('error!', e);
    return e;
  }
}

app.get('/retrievedata', async (req, res) => {
  try {
    const nameData = await getName();
    res.json(nameData);
  } catch (e) {
    res.send(e);
  }
});

app.get('/hello', async (req, res) => {
  console.log(req.query.name);
  return res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`);
});
