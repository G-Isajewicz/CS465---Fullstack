const express = require('express');  // Express app
const router = express.Router();     // Router Logic

// Import the controllers to route
const tripsController = require('../controllers/trips');

// Define route for trips endpoint
router  
    .route('/trips')
    .get(tripsController.tripsList); // GET method routes tripList

// GET trips by code
router  
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);

module.exports = router;

