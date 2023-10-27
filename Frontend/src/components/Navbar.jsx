import React from 'react';
import styled from 'styled-components';

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
`;

const HeadingText = styled.p`
  font-size: 20px;
  margin: 0;
`;

function Navbar() {
  return (
    <NavbarWrapper>
      <BrandText>Calorie Click</BrandText>
      <HeadingText>Past log</HeadingText>
    </NavbarWrapper>
  );
}

export default Navbar;
