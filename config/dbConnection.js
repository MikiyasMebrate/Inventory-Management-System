const mongoose = require('mongoose')

const connectDb = async()=>{
    try{
        const connect = mongoose.connect(process.env.DATABASE_SERVER)
        console.log("database connected.")
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDb