let express = require('express');
let router = express.Router();
let OrderContract = require('../controller/OrderContract');
router.post("/add", OrderContract.createOrder);
router.get("/getById", OrderContract.getOrderDetailsById);
router.get("/getAll", OrderContract.getOrderDetails);
router.put("/update", OrderContract.updateOrderDetails);
router.delete("/delete", OrderContract.deleteOrderDetails);

module.exports = router;