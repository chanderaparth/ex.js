const express = require('express');
const userRoutes = express.Router();
const{ verifyToken } = require('../Halprtoken/tokenvaryfay');
const{
    Signup,
    login,
    getuser,
    updateuser,
    deleteuser
}= require('../controller/user.controller');

// create Signup -> /Signup
userRoutes.post('/Signup',Signup);

// login -> /login
userRoutes.post('/login',login);

// // specific user => /profile
userRoutes.get('/profile',verifyToken,getuser);

// update user => /update-profile
userRoutes.put('/update-profile',verifyToken,updateuser);

// delete user => /delete
userRoutes.delete('/delete',deleteuser);

module.exports = userRoutes;