const express = require("express");
const { registerUser, loginUser, getUsers } = require("../Controllers/authController");
const { protect } = require("../Middleware/authMiddleware");
const { admin } = require("../Middleware/adminMiddleware");

const router = express.Router();

router.post("/register", registerUser );
router.post("/login", loginUser )
router.get("/users",protect,admin, getUsers )


module.exports = router