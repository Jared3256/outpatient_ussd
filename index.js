const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/ussd', (req, res) => {
    // Read the variables sent via POST from our API
    const {
        sessionId,
        serviceCode,
        phoneNumber,
        text,
    } = req.body;

    let response = '';

    if (text == '') {
        // This is the first request. Note how we start the response with CON
        response = `CON What would you like to check
        1. My account
        2. My phone number`;
    } else if ( text == '1') {
        // Business logic for first level response
        response = `CON Choose account information you want to view
        1. Account number`;
    } else if ( text == '2') {
        // Business logic for first level response
        // This is a terminal request. Note how we start the response with END
        response = `END Your phone number is ${phoneNumber}`;
    } else if ( text == '1*1') {
        // This is a second level response where the user selected 1 in the first instance
        const accountNumber = 'ACC100101';
        // This is a terminal request. Note how we start the response with END
        response = `END Your account number is ${accountNumber}`;
    }

    // Send the response back to the API
    res.set('Content-Type: text/plain');
    res.send(response);
});






/****************************************/
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/ussd', (req, res) => {
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
    const inputs = text.split('*');
    // When user selects "1" with no further input, ask for Full Name.
    if (inputs.length === 1) {
      response = `CON Enter Full Name:`;
    }
    // After Full Name, ask for Age.
    else if (inputs.length === 2) {
      response = `CON Enter Age:`;
    }
    // After Age, ask for Gender.
    else if (inputs.length === 3) {
      response = `CON Enter Gender (M/F):`;
    }
    // After Gender, ask for Phone Number.
    else if (inputs.length === 4) {
      response = `CON Enter Phone Number:`;
    }
    // Final step: complete registration.
    else if (inputs.length === 5) {
      // For demonstration, generate a dummy Patient ID using last 4 digits of the provided phone number.
      const patientId = 'PT' + inputs[4].slice(-4);
      response = `END Registration successful. Your Patient ID is: ${patientId}`;
    }
  }
  // ----------------------
  // 2. Book Appointment
  // ----------------------
  else if (text.startsWith('2')) {
    const inputs = text.split('*');
    if (inputs.length === 1) {
      response = `CON Select Department/Specialty:`;
    } else if (inputs.length === 2) {
      response = `CON Enter Doctor Name:`;
    } else if (inputs.length === 3) {
      response = `CON Enter Date & Time (e.g., YYYY-MM-DD HH:MM):`;
    } else if (inputs.length === 4) {
      response = `END Appointment confirmed. Reference Number: APPT1234`;
    }
  }
  // ----------------------
  // 3. Check Appointment Status
  // ----------------------
  else if (text === '3') {
    response = `END Your upcoming appointments: Appointment on 2025-03-10 with Dr. Smith.`;
  }
  // ----------------------
  // 4. Doctor Availability
  // ----------------------
  else if (text === '4') {
    response = `END Available doctors:
Dr. Smith - 9AM to 12PM
Dr. Doe - 1PM to 4PM`;
  }
  // ----------------------
  // 5. Prescription/Refill
  // ----------------------
  else if (text === '5') {
    response = `END Your current prescriptions:
1. Medicine A
2. Medicine B
Refill request received. You will receive an SMS shortly.`;
  }
  // ----------------------
  // 6. Lab Test & Results
  // ----------------------
  else if (text.startsWith('6')) {
    const inputs = text.split('*');
    if (inputs.length === 1) {
      response = `CON Choose option:
1. Request a Lab Test
2. Check Lab Test Results`;
    } else if (inputs.length === 2) {
      if (inputs[1] === '1') {
        response = `CON Enter Test Type (e.g., Blood, Urine):`;
      } else if (inputs[1] === '2') {
        response = `END Your lab test results: Normal`;
      } else {
        response = `END Invalid option selected.`;
      }
    } else if (inputs.length === 3 && inputs[1] === '1') {
      // Here you could capture the test type
      response = `END Lab test for ${inputs[2]} requested. Results will be sent via SMS.`;
    }
  }
  // ----------------------
  // 7. Billing & Payment
  // ----------------------
  else if (text.startsWith('7')) {
    const inputs = text.split('*');
    if (inputs.length === 1) {
      response = `CON Enter your Patient ID:`;
    } else if (inputs.length === 2) {
      // For demonstration, we assume a fixed outstanding bill.
      response = `CON Outstanding Bills: $50.
Select Payment Method:
1. Mobile Money`;
    } else if (inputs.length === 3) {
      response = `END Payment successful. Receipt sent via SMS.`;
    }
  }
  // ----------------------
  // 8. Health Tips & Reminders
  // ----------------------
  else if (text.startsWith('8')) {
    const inputs = text.split('*');
    if (inputs.length === 1) {
      response = `CON Daily Health Tips:
1. Subscribe for health tips
2. Unsubscribe`;
    } else if (inputs.length === 2) {
      if (inputs[1] === '1') {
        response = `END You have subscribed to health tips.`;
      } else if (inputs[1] === '2') {
        response = `END You have unsubscribed from health tips.`;
      } else {
        response = `END Invalid option selected.`;
      }
    }
  }
  // ----------------------
  // 9. Emergency Services
  // ----------------------
  else if (text === '9') {
    response = `END Emergency request received. Help is on the way.`;
  }
  // ----------------------
  // 10. Feedback & Complaints
  // ----------------------
  else if (text.startsWith('10')) {
    const inputs = text.split('*');
    if (inputs.length === 1) {
      response = `CON Enter your Patient ID:`;
    } else if (inputs.length === 2) {
      response = `CON Enter your Feedback/Complaint:`;
    } else if (inputs.length === 3) {
      response = `END Thank you for your feedback. We will get back to you shortly.`;
    }
  }
  // ----------------------
  // Invalid Entry
  // ----------------------
  else {
    response = `END Invalid entry. Please try again.`;
  }

  // Set the content type and send the response back to Africa's Talking USSD gateway
  res.set('Content-Type', 'text/plain');
  res.send(response);
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`USSD service running on port ${PORT}`);
});
