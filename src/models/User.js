const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    timestamps: true
});

// encrypta la contraseña del usuario al registrarse
userSchema.methods.encryptPasswords = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

// compara la contraseña del que intenta iniciar con la del usuario
userSchema.methods.matchPassword = async (password, user_password) => {
    return await bcrypt.compare(password, user_password);
}

module.exports = model('User', userSchema);