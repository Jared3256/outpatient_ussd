const express = require ("express")
const patientRouter = require("./patientRouter")
var router = express.Router()

/* GET home page */
router.get("/", function(req, res, next){
    return res.status(200).json({
        message:"Welcome to home page",
        success:true
    })
})

/* Patient Route */
router.use("/patient", patientRouter)
module.exports = router