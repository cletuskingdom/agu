const express = require("express");
const { signUp, signIn, updatePassword } = require("../controllers/AuthenticationController");
const router = express.Router();
const { getAllUsers, updateUser, deleteUser, getUser, createUser } = require('./../controllers/UserController')

/**
 * @swagger 
 * /api/v1/users/signup:
 *   post:
 *     tag: user signup
 *     description: Enter your name,email,password,confirmPassword
 *     parameters: 
 *       - in :  body
 *         name: userdetails
 *         type: string
 *     responses:
 *       200:
 *         description:    Success
 */

router.post('/signup', signUp)

/**
 * @swagger 
 * /api/v1/users/signin:
 *   post:
 *     description: user login with email and password
 *     parameters: 
 *       - in :  body
 *         name: userdata
 *         type: string
 *     responses:
 *       200:
 *         description:    Login
 */

router.post('/signin', signIn)

router.route("/")
.get(getAllUsers)
.post(createUser);

router.route("/:id").
patch(updateUser)
.delete(deleteUser)
.get(getUser);

module.exports = router;
