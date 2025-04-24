const mongoose = require("mongoose");

const appSchema = mongoose.Schema({
    jrId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"junioradvocates"

    },
  
    
    date: {
        type: Date,
        required: true,

    },
    status: {
        type: String,
default:'pending'
    },
        advocateId:{
            type:mongoose.Schema.Types.ObjectId,
            default:null,
            ref:'advocates'
        }

});
module.exports = mongoose.model('jradvMentorshipReqs', appSchema)

