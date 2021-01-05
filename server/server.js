const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const spotifyRoutes = require('./routes/index');
const HttpErrors = require('./errors/HttpErrors');
const formData = require('express-form-data');
require('dotenv').config();

//Body parser
app.use(express.json());
app.use(morgan('combined'));
app.use(cors());

//Parsing file upload data
app.use(formData.parse());

//Routes
app.use(spotifyRoutes);

app.all('*', (req, res, next) => {
  err = {
    message: `Route ${req.originalUrl} does not exist`,
    statusCode: HttpErrors.NOT_FOUND,
  };
  next(err);
});

app.use((err, req, res, next) => {
  let error = '';
  console.log(err);
  if (err.message && err.status) {
    error = { status: err.status, message: err.message };
  } else {
    error = {};
    error.status = 500;
    error.message = 'Internal Server Error';
  }

  res.status(error.status).json(error);
});
app.listen(process.env.PORT || 5433, () =>
  console.log(`Started listening on ${process.env.PORT || 3030}`),
);
