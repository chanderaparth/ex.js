const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    FirstName:{
        type: String,
        required:true,
    },
    LastName:{
        type: String,
        required:true,
        
    },
    Email:{
        type: String,
        // required:true,
        unique: true
    },
    Password:{
        type: String,
        required:true,
    },
    Gendar:{
        type: String,
        enum: ['Male','Female'],
        // required:true,
    },

     isDelete:{
        type : Boolean,
        default : false
    }
});


module.exports = mongoose.model('user',userSchema);
