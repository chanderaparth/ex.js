const express = require('express');
const server = express();   // create server;
const mongoose = require('mongoose');
const port = '5555';
const morgan = require('morgan');
const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes');
const fs = require('fs');
// const product = require('./public/products.json');
// const { listen } = require('express/lib/application');
// const { connect } = require('http2');
// const { contentType } = require('express/lib/response');

// DB connection
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/EX');
}
main().then(() => {
    console.log('DB is connected...');
}).catch((err) => {
    console.log(err);
});

// middleware
server.use(morgan('dev'))
server.use(express.json());

server.use('/api/product', productRoutes);
server.use('/api/user',userRoutes);

server.listen(port, ()=>{
    console.log(`Server start at ${port}`);
})












// 1.
// server.get('/',(req,res)=>{
    //     res.send("Hello world parth...");
    // })
    
    // server.get('/',(req,res)=>{
        //     res.send(product);
        // })
        // server.get('/product/:username',(req,res)=>{
            
            //     res.send(`Hello world from ${req.params.username}`)
            // })
            
            // 2.
// create,rade,update,delete //data 
// create products => /products
//    server.post('/products',(req,res)=>
//    {
//     product.push(req.body)
//     res.json({Message:'product is addd',product: req.body})
    // res.json(product)
//    })
  // specific products => /products/:id   
//    server.get('/product/:id',(req,res)=>{
//     // const id = +req.params.id; number valu 
//     const id = req.params.id;
//     const item = product.find((p)=>p.id===id)
//     res.status(200).json(item);
//    })


//    replace products => /products/:id 
// server.post('/',(req,res,next)=>{
//     res.json(product);
//     next();
// })
// server.patch('/product/:id',(req,res)=>
// {
//     const id = req.params.id;
//     const itemindex = product.findIndex((p)=>p.id===id)
//     product.splice(itemindex,1,{...req.body,id:id})
//     res.status(200).json({Message: "product is replace"});
// })

//    update products => /products/:id
// server.patch('/product/:id',(req,res)=>
// {
//     const id = req.params.id;
//     const itemindex = product.findIndex((p)=>p.id===id)
//     let item = product[itemindex]; 
//     product.splice(itemindex,1,{...item,...req.body})
//     res.status(200).json({Message: "product is update",product: item});
// })

// delete

// server.delete('/product/:id',(req,res)=>
// {
//     const id = req.params.id;
//     const itemindex = product.findIndex((p)=>p.id===id)
//     let item = product[itemindex];
//     product.splice(itemindex,1);
//     res.status(200).json({Message: "product is delete",product: item});
// })



