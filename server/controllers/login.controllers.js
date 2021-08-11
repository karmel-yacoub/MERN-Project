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
    const{name , email , password ,phone , location, genre , picture , menu} = req.body;
    User.create({
        name,
        email,
        password,
        phone,
        location,
        genre,
        // picture :{
        //     data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
        //     contentType: 'image/png'
        // },
        menu,
    })
    .then(newUser => res.json(newUser))
    .catch(err => res.json(err));
}

module.exports.login = (req, res) => {
    console.log("login....")
    console.log(req)
    if(req.isAuthenticated()) {
        const {_id, name, genre} = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, {httpOnly: true, sameSite: true});
        res.status(200).json({isAuthenticated: true, user: {name, genre, _id}});
    }
}

module.exports.logout = (req, res) => {
    console.log("logout....")
    // console.log(req)
    res.clearCookie('access_token')
    res.json({ user:{name:"", genre:""}, success: true})
}

module.exports.logout = (req, res) => {
    console.log("authenticate....")
    const {name, genre} = req.user;
    res.status(200).json({isAuthenticated:true, user:{name, role}})
}
