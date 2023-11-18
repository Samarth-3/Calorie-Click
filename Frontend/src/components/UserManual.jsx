import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  padding-bottom: 70px;
`;

const Heading = styled.h2`
  color: #333;
  font-size: 24px;
  margin-bottom: 15px;
  text-align: center;
  padding-top: 50px; 
  padding-bottom: 30px; 
`;


const List = styled.ol`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 15px;
`;

const UserManual = () => {
  return (
    <Container>
      <Heading>How to use Calorie Click 📕</Heading>
      <List>
        <ListItem>
          <strong>Image Upload:</strong> Capture or upload an image of your meal using the designated button on the homepage and then click on Submit Button.
        </ListItem>
        <ListItem>
          <strong>Receive Recommendations:</strong> After uploading, our machine learning model will provide you with three food combinations. Choose the one that matches your meal.
        </ListItem>
        <ListItem>
          <strong>Log Nutritional Information:</strong> Select the chosen food combination, and the system will log the nutritional information for your records.
        </ListItem>
        <ListItem>
          <strong>View Past Logs:</strong> Check your past nutritional logs by clicking on the 'Past Log' button to view your historical data.
        </ListItem>
        <ListItem>
          <strong>Logout:</strong> To end your session, click on the 'Logout' button. You'll be redirected to the login page.
        </ListItem>
      </List>
    </Container>
  );
};

export default UserManual;
