const reviewSchema = require('./reviewSchema');

const addReview = (req, res) => {


  const complaint1 = new reviewSchema({
    advId: req.body.advId,
      userId:req.body.userId,
     
      review:req.body.review,
      date:new Date()

  });

  complaint1.save()
  .then(data=>{
    res.json({
      status:200,
      message: " added  successfully",
      data: data,
  }
  )
})
   .catch(err=>{
    console.error(err);
      res.json({
        err:err,
      status:500,
   });
  })
   
}

const viewAllreviewsByAdvId = (req, res) => {
  reviewSchema.find({advId:req.params.id})
    .populate('advId')
   
    .populate('userId')
  .exec().
    then((data) => {
      res.status(200).json({
        status:200,
        message: "reviews retrieved successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        status:500,
        message: "Error retrieving reviews",
        error: err,
      });
    });
};






module.exports = {
  addReview,
  viewAllreviewsByAdvId,

 
}
