 const router = require('express').Router()
const fetchUser = require('../middlewear/JWTverify');
 const Post = require('../models/post');

 router.post('/createpost',fetchUser, async(req,res) => {
     const {title,caption,post} = req.body;
     
    try {
        success = false;
        
        if(!post) return res.status(422).json({success,mes:"post not available"})

        const postModel = new Post({
            title,
            caption,
            post,
            name:req.userData.name,
            email:req.userData.email
        })
        await postModel.save();
        return res.json({success:true,mes:postModel});

    } catch (error) {
        console.log(error);
        return res.json({error});
        
    }
 })



 module.exports = router;