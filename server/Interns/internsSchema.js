const mongoose= require("mongoose");

const adSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },



    contact:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
        dropDups: true
    },
  
    password:{
        type:String,
        required:true
    },
   
    gender:{
        type:String,
        required:true
    },

    address:{
        type:String,
        required:true
    },

    percentage:{
        type:Number,
        required:true
    },

    

    qualification:{
        type:String,
        required:true

    },
    dob:{
        type:Date,
        required:true
    },

    institute: {
        type:String,
        required:true

    },

    profilePic:{
        type:Object,
    },

    yearOfPassout:{
        type:Number,
        required:true
    },

    specialization:{
        type:String,
        required:true
    },

   

    isActive:{
        type:Boolean,
        default:true
    },

    adminApproved:{
        type:Boolean,
        default:false
    }
});
module.exports=mongoose.model('interns',adSchema)

