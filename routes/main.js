const express = require("express");
const router = express.Router();


router.get("/", function(req, res) {
  res.render("main");
});


//export here
module.exports = router;