'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require( './middleware/error.js');
const notFound = require( './middleware/404.js' );
const authRouter = require( './auth/router.js' );

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
app.use(authRouter);

// Catchalls
app.use(notFound);
app.use(errorHandler);

let isRunning = false;



let path = require('path');
let fs = require('fs');
// let express = require('express');
let https = require('https');

let certOptions = {
  key: fs.readFileSync(path.resolve('./keys2/server.key')),
  cert: fs.readFileSync(path.resolve('./keys2/server.crt'))
}
// let app = express();
// let server = https.createServer(certOptions, app).listen(443)ç

module.exports = {
  server: app,
  start: (port) => {
    if( ! isRunning ) {
      https.createServer(certOptions, app).listen(port, () => {
        isRunning = true;
        console.log(`Server Up on ${port}`);
      });
    }
    else {
      console.log('Server is already running');
    }
  },
};
