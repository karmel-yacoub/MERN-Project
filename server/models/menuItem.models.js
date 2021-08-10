const { UserSchema} = require('../models/user.models');
const mongoose = require('mongoose');
const MenuItemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Name should be present"],

    },
    price:{
        type:Number,
        required:[true, "Price should be present"],
    },
    description:{
        type:String,
        required:[true, "Description should be present"],
    },
    picture:{
        data:Buffer,
        contentType:String,
    },

    user:[UserSchema]

 } , {timestamps: true})


module.exports.MenuItem = mongoose.model('MenuItem', MenuItemSchema);