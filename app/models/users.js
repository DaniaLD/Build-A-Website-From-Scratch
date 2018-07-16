const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    admin: { type: Boolean, default: 0 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, bcrypt.genSaltSync(15), (err, hash) => {
        if(err) console.log(err);

        this.password = hash;
        next();
    });
})

module.exports = mongoose.model('User', userSchema);