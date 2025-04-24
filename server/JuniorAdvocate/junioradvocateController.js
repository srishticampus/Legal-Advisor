const JuniorAdvocate = require('./junioradvocateSchema');
const jwt = require('jsonwebtoken');
const secret = 'junioradvocate'; 

const multer = require("multer");
const advocateSchema = require('../Advocates/advocateSchema');
const internsSchema = require('../Interns/internsSchema');
const userSchema = require('../User/userSchema');


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
const upload = multer({ storage: storage }).array("files", 2);

const uploadProfile = multer({ storage: storage }).single('profilePic');

// Register Junior Advocate
const registerJuniorAdvocate = async (req, res) => {
    console.log("in api",req.files);
    try {
        const { name, bcNo, bcState, contact, email, password, gender, address, percentage, nationality, qualification, dob,institute, dateOfEnrollment, specialization } = req.body;

        const newJuniorAdvocate = new JuniorAdvocate({
            name,
            bcNo,
            bcState,
            contact,
            email,
            password,
            gender,
            address,
            percentage,
            nationality,
            qualification,
            dob,
            institute,
            dateOfEnrollment,
            specialization,
            idProof:req.files[1],
            profilePic:req.files[0]
        });

        let existingJuniorAdvocate = await JuniorAdvocate.findOne({ bcNo });
        let existingJuniorAdvocate2 = await JuniorAdvocate.findOne({ contact });
        let existingJuniorAdvocate3 = await advocateSchema.findOne({ email });
        let existingJuniorAdvocate4 = await internsSchema.findOne({ email });
        let existingJuniorAdvocate5 = await userSchema.findOne({ email });

        if (existingJuniorAdvocate) {
            return res.json({
                status: 409,
                msg: "BarCouncil Enrollment Number Already Registered With Us !!",
                data: null
            });
        }
        else if(existingJuniorAdvocate2) {
            return res.json({
                status: 409,
                msg: "Contact Number Already Registered With Us !!",
                data: null
            });
        }
        else if(existingJuniorAdvocate3) {
            return res.json({
                status: 409,
                msg: "You Have Already registered as Advocate. Please Login to Continue !!",
                data: null
            });
        }
        else if(existingJuniorAdvocate4) {
            return res.json({
                status: 409,
                msg: "You Have Already registered as Intern. Please Login to Continue !!",
                data: null
            });
        }
        else if(existingJuniorAdvocate5) {
            return res.json({
                status: 409,
                msg: "You Have Already registered as User. Please Login to Continue !!",
                data: null
            });
        }
        await newJuniorAdvocate.save()
            .then(data => {
                return res.json({
                    status: 200,
                    msg: "Inserted successfully",
                    data: data
                });
            })
            .catch(err => {
                if (err.code === 11000) {
                    return res.json({
                        status: 409,
                        msg: "Email already in use",
                        data: err
                    });
                }
                return res.json({
                    status: 500,
                    msg: "Data not Inserted",
                    data: err
                });
            });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// View all  Junior advocates
const viewJuniorAdvocates = (req, res) => {
    JuniorAdvocate.find({adminApproved:true})
        .exec()
        .then(data => {
            if (data.length > 0) {
                res.json({
                    status: 200,
                    msg: "Data obtained successfully",
                    data: data
                });
            } else {
                res.json({
                    status: 200,
                    msg: "No Data obtained"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not obtained",
                Error: err
            });
        });
};

// View all Junioradvocate Reqs
const viewJuniorAdvocateReqs = (req, res) => {
    JuniorAdvocate.find({adminApproved:false})
        .exec()
        .then(data => {
            if (data.length > 0) {
                res.json({
                    status: 200,
                    msg: "Data obtained successfully",
                    data: data
                });
            } else {
                res.json({
                    status: 200,
                    msg: "No Data obtained"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not obtained",
                Error: err
            });
        });
};

// approve JuniorAdvocate
const approveJuniorAdvocateById = (req, res) => {
    JuniorAdvocate.findByIdAndUpdate({_id:req.params.id},{adminApproved:true})
        .exec()
        .then(data => {
            if (data.length > 0) {
                res.json({
                    status: 200,
                    msg: "Data obtained successfully",
                    data: data
                });
            } else {
                res.json({
                    status: 200,
                    msg: "No Data obtained"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not obtained",
                Error: err
            });
        });
};

// reject Advocate
const rejectJuniorAdvocateById = (req, res) => {
    JuniorAdvocate.findByIdAndDelete({_id:req.params.id})
        .exec()
        .then(data => {
            if (data.length > 0) {
                res.json({
                    status: 200,
                    msg: "Data Removed successfully",
                    data: data
                });
            } else {
                res.json({
                    status: 200,
                    msg: "No Data obtained"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not obtained",
                Error: err
            });
        });
};

// Activate JuniorAdvocate
const activateJuniorAdvocateById = (req, res) => {
    JuniorAdvocate.findByIdAndUpdate(req.params.id, { isActive: true }, { new: true })
        .exec()
        .then(data => {
            if (data) {
                res.json({
                    status: 200,
                    msg: "Junior Advocate activated successfully",
                    data: data
                });
            } else { 
                res.json({
                    status: 200,
                    msg: "No Data obtained"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not obtained",
                Error: err
            });
        });
};

// Deactivate JuniorAdvocate
const deactivateJuniorAdvocateById = (req, res) => {
    JuniorAdvocate.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true })
        .exec()
        .then(data => {
            if (data) { 
                res.json({
                    status: 200,
                    msg: "Junior Advocate deactivated successfully",
                    data: data
                });
            } else { 
                res.json({
                    status: 200,
                    msg: "No Data obtained"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not obtained",
                Error: err
            });
        });
};

// Update Junioradvocate by ID
const editJuniorAdvocateById = async (req, res) => {
    const { name, bcNo, bcState, contact, email, password, gender, address, percentage, nationality, qualification, dob,institute, dateOfEnrollment, specialization } = req.body;
console.log("profilePic",req.body.filename);
    JuniorAdvocate.findByIdAndUpdate({ _id: req.params.id }, {
            name,
            bcNo,
            bcState,
            contact,
            email,
            password,
            gender,
            address,
            percentage,
            nationality,
            qualification,
            dob,
            institute,
            dateOfEnrollment,
            specialization,
            profilePic:req.file
    })
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Updated successfully"
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not Updated",
                Error: err
            });
        });
};

// View junioradvocate by ID
const viewJuniorAdvocateById = (req, res) => {
    JuniorAdvocate.findById({ _id: req.params.id })
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data obtained successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            });
        });
};

