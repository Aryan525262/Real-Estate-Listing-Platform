const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config();
// { 
//   cloud_name: process.env.CLOUD_NAME , 
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET
// }
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "property_images", // Cloudinary folder
      format: async (req, file) => "jpeg", // Convert all to JPEG
      public_id: (req, file) => file.originalname.split(".")[0], // Keep original filename
    },
});
const upload = multer({ storage: storage });

module.exports = upload;