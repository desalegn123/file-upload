const express=require("express")
const authMiddleware =require("../middleware/auth-middleware")
const adminMiddleware=require("../middleware/admin-middleware")
const router=express.Router()
router.get("/welcome", authMiddleware, adminMiddleware, (req, res)=>{
    return res.json({message:"welcome to admin page"})
})
module.exports=router