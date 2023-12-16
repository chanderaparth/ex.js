// const product = require('../public/products.json');
const user = require('../model/user.model');
const bcrypt = require('bcrypt');

exports.Signup = async (req, res) => {
try {
const { FirstName, LastName, Email, Password, Gender } = req.body; 
let User = await user.findOne({ Email: Email, isDelete: false }); 
if (User) {
    return res.json({ message: 'User is already exist...' });
}
let hashPassword = await bcrypt.hash (Password, 10);
console.log(hashPassword);
user = await user.create({
    FirstName,LastName, Email,
    Password: hashPassword,
    Gender
});
    user.save();
    res.status(201).json({ user, message: 'User is added' });
}
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.login = async (req, res) => {
try {
const { Email, Password } = req.body;
let User = await user.findOne({ Email: Email, isDelete: false }); 
if (!User) {
    return res.json({ message: 'User is not found' });
}
let checkpassword = await bcrypt.compare (Password, User.Password);
if(!checkpassword){
    return res.json({message: 'Password is not matched'});
}
res.status(200).json(User);
} catch (error) {
console.log(error);
res.status(500).json({ message: 'Internal Server Error' });
}
};