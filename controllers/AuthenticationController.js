const jwt = require('jsonwebtoken')
const AppError = require('./../middleware/utils/AppError')
const User = require('./../models/User')
const catchAsync = require('../middleware/errors/catchAsync')

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

exports.signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body
  console.log(req.body)

  // 1) Check if the email and password exist
    if(!email || !password ) {
      return next(new AppError('Please provide email and password', 400))
    }

  // 2) Check if user exists and pasword if correct
    const user = await User.findOne({ email }).select('+password')

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect email or password", 401));
    }

  // 3) If everything is ok, send token to client
  const token = signToken(user._id);
  
  res.status(200).json({
    status: 'success',
    token
  })
});

exports.signUp = catchAsync(async (req, res) => {
  console.log(req.body)
  const newUser = await User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    image: req.body.image,
    phone: req.body.phone,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  // Generate the token used for signing in the user
  const token = signToken(newUser._id)

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.updatePassword = async (req, res) => {
  const { id } = req.body
  const user = await User.findById({ _id: id })
  console.log(user)
}

exports.resetPassword = async (req, res) => {

}
