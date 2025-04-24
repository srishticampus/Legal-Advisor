const caseSchema = require('../../Cases/caseSchema');
const AppointmentReq = require('./caseReqSchema');

// Controller function to create a new appointment request
const assignCaseforJr = async (req, res) => {
  const { jrId, caseId} = req.body;
  let flag=0,advocateId=null
  await caseSchema.findById({_id:caseId}).then(data=>{
   advocateId=data.advocateId
  })
  await AppointmentReq.findOne({jrId:jrId,caseId:caseId}).then(data=>{
    console.log(data);
    if(data!=null)
    flag=1
   })
   
   console.log("fa",flag);
let date=new Date()
 
    const newAppointment = new AppointmentReq({
      jrId: jrId,
      caseId: caseId,
      advocateId:advocateId,
      date:date,
      isChatEnabled:req.body.isChatEnabled
    
    });
if(flag==0){
    const savedAppointment = await newAppointment.save().then(savedAppointment=>{

    
    res.json({
      status: 200,
      msg: 'Appointment request created successfully',
      data: savedAppointment
    });
  }).catch (err=> {
    res.json({
      status: 500,
      msg: 'Failed to create appointment request',
      error: err.message
    });
  })
}
else{
  res.json({
    status: 500,
    msg: 'You have already send request to this Advocate'
  });
}
};

// Controller function to get all appointment requests
const getCasesAssignedForJrId = async (req, res) => {
  try {
    const appointments = await AppointmentReq.find({jrId:req.params.id}).populate('jrId').populate('caseId');
    res.status(200).json({
      status: 200,
      msg: 'Appointments retrieved successfully',
      data: appointments
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      msg: 'Failed to retrieve appointments',
      error: err.message
    });
  }
};


// Controller function to get all appointment requests
const getAssignedCaseReqsById = async (req, res) => {
    try {
      const appointments = await AppointmentReq.findById({_id:req.params.id}).populate('jrId').populate('caseId').populate('advocateId');
      res.status(200).json({
        status: 200,
        msg: 'Appointments retrieved successfully',
        data: appointments
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: 'Failed to retrieve appointments',
        error: err.message
      });
    }
  };


module.exports = {
  assignCaseforJr,
  getAssignedCaseReqsById,
  getCasesAssignedForJrId
  
};
