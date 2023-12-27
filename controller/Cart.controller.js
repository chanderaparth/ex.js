const { mongoose } = require('mongoose');
const cartModel = require('../model/Cart.model');
const productModel = require('../model/product.model');

exports.addToCart = async (req,res) => {
    try{
        const {cartItem, quantity} = req.body;
        let isCart = await cartModel.findOne({cartItem: cartItem, user: req.user._id});
        if(isCart){
            return res.json("This item already in your Cart");
        }
        isCart = await cartModel.create({
            user: req.user._id,
            cartItem,
            quantity
        })
        let isProduct = await productModel.find({_id: cartItem, isDelete: false});
        if(!isProduct){
            return res.send({ message: "You don't have this Product"})
        }
        isCart.save();
        res.status(201).json({cart: isCart, message: "Card added success"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
};

exports.getallCarts = async (req,res) => {
try {
    let allcarts = await cartModel.find({user: req.user._id, isDelete: false});
    res.status(200).json(allcarts);
} catch(err){
    console.log(err);
    res.status(500).json({message: "Internal Server Error"});
}
};

exports.getCart = async(req, res)=>{
    try {
        let id = new mongoose.Types.ObjectId(req.query.cartid);
        let cartItem = await cartModel.findById(id);
        if(!cartItem)
        {
            return res.json({message: 'cart not found'});
        }
        res.status(200).json(cartItem);
    } catch(err){
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
};

exports.update = async (req,res) => {
    try{
        let {quantity, cartId} = req.body
        let cartItem = await cartModel.find({user: req.user._id, isDelete: false});
        cartItem = await cartModel.findOne({_id: cartId, isDelete: false});
        if(!cartItem){
            return res.json({message: "No Item In Your Card"});
        }
        cartItem = await cartModel.findByIdAndUpdate(
            cartId,
            {
                $set: {quantity: quantity}
            },
            {new: true}
        )
        cartItem.save();
        res.json({cartItem, message: "cart is updated"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Internal server Error"});
    }
};

exports.deleteCart = async (req,res) => {
    try{
        let {cartId} = req.body
        let cartItem = await cartModel.find({user: req.user._id, isDelete: false});
        cartItem = await cartModel.findOne({_id: cartId, isDelete: false});
        if(!cartItem){
            return res.json({message: "No Item In Your Card"});
        }
        cartItem = await cartModel.findByIdAndUpdate(
            cartId,
            {
                $set: {isDelete: true}
            },
            {new: true}
        )

        res.json({cartItem, message: "cart is deleted"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Internal server Error"});
    }
}

