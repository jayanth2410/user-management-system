const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/usercontroller");

//Viewing the user in the database
router.get("/", usercontroller.view);

//Adding a new user to the database
router.get("/adduser", usercontroller.adduser);
router.post("/adduser", usercontroller.createNew);

//Edit a user
router.get("/edituser/:id", usercontroller.edituser);
router.post("/edituser/:id", usercontroller.saveChanges);

//delete user
router.get("/deleteuser/:id", usercontroller.delete);
module.exports = router;
