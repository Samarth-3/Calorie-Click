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
    text-decoration: none; /* Remove the underline */
    color: inherit; /* Inherit the color from the parent */
  }
`;

const HeadingText = styled.p`
  font-size: 20px;
  margin: 0;

  a {
    text-decoration: none; /* Remove the underline */
    color: inherit; /* Inherit the color from the parent */
  }
`;

function Navbar() {
  const userid = useSelector((state) => state.user.currentUser);
  console.log(userid);
  return (
    <NavbarWrapper>
      <BrandText>
        <Link to="/">Calorie Click</Link>
      </BrandText>
      <HeadingText>
        <Link to={`/nutrientlog/65438597c946bb170ab03311`}>Past log</Link>
      </HeadingText>
    </NavbarWrapper>
  );
}

export default Navbar;
