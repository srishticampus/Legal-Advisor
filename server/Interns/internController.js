const Interns = require('./internsSchema');
const jwt = require('jsonwebtoken');
const secret = 'Interns'; 

const multer = require("multer");
const junioradvocateSchema = require('../JuniorAdvocate/junioradvocateSchema');
const advocateSchema = require('../Advocates/advocateSchema');
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

const upload = multer({ storage: storage }).single('profilePic');

// Register Junior Advocate
const registerInterns = async (req, res) => {
    console.log("file",req.file);

    try {
        const { name, contact, email, password, gender, address, percentage, qualification, dob,institute, yearOfPassout, specialization } = req.body;

        const newInterns = new Interns({
            name,
         
            contact,
            email,
            password,
            gender,
            address,
            percentage,
            qualification,
            dob,
            institute,
            yearOfPassout,
            specialization,
            profilePic:req.file
        });

        let existingInterns2 = await Interns.findOne({ contact });
        let existingInterns3 = await advocateSchema.findOne({ email });
        let existingInterns4 = await junioradvocateSchema.findOne({ email });
        let existingInterns5 = await userSchema.findOne({ email });

       if(existingInterns2) {
            return res.json({
                status: 409,
                msg: "Contact Number Already Registered With Us !!",
                data: null
            });
        }  else if(existingInterns3) {
            return res.json({
                status: 409,
                msg: "You Have Already registered as Advocate. Please Login to Continue !!",
                data: null
            });
        }  else if(existingInterns4) {
            return res.json({
                status: 409,
                msg: "You Have Already registered as Junior Advocate. Please Login to Continue !!",
                data: null
            });
        }  else if(existingInterns5) {
            return res.json({
                status: 409,
                msg: "You Have Already registered as User. Please Login to Continue !!",
                data: null
            });
        }

        await newInterns.save()
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

const viewInternss = (req, res) => {
    Interns.find({adminApproved:true})
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

// View all Interns Reqs
const viewInternsReqs = (req, res) => {
    Interns.find({adminApproved:false})
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

// approve Interns
const approveInternsById = (req, res) => {
    Interns.findByIdAndUpdate({_id:req.params.id},{adminApproved:true})
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
const rejectInternsById = (req, res) => {
    Interns.findByIdAndDelete({_id:req.params.id})
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

// Activate Interns
const activateInternsById = (req, res) => {
    Interns.findByIdAndUpdate(req.params.id, { isActive: true }, { new: true })
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

// Deactivate Interns
const deactivateInternsById = (req, res) => {
    Interns.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true })
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

// Update Interns by ID
const editInternsById = async (req, res) => {
    const { name,contact, email, password, gender, address, percentage, qualification, dob,institute, yearOfPassout, specialization } = req.body;
console.log("profilePic",req.body.filename);
    Interns.findByIdAndUpdate({ _id: req.params.id }, {
            name,
           
            contact,
            email,
            password,
            gender,
            address,
            percentage,
            qualification,
            dob,
            institute,
            yearOfPassout,
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

// View Interns by ID
const viewInternsById = (req, res) => {
    Interns.findById({ _id: req.params.id })
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

// Delete Interns by ID
const deleteInternsById = (req, res) => {
    Interns.findByIdAndUpdate({ _id: req.params.id },{isActive:'inactive'})
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

// Forgot Password for Interns
const forgotPassword = (req, res) => {
    Interns.findOneAndUpdate({ email: req.body.email }, {
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

// Reset Password for Interns
const resetPassword = async (req, res) => {
    let pwdMatch = false;

    await Interns.findById({ _id: req.params.id })
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
        await Interns.findByIdAndUpdate({ _id: req.params.id }, {
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

//Interns login
const login = (req, res) => {
    const { email, password } = req.body;

    Interns.findOne({ email }).then(user => {

        if (!user) {
            return res.json({ status: 405, msg: 'User not found' });
        }

        if (user.password != password) {
            return res.json({ status: 405, msg: 'Password Mismatch !!' });
        }
        if (user.adminApproved==false ||user.isActive==false) {            return res.json({ status: 405, msg: 'Please get Approval From Admin!!' });
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
    registerInterns,
    viewInternss,
    viewInternsReqs,
    approveInternsById,
    rejectInternsById,
    activateInternsById,
    deactivateInternsById,
    editInternsById,
    viewInternsById,
    deleteInternsById,
    forgotPassword,
    resetPassword,
    requireAuth,
    login,
    upload,
    
};
