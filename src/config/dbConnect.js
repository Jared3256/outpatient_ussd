const  mongoose = require("mongoose")

const connectDB = async()=>{
try {
    const databaseURI = "mongodb+srv://odhiambojared566:Jared32..56winnie@cluster0.hf3zq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    await mongoose.connect(databaseURI)
} catch (error) {
    console.log(error)
}
}

module.exports=  connectDB