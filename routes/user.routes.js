const express = require('express');
const userRoutes = express.Router();
const{
    addNewproduct,
    getAllproducts,
    getproduct,
    replaceproduct,
    updateproduct,
    deleteproduct
}= require('../controller/user.controller');

// create products -> /product
userRoutes.post('/',addNewproduct);

// All product -> /products
userRoutes.get('/',getAllproducts);

// specific products => /products/:id
userRoutes.get('/:id',getproduct);

// replace products => /products/:id 
userRoutes.put('/:id',replaceproduct);

// update products => /products/:id
userRoutes.patch('/:id',updateproduct);

// delete products => /products/:id
userRoutes.delete('/:id',deleteproduct);

module.exports = userRoutes;