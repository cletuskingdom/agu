const User = require('./../models/User')
const catchAsync = require('../middleware/errors/catchAsync')

exports.signIn = catchAsync(async (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Yep you hit the signIn controller",
  });
});

exports.signUp = catchAsync(async (req, res) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

exports.updatePassword = async (req, res) => {

}

exports.resetPassword = async (req, res) => {

}
