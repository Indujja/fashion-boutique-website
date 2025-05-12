const mongoose = require('mongoose');

const dressSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    imageUrl: String
});

module.exports = mongoose.model('Dress', dressSchema);