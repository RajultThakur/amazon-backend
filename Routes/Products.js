const router = require('express').Router();
const Product = require('../models/Product');
const fetchUser = require('../middlewear/JWTverify');

router.post('/addtocart',fetchUser,async(req,res) => {
    const {title,price,url}=req.body
    try {
        if(!url || !title||!price) 
          return res.status(422).json({sucess:false,mes:'all fiels required'})
        
        const duplicatProduct = await Product.findOne({email:req.userData.email,url});

        if(duplicatProduct){
            if(duplicatProduct.count===5){
                return res.status(201).json({mes:"limitOver"})
            }
            let count = duplicatProduct.count+1;
            const data = await Product.updateOne({email:req.userData.email,url},{$set:{count:count}});
            return res.status(201).json({sucess:'updated',mes:{url:duplicatProduct.url,price:duplicatProduct.price,count:count}});
        }

        const product = new Product({
            email:req.userData.email,
            url,
            title,
            price
        });
        const data = await product.save();
        return res.json({sucess:true,mes:data})
    } catch (error) {
        console.log(error)
        return res.status(404).json({error});
    }
})

router.get('/addtocart',fetchUser,async(req,res) => {
    try {
        const add_to_cart_product = await Product.find({email:req.userData.email})
        const data = Object.values(add_to_cart_product)
        let total = 0,totalProduct = 0;
        for(let i=0;i<data.length;i++){
            totalProduct+=data[i].count;
            total+=(data[i].count*data[i].price);
        }
        console.log(total);
        return res.status(201).json({success:true,mes:add_to_cart_product,total,totalProduct});
        
    } catch (error) {
        console.log(error);
        return res.json({error});
        
    }
})

router.delete("/addtocart",fetchUser,async(req,res) =>{ 
    const {url} = req.body;
    try {
        const product = await Product.findOneAndRemove({email:req.userData.email,url});
        console.log(product);
        if(product){
            const data = await Product.find({email:req.userData.email})
            return res.json({success:true,mes:data,info:product.count * product.price})
        }
        else{
            return res.json({success:true,mes:[]})

        }

        // return res.json({success:true,mes:product})
    } catch (error) {
        console.log(error)
        return res.json({error});        
    }
})

router.post("/removeone",fetchUser,async(req,res) => {
    const {url} = req.body;
    try {
        const duplicatProduct = await Product.findOne({email:req.userData.email,url});
        let count = duplicatProduct.count;
        let price = duplicatProduct.price -( duplicatProduct.price/count);
        if(count === 1){
            await Product.deleteOne({email:req.userData.email,url:url});
            return res.json({mes:'deleted'})
        }else{
            const data = await Product.updateOne({email:req.userData.email,url},{$set:{count:count-1}});
            return res.status(201).json({sucess:'updated'});
        }
        
    } catch (error) {
        console.log(error)
        return res.json(error);
        
    }
})

module.exports = router