const User = require('./../models/User')
const catchAsync = require('./../middleware/errors/catchAsync')

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find()


  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users
    }
  });
});

exports.getUser = catchAsync(async (req, res) => {
  let id = Number(req.params.id);
  console.log(id);
  res.status(200).json({
    status: "success",
    message: "Yep you hit the getUser controller",
  });
});

exports.createUser = catchAsync(async (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Yep you hit the createUser controller",
  });
});

exports.updateUser = catchAsync(async (req, res) => {
  console.log(req)
  res.status(200).json({
    status: "success",
    message: "Yep you hit the updateUser controller",
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Yep you hit the deleteUser controller",
  });
});