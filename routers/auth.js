const router = require("express").Router();
const { User } = require("../models");
const userController = require("../controllers/userController");
const verifier = require("./verifyToken");
const passport = require("passport");

//Register
router.post("/register", userController.register);

// Login
router.post("/login", userController.login);

// Get All users and specific users
router.get("/users", passport.authenticate('jwt', { session: false }), verifier("superadmin"), userController.getUsers);
router.get("/users/:userId", passport.authenticate('jwt', { session: false }), verifier("superadmin"), userController.getUser);

// PATCH -> Change password of a specific user
router.patch("/updatePassword", passport.authenticate("jwt", { session: false }), verifier("superadmin"), userController.updateUserPassword)

// Delete ALl users except superadmin and delete specific user identified by UUID
router.delete("/deleteUsers", passport.authenticate("jwt", { session: false }), verifier("superadmin"), userController.deleteAllUsers)
router.delete("/deleteUser/userId", passport.authenticate("jwt", { session: false }), verifier("superadmin"), userController.deleteUser)

module.exports = router;