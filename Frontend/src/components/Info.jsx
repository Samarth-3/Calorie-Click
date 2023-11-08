import React, { useEffect, useState } from 'react';
import axios from 'axios';
import foodData from '../Data'; 
import { useSelector } from 'react-redux';

const NutritionalInfo = ({ period }) => {
  const [foodEaten, setFoodEaten] = useState([]);
  const [totals, setTotals] = useState({
    protein: 0,
    carbs: 0,
    fiber: 0,
  });

  const userId = useSelector((state) => state.user.currentUser)._id;

  useEffect(() => {

    let apiUrl;
    if (period === 'today') {
        console.log('userId: ', userId)
      apiUrl = `http://localhost:5000/api/nutrientlog/today/${userId}`;
    } else if (period === 'week') {
      apiUrl = `http://localhost:5000/api/nutrientlog/week/${userId}`;
    } else if (period === 'month') {
      apiUrl = `http://localhost:5000/api/nutrientlog/month/${userId}`;
    }

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
  }, [period, userId]);

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