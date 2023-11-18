const express = require("express");
const router = express.Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifytoken");
const Img = require("../models/Img");

//CREATE
router.post("/add", verifyToken, async (req, res) => {
  console.log(req.body);
  const newImg = new Img(req.body);
  try {
    const savedImg = await newImg.save();
    // res.status(200).json(savedImg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
