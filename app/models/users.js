const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueString = require('unique-string');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    admin: { type: Boolean, default: 0 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rememberToken: { type: String, default: null }
}, { timestamps: true });

userSchema.pre('save', function(next) {
    let salt = bcrypt.genSaltSync(15);
    let hash = bcrypt.hashSync(this.password, salt);

    this.password = hash;
    next();
});

userSchema.pre('findOneAndUpdate', function(next) {
    let salt = bcrypt.genSaltSync(15);
    let hash = bcrypt.hashSync(this.getUpdate().$set.password, salt);

    this.getUpdate().$set.password = hash;
    next();
})

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

userSchema.methods.setRememberToken = function(res) {
    const token = uniqueString(); // Generates a random unique string for our token

    res.cookie('remember_token', token, { signed: true, maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});  // 30 Days and signed: true => encrypts cookie

    this.update({ rememberToken: token }, err => { if(err) console.log(err) });
}

module.exports = mongoose.model('User', userSchema);