const fs = require("fs");
let path_file = "./data/users.txt";

function writeJson(data) {
  let json_str = JSON.stringify(data);
  fs.writeFileSync(path_file, json_str);
}

function readJson() {
  let text = fs.readFileSync(path_file, 'utf-8');
  let data = JSON.parse(text);
  return data;
}

function changeAllValue(key,value){
  let data = readJson();
  for(let i=0;i<data.users.length;i++){
    data.users[i][key] = value;
  }
  writeJson(data);
}
function getUsers() {
  let data = readJson();
  return data.users;
}

function findValue(key, value) {
  let data = readJson();
  let here = false;
  for (let i = 0; i < data.users.length; i++) {
    if (data.users[i][key] == value) {
      here = true;
      break;
    }
  }
  return here;
}

function changeValue(user, key, value) {
  let data = readJson();
  let done = false;
  for (let i = 0; i < data.users.length; i++) {
    if (data.users[i].user == user) {
      data.users[i][key] = value;
      done = true;
      break;
    }
  }
  writeJson(data);
  return done;
}

function addUser(data) {
  let info = readJson();
  info.users.push(data);
  writeJson(info);
}

function removeUser(token) {
  let info = readJson();
  let here = false;
  for (let i = 0; i < info.users.length; i++) {
    // console.log(info.users[i]["token"]);
    if (info.users[i]["token"] == token) {

      if (i > -1) {
        info.users.splice(i, 1);
        here = true;
        break;
      }
    }
  }
  writeJson(info);
  return here;
}


module.exports = {
  getUsers,
  changeValue,
  addUser,
  findValue,
  removeUser,
  changeAllValue,
};