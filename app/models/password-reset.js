const mongoose = require('mongoose');

const passwordResetSchema = new mongoose.Schema({
    email: { type: String, required: true },
    token: { type: String, required: true },
    used: { type: Boolean, default: false }
}, { timestamps: { updatedAt: false } });

module.exports = mongoose.model('PasswordReset', passwordResetSchema);