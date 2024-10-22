const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/usercontroller");

router.get("/", usercontroller.view);

module.exports = router;
