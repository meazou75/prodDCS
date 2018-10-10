const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const port       = 3333;

const ApiController = require('./Controllers');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});

app.use('/api', ApiController);

app.all('*', (req, res) => {
    res.send('|/!\| 404 ERROR |/!\|');
});