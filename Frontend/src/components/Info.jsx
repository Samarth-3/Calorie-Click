import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import foodData from "../Data";
import { useSelector } from "react-redux";


const Centre = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NutrientBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  margin-left: 40px;
  justify-content: center;  
`;

const Heading = styled.h2`
  justify-content: center;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 30px;
  font-weight: bold;
  color: #007bff;
  text-decoration: underline;
`;


const Label = styled.p`
  font-weight: bold;
  margin-right: 10px;
  width: 80px;
`;

const ProgressBar = styled.div`
  width: 60%;
  height: 20px;
  background-color: #f0f0f0;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  margin: 5px 0;
`;

const Progress = styled.div`
  height: 100%;
  line-height: 20px;
  text-align: center;
  border-radius: 10px;
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  animation: progressBarAnimation 1s ease-in-out;
  background-color: ${(props) => props.color || "#007bff"};
  width: ${(props) => (props.value / props.maxValue) * 100}%;
  padding: 0 5px; /* Add padding to the progress bar */
`;

const NutritionalInfo = ({ period }) => {
  const [foodEaten, setFoodEaten] = useState([]);
  const [totals, setTotals] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    fiber: 0,
  });

  const userId = useSelector((state) => state.user.currentUser)._id;

  useEffect(() => {
    let apiUrl;
    if (period === "today") {
      console.log("userId: ", userId);
      apiUrl = `http://localhost:5000/api/nutrientlog/today/${userId}`;
    } else if (period === "week") {
      apiUrl = `http://localhost:5000/api/nutrientlog/week/${userId}`;
    } else if (period === "month") {
      apiUrl = `http://localhost:5000/api/nutrientlog/month/${userId}`;
    }

    axios.get(apiUrl).then((response) => {
      setFoodEaten(response.data);

      // Calculate the totals for protein, carbs, and fiber based on data.js
      const initialTotals = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
        fiber: 0,
      };

      const newTotals = response.data.reduce((acc, food) => {
        const foodInfo = foodData.find(
          (item) => item.name === food.FoodItemName
        );
        if (foodInfo) {
          acc.calories += foodInfo.calories;
          acc.fats += foodInfo.fats;
          acc.protein += foodInfo.protein;
          acc.carbs += foodInfo.carbs;
          acc.fiber += foodInfo.fiber;
        }
        return acc;
      }, initialTotals);

      setTotals(newTotals);
    });
  }, [period, userId]);

  const maxIntake = {
    day: {
      calories: 2000,
      protein: 85, // Daily average intake for men
      carbs: 270,
      fats: 65,
      fiber: 32,
    },
    week: {
      calories: 7 * 2000,
      protein: 7 * 85,
      carbs: 7 * 270,
      fats: 7 * 65,
      fiber: 7 * 32,
    },
    month: {
      calories: 30 * 2000,
      protein: 30 * 85,
      carbs: 30 * 270,
      fats: 30 * 65,
      fiber: 30 * 32,
    },
  };

  return (
    <Centre>
      <Heading>{`Nutritional Information for ${period}`}</Heading>
      <NutrientBar>
        <Label>Calories:</Label>
        <ProgressBar>
          {maxIntake[period] && (
            <Progress
              value={totals.calories}
              maxValue={maxIntake[period].calories}
              color="#FF6347" // Tomato color
            >
              {totals.calories.toFixed(1)}
            </Progress>
          )}
        </ProgressBar>
      </NutrientBar>
      <NutrientBar>
        <Label>Protein:</Label>
        <ProgressBar>
          {maxIntake[period] && (
            <Progress
              value={totals.protein}
              maxValue={maxIntake[period].protein}
              color="#4CAF50" // Green color
            >
              {totals.protein.toFixed(1)} grams
            </Progress>
          )}
        </ProgressBar>
      </NutrientBar>
      <NutrientBar>
        <Label>Carbs:</Label>
        <ProgressBar>
          {maxIntake[period] && (
            <Progress
              value={totals.carbs}
              maxValue={maxIntake[period].carbs}
              color="#FFD700" // Gold color
            >
              {totals.carbs.toFixed(1)} grams
            </Progress>
          )}
        </ProgressBar>
      </NutrientBar>
      <NutrientBar>
        <Label>Fats:</Label>
        <ProgressBar>
          {maxIntake[period] && (
            <Progress
              value={totals.fats}
              maxValue={maxIntake[period].fats}
              color="#8A2BE2" // Blue Violet color
            >
              {totals.fats.toFixed(1)} grams
            </Progress>
          )}
        </ProgressBar>
      </NutrientBar>
      <NutrientBar>
        <Label>Fiber:</Label>
        <ProgressBar>
          {maxIntake[period] && (
            <Progress
              value={totals.fiber}
              maxValue={maxIntake[period].fiber}
              color="#FF4500" // Orange Red color
            >
              {totals.fiber.toFixed(1)} grams
            </Progress>
          )}
        </ProgressBar>
      </NutrientBar>
    </Centre>
  );
};

export default NutritionalInfo;
