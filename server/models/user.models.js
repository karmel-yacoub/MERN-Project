const { MenuItemSchema} = require('../model/menuItem.models');
const mongoose = require('mongoose');
require('mongoose-type-email');
var uniqueValidator = require('mongoose-unique-validator');
const UserSchema = new mongoose.Schema({
    name: { 
            type: String,
            required:[true,"Name must be present"],
            minlength:[3,"Name must be at lest 3 charchtars"]
     },

    email: {
            email:mongoose.SchemaTypes.Email,
            required:true,
            index:true,
            unique:true,
             },
    password:{
            type:string,
            required:true,
            minlength:[8,"Password must be at least 8 charachters"]
    },
    phone:{
            type:string,
            required:true,
            allowBlank:false,
             
        },
    location:{
        type:string,
        required:true,
    },
    genre:{
        type:string,
        enum:['customer','resturent','delivery'],
        defult:'customer',
        required:true,
    },
    picture:{
        data:Buffer,
        contentType:String,
    },
    menu:[MenuItemSchema]
}, { timestamps: true });

module.exports.User = mongoose.model('User', UserSchema);