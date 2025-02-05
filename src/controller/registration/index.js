const PatientSchema = require("../../models/patient/patient")


const create = require("./create")
const sessionStart = require("./session_start")

const PatientController =()=>{
    let methods ={
        create : (req ,res) => create(PatientSchema, req, res),
        sessionStart :(req, res)=> sessionStart(req, res)
    }

    return methods
}

module.exports = PatientController()