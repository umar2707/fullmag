const router = require("express").Router();

router.get('/usertest',(req,res)=>{
    res.send("use test is succesfull")
})

module.exports = router;