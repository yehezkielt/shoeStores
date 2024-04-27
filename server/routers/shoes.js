const express = require("express");
const router = express.Router();
const ShoesController = require("../controllers/ShoesController");
const {adminOnly} = require("../middleware/authorization")
const upload = require("../middleware/upload")

router.get("/", ShoesController.findAll);
router.post("/payment/:id", ShoesController.MidtransToken);
router.get("/:id", ShoesController.findOne);

router.use(adminOnly);
router.post("/", upload.single("image"), ShoesController.add);
router.put("/:id", upload.single("image"), ShoesController.update);
router.delete("/:id", ShoesController.delete);

module.exports = router;
