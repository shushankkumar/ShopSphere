const port = 4000;
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/dbConnect");
const productRoutes = require("./routes/addproduct");
const memoryUpload = require("./config/multerMemory.config");
const uploadOnCloudinary = require("./config/cloudinaryConfig");
const Product = require("./models/product");

const app = express();

app.use(express.json());
app.use(cors());



//API creation
app.get("/", (req, res) => {
    res.send("Express Running")
});

app.use('/product', productRoutes)

 
      


// // image storage
// const storage = multer.diskStorage({
//     destination: './upload/images',
//     filename:(req, file, cb)=>{
//         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     }
// })

// const upload = multer({storage:storage})

// Product images upload route
app.post('/upload-image', memoryUpload.single('product'), async (req, res) => {
    try {
        const image = req.file;
        // const imageUploadedSuccessfully = await images.map(async(image)=>{
        const url = await uploadOnCloudinary(image);
        // console.log("I am calling", req.file)
        // return response;
        // })

        // const imageUrls = await Promise.all(imageUploadedSuccessfully);

        // if(imageUrls){
        // const productImages = imageUrls.map(async(image)=>{
        // await productModel.findOneAndUpdate({_id: req.params.id}, {$push: {images: image}});
        // })

        // Delete images from local storage after successful Cloudinary upload
        // await Promise.all(productImages);
        // const imagePaths = images.map(image => image.path);
        // imagePaths.forEach(imagePath => {
        //     fs.unlinkSync(imagePath);
        // });
        // }

        console.log(url)
        return res.status(200).json({
            success: 1,
            image_url: url
        })
    } catch (error) {
        return res.status(500).json({ message: "Error uploading images on cloudinary" });
    }
})

//Creating upload end point for images
app.use('/images', express.static('/upload/images'))

// app.post("/upload",upload.single('product'),(req,res)=>{
//     console.log(req.file)
//     res.json({
//         success :1,
//         image_url:`http://localhost:${port}/images/${req.file.filename}`
//         // image_url:`http://localhost:${port}/images/newimage1` 
//     // })
//     })

// })

// schema creating for user model

const Users = mongoose.model('user', {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

//creating endpoints for registering the user

app.post('/signup', async (req,res)=>{

    let check = await Users.findOne({email:req.body.email});
    if(check) {
        return res.status(400).json({success:false,errors:"existing user found with same email address"})
    }
    let cart ={};
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })
    await user.save();

    const data ={
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
})   

//creating endpoint for user login
app.post('/login', async (req,res)=>{
     let user = await Users.findOne({email:req.body.email});
     if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }
        else {
            res.json({success:false,errors:"Wrong Password"});
        }
     }
     else{
        res.json({success:false, errors:"Wrong Email Id"})
     }
})

//creating endpoints for new collection data
app.get('/newcollections', async (req,res)=>{
    try {
        const newcollection = await Product.find({})
            .sort({ id: -1 })
            .limit(8);

        console.log("New Collection Fetched");
        res.json(newcollection); 
    } catch (error) {
        console.error("Error fetching new collections:", error);
        res.status(500).json({ success: false, message: "Failed to fetch new collections" });
    }
})

//creating endpoints for popular in women section
app.get('/popularinwomen', async (req,res)=>{ 
    try {
        const popular_in_women = await Product.find({ category: "women" })
            .sort({ id: -1 })
            .limit(4);

        console.log("Popular in women Fetched");
        res.json(popular_in_women);
    } catch (error) {
        console.error("Error fetching popular in women:", error);
        res.status(500).json({ success: false, message: "Failed to fetch popular products" });
    }
})

// creating middleware for fetch user
    const fetchUser = async (req,res,next)=>{
        const token = req.header('auth-token');
    if(!token){
            return res.status(401).send({error: "Please authenticate using validate token"})
        }
        else{
            try{
                const data = jwt.verify(token,'secret_ecom');
                req.user = data.user;
                next()
            }catch(error){
                return res.status(401).send({error: "Invalid auth token"})
            }
        }
    }

//creating endpoints for adding products in cartdata
app.post('/addtocart',fetchUser, async (req,res)=>{
    console.log("added", req.body.itemId, req.body.size);
    let userData = await Users.findOne({_id:req.user.id});
    const itemId = req.body.itemId;
    const size = req.body.size;

    if (!size) {
        return res.status(400).json({ success: false, error: "Size is required" });
    }

    if (!userData.cartData[itemId] || typeof userData.cartData[itemId] !== 'object') {
        userData.cartData[itemId] = {};
    }

    userData.cartData[itemId][size] = (userData.cartData[itemId][size] || 0) + 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.json({ success: true, cartData: userData.cartData }) 
})

//creating endpoints for remove product from cartdata
app.post('/removefromcart', fetchUser, async (req,res)=>{
    console.log("removed", req.body.itemId, req.body.size);
    let userData = await Users.findOne({_id:req.user.id});
    const itemId = req.body.itemId;
    const size = req.body.size;

    if (!size) {
        return res.status(400).json({ success: false, error: "Size is required" });
    }

    if (userData.cartData[itemId] && userData.cartData[itemId][size] > 0) {
        userData.cartData[itemId][size] -= 1;

        if (userData.cartData[itemId][size] <= 0) {
            delete userData.cartData[itemId][size];
        }

        if (Object.keys(userData.cartData[itemId]).length === 0) {
            delete userData.cartData[itemId];
        }
    }

    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.json({ success: true, cartData: userData.cartData }) 
})

//creating endpoints to get cartdata
app.post('/getcart', fetchUser, async (req,res)=>{
    console.log("GetCart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

app.listen(port, (error) => {
    if (!error) {
        console.log("Server is Running : " + port)
    }
    else {
        console.log("Error : " + error)
    }
});





