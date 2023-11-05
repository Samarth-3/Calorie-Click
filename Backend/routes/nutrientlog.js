const express = require("express");
const router = express.Router();
const Img = require("../models/Img"); // Your Mongoose model

// Route to get today's food data for a specific user
router.get('/today/:userId', async (req, res) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
  
    const userId = req.params.userId; // Get the user's ID from the request parameters
  
    try {
      const foodEaten = await Img.find({
        userId, // Filter by user ID
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

// Route to get food data for the current week for a specific user
router.get('/week/:userId', async (req, res) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() - today.getDay() + 6);
  
    const userId = req.params.userId; // Get the user's ID from the request parameters
  
    try {
      const foodEaten = await Img.find({
        userId, // Filter by user ID
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

// Route to get food data for the current month for a specific user
router.get('/month/:userId', async (req, res) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);
  
    const userId = req.params.userId; // Get the user's ID from the request parameters
  
    try {
      const foodEaten = await Img.find({
        userId, // Filter by user ID
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
