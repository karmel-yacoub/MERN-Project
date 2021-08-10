const {User} =require('../models/user.models')

// import controller Image saving in Database
var fs = require('fs');
var path = require('path');

module.exports.createUser=(req,res) => {
    const{name , email , password ,phone , location, genre , picture , menu} = req.body;
    User.create({
        name,
        email,
        password,
        phone,
        location,
        genre,
        picture :{
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        },
        menu,
    })
}