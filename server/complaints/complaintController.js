const complaint = require('./complaintSchema');

const addcomplaint = (req, res) => {


  const complaint1 = new complaint({
    advId: req.body.advId,
      userId:req.body.userId,
      internId:req.body.internId,
      jrId:req.body.jrId,
      complaint:req.body.complaint,
      date:new Date()

  });

  complaint1.save()
  .then(data=>{
    res.json({
      status:200,
      message: "complaint added  successfully",
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

const viewAllcomplaints = (req, res) => {
  complaint.find()
    .populate('advId')
    .populate('internId')
    .populate('jrId')
    .populate('userId')
  .exec().
    then((complaints) => {
      res.status(200).json({
        status:200,
        message: "complaints retrieved successfully",
        data: complaints,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        status:500,
        message: "Error retrieving complaints",
        error: err,
      });
    });
};


const deletecomplaintById = (req, res) => {
  complaint.findByIdAndDelete({ _id: req.params.id })
    .exec().
    then((complaints) => {
      res.json({
        status:200,
        message: "complaints deleted successfully",
        data: complaints,
      });
    })
    .catch((err) => {
      console.error(err);
      res.json({
        status:500,
        message: "Error retrieving complaints",
        error: err,
      });
    });
};


const viewcomplaintById = (req, res) => {
  complaint.findById({ _id: req.params.id })
    .exec().
    then((complaints) => {
      res.json({
        status:200,
        message: "complaints deleted successfully",
        data: complaints,
      });
    })
    .catch((err) => {
      console.error(err);
      res.json({
        status:500,
        message: "Error retrieving complaints",
        error: err,
      });
    });
};




module.exports = {
  addcomplaint,
  viewAllcomplaints,
  viewcomplaintById,
  deletecomplaintById,
 
}
