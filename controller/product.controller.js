// const product = require('../public/products.json');
const Product = require('../model/product.model');

exports.addNewproduct = async(req,res) => {
    try {
        let{title, description, price, category, brand} = req.body;
        let product = await Product.findOne({title : title})
        if (product) {
            return res.json({Message: 'product is alredy exist....'})
        }
        product = await Product.create({
            title, description, price, category, brand
        });
        product.save();
        res.json({Message: 'product is addd.',product})
    } catch (err) {
        console.log(err);
        res.status(500).json({Message: 'Internal Server errrer....'});
    }
   };
    
exports.getAllproducts =async(req,res) => {
    try {
        let products  = await Product.find();
        res.json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({Message: 'Internal Server errrer....'});
    }
   };

exports.getproduct = async(req,res)=>{
    try {
        let id = req.params.id;
        let products  = await Product.findById();
        res.json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({Message: 'Internal Server errrer....'});
    }
   };

exports.updateproduct = async(req,res)=>{
    try {
        let id = req.params.id;
        let product  = await Product.findById(id);
        if (!product) {
            return res.json({Message: 'product is not found....'})
        }
        product = await Product.findByIdAndUpdate(
            {_id: id},
            {
                $set: {...req.body}
            },
            {
                new:true
            }
        )
        product.save();
        res.json({Message: 'product is update....',product});
    } catch (err) {
        console.log(err);
        res.status(500).json({Message: 'Internal Server errrer....'});
    }
   };

exports.deleteproduct = async(req,res)=>{
    try {
        let id = req.params.id;
        let product  = await Product.findById(id);
        if (!product) {
            return res.json({Message: 'product is not found....'});
        }
        product = await Product.findByIdAndDelete({_id: id});
        res.json({Message: 'product is delete....',product});
    } catch (err) {
        console.log(err);
        res.status(500).json({Message: 'Internal Server errrer....'});
    }
   };





