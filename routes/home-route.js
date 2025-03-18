const express =require("express")
const authMiddleware =require("../middleware/auth-middleware")
const router=express.Router()
router.get("/welcome" ,authMiddleware,(req,res)=>{
    const {userName,userId, role}=req.userInfo
    res.json({message:"welcome to homepage",
    user:{
        _id:userId,
        userName,
        role
    }
})
  
   
})
module.exports=router