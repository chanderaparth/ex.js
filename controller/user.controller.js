// const product = require('../public/products.json');
const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.Signup = async (req, res) => {
try {
const { FirstName, LastName, Email, Password, Gender } = req.body; 
let user = await User.findOne({ Email: Email, isDelete: false }); 
if (user) {
    return res.json({ message: 'User is already exist...' });
}
let hashPassword = await bcrypt.hash (Password, 10);
console.log(hashPassword);
user = await User.create({
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
let user = await User.findOne({ Email: Email, isDelete: false }); 
if (!user) {
    return res.json({ message: 'User is not found' });
}
let checkPassword = await bcrypt.compare(Password, user.Password);
if(!checkPassword){
    return res.json({message: 'Password is not matched'});
}
let payload = {
    userid : user._id
}
let token = jwt.sign(payload,process.env.SECRET_KEY); //{expiresin: "10 min"}
// console.log(token);
res.status(200).json({token, message : 'login sucess'});
}
catch (error) {
console.log(error);

res.status(500).json({ message: 'Internal Server Error' });
}
};

exports.getuser = async(req, res) => { 
    try{
        // console.log(req.user);
        res.json(req.user);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal Server Errorr'});
    }
};

exports.updateuser = async (req, res) => {
    try {
     let user = await User.findByIdAndUpdate(req.user._id,{ $set: { ...req.body }},{new: true})
      res.status(200).json({ user , Message: "User is update...." });
    } catch (err) {
      console.log(err);
      res.status(500).json({ Message: "Internal Server errrer...." });
    }
  };
  exports.chagePassword = async (req,res) => {
    const { currentPassword, newPassword, confamePassword} = req.body;
  
    let checkPassword = await bcrypt.compare(currentPassword, req.user.Password);
    if(!checkPassword){
        return res.json({message:"your Password is wrong."})
    }
    if(newPassword !== confamePassword){
        return res.json({message:"Your new password and confirm password are different."})
    }
    let hashedPassword = await bcrypt.hash(confamePassword, 10);
    let user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {"Password": hashedPassword}
        },
        {new: true}
    )
  
    res.json({user, message: "successfully change the password"});
  }
  
  exports.deleteuser = async (req, res) => {
    try {
      let id = req.params.id;
      let user = await User.findById(id);
      if (!user) {
        return res.json({ Message: "User is not found...." });
      }
  
      user = await User.findByIdAndDelete({ _id: id }); // deleteUser
      res.json({user, Message: "User is delete...." });
      // res.json({ Message: "User is delete...." });
    } catch (err) {
      console.log(err);
      res.status(500).json({ Message: "Internal Server errrer...." });
    }
  };

