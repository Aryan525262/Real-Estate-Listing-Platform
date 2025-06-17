const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Listings = require('../models/Listings');
const upload = require("../middleware/multer");
const cloudinary = require("cloudinary").v2;
//Router 1 : Create a Property using: POST "/api/listings/Properties". Login required 
router.post("/Properties", fetchuser,upload.array("images",5), [
    body("category","Enter a valid category").isLength({min:3}),
    body("title", "Enter a valid title").isLength({min:3}),
    body("description", "Enter a valid description"),
    body("price", "Enter a valid price").isNumeric(),
    body("location", "Enter a valid Location").isLength({min:3}),
    ],
    async(req,res)=>{
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const userId = req.user.id;
            const imagesUrls = req.files.map(file=>({
                    url : file.path,
                    public_id : file.filename
                })
            );
            const property = new Listings({
                userId, 
                category: req.body.category,
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                location: req.body.location,
                images: imagesUrls
            });
            await property.save();
            res.json({success: true, property});
        }catch(err){
            res.status(500).json({error: err.message});
        }
});
//Router 2 : Get all Properties using: GET "/api/listings/Properties". Login required
router.get("/getProperties", fetchuser, async(req,res)=>{
    try{
        const properties = await Listings.find({userId: req.user.id});
        res.json({success: true, properties});   
    }catch(err){
        res.status(500).json({error: err.message});
    }
})
//Router 3 : Update a Property using: PUT "/api/listings/updateProperty". Login required
router.put("/updateProperty/:id", fetchuser, async(req,res)=>{
    const {title,category, description, price, location} = req.body;
    console.log(req.body);
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const property = await Listings.findById(req.params.id);
        if(!property){
            return res.status(404).json({error: "Property not found"});
        }
        if(property.userId.toString()!== req.user.id){
            return res.status(401).json({error: "Not allowed"});
        } 
        const updatedProperty = await Listings.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.json({success: true, updatedProperty});
    }catch(err){
        res.status(500).json({error: err.message});
    }
});
//Router 4 : Update the images of Property using PUT "/api/listings/updatePropImages/:propertyId/image/:imageId". Login Required
router.put("/updatePropImages/:propertyId/image/:imageId", fetchuser, upload.single("image"), async(req, res)=>{
    const {propertyId, imageId} = req.params;
    try{
        const property = await Listings.findById(propertyId);
        if(!property){
            return res.status(404).json({error: "Property not found"});
        }
        const imageRemove = property.images.id(imageId);
        if(!imageRemove){
            return res.status(404).json({error: "Image not found"});
        }
        if(imageRemove.public_id){
            await cloudinary.uploader.destroy(imageRemove.public_id);
        }
        
        imageRemove.url = req.file.path;
        imageRemove.public_id = req.file.filename;

        await property.save();
        res.json({success: true, updatedProperty: imageRemove});

    }catch(err){
        res.status(500).json({error: err.message});
    }
});
//Router 5 : Delete a Property using: DELETE "/api/listings/deleteProperty" . Login required
router.delete("/deleteProperty/:id", fetchuser, async(req,res)=>{
    try{
        const property = await Listings.findById(req.params.id);
        if(!property){
            return res.status(404).json({error: " Property Not Found"});
        }
        if(property.userId.toString()!== req.user.id){
            return res.status(400).json({error: "Not allowed"});
        }
        const images = property.images;
        for(let i=0; i<images.length; i++){
            if(images[i].public_id){
                await cloudinary.uploader.destroy(images[i].public_id);
            }
        }
        await property.deleteOne();
        res.json({success: true, message: "Property deleted Successfully"});

    }catch(err){
        res.status(500).json({error: err.message});
    }
});
//Router 6 : Delete the specific image of a Property using: DELETE "/api/lisings/deleteProperty/:propertyId/deleteImage/:imageId" . Login required
router.delete("/deleteProperty/:propertyId/deleteImage/:imageId", fetchuser, async(req, res)=>{
    try{
        const {propertyId, imageId} = req.params;
        const property = await Listings.findById(propertyId);
        if(!property){
            return res.status(404).json({error: "Property Not Found"});
        }
        const imageRemove = property.images.id(imageId);
        if(!imageRemove){
            return res.status(404).json({error: "Image Not Found"});
        }
        if(imageRemove.public_id){
            await cloudinary.uploader.destroy(imageRemove.public_id);
        }
        imageRemove.deleteOne();
        await property.save();
        res.json({success: true, message: "Image deleted Successfully"});
    }catch(err){
        res.status(500).json({error: err.message});
    }
});
//Router 7 : Get all the Properties Posted by all the users using: GET "/api/listings/allProperties". Login Required
router.get("/allProperties", async(req,res)=>{
    try{
        const properties = await Listings.find({}).populate("userId", "name email").sort({createdAt: -1});
        res.json({success: true, properties});

    }catch(err){
        res.status(500).json({error: err.message});
    }
});
// Router 8: Get the property by the desired Location using GET: /api/listings/search?location=delhi
router.get("/search", async(req,res)=>{
    try{
        const {location} = req.query;
        if(!location){
            return res.status(400).json({error: "Location query is required"});
        }

        const properties = await Listings.find({
            location: {$regex : new RegExp(location, "i")}
    });
    res.status(200).json({success: true, properties})
    } catch(err){
        console.error(err.message)
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;