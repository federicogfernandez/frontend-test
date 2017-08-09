const express = require('express');
const router = express.Router();

//CONTROLLERS
const search = require('./routes/search');
const items = require('./routes/items');

//ROUTING
router.get('/api/items', search.get);
router.get('/api/items/:id', items.get);

module.exports = router;