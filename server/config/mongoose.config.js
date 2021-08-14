const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://khalil:RGcyJZEJoOhGbgPH@cluster0.55sa7.mongodb.net/food_is_here_db?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));


    