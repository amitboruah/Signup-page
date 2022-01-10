const form = require("../models/form");

exports.postCreateUser = (req, res) => {
  
  form.findOne({ email: req.body.email }, function (err, user) {
    if (user == null) {
      form
        .create(req.body)
        .then((data) =>
          res.json({
            message: "User added",
            data,
          })
        )
        .catch((err) => {
          console.log(err, "=========== err ========");
          res.status(400).json({
            message: "failed to add",
            error: err.message,
          });
        });
    }
     else {
      res.status(400).json({
        error: "Email Already Registered",
        errorCode: 255,
      });
    }
  });
};
