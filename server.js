const dotenv = require("dotenv")
const mongoose = require("mongoose")
const startUpLogger = require("./src/utils/start")
const {logEvents} = require("./src/middlewares/logger")

// Configure global environment reader
dotenv.config()

const app = require("./src/core_engine/os.app")
const connectDB = require("./src/config/dbConnect")
const {onError} =require("./src/middlewares/systemEvents")


connectDB()
var port = process.env.PORT || "3256"

mongoose.connection.once("open",()=>{
    app.listen(port, ()=>{
        startUpLogger()
    })
})

mongoose.connection.on("error", (err) => {
    logEvents(
      `${err.no}: ${err.code} \t ${err.syscall} \t ${err.hostname}`,
      "mongoErrLog.log"
    );
    onError(err)
  });