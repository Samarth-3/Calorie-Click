const mongoose = require("mongoose");
const ImgScheme = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    FoodItemName: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Img", ImgScheme);
