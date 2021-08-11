const menuItemController = require('../controllers/menuItemControllers');
const upload = require('../multer')
module.exports = function(app){
    app.post('/api/menuitem', upload.single('image'), menuItemController.createMenuItem);
    app.get('/api/menuitems', menuItemController.findAllItems);
    app.get('/api/menuitems/:id',menuItemController.findOneSingleItem);
    app.put('/api/menuitems/:id', menuItemController.ubdateItem);
    app.delete('/api/menuitems/:id', menuItemController.deleteItem);
}