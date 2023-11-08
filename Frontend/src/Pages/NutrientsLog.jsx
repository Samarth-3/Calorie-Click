// src/pages/pastLog.jsx
import React from 'react';
import NutritionalInfo from '../components/Info';

const NutrientsLog = () => {
  return (
    <div>
      <NutritionalInfo period="today" />
      <NutritionalInfo period="week" />
      <NutritionalInfo period="month" />
    </div>
  );
};

export default NutrientsLog;
