const mongoose = require('mongoose')

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.DB,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Database connected...")
    }
    catch(error){
        console.log(error)
        console.log("database not connected")
    }
}


module.exports = connectDB