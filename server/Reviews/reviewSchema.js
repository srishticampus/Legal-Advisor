const mongoose = require("mongoose");
const { Schema } = mongoose;
const rSchema = new Schema(
    {
       
        advId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "advocates"
            },
            userId:{
              type: mongoose.Schema.Types.ObjectId,
              ref: "users"
            
            },
            date:{
              type: Date,
              required: true,
            },
        
        review: {
            type: String,
            required:true

        }
      
    })
const reviews = mongoose.model("reviews", rSchema);
module.exports = reviews;