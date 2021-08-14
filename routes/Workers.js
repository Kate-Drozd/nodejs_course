  
const express = require("express");
const router = express.Router();
const { Workers } = require("../models");


Workers.create({
    firstName: "Kate",
    lastName: 'Dudorga'
  }).then(res=>{
    console.log(res);
  }).catch(err=>console.log(err));

  Workers.create({
    firstName: "Tom",
    lastName: 'Soyer'
  }).then(res=>{
    console.log(res);
  }).catch(err=>console.log(err));

router.get("/", async (req, res) => {
  const listOfWorkers = await Workers.findAll();
  res.json(listOfWorkers);
});


module.exports = router;