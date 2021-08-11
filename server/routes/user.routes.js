const UserController = require('../controllers/user.controllers')
const LoginController = require('../controllers/login.controllers')
const upload = require('../multer')
const passport = require('passport');


module.exports = (app) => {
    app.post('/register', upload.single('image'), LoginController.createUser);
    app.post('/login', passport.authenticate('local', {session:false}), LoginController.login);
    app.post('/logout', passport.authenticate('jwt', {session:false}), LoginController.logout);
    app.post('/api/menuitem', upload.single('image'), UserController.createMenuItem);
    app.get ('/api/users/:id',UserController.getOneUser);
    app.put ('/api/users/:id',UserController.updateUser);
    // app.put('/api/users/:id',UserController.updateUser);
    // app.delete('/api/users/:id', UserController.deleteUser);
    app.post('/api/order',UserController.createOrder);
    app.put ('/api/order/:id',UserController.deliveryOrderUpdate);
    

    // app.post('/login', localF, UserController.login);

} 