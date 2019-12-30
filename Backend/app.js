const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const autoIncrement = require('mongoose-auto-increment');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.set('jwt-secret', config.secretkey);

app.get('/', (req, res) => {
    res.send('Hello');
});

app.use((err, req, res, next) => {
  res.status(404).json({
    message: err.message,
  });
})

app.use('/api', require('./routes/api'));
app.use('/users', express.static('uploads/'));

app.listen(port, () => {
    console.log('server is running');
});

mongoose.connect(config.mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', () => {
  console.error("err");
  connect();
});

db.once('open', () => {
  console.log('DB connected');
});