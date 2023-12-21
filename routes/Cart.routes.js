const express = require('express');
const cartRoute = express.Router();
const {verifyToken} = require('../Halprtoken/tokenvaryfay');
const {
    addToCart
} = require('../controller/Cart.controller')

cartRoute.post('/add-cart', verifyToken, addToCart);

module.exports = cartRoute