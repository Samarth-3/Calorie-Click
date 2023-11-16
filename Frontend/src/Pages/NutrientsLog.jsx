// src/pages/pastLog.jsx
import React from 'react';
import NutritionalInfo from '../components/Info';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NutrientsLog = () => {
  return (
    <div>
      <Navbar />
      <NutritionalInfo period="today" />
      <NutritionalInfo period="week" />
      <NutritionalInfo period="month" />
      <Footer/>
    </div>
  );
};

export default NutrientsLog;
