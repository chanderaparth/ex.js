const express = require('express');
const cartRoute = express.Router();
const {verifyToken} = require('../Halprtoken/tokenvaryfay');
const {
    addToCart,
    getallCarts,
    getCart,
    update,
    deleteCart
} = require('../controller/Cart.controller')

cartRoute.post('/addcart', verifyToken, addToCart);
cartRoute.get('/allcarts', verifyToken, getallCarts);
cartRoute.get('/getcart', verifyToken, getCart);
cartRoute.put('/update', verifyToken, update);
cartRoute.delete('/delete', verifyToken, deleteCart);



module.exports = cartRoute