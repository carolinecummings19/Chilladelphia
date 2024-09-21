/** @format */

const express = require('express');

const app = express();
const port = 8080;

const registry = require('./routes/register_routes.js');
const dbsingleton = require('./mongodb.js');

const session = require('express-session');
const cors = require('cors');
// let optionsSSDMobileNet;
const db = dbsingleton;

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true,
  })
);

app.use(express.json());
app.use(
    session({
      secret: 'chilly',
      saveUninitialized: true,
      cookie: { httpOnly: false },
      resave: true,
    })
  );

registry.register_routes(app);

app.listen(port, () => {
    console.log(`Main app listening on port ${port}`);
  });
  

module.exports = app;