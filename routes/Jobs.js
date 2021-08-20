const express = require("express");
const router = express.Router();
const { Jobs } = require("../models");

/*
Jobs.create({
    name: "LeverX"
  }).then(res=>{
    console.log(res);
  }).catch(err=>console.log(err));

  Jobs.create({
    name: "Google"
  }).then(res=>{
    console.log(res);
  }).catch(err=>console.log(err));*/

router.get("/", async (req, res) => {
  const listOfJobs = await Jobs.findAll();
  res.json(listOfJobs);
});


module.exports = router;