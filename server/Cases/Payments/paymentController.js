
const caseSchema = require('../caseSchema');
const paymentSchema = require('./paymentSchema'); 
// Create a new status
const reqPayment = async (req, res) => {
    const caseId=req.params.id
    const caseDatas=await caseSchema.findById(caseId)

    try {
        const newStatus = new paymentSchema({
            caseId:caseId,
            userId:caseDatas.userId,
            advocateId:caseDatas.advocateId,
            amount:req.body.amount,
            date:new Date(),
            category:req.body.category
        });

        await newStatus.save();
        res.json({status:200,
            data:newStatus,
        msg:"requested successfully"});
    } catch (error) {
        console.log(error);
        res.json({ status:500,
            message: error.message });
    }
};

// Get all statuses
const getAllPaymentByAdvId= async (req, res) => {
    try {
        const payment = await paymentSchema.find().poopulate('advocateId').populate('userId');
        res.status(200).json(statuses);
    } catch (error) {
        res.json({status:500,message: error.message });
    }
};

// Get a specific status by ID
const getPaymentsById = async (req, res) => {
    const { id } = req.params;

    try {
        const status = await paymentSchema.findById(id).poopulate('advocateId').populate('userId');;
        if (!status) {
            return res.json({status:500,
                message: 'Status not found' });
        }
        res.json({
            status:200,
        data:status}
    );
    } catch (error) {
        res.json({status:500, message: error.message });
    }
};

// Get a specific status by ID
const receivePaymentsById = async (req, res) => {
    const { id } = req.params;

    try {
        const status = await paymentSchema.findByIdAndUpdate({_id:id},{paymentStatus:true})
        if (!status) {
            return res.json({status:500,
                message: 'Status not found' });
        }
        res.json({
            status:200,
        data:status,
    msg:"updated successfully"}
    );
    } catch (error) {
        res.json({status:500, message: error.message });
    }
};

// Get a specific status by ID
const getPaymentsByCaseId = async (req, res) => {
    const { id } = req.params;

    try {
        const status = await paymentSchema.find({caseId:req.params.id}).sort({createdAt:1}).populate('advocateId').populate('userId');;
        if (!status) {
            return res.json({status:500,
                message: 'Status not found' });
        }
        res.json({
            status:200,
        data:status}
    );
    } catch (error) {
        res.json({status:500, message: error.message });
    }
};
module.exports = {
    reqPayment,
    getAllPaymentByAdvId,
    getPaymentsByCaseId,
    getPaymentsById,
    receivePaymentsById
    
};
