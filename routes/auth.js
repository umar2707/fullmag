const router = require("express").Router();
const User = require("../models/User")
const CryptoJs = require('crypto-js')
const jwt = require("jsonwebtoken")

//registr 
router.post("/register", async (req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
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
  try{
    const user = await User.findOne({username:req.body.username});
    !user && res.status(401).json("Username Xato!") 
    const hashedPassword = CryptoJs.AES.decrypt(
        user.password, 
        process.env.SECRET_KEY
    );
    const originalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);
    const inputPassword = req.body.password;
    originalPassword != inputPassword && 
     res.status(401).json("Parol Xato!");
        const accesToken = jwt.sign({
            id:user._id, 
            isAdmin: user.isAdmin,
        }, process.env.JWT_SEC,{expiresIn:"3d"})

        const {password, ...others} = user._doc;

    res.status(200).json({...others, accesToken})
  }catch(err){
    res.status(500).json(err)
  }
})

module.exports = router;