const express = require('express');
const path = require('path');
const useragent = require('express-useragent');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Include CORS only if needed

const port = process.env.PORT || 3000;
const app = express();
const dotenv = require('dotenv');
dotenv.config();


// Middleware
app.use(cors({
    origin: 'https://photography-blog-h15z.onrender.com/', // Replace with your actual frontend URL
    methods: 'POST', // Allow POST requests
    credentials: true
})); // Use only if cross-origin requests are needed
app.use(useragent.express());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, ''))); // Serve static files
app.use(helmet());

// Nodemailer Transporter Configuration
const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT === 465, // true for port 465, false for 587
    secure: parseInt(process.env.EMAIL_PORT) === 465,
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS  // Your email password or app-specific password
    }
});

// Serve index.html from the root folder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '', 'index.html'));
});

// Corrected Form Submission Route
app.post('/send-email', (req, res) => {
    const {name, email, message} = req.body;

    // Configure the email options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER1, // Your Google email address to receive the form messages
        subject: `New Contact Form Submission from ${name}`,
        text: `You have a new message from:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Send the email using Nodemailer
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Error sending email'});
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({success: true, message: 'Email sent successfully'});
        }
    });
    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         console.log(error);
    //         res.status(500).send('Error sending email');
    //     } else {
    //         console.log('Email sent: ' + info.response);
    //         res.redirect('/send-email'); // Redirect to the thank you page
    //     }
    // });
});
app.get('/send-email', (req, res) => {
    res.sendFile(path.join(__dirname, '', 'index.html'));
});

// Error handling for 404
app.use((req, res) => {
    res.status(404).send('Sorry, page not found');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});


// const express = require('express');
// const path = require('path');
// const useragent = require('express-useragent');
// const bodyParser = require('body-parser');
// const helmet = require('helmet');
// // const cors = require('cors');
//
// const port = process.env.PORT || 3000;
// const app = express();
//
// // Middleware
// app.use(useragent.express());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, ''))); // Serve static files
// app.use(helmet()); // Basic security
// // app.use(cors()); // Enable CORS if needed
//
// // Pug template engine setup (if needed)
// app.set('view engine', 'pug');
//
// // Serve index.html from the public folder
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '', 'index.html'));
// });
//
// // Error handling for 404
// app.use((req, res) => {
//     res.status(404).send('Sorry, page not found');
// });
//
// // Start the server
// app.listen(port, () => {
//     console.log(`Server is listening on port ${port}`);
// });
