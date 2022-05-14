const mongoose = require('mongoose');
require('dotenv').config();



const connectDatabase = () => {
    mongoose.connect(process.env.MONGODB_URL, {

    }).then(() => {
        console.log("Database is Connected.");
    }).catch((err) => {
        console.log(`No connection : ${err}}`);
    });
}

module.exports = connectDatabase
