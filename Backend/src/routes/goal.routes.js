const express = require("express");
const router = express.Router();
const {
  createGoal,
  getAllGoals,
  updateGoalProgress,
} = require("../controllers/goal.controllers");
const verifyToken = require("../middleware/auth.middleware");


router.post("/create", verifyToken, createGoal);

router.get("/all", verifyToken, getAllGoals);
router.put("/update/:id", verifyToken, updateGoalProgress);
module.exports = router;