// Delete junioradvocate by ID
const deleteJuniorAdvocateById = (req, res) => {
    JuniorAdvocate.findByIdAndUpdate({ _id: req.params.id },{isActive:'inactive'})
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data removed successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            });
        });
};

// Forgot Password for junioradvocate
const forgotPassword = (req, res) => {
    JuniorAdvocate.findOneAndUpdate({ email: req.body.email }, {
        password: req.body.password
    })
        .exec()
        .then(data => {
            if (data != null)
                res.json({
                    status: 200,
                    msg: "Updated successfully"
                });
            else
                res.json({
                    status: 500,
                    msg: "User Not Found"
                });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not Updated",
                Error: err
            });
        });
};

// Reset Password for junioradvocate
const resetPassword = async (req, res) => {
    let pwdMatch = false;

    await JuniorAdvocate.findById({ _id: req.params.id })
        .exec()
        .then(data => {
            if (data.password === req.body.oldpassword)
                pwdMatch = true;
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not Updated",
                Error: err
            });
        });

    if (pwdMatch) {
        await JuniorAdvocate.findByIdAndUpdate({ _id: req.params.id }, {
            password: req.body.newpassword
        })
            .exec()
            .then(data => {
                if (data != null)
                    res.json({
                        status: 200,
                        msg: "Updated successfully"
                    });
                else
                    res.json({
                        status: 500,
                        msg: "User Not Found"
                    });
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    msg: "Data not Updated",
                    Error: err
                });
            });
    } else {
        res.json({
            status: 405,
            msg: "Your Old Password doesn't match"
        });
    }
};

const createToken = (user) => {
    return jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
};

//junioradvocate login
const login = (req, res) => {
    const { email, password } = req.body;

    JuniorAdvocate.findOne({ email }).then(user => {

        if (!user) {
            return res.json({ status: 405, msg: 'User not found' });
        }

        if (user.password != password) {
            return res.json({ status: 405, msg: 'Password Mismatch !!' });
        }
        if (user.adminApproved==false ||user.isActive==false) {
            return res.json({ status: 405, msg: 'Please get Approval From Admin!!' });
        }
        const token = createToken(user);

        res.json({
            status: 200,
            data: user,
            token
        });

    }).catch(err => {
        console.log(err);
        return res.json({ status: 500, msg: 'Something went wrong' });
    })
};

// Validate
const requireAuth = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.json({ status: 401, msg: 'Unauthorized' });
    }
    jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
            return res.json({ status: 401, msg: 'Unauthorized', err: err });
        }

        req.user = decodedToken.userId;
        next();
    });
};

module.exports = {
    registerJuniorAdvocate,
    viewJuniorAdvocates,
    viewJuniorAdvocateReqs,
    approveJuniorAdvocateById,
    rejectJuniorAdvocateById,
    activateJuniorAdvocateById,
    deactivateJuniorAdvocateById,
    editJuniorAdvocateById,
    viewJuniorAdvocateById,
    deleteJuniorAdvocateById,
    forgotPassword,
    resetPassword,
    requireAuth,
    login,
    upload,
    uploadProfile
};
