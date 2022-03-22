const router = require("express").Router();
const User = require("../models/User")
const CryptoJs = require("crypto-js")
//registr 
router.post("/register", async (req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJs.AES.encrypt(
            req.body.password, 
            process.env.SECRET_KEY)
            .toString(),
    })
    try{
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
    
})

// login
router.post("/login", async(req,res)=>{
    
})

module.exports = router;