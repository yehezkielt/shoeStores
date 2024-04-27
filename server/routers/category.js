const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");
const {adminOnly} = require("../middleware/authorization")

router.get("/", CategoryController.findAll);

router.use(adminOnly);
router.post("/", CategoryController.add);
router.put("/:id", CategoryController.update);
router.delete("/:id", CategoryController.delete);

module.exports = router;
