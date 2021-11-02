const express = require("express");
const { signUp, signIn } = require("../controllers/AuthenticationController");
const router = express.Router();
const { getAllUsers, updateUser, deleteUser, getUser, createUser } = require('./../controllers/UserController')

router.post('/signup', signUp)

router.post('/signin', signIn)

router.route("/")
.get(getAllUsers)
.post(createUser);

router.route("/:id").
patch(updateUser)
.delete(deleteUser)
.get(getUser);

module.exports = router;
