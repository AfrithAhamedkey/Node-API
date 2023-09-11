const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Product = require('./models/productModel')

const PORT = process.env.PORT || 3000

app.use(express.json())

app.get('/products', async (req,res)=>{
    try{
    const products = await Product.find({})
    res.status(200).json(products)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

app.get('/product/:id', async (req,res)=>{
    try{
    const {id}= req.params
    const product = await Product.findById(id)
    res.status(200).json(product)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

      //Update a product
app.put('/product/:id', async (req,res)=>{
    try{
    const {id}= req.params
    const product = await Product.findByIdAndUpdate(id,req.body)
    if(!product){
        res.status(404).json({message:`There is not a pruduct in this id ${id}`})
    }
    const updatedProduct = await Product.findById(id)
    res.status(200).json(updatedProduct)

    }catch(err){
        res.status(400).json({message:err.message})
    }
})

//Delete a Product

app.delete('/product/:id', async (req,res)=>{
    try{
    const {id}= req.params
    const product = await Product.findByIdAndDelete(id)
    if(!product){
        res.status(404).json({message:`Cannot find a pruduct in this id ${id}`})
    }
     
     res.status(200).json(product)

    }catch(err){
        res.status(400).json({message:err.message})
    }
})

app.get('/',(req,res)=>{
    res.send("Hello Node API")
})

app.get('/about',(req,res)=>{
    req.send("About Route")
})


app.post('/product',async (req,res)=>{
    try{

        const product = await Product.create(req.body)
        res.status(200).json(product)

    }catch(err){
        console.log(err)
        res.status(500).json({message:err.message})
    }
})


mongoose.connect('mongodb+srv://afrithniyas:gRH48bbrsY4jejGy@nodeapi.ct1vtwn.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(()=>{
    console.log("Connected to Data Base")
    app.listen(PORT ,()=>{
        console.log(`API running in port :${PORT}`)
    })
}).catch((err)=>{
    console.log(err)
})
