const mongoose = require("mongoose");

const statusSchema = mongoose.Schema({
    caseId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'cases'

    },
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"users"
    },
    
        advocateId:{
            type:mongoose.Schema.Types.ObjectId,
            default:null,
            ref:'advocates'

        },
        file:{
            type:Object,
            required: true,
        },
        title:{
            type:String,
            required: true,
        }, 
     
        description:{
            type:String
            
        }

},
{ timestamps: true });
module.exports = mongoose.model('evidences', statusSchema)

