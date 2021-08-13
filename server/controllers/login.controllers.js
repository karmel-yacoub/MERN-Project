const {User} =require('../models/user.models')
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');

const signToken = userID => {
    return JWT.sign({
        iss: "khalil",
        sub : userID,
    }, "khalil", {expiresIn: "1h"});
}

// import controller Image saving in Database
var fs = require('fs');
var path = require('path');

module.exports.createUser=(req,res) => {
    const url = req.protocol + "://" + req.get("host");
    const{name , email , password ,phone , location, genre , menu} = req.body;
    User.create({
        name,
        email,
        password,
        phone,
        location,
        genre,
        picture : url + "/images/" + req.file.filename,
        menu,
    })
    .then(newUser => res.json(newUser))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
}

module.exports.login = (req, res) => {
    console.log("login....")
    if(req.isAuthenticated()) {
        const {_id, name, genre} = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, {httpOnly: true, sameSite: true});
        res.status(200).json({isAuthenticated: true, user: {name, genre, _id}});
    }
}

module.exports.logout = (req, res) => {
    console.log("logout....")
    res.clearCookie('access_token')
    res.json({ user:{name:"", genre:""}, success: true})
}

module.exports.authenticate = (req, res) => {
    // console.log("authenticate....")
    const {name, genre} = req.user;
    res.status(200).json({isAuthenticated:true, user:{name, genre}})
}
