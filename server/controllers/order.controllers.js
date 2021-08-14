
const {Order, OrderSchema}= require('../models/order.models');
const {User}= require('../models/user.models');

module.exports.findAllOrders = (request,response)=>{
    Order.find({})
    .then(orders => response.json(orders))
    .catch(err => response.json(err))
 
}

module.exports.getOneOrder = (req, res) => {
    Order.findOne({_id:req.params.id}).populate('customer').populate('restaurant').populate('delivery')
        .then(user => res.json(user))
        .catch(err => res.json(err))
}


module.exports.findUserOrders = (req, res) => {
    Order.find({})
        .then(orders => res.json(orders.filter((item , idx)=>item.customer == req.params.id)))
        .catch(err => res.json(err))
}

module.exports.findRestaurantOrders = (req, res) => { 
    Order.find({restaurant: req.params.id}).populate('customer restaurant delivery')
        .then(orders => res.json(orders))
        .catch(err => res.json(err))
}

module.exports.findDeliveryOrders = (req, res) => {
    Order.find({delivery: req.params.id}).populate('customer restaurant dilivery')
        .then(orders => res.json(orders))
        .catch(err => res.json(err))
}

module.exports.changeOrderStatus = (req, res) => {
    Order.findOne({_id:req.params.id})
        .then(order =>{
            if(order.status == "requested") order.status='accepted'
            else if(order.status == "accepted") order.status='readyToDeliver'
            else if(order.status == "readyToDeliver") order.status='inWay'
            else if(order.status == "inWay") order.status='delivered'
            else if(order.status == "delivered") order.status='requested'
            order.save()
            return order
        })
        .then(order =>res.json(order))
        .catch(err => res.json(err))
}

module.exports.deliverySelect = async (req, res) => {
    const {delivery}= req.body
    console.log(delivery)
    Order.findOneAndUpdate({_id: req.params.id},{$set: {"delivery": delivery }} , {new:true , runValidators:true} )
        .then(
            order => {
                res.json(order)
            // order =>{ Order.findOneAndUpdate({_id: req.params.id},{status:'accepted'} , {new:true , runValidators:true} )
            // .then(order => res.json(order))}
            console.log("Delivery Selected")
            }
            )
        .catch(err => response.status(400).json(err))
}

