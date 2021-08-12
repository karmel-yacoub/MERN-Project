const {UserSchema} = require('../models/user.models');

const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const OrderSchema = new mongoose.Schema({

    price:{
        type:Number,
        required:[true, "Price should be present"],
    },
    status:{
        type: String,
        enum:['requested','accepted','readyToDeliver','inWay','delivered'],
        default: 'requested'
    },

    customer:{ type: Schema.Types.ObjectId, ref: 'User'},
    resturent:{ type: Schema.Types.ObjectId, ref: 'User'},
    delivery:{ type: Schema.Types.ObjectId, ref: 'User'},
    
    

} , {timestamps: true})

module.exports.OrderSchema =  OrderSchema;
module.exports.Order = mongoose.model('Order', OrderSchema);