const productModel = require("../models/product");
const express = require('express')
const { fetchAdmin } = require("../middleware/adminAuth");
const router = express.Router();


router.post('/add-product', fetchAdmin, async (req,res)=>{
    console.log(req.body)
    let products = await productModel.find();
    let id = 0
    if(products.length>0)
    {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    } else{
        id=1;
    }
    const product = await productModel.create({
        id: id,
        name:req.body.name,
        image:req.body.imageUrl || "link is not provided", 
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    })
    console.log(product);
     await product.save()
     console.log("Product saved");
     res.json({
        success:true,
        name:req.body.name,
     })
})


// Creating API for deleting products
 router.post('/removeproduct', fetchAdmin, async (req,res)=>{
    await productModel.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name,
    })
 })

 // Creating API for getting all products
 router.get('/allproducts', async (req,res)=>{
    let products = await productModel.find(); 
    console.log("All Products fetch");
    res.send(products);
 })

module.exports = router;
