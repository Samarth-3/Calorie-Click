// src/components/NutritionalInfo.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import foodData from '../Data'; // Import your data.js file

const NutritionalInfo = ({ period }) => {
  const [foodEaten, setFoodEaten] = useState([]);
  const [totals, setTotals] = useState({
    protein: 0,
    carbs: 0,
    fiber: 0,
  });

  useEffect(() => {
    // Define the URL based on the selected period
    let apiUrl;
    if (period === 'today') {
      apiUrl = 'http://localhost:5000/api/nutrientlog/today';
    } else if (period === 'week') {
      apiUrl = 'http://localhost:5000/api/nutrientlog/week';
    } else if (period === 'month') {
      apiUrl = 'http://localhost:5000/api/nutrientlog/month';
    }

    // Fetch the food data from the backend based on the selected period
    axios.get(apiUrl).then((response) => {
      setFoodEaten(response.data);

      // Calculate the totals for protein, carbs, and fiber based on data.js
      const initialTotals = {
        protein: 0,
        carbs: 0,
        fiber: 0,
      };

      const newTotals = response.data.reduce((acc, food) => {
        const foodInfo = foodData.find((item) => item.name === food.FoodItemName);
        if (foodInfo) {
          acc.protein += foodInfo.protein;
          acc.carbs += foodInfo.carbs;
          acc.fiber += foodInfo.fiber;
        }
        return acc;
      }, initialTotals);

      setTotals(newTotals);
    });
  }, [period]);

  return (
    <div>
      <h2>{`Nutritional Information for ${period}`}</h2>
      <p>Protein: {totals.protein} grams</p>
      <p>Carbs: {totals.carbs} grams</p>
      <p>Fiber: {totals.fiber} grams</p>
    </div>
  );
};

export default NutritionalInfo;
