const OrderController = require('../controllers/order.controllers')
const passport = require('passport');

module.exports = (app) => {
    app.get('/api/orders', OrderController.findAllOrders);
    app.get('/api/orders/:id',OrderController.findOneSingleOrder); 

    // app.get('/api/orders', OrderController.findAllOrders);
    // app.get('/api/orders/:id',OrderController.findOneSingleOrder);
    
    
}