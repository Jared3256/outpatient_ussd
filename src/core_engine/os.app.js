var express = require("express")
var logger_morgan = require("morgan")
const {logger} = require("../middlewares/logger")
const path = require("path") 
const {notFound} = require("../utils/handlers")
const router = require("../routes/index")

var app = express()
app.use("/", router)

// configure the middleware for the system
// 1. Logger Morgan for timed logs  and custom logger)
app.use(logger_morgan("dev"))
app.use(logger)
// 2. JSON , urlencoded , static files
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
app.use(express.static(path.join(__dirname, "public")))


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    notFound(req, res, next);
  });
  
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });
  
// export the app starter file
module.exports = app