const product = require('../public/products.json');
// const product = require('../model/product.model');

exports.addNewproduct = (req,res) => {
    product.push(req.body)
    res.json({Message:'product is addd',product: req.body})

   };
    
exports.getAllproducts = (req,res) => {
    res.status(201).json(product);
   };

exports.getproduct = (req,res)=>{
        // const id = +req.params.id; number valu 
        const id = req.params.id;
        const item = product.find((p)=>p.id===id)
        res.status(200).json(item);
       };

exports.replaceproduct = (req,res)=>
{
    const id = req.params.id;
    const itemindex = product.findIndex((p)=>p.id===id)
    product.splice(itemindex,1,{...req.body,id:id})
    res.status(200).json({Message: "product is replace"});
};

exports.updateproduct = (req,res)=>
{
    const id = req.params.id;
    const itemindex = product.findIndex((p)=>p.id===id)
    let item = product[itemindex]; 
    product.splice(itemindex,1,{...item,...req.body})
    res.status(200).json({Message: "product is update",product: item});
};

exports.deleteproduct = (req,res)=>
{
    const id = req.params.id;
    const itemindex = product.findIndex((p)=>p.id===id)
    let item = product[itemindex];
    product.splice(itemindex,1);
    res.status(200).json({Message: "product is delete",product: item});
};





