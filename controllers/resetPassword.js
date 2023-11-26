const resetPasswordRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

resetPasswordRouter.post('/:token', async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;

    // Find the user by the reset token
    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
        return res.status(400).json({ error: 'Invalid or expired token' });
    }

    // Reset password
    user.passwordHash = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
});

module.exports = resetPasswordRouter;
