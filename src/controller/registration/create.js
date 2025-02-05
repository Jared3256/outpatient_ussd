const asyncHandler = require("express-async-handler")
const tmpPatient = require("../../models/patient/tmp.patient");

const RegisterPatient = asyncHandler(async (req, res) => {
     // Extract parameters from the POST request
  const { sessionId, serviceCode, phoneNumber, text } = req.body;

  let response = '';
  
  const inputs = text.split('*');

    if (inputs.length === 1) {
        response = `CON Enter Full Name:`;
    }
    // After Full Name, ask for id number.
    else if (inputs.length === 2) {
        // Save full name to temporary database
        const temporary = {
            phone_number: phoneNumber,
            registeredId :inputs[1]
        }
        const tmp = await tmpPatient.save(temporary)

        if(!tmp){
            response = `END Registration aborted. `
        }
      response = `CON Whats your gender:`;
    }

    // After gender, ask for Gender.
    else if (inputs.length === 3) {

        let tmpPat =await tmpPatient.findOneAndUpdate({
            phone_number:phoneNumber
        },{
            gender:inputs[2]
        },{
            new:true
        }).exec()

        if(!tmpPat){
            response = `END Registration aborted. `
        }
        response = `CON Enter Gender (M/F):`;
      }
      // After Gender, ask for Phone Number.
      else if (inputs.length === 4) {
        response = `CON Enter Phone Number:`;
      }
      // Final step: complete registration.
      else if (inputs.length === 5) {
      
        const patientId = 'PT' + inputs[4].slice(-4);
        response = `END Registration successful. Your Patient ID is: ${patientId}`;
      }
   // Set the content type and send the response back to Africa's Talking USSD gateway
  res.set('Content-Type', 'text/plain');
  res.send(response);
});

module.exports = RegisterPatient;