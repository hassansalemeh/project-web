const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// MongoDB user model
const User = require('./../models/User');

// Functions for validation
function validateEmail(email) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
}

function validateUsername(username) {
    const nameRegex = /^.{3,}$/; //minimum 3 chars
    return nameRegex.test(username);
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&.])[A-Za-z\d@$!%*#?&.]{8,}$/;
    return passwordRegex.test(password);
}

function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^(03|70|71|76|80|81)\d{6}$/;
    return phoneRegex.test(phoneNumber);
}

// Signup
router.post('/signup', async (req, res) => {
    try {
        let { firstName, lastName, username, phoneNumber, email, password, dateOfBirth, location, roleChoice } = req.body;

        // Trim whitespace from input fields
        // const trimmedFields = ['firstName', 'lastName', 'username', 'phoneNumber', 'email', 'password', 'dateOfBirth', 'location'];
        // trimmedFields.forEach(field => {
        //     req.body[field] = req.body[field].trim();
        // });

        // Validate input fields
        if (Object.values(req.body).some(value => value === "")) {
            return res.status(400).json({
                status: "FAILED",
                message: "Empty input fields!",
            });
        }

        if (!validateUsername(username)) {
            return res.status(400).json({
                status: "FAILED",
                message: "Username must be at least 3 characters, containing only letters.",
            });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({
                status: "FAILED",
                message: "Invalid email entered",
            });
        }

        if (!validatePhoneNumber(phoneNumber)) {
            return res.status(400).json({
                status: "FAILED",
                message: "Invalid phone number.",
            });
        }

        if (!Date.parse(dateOfBirth)) {
            return res.status(400).json({
                status: "FAILED",
                message: "Invalid date of birth entered",
            });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({
                status: "FAILED",
                message: "Password must be at least 8 characters long and contain a combination of letters, numbers, and special characters.",
            });
        }

        // Assigning roles based on the user's choice
        // const roles = (roleChoice === 'buyAndSell') ? ['buyer', 'seller'] : ['buyer'];
        const roles = (roleChoice === 'buyAndSell') ? ['buyer', 'seller'] : (roleChoice === 'admin') ? ['buyer', 'seller', 'admin'] : ['buyer'];

        // Checking if the user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }, { phoneNumber }] });

        if (existingUser) {
            return res.status(400).json({
                status: "FAILED",
                message: `User with the provided ${existingUser.username === username ? 'username' : existingUser.email === email ? 'email' : 'phone number'} already exists`,
            });
        }

        // Create a new user
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            firstName,
            lastName,
            username,
            phoneNumber,
            email,
            password: hashedPassword,
            dateOfBirth,
            location,
            roles,
        });

        const savedUser = await newUser.save();

        return res.status(200).json({
            status: "SUCCESS",
            message: "Signup successful!",
            data: savedUser,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "FAILED",
            message: "An error occurred while processing the request",
        });
    }
});


// function to generate jwt

function generateAccessToken(user) {
    // return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15mn'})
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}

// token

// router.post('/token', (req, res) => {
//     const refreshToken = req.body.token
// })

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === "" || password === "") {
            return res.status(400).json({
                status: "FAILED",
                message: "Empty input fields!",
            });
        }

        // Check if user exists
        // const data = await User.find({ email: email });
        const data = await User.find({
            $or: [{ email }, { username: email }],
          });

        if (data) {
            // User exists
            const hashedPassword = data[0].password;
            const result = await bcrypt.compare(password, hashedPassword);

            if (result) {
                // Generate a JWT
                const user = {
                    userId: data[0]._id,
                    firstName: data[0].firstName,
                    lastName: data[0].lastName,
                    username: data[0].username,
                    phoneNumber: data[0].phoneNumber,
                    email: data[0].email,
                    dateOfBirth: data[0].dateOfBirth,
                    location: data[0].location,
                    roles: data[0].roles,
                    createdAt: data[0].createdAt,
                };
            
                const accessToken = generateAccessToken(user)
                // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

                return res.status(200).json({
                    status: "SUCCESS",
                    message: "Login successful",
                    accessToken: accessToken,
                    // refreshToken: refreshToken,
                    data: data,
                });
            } else {
                return res.status(400).json({
                    status: "FAILED",
                    message: "Invalid email or password.",
                });
            }
        } else {
            return res.status(400).json({
                status: "FAILED",
                message: "Invalid email or password.",
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: "FAILED",
            message: "An unexpected error occurred.",
        });
    }
});

module.exports = router;