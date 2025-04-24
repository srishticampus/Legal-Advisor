const AppointmentReq = require('./juniorAdvReqSchema');

// Controller function to create a new appointment request
const createAppointment = async (req, res) => {
  const { jrId,advocateId } = req.body;
  let flag=0
  await AppointmentReq.findOne({advocateId:advocateId,jrId:jrId}).then(data=>{
    console.log(data);
    if(data!=null)
    flag=1
   })
let date=new Date()
 
    const newAppointment = new AppointmentReq({
      jrId: jrId,
      advocateId:advocateId,
      date:date,
    
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
    msg: 'You have already send mentorship request to this Advocate'
  });
}
};

// Controller function to get all appointment requests
const getAppointmentReqsForAdv = async (req, res) => {
  try {
    const appointments = await AppointmentReq.find({advocateId:req.params.id,status:'pending'}).populate('jrId').populate('advocateId');
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
const getApprovedAppointmentsForAdv = async (req, res) => {
  try {
    const appointments = await AppointmentReq.find({advocateId:req.params.id,status:'accepted'}).populate('jrId');
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
const getApprovedMentorForJuniors = async (req, res) => {
  try {
    const appointments = await AppointmentReq.findOne({jrId:req.params.id,status:'accepted'}).populate('advocateId');
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
const getAppointmentReqsByjrId = async (req, res) => {
    try {
      const appointments = await AppointmentReq.find({jrId:req.params.id}).populate('advocateId');
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
// Controller function to update an appointment request
const acceptReqbyAdv = async (req, res) => {


  try {
   
    const appointment = await AppointmentReq.findByIdAndUpdate({_id:req.params.id},{
      status:'accepted'}
    )
   
    if (!appointment) {
      return res.status(404).json({
        status: 404,
        msg: 'Appointment request not found'
      });
    }
  
    res.json({
      status: 200,
      msg: 'Appointment request updated successfully',
      data: appointment
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      msg: 'Failed to update appointment request',
      error: err.message
    });
  }
};

const rejectReqbyAdv = async (req, res) => {
    try {
      const appointment = await AppointmentReq.findByIdAndUpdate({_id:req.params.id},{
        status:'rejected'}
      )
  
      if (!appointment) {
        return res.status(404).json({
          status: 404,
          msg: 'Appointment request not found'
        });
      }
  
      res.json({
        status: 200,
        msg: 'Appointment request updated successfully',
        data: appointment
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: 'Failed to update appointment request',
        error: err.message
      });
    }
  };

// Controller function to get all appointment requests
const getAppointmentReqsById = async (req, res) => {
    try {
      const appointments = await AppointmentReq.findById({_id:req.params.id}).populate('jrId').populate('advocateId');
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
  createAppointment,
  getAppointmentReqsForAdv,
  getAppointmentReqsByjrId,
  acceptReqbyAdv,
rejectReqbyAdv,
getAppointmentReqsById,
getApprovedAppointmentsForAdv,
getApprovedMentorForJuniors
};
