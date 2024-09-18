const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
const path = require('path');
// const nodemailer = require('nodemailer');
const useragent = require('express-useragent');

app.use(useragent.express());
require('dotenv').config();

// Static file serving
app.use('/static', express.static(path.join(__dirname, 'static')));

// Pug template engine setup (if needed)
app.set('view engine', 'pug');

// Body parser for form data
app.use(require('body-parser').urlencoded({ extended: true }));

// Nodemailer setup with custom host and port
// const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST, // SMTP server (e.g., smtp.gmail.com)
//     port: parseInt(process.env.EMAIL_PORT), // Convert string to number
//     secure: parseInt(process.env.EMAIL_PORT) === 465, // true for port 465 (SSL), false otherwise (e.g., 587 for TLS)
//     auth: {
//         user: process.env.EMAIL_USER, // Your email address
//         pass: process.env.EMAIL_PASS  // Your email password or app-specific password
//     }
// });

// Function to send an email notification
// async function sendEmail(visitorIP, browser, os, time) {
//     const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: process.env.EMAIL_USER, // Sending the email to yourself
//         subject: 'Visitor Session Ended',
//         text: `
//             A visitor has left your page.
//             IP: ${visitorIP}
//             Browser: ${browser}
//             OS: ${os}
//             Session Ended: ${time}
//         `
//     };
//
//     try {
//         const info = await transporter.sendMail(mailOptions);
//         console.log('Email sent:', info.response);
//     } catch (error) {
//         console.log('Error sending email:', error);
//     }
// }


// Set up your index route
app.get('/', function (req, res) {
    // const visitorIP = req.ip; // Get the visitor's IP address
    // const browser = req.useragent.browser; // Get the browser information
    // const os = req.useragent.os; // Get the OS information
    // const time = new Date().toLocaleString(); // Get the current time

    // Send an email notification with all details
    // sendEmail(visitorIP, browser, os, time);

    // Serve the HTML file
    res.sendFile(__dirname + '/index.html');
});


// Start the server
app.listen(port, function () {
    console.log(`Server is listening on port ${port}`);
});

// app.post('/session-end', express.json(), (req, res) => {
//     const { ip, browser, os, time } = req.body;
//
//     // Send an email with the collected data
//     sendEmail(ip, browser, os, time);
//
//     res.sendStatus(200); // Respond with a status to indicate successful handling
// });


// Mixpanel setup (if needed)
// const Mixpanel = require('mixpanel', { track_pageview: true });

// Create an instance of the Mixpanel client
// const mixpanel = Mixpanel.init(process.env.MIXPANEL_TOKEN, { host: "api-eu.mixpanel.com" });
