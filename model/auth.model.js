const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
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
    ProfileImage:[{
        type: String
    }],
    Gender:{
        type: String,
        enum: ['Male','Female']
        // required:true,
    },

     isDelete:{
        type : Boolean,
        default : false
    }
});


module.exports = mongoose.model('auth',authSchema);
