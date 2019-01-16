'use strict';

const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.static('./public'));

app.listen(PORT, () => {
  console.log('Web Server up on port', PORT);
});

