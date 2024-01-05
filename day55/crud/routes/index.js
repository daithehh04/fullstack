var express = require("express");
var router = express.Router();
const homeController = require("../controllers/home.controller");

/* GET home page. */
router.get("/", homeController.index);
router.get("/add", homeController.add);
router.post("/add", homeController.handleAdd);
router.get("/update/:id", homeController.update);
router.post("/update/:id", homeController.handleUpdate);
router.post("/delete/:id", homeController.handleDelete);

module.exports = router;
