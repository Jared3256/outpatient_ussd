const asyncHandler = require("express-async-handler")
const RegisterPatient = require("./create");

const SessionStart = asyncHandler(async(req, res)=>{
    // Extract parameters from the POST request
  const { sessionId, serviceCode, phoneNumber, text } = req.body;

  let response = '';

  
  // If text is empty, this is a new session - display the Main Menu
  if (text === '') {
    response = `CON Welcome to Out-Patient Services:
1. Patient Registration
2. Book Appointment
3. Check Appointment Status
4. Doctor Availability
5. Prescription/Refill
6. Lab Test & Results
7. Billing & Payment
8. Health Tips & Reminders
9. Emergency Services
10. Feedback & Complaints`;
  }

  // ----------------------
  // 1. Patient Registration
  // ----------------------
  else if (text.startsWith('1')) {
    // When user selects "1" with no further input 
    RegisterPatient(req, res)
  }

  else{
    response = `END Invalid entry. Please try again.`;
  }
})

module.exports = SessionStart