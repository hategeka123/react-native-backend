const express = require("express");
const router = express.Router();
const auth = require("../middlewares/adminAuth");
const AppError = require("../controllers/errorController");
const adminController = require("../controllers/adminController");
const sellerController = require("../controllers/sellerController")
/**
 * PRIVATE ROUTES [Authorization required]
 */
router.post("/upload-product", sellerController.addFood);

// router.post("/add-food/:id", adminController.addFood);

// router.get("/view-restaurants", adminController.viewAllRestaurant);
// router.get("/all-users", auth, adminController.getAllUsers);
// router.get("/all-users/:id",auth, adminController.singleUser);
// router.patch("/all-users/:id",auth, adminController.addSeller);
// router.delete("/user/:id", auth, adminController.deleteUser);

router.use(AppError.onInvalidEndpoint);

module.exports = router;