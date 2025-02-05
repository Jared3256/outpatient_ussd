const mongoose = require("mongoose")

const PatientSchema= new mongoose.Schema({
    fullname:{
        type:String,
        default: "",
        required:true
    },
    phone_number:{
        type:String,
        required: true
    },
    region:{
        type:String,
        required:true,
        enum:["Kisii", "Nyamira", "Homabay","Kisumu"]
    },
    current_status:{
        type:String,
        required: "out_patient",
        enum :["out_patient","in_patient"]
    }, 
    registeredId:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true,
        enum:["male", "female"]
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Patient", PatientSchema)