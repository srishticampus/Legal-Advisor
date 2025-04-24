const mongoose = require("mongoose");

const sSchema = mongoose.Schema({
    jrId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"junioradvocates"

    },
    caseId: {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'cases'
    },
    
    date: {
        type: Date,
        required: true,

    },
  isChatEnabled:{
type:Boolean,
default:false
  },
        advocateId:{
            type:mongoose.Schema.Types.ObjectId,
            default:null,
            ref:'advocates'
        },
        

});
module.exports = mongoose.model('juniorCaseReqs', sSchema)

