require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose');

// Use MONGO_URI from .env file
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("DB Connected");
    })
    .catch((err) => console.error("DB Connection Error:", err));
