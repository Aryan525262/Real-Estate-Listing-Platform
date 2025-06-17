const mongoose = require('mongoose');
const {Schema} = mongoose;
const ListingsSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    category:{
        type: String,
        required: [true, "Please enter the category"]
    },
    title : {
        type:String, 
        required: [true, "Please enter the title"]
    },
    description:{
        type:String
    },
    price:{
        type:Number,
        required: [true, "Please enter the price"]
    },
    location:{
        type: String,
        required: true
    },
    images:[
        {
            url: String,
            public_id: String
        }
    ],
    createdAt: {
        type: Date, 
        default: Date.now
    }
})
module.exports = mongoose.model("Listings", ListingsSchema);