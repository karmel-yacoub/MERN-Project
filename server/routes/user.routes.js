const UserController = require('../controllers/user.controllers')
const upload = require('../multer')

module.exports = (app) => {
    app.post('/', upload.single('image'), UserController.createUser)
}