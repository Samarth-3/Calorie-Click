import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavbarWrapper = styled.nav`
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

const BrandText = styled.p`
  font-size: 24px;
  margin: 0;

  a {
    text-decoration: none; 
    color: inherit; 
  }
`;

const HeadingText = styled.p`
  font-size: 20px;
  margin: 0;

  a {
    text-decoration: none; 
    color: inherit; 
  }
`;

function Navbar() {
  const user = useSelector((state) => state.user.currentUser);

  const userId = user._id; 
  console.log(userId);
  return (
    <NavbarWrapper>
      <BrandText>
        <Link to="/">Calorie Click</Link>
      </BrandText>
      <HeadingText>
        <Link to={`/nutrientlog/${userId}`}>Past log</Link>
      </HeadingText>
    </NavbarWrapper>
  );
}

export default Navbar;
