import React from "react";
import styled from "styled-components";
import Axios from "axios";
import { useSelector } from "react-redux";

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 60px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled.button`
  background: #ff0000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 30px;
`;

const HorizontalButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const Button = styled.button`
  background: #0077ff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
`;

const Modal = ({ isOpen, onClose, children, topClasses }) => {
  const userid = useSelector((state) => state.user.currentUser);
  if (!isOpen) return null;

  const handleButtonClick = (foodItem) => {
    const foodData = {
      userId: userid,
      FoodItemName: foodItem,
    };

    Axios.post("http://localhost:5000/api/imgs/add", foodData, {
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDM4NTk3Yzk0NmJiMTcwYWIwMzMxMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5ODkyODI3NCwiZXhwIjoxNjk5MzYwMjc0fQ.reL3seTSDjnvij7S_7wMGzZltMkYj3TCTYz2AkqW-Lk",
      },
    })
      .then((response) => {
        console.log("Food data saved successfully:", response.data);
      })
      .catch((error) => {
        console.error("Failed to save food data:", error);
      });
  };

  return (
    <ModalWrapper>
      <ModalContent>
        {children}
        <HorizontalButtons>
          {topClasses.map((foodItem, index) => (
            <Button key={index} onClick={() => handleButtonClick(foodItem)}>
              {foodItem}
            </Button>
          ))}
        </HorizontalButtons>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
