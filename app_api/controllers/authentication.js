/*
* Created 6/18/2024
* Author: G.Isajewicz 
* Sourced from: CS 465 Module Seven Full stack Guide, 
*   Harber, C., Holmes, S. (2019) Getting MEAN with Mongo, Ecpress, Angular, and Node. Manning Publications, Second Edition.
*       https://learning.oreilly.com/library/view/getting-mean-with/9781617294754/?sso_link=yes&sso_link_from=SNHU
*/


const passport = require ('passport');
const mongoose = require ('mongoose');
require ('../models/user');


const User = mongoose.model('users');


const register = (req,res) => {
    // Check for empty fields
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res  
            .status(400)
            .json({"message": "All fields required"});
    }
    // Create a New User
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    try {
        user.save();
        const token = user.generateJwt();
        res.status(200).json({token});
    } catch (err) {
        res.status(400).json(err)
    }
    /*user.save((err) => {
        if(err) {
            res
            .status(400)
            .json(err);
        } else {
            const token = user.generateJwt();
            res     
                .status(200)
                .json({token});
        }
    })*/
};

// Login user
const login = (req, res) => {
    console.log('Recieved login request: ', req.body); //DEBUG

    if (!req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({"message": "All fields required"});
    }
    // User Authentication
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log('Authentication Error: ', err);  // DEBUG
            return res
            .status(400)
            .json(err);
        }
        if (user) {
            const token = user.generateJwt();
            res
                .status(200)
                .json({token});
        } else {
            res 
                .status(401)
                .json(info);
        }
    }) (req, res);
};

module.exports = {
    register, 
    login
};