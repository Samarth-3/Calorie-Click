const express = require("express");
const router = express.Router();
const Img = require("../models/Img"); // Your Mongoose model

// Route to get today's food data
router.get('/today', async (req, res) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
  
    try {
      const foodEaten = await Img.find({
        FoodItemName: { $ne: null }, // Filter for records with food items
        createdAt: {
          $gte: today,
          $lte: endOfDay,
        },
      });
      res.json(foodEaten);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data' });
    }
  });
  

  router.get('/week', async (req, res) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() - today.getDay() + 6);
  
    try {
      const foodEaten = await Img.find({
        FoodItemName: { $ne: null }, // Filter for records with food items
        createdAt: {
          $gte: startOfWeek,
          $lte: endOfWeek,
        },
      });
      res.json(foodEaten);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data' });
    }
  });

  // Route to get current month's food data
router.get('/month', async (req, res) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);
  
    try {
      const foodEaten = await Img.find({
        FoodItemName: { $ne: null }, // Filter for records with food items
        createdAt: {
          $gte: startOfMonth,
          $lte: endOfMonth,
        },
      });
      res.json(foodEaten);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data' });
    }
  });

  
  module.exports = router;
