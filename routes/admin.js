const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin.js");

router.get("/dashboard", adminController.getDashboard);
router.get("/approvePost/:postId", adminController.approvePost);
router.post("/rejectPost/:postId", adminController.rejectPost);

module.exports = router;