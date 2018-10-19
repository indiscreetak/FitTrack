const express = require('express');
const app = express();
const startupDebug = require('debug', 'app:startup');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('hellgo'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}...`));
