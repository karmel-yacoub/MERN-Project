const UserController = require('../controllers/user.controllers')
const LoginController = require('../controllers/login.controllers')
const OrderController = require('../controllers/order.controllers')
const upload = require('../multer')
const passport = require('passport');


module.exports = (app) => {
    app.post('/register', upload.single('picture'), LoginController.createUser);
    app.post('/login', passport.authenticate('local', {session:false}), LoginController.login);
    app.post('/logout', passport.authenticate('jwt', {session:false}), LoginController.logout);
    app.get('/authenticated', passport.authenticate('jwt', {session:false}), LoginController.authenticate);
    app.post('/api/menuitem', passport.authenticate('jwt', {session:false}), upload.single('picture'), UserController.createMenuItem);
    app.get ('/api/users/:id',UserController.getOneUser);
    app.get ('/api/users',UserController.getAllUsers);
    app.put ('/api/users/:id',UserController.updateUser);
    app.get ('/api/customers',UserController.getAllCustomers);
    app.get ('/api/restaurants',UserController.getAllrestaurants);
    
    app.get ('/api/deliveries',UserController.getAllDeliveries);
    // app.put('/api/users/:id',UserController.updateUser);
    // app.delete('/api/users/:id', UserController.deleteUser);
    app.post('/api/order',UserController.createOrder);
    app.put ('/api/orders/:id',UserController.deliveryOrderUpdate);

    
    // app.post('/login', localF, UserController.login);

} 