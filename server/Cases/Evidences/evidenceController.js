
const caseSchema = require('../caseSchema');
const evidenceSchema = require('./evidenceSchema'); 

const multer = require("multer");


const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    const uniquePrefix = 'prefix-'; 
    const originalname = file.originalname;
    const extension = originalname.split('.').pop();
    const filename = uniquePrefix + originalname.substring(0, originalname.lastIndexOf('.')) + '-' + Date.now() + '.' + extension;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage }).single('file');
// Create a new status
const addEvidence = async (req, res) => {
    const caseId=req.params.id
    const caseDatas=await caseSchema.findById(caseId)

    try {
        const newStatus = new evidenceSchema({
            caseId:caseId,
            userId:caseDatas.userId,
            advocateId:caseDatas.advocateId,
            file:req.file,
            title:req.body.title,
            description:req.body.description
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



// Get a specific status by ID
const getEvidenceById = async (req, res) => {
    const { id } = req.params;

    try {
        const status = await evidenceSchema.findById(id).populate('advocateId').populate('userId');
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
const getEvidenceByCaseId = async (req, res) => {
    const { id } = req.params;

    try {
        const status = await evidenceSchema.find({caseId:req.params.id}).sort({createdAt:1}).populate('advocateId').populate('userId');;
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
    addEvidence,
    getEvidenceByCaseId,
    getEvidenceById,
    upload
    
    
};
