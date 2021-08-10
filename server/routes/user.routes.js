const UserController = require('../controllers/user.controllers')

app.post('/', upload.single('image'), UserController.createUser)