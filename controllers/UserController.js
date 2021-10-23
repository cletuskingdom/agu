const catchAsync = require('./../middleware/errors/catchAsync')

exports.getAllUsers = catchAsync(async (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Yep you hit the getAllUsers controller",
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