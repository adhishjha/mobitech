const mongoose = require('mongoose')


const connectDB=async()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/blogpractice')
        console.log("Database connected...")
    }
    catch{
        console.log("database not connected")
    }
}


module.exports = connectDB