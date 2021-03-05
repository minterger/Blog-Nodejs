const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    timestamps: true
});

userSchema.methods.matchPasswords = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

userSchema.methods.coparePasswords = async function (password) {
    return await bcrypt.compare(this.password, password)
}

module.exports = model('User', userSchema);