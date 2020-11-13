const express = require('express');

const NoodleController = require('./controllers/NoodleController');

const routes = new express.Router();

routes.post('/noodles', NoodleController.store);

module.exports = routes;