/* Last Modified 6/18/2024 */

const express = require('express');  // Express app
const router = express.Router();     // Router Logic
const authController = require('../controllers/authentication');
const {expressjwt:jwt} = require('express-jwt');

const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms:["HS256"]
});

// Import the controllers to route
const tripsController = require('../controllers/trips');

// Define route for trips endpoint
router  
    .route('/trips')
    .get(tripsController.tripsList) // GET method routes tripList
    .post(auth, tripsController.tripsAddTrip);
    

// GET trips by code
router  
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip);

// GET login 
router 
    .route('/login')
    .post(authController.login);

// GET register user
router
    .route('/register')
    .post(authController.register);

module.exports = router;

