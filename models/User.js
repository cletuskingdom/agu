const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: [true, "You have to enter your first name"],
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, "You have to enter your last name"],
    trim: true,
  },
  image: String,
  phone: {
    type: String,
    required: [true, "You have to enter your phone number"],
  },
  email: {
    type: String,
    required: [true, "You have to enter your email address"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  role: {
    type: String,
    required: [true, "Select your role"]
  },
  password: {
    type: String,
    required: [true, "You have to enter a password"],
    minlength: 8,
    maxlength: 16,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
        //This only works on CREATE and SAVE!!!
        validator: function(el) {
            return el === this.password
        },
        message: "Your passwords do not match"
    }
  },
});

UserSchema.pre('save', async function(next) {
    // Only run this function if passsword was modified
    if(!this.isModified('password')) return next()

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12)

    // Delete the password confirm field
    this.passwordConfirm = undefined

    next()
})

UserSchema.methods.correctPassword = async function(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword)
}

module.exports = model("User", UserSchema);
