const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
    categoryName: { type: String, required: true, unique: true },
    category: { type: String, required: true, unique: true }
}, {
    timestamps: true
});

module.exports = model('Category', categorySchema);