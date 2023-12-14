const express = require('express');
const productRoutes = express.Router();
const{
    addNewproduct,
    getAllproducts,
    getproduct,
    replaceproduct,
    updateproduct,
    deleteproduct
}= require('../controller/product.controller');

// create products -> /product
productRoutes.post('/',addNewproduct);

// All product -> /products
productRoutes.get('/',getAllproducts);

// specific products => /products/:id
productRoutes.get('/:id',getproduct);

// update products => /products/:id
productRoutes.put('/:id',updateproduct);

// delete products => /products/:id
productRoutes.delete('/:id',deleteproduct);

module.exports = productRoutes;
