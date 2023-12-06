const express = require('express');
const app = express(); 
const fs = require('fs');
const path = require('path')
const morgan = require('morgan')
const port = 8080;

// application mi.
// app.use(morgan('dev'));
// app.use(express.static('public'));
app.use(express.json());
// app.use(morgan('tiny'));

const auth = (req,res,next)=>{
    console.log(req.body)

    if(req.body.name == "parth"){
    next();
    }
    else{
        res.sendStatus(401)
    }

}

app.get('/',auth,(req,res)=>{

    res.json({ type : "Get method"})
})

// const auth = (req,res,next)=>{
//     console.log(res.query);
//     if(req.query.password == '5555'){
//           next();
//     }
//     else{
//         res.sendStatus(401)
//     }
// }
// rout mi.
// app.get('/',auth,(req,res)=>{
//     res.json({type: 'Get Mathd'})
// })

app.get('/',auth,(req,res)=>{
    res.sendFile(path.join(__dirname,'products.json'))
})
app.post('/',(req,res)=>{
    res.json({type: 'Post Name'})
})
app.put('/',(req,res)=>{
    res.json({type: 'Call Put Mathd'})
})
app.patch('/',(req,res)=>{
    res.json({type: 'patch Mathd'})
})
app.delete('/',(req,res)=>{
    res.json({type: 'Call delete Mathd'})
})

app.listen(port, ()=>{
    console.log(`Server start at ${port}`);
})