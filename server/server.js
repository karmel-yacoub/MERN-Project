const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const passport = require('passport');

require('./config/mongoose.config');
app.use(cors({
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: ['http://localhost:3000']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cookieParser());

require('./routes/user.routes')(app);
require('./routes/menuItem.routes')(app);
require('./routes/order.routes')(app);
app.listen(8000, () => {
    console.log("Listening at Port 8000")
})






