const cloudinary=require("cloudinary").v2
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    cloud_api_key:process.env.CLOUDINARY_API_KEY,
    cloud_api_secret:process.env.CLOUDINARY_API_SECRET
})
module.exports=cloudinary