const mongoose = require('mongoose');
const mongoURI="mongodb://localhost:27017/inotebook";

const connectToMongo=()=>{
    mongoose.set('strictQuery', false);
    mongoose.connect(mongoURI,()=>{
        console.log("connectToMongo to successfully!");
    })
}

module.exports = connectToMongo;