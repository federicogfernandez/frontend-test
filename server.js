const express = require('express');
const app = express();
const router = require('./router');

const port = process.env.PORT || 4000;

if (process.env.NODE_ENV !== 'development') {
  app.use(express.static('build'));
}

app.use(router);

app.listen(port, () => console.log(`Server started on http://localhost:${port}`));