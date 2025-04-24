const mongoose = require("mongoose");
const blogSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },


    date: Date,
    title: {
      type: String,
      required: true,
    },
    advocateId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "advocates",
    },
    img: {
      type: Object,
    },
    
  },
  { timestamps: true }
);
module.exports = new mongoose.model("blogs", blogSchema);
