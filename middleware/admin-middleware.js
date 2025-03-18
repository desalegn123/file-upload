const isAdminUser=(req, res,next)=>{
    if(req.userInfo.role!=="admin"){
        return res.status(403).json({success:false,message:"Access deined! right Admin is requred"})
    }
    next()
}
module.exports=isAdminUser