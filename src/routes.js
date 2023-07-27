const express = require('express');

const contactController = require('./app/controllers/ContactController');
const categoryController = require('./app/controllers/CategoryController');

const router = express.Router();

// Isso é um middleware, a ordem deles importa pois o express interpreta de forma linear

// Contact

router.get(
  '/contacts',
  (req, res, next) => {
    req.appId = 'Meu AppId';
    next();
  },
  contactController.index,
);

router.get('/contacts/:id', contactController.show);

router.post('/contacts/', contactController.store);

router.delete('/contacts/:id', contactController.delete);

router.put('/contacts/:id', contactController.update);

// Category

router.get('/categories/', categoryController.index);

router.get('/categories/:id', categoryController.show);

router.post('/categories/', categoryController.store);

router.delete('/categories/:id', categoryController.delete);

router.put('/categories/:id', categoryController.update);

module.exports = router;
