const {Order}= require('../models/order.models');


module.exports.findAllOrders = (request,response)=>{
    Order.find({})
    .then(orders => response.json(orders))
    .catch(err => response.json(err))
 
}

module.exports.getOneOrder = (req, res) => {
    Order.findOne({_id:req.params.id}).populate('customer').populate('resturent').populate('delivery')
        .then(user => res.json(user))
        .catch(err => res.json(err))
}