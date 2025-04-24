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
        amount:{
            type:Number,
            required: true,
        },
        date:{
            type:Date,
        }, 
        category:{
            type:String
        },
        paymentStatus:{
            type:Boolean,
            default:false,
            
        }

},
{ timestamps: true });
module.exports = mongoose.model('payments', statusSchema)

