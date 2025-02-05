const mongoose = require("mongoose")

const tmpPatientSchema= new mongoose.Schema({
    fullname:{
        type:String,
       
    },
    phone_number:{
        type:String,
       unique:true,
       required:true
    },
    region:{
        type:String,
        enum:["Kisii", "Nyamira", "Homabay","Kisumu"]
    },
    current_status:{
        type:String,

        enum :["out_patient","in_patient"]
    }, 
    registeredId:{
        type:Number
    },
    gender:{
        type:String,
        enum:["male", "female"]
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Patient_TMP", tmpPatientSchema)