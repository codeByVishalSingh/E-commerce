const express = require("express");
const { protect } = require("../Middleware/authMiddleware");
const { admin } = require("../Middleware/adminMiddleware");
const { getOrder, updateOrderStatus, addOrderItems, getMyOrders } = require("../Controllers/orderController");



const router = express.Router();
router.route("/").post(protect,  addOrderItems).get(protect,admin, getOrder)
router.route("/myorders").get(protect, getMyOrders)
router.route("/:id/status").put(protect,admin,updateOrderStatus)



            
module.exports = router;