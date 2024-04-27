const express = require("express");
const router = express.Router();

const shoes = require("./shoes")
const category = require("./category");
const ShoesController = require("../controllers/ShoesController");
const UserController = require("../controllers/UserController");
const CategoryController = require("../controllers/CategoryController");
const errorHandler = require("../middleware/errorHandler")
const {authentication} = require("../middleware/authentication")

router.get("/", (req, res) => {
	res.json("Hello World!");
});

router.post("/login", UserController.login);
router.post("/google-login", UserController.googleLogin);
router.post("/register", UserController.register);

router.get("/pub-shoes", ShoesController.pub_findAll);
router.get("/pub-category", CategoryController.pub_findAll);

// Need authentication
router.use(authentication)

router.use("/shoes", shoes);
router.use("/category", category);

router.use(errorHandler);
module.exports = router;
