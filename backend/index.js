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

const app = express();

app.use(express.json());
app.use(cors());

//database  connection mongodb


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

app.listen(port, (error) => {
    if (!error) {
        console.log("Server is Running : " + port)
    }
    else {
        console.log("Error : " + error)
    }
});









