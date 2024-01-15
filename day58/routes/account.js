const express = require("express");
const router = express.Router();
const accountController = require('../controllers/account.controller');
const validate = require("../utils/validate");

router.get("/edit/:id", accountController.edit);
router.post("/edit/:id", validate.edit(), accountController.handleEdit);
router.get("/password/:id", accountController.password);
router.post("/password/:id",validate.password(), accountController.handlePassword);
router.get("/device/:id", accountController.device);
router.post("/device/:id", accountController.handleDevice);

module.exports = router