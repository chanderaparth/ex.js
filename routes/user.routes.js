const express = require('express');
const userRoutes = express.Router();
const{
    Signup,
    login
    // getproduct,
    // replaceproduct,
    // updateproduct,
    // deleteproduct
}= require('../controller/user.controller');

// create Signup -> /Signup
userRoutes.post('/Signup',Signup);

// login -> /login
userRoutes.post('/login',login);

// // specific products => /products/:id
// userRoutes.get('/:id',getproduct);

// // replace products => /products/:id 
// userRoutes.put('/:id',replaceproduct);

// // update products => /products/:id
// userRoutes.patch('/:id',updateproduct);

// // delete products => /products/:id
// userRoutes.delete('/:id',deleteproduct);

module.exports = userRoutes;