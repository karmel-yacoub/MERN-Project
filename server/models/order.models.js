const {UserSchema} = require('../models/user.models');

const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({

    price:{
        type:Number,
        required:[true, "Price should be present"],
    },

    customer:UserSchema,
    delivery:UserSchema,
    resturent:UserSchema,
    status:{
        enum:['requested','accepted','readyToDeliver','inWay','delivered'],
    
    }

} , {timestamps: true})

module.exports.OrderSchema =  OrderSchema;
module.exports.Order = mongoose.model('Order', OrderSchema);