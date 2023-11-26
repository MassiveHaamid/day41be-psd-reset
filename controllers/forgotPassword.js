const forgotPasswordRouter = require('express').Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/user');

forgotPasswordRouter.post('/', async (req, res) => {
    const { email } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({
            error: 'User not found'
        });
    }

    // Generate a random string for password reset
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Store the reset token in the user's document
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour

    await user.save();

    // Send an email with the reset link
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'haamid@gmail.com',  // Replace with your Gmail email
            pass: '12345678'         // Replace with your Gmail password
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',   // Replace with your Gmail email
        to: email,
        subject: 'Password Reset',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://localhost:3001/reset/${resetToken}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: 'Error sending email' });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: 'Email sent successfully' });
        }
    });
});

module.exports = forgotPasswordRouter;
