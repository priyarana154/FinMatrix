const express = require("express");
const router = express.Router();
const { getDashboardOverview } = require("../controllers/overview.controllers");
const  isAuthenticatedUser  = require("../middleware/auth.middleware");

router.get("/summary",isAuthenticatedUser, getDashboardOverview);

module.exports = router;