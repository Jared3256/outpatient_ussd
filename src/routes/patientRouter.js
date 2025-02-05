const express = require("express")
const PatientController = require("../controller/registration/index")
const patientRouter = express.Router()

patientRouter.post("/out-patient", PatientController.sessionStart )

module.exports = patientRouter