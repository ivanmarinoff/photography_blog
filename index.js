const express = require('express');
const path = require('path');
const useragent = require('express-useragent');
const bodyParser = require('body-parser');
const helmet = require('helmet');
// const cors = require('cors');

const port = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(useragent.express());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, ''))); // Serve static files
app.use(helmet()); // Basic security
// app.use(cors()); // Enable CORS if needed

// Pug template engine setup (if needed)
app.set('view engine', 'pug');

// Serve index.html from the public folder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '', 'index.html', 'templates/blog.html', 'templates/about.html'));
});

// Error handling for 404
app.use((req, res) => {
    res.status(404).send('Sorry, page not found');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
