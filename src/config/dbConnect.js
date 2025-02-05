const  mongoose = require("mongoose")

const connectDB = async()=>{
try {
    const databaseURI = process.env.NODE_ENV === "production" ? process.env.PROD_DATABASE : process.env.DEV_DATABASE
    console.log("database uri "+ databaseURI)
    await mongoose.connect(databaseURI)
} catch (error) {
    console.log(error)
}
}

module.exports=  connectDB