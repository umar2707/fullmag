const jwt = require("jsonwebtoken")

const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SEC, (err, user)=>{
            if(err) res.status(403).json("Login yoki parol xato kiritildi")
            req.user = user;
            next()
        });
    }else{
        return res.status(401).json("Siz autentifikatsiyadan o'tmagansiz")
    }
}

const verifyTokenAndAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            res.status(403).json("Sizga malumotlarga kirish uchun huquq yo'q")
        }
    })
}

const verifyTokenAndAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).json("Sizga malumotlarga kirish uchun huquq yo'q")
        }
    })
}

module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin}