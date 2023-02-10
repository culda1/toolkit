const express = require("express");
const router = express.Router();









router.get("/",function(req,res){
    res.render("check");
});


// router.post("/",async function(req,res){
//     let {numbers} = req.body;
//     let {cty} = req.body;
//     let {cari} = req.body;
//     console.log(numbers);
//     console.log(cari);
//     let nums = cleanNumbers(numbers);

//     let active_nums = "";
    
//     for (let i = 0; i < nums.length; i++) {

//         let info = await checkNumber(nums[i],cari);
//         console.log(info.active);
//         res.send(info);  
//     }
//     // console.log(info);

// });

//export here
module.exports = router;