const UserController = require('../controllers/user.controllers')
const upload = require('../multer')
const passport = require('passport');

module.exports = (app) => {
    app.post('/register', upload.single('image'), UserController.createUser);
    app.post('/login', passport.authenticate('local', {session:false}), UserController.login);
    // app.post('/login', localF, UserController.login);
    
} 