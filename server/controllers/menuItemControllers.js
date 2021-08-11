const {MenuItem} =require('../models/menuItem.models')

// import controller Image saving in Database
var fs = require('fs');
var path = require('path');

module.exports.createMenuItem=(req,res) => {
    const{name , price , description,picture } = req.body;
    MenuItem.create({
        name,
        price,
        description,
        // picture :{
        //     data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
        //     contentType: 'image/png'
        // }
    })
    .then(MenuItems => res.json(MenuItems ))
    .catch(err => res.json(err))
}
    module.exports.findAllItems = (req,res)=>{
        MenuItem.find({})
        .then(MenuItems => res.json(MenuItems ))
        .catch(err => res.json(err))
     
    }
     module.exports.findOneSingleItem = (req, res)=> {
        MenuItem.findOne({_id: req.params.id})
        .then(oneSingleItem => res.json(oneSingleItem))
        .catch(err => res.json({message: "something went wrong", error: err}));
     }
     module.exports.ubdateItem =(req, res)=> {
        MenuItem.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
            .then(updatedMeal=> res.json(updatedMeal))
            .catch(err => res.json(err))
    }
    module.exports.deleteItem =(req, res) =>{
        MenuItem.deleteOne({ _id: req.params.id })
        .then(deletedMeal => res.json(deletedMeal))
        .catch(err => res.json(err))
    } 