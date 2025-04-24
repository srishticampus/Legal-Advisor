const mongoose = require("mongoose");

const sSchema = mongoose.Schema({
    internId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"interns"

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
module.exports = mongoose.model('resourceReqs', sSchema)

