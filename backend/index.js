const port = 4000;
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());  

//database  connection mongodb
mongoose.connect("mongodb+srv://shushankkumar121_db:Shushankdb_1227@cluster0.miul6oe.mongodb.net/e-commerce")
 
//API creation
app.get("/",(req,res)=>{
    res.send("Express Running")
});


// image storage
const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

//Creating upload end point for images
app.use('/images', express.static('/upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success :1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })

})

// Schema for creating products
const products = mongoose.model("Product",{
    id :{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true, 
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    },
})

app.post('/addproduct', async (req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0)
    {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    } else{
        id=1;
    }
    const product = new product({
        id:req.body.id,
        name:req.body.name,
        image:req.body.image, 
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
     await product.save();
     console.log(Saved);
     res.json({
        success:true,
        name:req.body.name,
     })
})

// Creating API for deleting products
 app.post('/removeproduct', async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log(Removed);
    res.console({
        success:true,
        name:req.body.name,
    })
 })

 // Creating API for getting all products
 app.get('/allproducts', async (req,res)=>{
    let products = await Product.find({}); 
    console.log("All Products fetch");
    res.send(products);
 })
app.listen(port,(error)=>{
    if(!error){
        console.log("Server is Running : "+port)
    }
    else
    {
        console.log("Error : " +error)
    }
});








  
