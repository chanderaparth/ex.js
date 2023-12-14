const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        unique: true
    },
     description: String,
     price: Number,
     category: [String],
     brand: String 
});

module.exports = mongoose.model('products',productSchema);
