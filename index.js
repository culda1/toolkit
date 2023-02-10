require('dotenv').config();
const path = require("path");
const express = require("express");
const axios = require("axios");
const requestIp = require("request-ip");
var session = require('express-session');
const fs = require("fs");
const dbj = require("./libs/dbj.js");



const app = express();
const http = require('http').Server(app);
const io = require("socket.io")(http);



// PORT:
const PORT = process.env.PORT || 4444

//use:
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false, limit: "200mb" }));
app.use(express.json({ limit: "200mb" }));

//Set Request Size Limit




//set:
app.set('view engine', 'ejs');

let check = require("./routes/check.js");
let gen = require("./routes/gen.js");
let main = require("./routes/main.js");
let admin = require("./routes/admin.js");



app.use("/check", loged, check);
app.use("/gen", loged, gen);
app.use("/dashboard", loged, main);
app.use("/", admin);

// get
app.get("/", logout, function(req, res) {
  res.render("index");
});
// post
app.post("/logout", function(req, res) {
  dbj.changeValue(req.session.client.user, "online", false);
  req.session.client = undefined;
  res.send({ link: "/" });
});
// mid
// app.use((req,res,next)=>{
//     if(req.session.client == undefined){
//       return res.redirect("/");
//     }
// });
function loged(req, res, next) {
  if (req.session.client == undefined) {
    return res.redirect("/");
  }
  next();
}
function logout(req, res, next) {
  if (req.session.client != undefined) {
    return res.redirect("/dashboard");
  }
  next();
}

// post
app.post("/login", function(req, res) {
  let info = checkUser(req.body);
  req.session.client = info.user;
  console.log(info);
  let ok = false;
  let online = false;
  if (info.ok && !info.user.online) {
    dbj.changeValue(req.session.client.user, "online", true)
    ok = true;
  }
  else {
    if (info.user != null) {
      online = info.user.online;
      ok = false;
    }
    else {
      ok = false;
    }

  }

  res.send({ ok, online });

});


function checkUser(data) {
  let msg = { "ok": false, "user": null };
  let users = dbj.getUsers();
  for (let i = 0; i < users.length; i++) {
    if (data.user == users[i].user && data.pass == users[i].pass && data.token == users[i].token) {
      msg["ok"] = true;
      msg["user"] = users[i];
      break;
    }
  }
  return msg;
}

async function checkNumber(number, cari) {
  let response = await axios({
    method: 'get',
    url: `https://api.telnyx.com/anonymous/v2/number_lookup/${number}`,
    headers: {
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
    }
  });
  let info = response.data.data;
  let new_info = {};
  if (cari == "") {
    if (info.valid_number && info.carrier.type == "mobile" && info.carrier.name != "") {
      new_info = {
        number,
        carrier: info.carrier.name,
        type: info.carrier.type,
        active: info.valid_number
      };
    }
    else {
      new_info = {
        number,
        carrier: info.carrier.name,
        type: info.carrier.type,
        active: false
      };
    }
  }
  else {
    if (info.valid_number && info.carrier.type == "mobile" && info.carrier.name == cari) {
      new_info = {
        number,
        carrier: info.carrier.name,
        type: info.carrier.type,
        active: info.valid_number
      };
    }
    else {
      new_info = {
        number,
        carrier: info.carrier.name,
        type: info.carrier.type,
        active: false
      };
    }
  }
  return new_info;
}

function cleanNumbers(data) {
  let phone_numbers = data.match(/^\+\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4}/gm);
  return phone_numbers;
}

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
  console.log('A user connected');
  socket.on("checknum", async function(data) {
    let nums = cleanNumbers(data.numbers);
    let info = "";
    let new_data = { "numbers": [], "valid": 0, "invalid": 0 }
    if(nums != null){
      for (let i = 0; i < nums.length; i++) {
        info = await checkNumber(nums[i], data.cari);
        if (info.active) {
          new_data.numbers.push(info.number);
          new_data.valid += 1;
        }
        else {
          new_data.invalid += 1;
        }
        socket.emit("print", { info, data: new_data });
      }
        
    }
    
    let nano = "";
    for (let x = 0; x < new_data.numbers.length; x++) {
      nano += `${new_data.numbers[x]}\r\n`;
    }
    socket.emit("done", nano);
  });
  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function() {
    console.log('A user disconnected');
  });
});


// // Listen to server:
// http.listen(PORT, function() {
//   dbj.changeAllValue("online", false);
//   console.log(`Server listening to port: ${PORT}`);
// });