const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

require('./server/config/mongoose.config');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

require('./server/routes/user.routes')(app);
app.listen(8000, () => {
    console.log("Listening at Port 8000")
})






