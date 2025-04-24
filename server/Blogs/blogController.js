const blogSchema = require("./blogSchema");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single('img');

const addBlog = (req, res) => {
  const newBlog = new blogSchema({
   title: req.body.title,
    content: req.body.content,
    advocateId: req.params.id,
    date:new Date(),
    img: req.file,
  });
  newBlog
    .save()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Inserted successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err.stack,
      });
    });
};

//View   blogs by  id

const viewBlogsById = (req, res) => {
  blogSchema
    .findById({ _id: req.params.id })
    .populate("advocateId")
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};
//View  all blogs

const viewAllBlogs = (req, res) => {
  blogSchema
    .find({})
    .populate("advocateId")
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

//View   blogs by RP id

const viewMyBlogsByadvocateId = (req, res) => {
  blogSchema
    .find({ advocateId: req.params.id })
   
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

//View   blogs by  id

const deleteBlogsById = (req, res) => {
  blogSchema
    .findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Data deleted successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

//View   blogs by  id

const editBlogsById = (req, res) => {
  blogSchema
    .findByIdAndUpdate({ _id: req.params.id },{
      title: req.body.title,
      content: req.body.content,
      
      img: req.file,
    })
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Data deleted successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

module.exports = {
  addBlog,
  upload,
  viewAllBlogs,
  viewBlogsById,
viewMyBlogsByadvocateId,
    deleteBlogsById,
    editBlogsById
};
