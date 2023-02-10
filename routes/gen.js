const express = require("express");
const router = express.Router();

// router.use(express.limit(100000000));
function rn(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cleanNumbers(data) {
  let phone_numbers = data.match(/^\+\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4}/gm);
  return phone_numbers;
}

function findRep(list, find, rep) {

  let new_list = [];

  for (let i = 0; i < list.length; i++) {
    new_list.push(list[i].replaceAll(find, rep));
  }

  return new_list;

}
function separator(list, sym) {
  let nums = "";
  for (let i = 0; i < list.length; i++) {
    if (sym != "") {
      nums += `${list[i]}${sym}`;
    }
    else {
      if (i != list.length - 1) {

        nums += `${list[i]}\r\n`;
      }
      else {
        nums += `${list[i]}`;
      }
    }

  }
  return nums;
}


function cleanDup(nums) {
  let arr = nums;
  var seen = {};
  var ret_arr = [];
  let count = 0;
  for (var i = 0; i < arr.length; i++) {
    if (!(arr[i] in seen)) {
      ret_arr.push(arr[i]);
      seen[arr[i]] = true;
    }
    else {
      count++;
    }
  }
  return { count, arr: ret_arr };
}


router.get("/", function(req, res) {
  res.render("gen");
});

router.post("/", function(req, res) {
  let { country } = req.body;
  let { limit } = req.body;
  let numbers = "1234567890";
  let list_num = "";
  // console.log(`${country} | ${limit}`);
  let codes = {
    "": null,
    "ES": { code: "+34", area: ["6", "7"], len: 9 },
    "FR": { code: "+33", area: ["6"], len: 9 },
    "SK": { code: "+421", area: ["9"], len: 9 },
    "CH": { code: "+41", area: ["6", "7"], len: 9 },
    "CZ": { code: "+420", area: ["6", "7"], len: 9 },
  };
  if (codes[country] != null) {
    for (let i = 0; i < limit; i++) {
      let area_x = codes[country].area[rn(0, codes[country].area.length - 1)];
      let num = `${codes[country].code}${area_x}`;
      for (let x = 0; x < (codes[country].len - area_x.length); x++) {
        num += numbers[rn(0, numbers.length - 1)];
      }
      if (i != limit - 1) {
        list_num += `${num}\r\n`;
      }
      else {
        list_num += `${num}`;
      }
    }
  }
  // console.log(list_num);
  res.send({ done: list_num });
});

router.post("/clean", function(req, res) {
  let { numbers } = req.body;
  let { find } = req.body;
  let { rep } = req.body;
  let { sep } = req.body;
  let count = 0;
  let nums = cleanNumbers(numbers);
  let clean_nums = { arr: [], count: 0 };;
  if (nums != null) {
    clean_nums = cleanDup(nums);
    nums = clean_nums.arr;
    count = nums.length;
  }
  // console.log(find);
  if (find != "" && nums != null) {
    nums = findRep(nums, find, rep);
    clean_nums = cleanDup(nums);
    nums = clean_nums.arr;
    count = nums.length;
  }
  let text = "";
  if (nums != null) {
    text = separator(nums, sep);
  }
  // console.log(list_num);
  res.send({ result: { text, count, dup: clean_nums.count } });

});

//export here
module.exports = router;