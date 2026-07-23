const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  getMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/menuController");

router.get("/", getMenuItems);

router.post(
  "/",
  upload.single("image"),
  addMenuItem
);

router.put(
  "/:id",
  upload.single("image"),
  updateMenuItem
);

router.delete("/:id", deleteMenuItem);

module.exports = router;