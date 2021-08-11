const {User} =require('../models/user.models')
const {MenuItem}= require('../models/menuItem.models');
const {Order}= require('../models/order.models');
// import menuitem model
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

module.exports.updateUser = (req, res) => {
    User.findOneAndUpdate({_id: request.params.id}, req.body, {new:true , runValidators:true} )
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(400).json(err))
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

module.exports.getOneUser = (req, res) => {
    User.findOne({_id:req.params.id})
        .then(user => res.json(user))
        .catch(err => res.json(err))
}

module.exports.getAllUsers = (req, res) => {
    User.find({})
    .then(user => res.json(user))
    .catch(err => res.json(err))
}

module.exports.createMenuItem = (req , res) => {
    const{name , price , description,picture , id } = req.body; 
    MenuItem.create({
        name,
        price,
        description,
        // picture :{
        //     data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
        //     contentType: 'image/png'
        // }
    })
    .then(
        item => {
            User.findOne({_id:id})
            .then(resturaunt => {
            resturaunt.menu.push(item)
            resturaunt.save()
            .then(resturaunt => res.json(resturaunt))
        })
        }
    )

}

module.exports.createOrder = (req , res) => {
    const {price , customerId , resturentId } = req.body;
    Order.create({
        price,
        status:'requested'
    })
    .then(
        async order => {
            order.customer = await User.findOne({_id:customerId}).name
            order.resturent = await User.findOne({_id:resturentId}).name
            order.save()
            .then(order => res.json(order))   
        }
    )
}
module.exports.deliveryOrderUpdate = (request, response) => {
    Order.findOneAndUpdate({_id: request.params.id}, deliveryId,  request.body, {new:true , runValidators:true} )
        .then(
            async updatedAuthor => {
                order.delivery = await User.findOne({_id:deliveryId})
                order.status = 'inWay'
            })
        .catch(err => response.status(400).json(err))
}
