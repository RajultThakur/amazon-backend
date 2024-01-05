const router = require("express").Router();
const Address = require("../models/Address");
const fetchUser = require("../middlewear/JWTverify")
router.post("/addaddress",fetchUser,async(req,res) => {
const {name,pincode,area,flat,state,town} = req.body;
try {
    const address = new Address({
        email:req.userData.email,
        name,
        pincode,
        area,
        flat,
        state,
        town,
    })
    await address.save()
    res.json({mes:address});
} catch (error) {
    console.log(error);
}
})
router.get("/addaddress",fetchUser,async(req,res) => {
    try {
        const data = await Address.find({email:req.userData.email});
        res.json({mes:data})
    } catch (error) {
        console.log(error);
    }
})
module.exports = router;