const {MenuItem} =require('../models/menuItem.models')

// import controller Image saving in Database
var fs = require('fs');
var path = require('path');

module.exports.createMenuItem=(req,res) => {
    const{name , price , description,picture } = req.body;
    User.create({
        name,
        price,
        description,
        picture :{
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    })
}