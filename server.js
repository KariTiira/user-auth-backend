const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const { registerUser, loginUser } = require('./userController');
const { verifyToken } = require('./authMiddleware');


const app = express();
const PORT = 5050;

// Middleware to parse incoming requests
app.use(cors())
app.use(bodyParser.json());

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


app.post('/register', registerUser);
app.post('/login', loginUser);

// Protected route
app.get('/dashboard', verifyToken, (req, res) => {
    res.json({ message: `Welcome to the dashboard, ${req.user.username}!` });
});