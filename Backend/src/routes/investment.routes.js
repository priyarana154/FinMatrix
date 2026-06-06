const express = require("express");
const router = express.Router();
const {
  addInvestment,
  getInvestments,
} = require("../controllers/investment.controllers");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/add", authMiddleware, addInvestment);
router.get("/all", authMiddleware, getInvestments);

module.exports = router;
