const OrderController = require('../controllers/order.controllers')
const passport = require('passport');

module.exports = (app) => {
    app.get('/api/orders', OrderController.findAllOrders);
    app.get('/api/orders/user/:id',OrderController.findUserOrders); 
    app.get('/api/orders/resturent/:id',OrderController.findResturentOrders); 
    app.get('/api/orders/delivery/:id',OrderController.findDeliveryOrders); 
    app.get ('/api/orders/:id',OrderController.getOneOrder);
    app.put ('/api/orders/status/:id',OrderController.changeOrderStatus);

    // app.get('/api/orders', OrderController.findAllOrders);
    // app.get('/api/orders/:id',OrderController.findOneSingleOrder);
    
    
}