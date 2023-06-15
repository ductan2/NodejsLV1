const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("pages/dashboard/index", { title: "dashboard page" });
});

module.exports = router;
