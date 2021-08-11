const UserController = require('../controllers/user.controllers')
const upload = require('../multer')
const passport = require('passport');

module.exports = (app) => {
    app.post('/register', upload.single('image'), UserController.createUser);
    app.post('/login', passport.authenticate('local', {session:false}), UserController.login);
    app.post('/api/menuitem', upload.single('image'), UserController.createMenuItem);
<<<<<<< HEAD
    app.get ('/api/users/:id',UserController.getOneUser);
    app.put('/api/users/:id',UserController.updateuser);
    app.delete('/api/users/:id', UserController.deleteUser);
    
=======
    app.get ('/api/users',UserController.getAllUsers);
    // app.get ('/api/users/:id',UserController.getOneUser);
    // app.put('/api/users/:id',UserController.updateUser);
    // app.delete('/api/users/:id', UserController.deleteUser);
>>>>>>> 63ae0403d06d90a050ed6731de28cb9a879b1e2e

    // app.post('/login', localF, UserController.login);

} 