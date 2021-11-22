// main.js
const nodemailer = require('nodemailer');

// setup mail transporter service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'skies241040@gmail.com', // your email
    pass: 'Saksit2440'              // your password
  }
});

// setup email data with unicode symbols
const mailOptions = {
  from: 'skies241040@gmail.com',              // sender
  to: 'saksit2441@gmail.com',              // list of receivers
  subject: 'Hello from sender',            // Mail subject
  html: '<b>Do you receive this mail?</b>' // HTML body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function (err, info) {
   if(err)
     console.log(err)
   else
     console.log(info);
});