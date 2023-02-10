const express = require("express");
const router = express.Router();

const dbj = require("../libs/dbj.js");


router.get("/culda0072013", function(req, res) {
  res.render("admin");
});
// post
router.post("/buzz/remove", function(req, res) {
  let { token } = req.body;
  let msg = "";
  if (dbj.removeUser(token)) {
    msg = "User removed";
  }
  else {
    msg = "Inccorect token!"
  }
  res.send({ msg });
});

router.post("/buzz/add", function(req, res) {
  let { user } = req.body;
  let { pass } = req.body;
  let { token } = req.body;
  let msg = "";
  if (!dbj.findValue("token", token)) {
    dbj.addUser({ user, pass, token, "online": false });
    msg = "User added";
  }
  else {
    msg = "This token already exist!";
  }
  res.send({ msg });
});
router.post("/buzz/generate", function(req, res) {
  let here = true;
  let token = "";
  while (here) {
    token = gene(10);
    if (dbj.findValue("token", token)) {
      here = false;
      continue;
    }
    else {
      break;
    }
  }
  console.log(token);
  res.send({ token });
});


function gene(len) {
  let token = "";
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let x = 0; x < len; x++) {
    token += `${letters[rn(0, letters.length - 1)]}`;
  }
  return token;
}


function rn(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


//export here
module.exports = router;