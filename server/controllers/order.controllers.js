const {Order}= require('../models/order.models');


module.exports.findAllOrders = (request,response)=>{
    Order.find({})
    .then(orders => response.json(orders))
    .catch(err => response.json(err))
 
}