const cart = require('../model/Cart.model');
const orderModel = require('../model/order.model');

exports.addtoorder = async(req, res) => {
    try {
        let cartItem = await cart.find({user: req.user._id, isDelete: false}).populate('cartItem');
        // console.log(cartItem);

        // let checkOrder = await orderModel.find({user: req.user._id, isDelete: false});
        // if(checkOrder){
        //     res.json({message: "you have already order this product"});
        // }
        
        let orderItem = cartItem.map((item) => ({
            cartItem: item.cartItem._id,
            quantity: item.quantity,
            price: item.cartItem.price
        }))
        // console.log(orderItem);

        let totalPrice = orderItem.reduce(((total, item) => total += (item.quantity * item.price)),0);
        // console.log(totalPrice);

        let neworder = await orderModel.create({
            user : req.user._id,
            Item : orderItem,
            totalamount : totalPrice
        })
        neworder.save();
        await cart.updateMany({user: req.user._id}, {isDelete: true});
        res.json({neworder,message:"Added to Order Successfully"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Interal Server Error"});
    }
};

exports.getAllOrder = async (req,res) => {
    try {
        let getOrder = await orderModel.find({user: req.user._id, isDelete: false});
        res.json(getOrder);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
};

exports.updateOrder = async (req,res) => {
    try {
        const {} = req.body
        let data = await orderModel.find({user: req.user._id, isDelete: false})
        if(!data){
            return res.status(401).json({message:'No Data Found'})
        }
        console.log(data);
    } catch (err) {
        console.log(err);
        res.json({message: "Internal Server Error"});
    }
};

exports.deleteOrder = async (req,res) => {
    try {
        let data = await orderModel.find({user: req.user._id, isDelete: false});
        // console.log(data);
        if(!data){
            return res.json({message: 'No Active Orders Found!'})
        }
        data = await orderModel.updateOne(
            {user: req.user._id},
            {
                $set: { isDelete: true }
            },
            { new: true }
        )

        res.json({message: "order is deleted"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
};
