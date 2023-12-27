const express = require('express');
const authRouthes = express.Router();
const { upload } = require('../Halprtoken/imageupload');
const auth = require('../model/auth.model');

authRouthes.post('/image',upload.single('ProfileImage'),async(req,res)=>
{
    // console.log(req.file);
    if (req.file) {
        req.body.ProfileImage = `${req.file.path.replace(/\\/g,'/')}`
    }
    let newauth = await auth.create({
        ...req.body,
    });
    newauth.save();
    res.json({auth: newauth});
});

authRouthes.post('/images',upload.array('ProfileImage'),async(req,res)=>
{
    // console.log(req.file);
    let image = []
    if (req.files) {

        for(let i=0 ; i < req.files.length ;i++){
            image[i] = `${req.files[i].path.replace(/\\/g,'/')}`
        }
    }
    let newauth = await auth.create({
        ...req.body,
     ProfileImage :image
    });
    newauth.save();
    res.json({auth: newauth});
});

module.exports = authRouthes;
