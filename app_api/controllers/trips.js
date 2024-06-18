/*
const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');
const User = mongoose.model('users');

//GET: /trips - lists all the trips
const tripsList = async(req,res) => {
    const q = await Model
        .find({}) // No filter, return all records
        .exec();

    if (!q) { // Database returned no data
        return res      
                .status(404)
                .json(err);
    } else { // Return resulting trip list
        return res
                .status(200)
                .json(q);
    }
};

const tripsFindByCode = async(req,res) => {
    const q = await Model
        .find({'code' : req.params.tripCode}) // Return a single record by the code
        .exec();

    if (!q) { // Database returned no data
        return res      
                .status(404)
                .json(err);
    } else { // Return resulting trip list
        return res
                .status(200)
                .json(q);
    }
};

//POST: /trips - Adds a new trip
const tripsAddTrip = async(req,res) => {
    getUser(req, res, (req,res) => {
        Trip    
            .create({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
            },
        (err, trip) => {
            if (err) {
                return res
                    .status(400) // bad request
                    .jason(err);
            } else {
                return res
                    .status(201) // created
                    .json(trip);
            }
        });
    }
);
}

// PUT: /trips/:tripCode 
const tripsUpdateTrip = async(req,res)=> {
    getUser(req,res, (req, res) => {
        Trip
            .findOneAndUpdate({'code': req.params.tripCode}, {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description 
            }, {new: true})
            .then(trip => {
                if (!trip) {
                    return res
                        .status(404)
                        .send({message:"Trip not found with code" + req.params.tripCode});
                        }
                res.send(trip);
            })
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    return res 
                        .status(404)
                        .send({message: "Trip not found with code" + req.params.tripCode});
                }
                return res 
                    .status(500) // Server Error
                    .json(err);
            });
        }
    );
}


// check authentication, Return username 
const getUser = (req, res, callback) => {
    if (req.auth && req.auth.email) {
        User
        .findOne({
            email: req.auth.email
        })
        .exec((err, user) => {
            if (!user) {
                return res
                    .status(404)
                    .json({message: 'User not found'});
            } 
            else if (err) {
                console.log(err);
                return res
                    .status(404)
                    .json(err);
            }
            callback(req, res, user.name);
        });
    } else {
        return res  
            .status(404)
            .json({message: 'User Not Found'});
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};
*/

const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');
const User = mongoose.model('users');

// GET: /trips - lists all the trips
const tripsList = async (req, res) => {
    try {
        const trips = await Model.find({}).exec();
        if (!trips) {
            return res.status(404).json({ message: 'No trips found' });
        }
        return res.status(200).json(trips);
    } catch (err) {
        return res.status(500).json(err);
    }
};

// GET: /trips/:tripCode - find a trip by code
const tripsFindByCode = async (req, res) => {
    try {
        const trip = await Model.findOne({ 'code': req.params.tripCode }).exec();
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        return res.status(200).json(trip);
    } catch (err) {
        return res.status(500).json(err);
    }
};

// POST: /trips - Adds a new trip
const tripsAddTrip = async (req, res) => {
    try {
        const user = await getUser(req, res);
        if (!user) return;

        const trip = new Trip({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });

        const savedTrip = await trip.save();
        return res.status(201).json(savedTrip);
    } catch (err) {
        return res.status(400).json(err);
    }
};

// PUT: /trips/:tripCode - Update a trip by code
const tripsUpdateTrip = async (req, res) => {
    try {
        const user = await getUser(req, res);
        if (!user) return;

        const trip = await Trip.findOneAndUpdate(
            { 'code': req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            { new: true }
        ).exec();

        if (!trip) {
            return res.status(404).json({ message: "Trip not found with code " + req.params.tripCode });
        }

        return res.status(200).json(trip);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: "Trip not found with code " + req.params.tripCode });
        }
        return res.status(500).json(err);
    }
};

// Check authentication and return user
const getUser = async (req, res) => {
    if (req.auth && req.auth.email) {
        try {
            const user = await User.findOne({ email: req.auth.email }).exec();
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return null;
            }
            return user;
        } catch (err) {
            res.status(500).json(err);
            return null;
        }
    } else {
        res.status(404).json({ message: 'User not found' });
        return null;
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};
