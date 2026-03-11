const express = require("express");
const { getMethod, PostMethod } = require("./crud");
const router = express.Router();

router.get("/get", getMethod);
router.post("/Post", PostMethod);

module.exports = router;
