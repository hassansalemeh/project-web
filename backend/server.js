// mongodb
require('./config/db');

const express = require('express');
const app = express();
const port = 3000;

// cors
const cors = require("cors");
app.use(cors());

const UserRouter = require('./api/User');
const AuthRouter = require('./api/Auth');
const SolarPanel = require('./api/SolarPanel');

// For accepting post form data
const bodyParser = require('express').json;
app.use(bodyParser());

app.use('/auth', AuthRouter)
app.use('/user', UserRouter)
app.use('/solar-panel', SolarPanel)
app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});