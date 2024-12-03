const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// MongoDB user model
const User = require('./../models/User');

// Middleware for token authentication (json web token verification function)
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // No token given => no access

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Not a valid token
        req.user = user;
        next();
    });
}

// API endpoint to check if a token is valid
router.post('/check-token', authenticateToken, (req, res) => {
    // If the middleware (authenticateToken) is reached, it means the token is valid
    return res.status(200).json({
        valid: true,
        message: 'Token is valid',
        data: {
            userId: req.user.userId,
            roles: req.user.roles,
        },
    });
});

// Functions for validation
function validateEmail(email) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
}

function validateUsername(username) {
    const nameRegex = /^.{3,}$/; //minimum 3 chars, lower or upper characters only
    return nameRegex.test(username);
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&.])[A-Za-z\d@$!%*#?&.]{8,}$/;
    return passwordRegex.test(password);
}

function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^(03|70|71|76|80|81)\d{6}$/;
    return phoneRegex.test(phoneNumber);
}

// Update User Information
router.put('/update/:userId', authenticateToken, async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedData = req.body;

        // Check same user
        if (req.user.userId !== userId) {
            return res.status(403).json({
                status: "FAILED",
                message: "Forbidden: You don't have permission to update this user",
            });
        }

        // Check if the user exists
        const existingUser = await User.findById(userId);

        if (!existingUser) {
            return res.status(404).json({
                status: "FAILED",
                message: "User not found",
            });
        }

        if (updatedData.email && !validateEmail(updatedData.email)) {
            return res.status(400).json({
                status: "FAILED",
                message: "Invalid email entered",
            });
        }

        if (updatedData.email) {
            const emailExists = await User.findOne({ email: updatedData.email, _id: { $ne: userId } });
            if (emailExists) {
                return res.status(400).json({
                    status: "FAILED",
                    message: "Email already exists for another user",
                });
            }

            if (!validateEmail(updatedData.email)) {
                return res.status(400).json({
                    status: "FAILED",
                    message: "Invalid email entered",
                });
            }
        }

        if (updatedData.username) {
            const usernameExists = await User.findOne({ username: updatedData.username, _id: { $ne: userId } });
            if (usernameExists) {
                return res.status(400).json({
                    status: "FAILED",
                    message: "Username already exists for another user",
                });
            }

            if (!validateUsername(updatedData.username)) {
                return res.status(400).json({
                    status: "FAILED",
                    message: "Username must be at least 3 characters, containing only letters.",
                });
            }
        }

        if (updatedData.phoneNumber) {
            const phoneExists = await User.findOne({ phoneNumber: updatedData.phoneNumber, _id: { $ne: userId } });
            if (phoneExists) {
                return res.status(400).json({
                    status: "FAILED",
                    message: "Phone number already exists for another user",
                });
            }

            if (!validatePhoneNumber(updatedData.phoneNumber)) {
                return res.status(400).json({
                    status: "FAILED",
                    message: "Invalid phone number",
                });
            }
        }

        Object.keys(updatedData).forEach((key) => {
            existingUser[key] = updatedData[key]; //we update only the fields specified by the user
        });

        const savedUser = await existingUser.save(); //save the updated user

        return res.status(200).json({
            status: "SUCCESS",
            message: "User information updated successfully",
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

// Change Password
router.put('/change-password/:userId', authenticateToken, async (req, res) => {
    try {
        const userId = req.params.userId;
        const { currentPassword, newPassword } = req.body;

        // Check same user
        if (req.user.userId !== userId) {
            return res.status(403).json({
                status: "FAILED",
                message: "Forbidden: You don't have permission to change the password for this user",
            });
        }

        // Check if the user exists
        const existingUser = await User.findById(userId);

        if (!existingUser) {
            return res.status(404).json({
                status: "FAILED",
                message: "User not found",
            });
        }

        // Check if the current password is correct
        const isPasswordValid = await bcrypt.compare(currentPassword, existingUser.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                status: "FAILED",
                message: "Invalid current password",
            });
        }

        // Validate the new password
        if (!validatePassword(newPassword)) {
            return res.status(400).json({
                status: "FAILED",
                message: "Invalid new password. It must be at least 8 characters long and contain a combination of letters, numbers, and special characters.",
            });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        existingUser.password = hashedNewPassword;

        // Save the updated user
        const savedUser = await existingUser.save();

        return res.status(200).json({
            status: "SUCCESS",
            message: "Password changed successfully",
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

// Get User by ID
router.get('/get-user/:userId', authenticateToken, async (req, res) => {
    try {
        const userId = req.params.userId;

        // Check if the user exists
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                status: "FAILED",
                message: "User not found",
            });
        }

        // Check if the requester has permission to view this user's information
        if (req.user.userId === userId || req.user.roles.includes('admin')) {
            return res.status(200).json({
                status: "SUCCESS",
                message: "User information retrieved successfully",
                data: user,
            });
        } else {
            return res.status(403).json({
                status: "FAILED",
                message: "Forbidden: You don't have permission to update this user",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "FAILED",
            message: "An error occurred while processing the request",
        });
    }
});


// Get All Users
router.get('/users', authenticateToken, async (req, res) => {
    try {
        // Check if the requester has permission to view all users' information
        if (!req.user.roles.includes('admin')) {
            return res.status(403).json({
                status: "FAILED",
                message: "Forbidden: You don't have permission to view all users' information",
            });
        }

        // Retrieve all users
        const users = await User.find();

        return res.status(200).json({
            status: "SUCCESS",
            message: "All users' information retrieved successfully",
            data: users,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "FAILED",
            message: "An error occurred while processing the request",
        });
    }
});



module.exports = router;