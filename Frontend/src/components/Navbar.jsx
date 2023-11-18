import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../redux/userRedux";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

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
  font-weight: bold;
  margin: 0;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const ButtonContainer = styled.div`
  display: flex; /* Arrange buttons horizontally */
`;

const TextLink = styled.p`
  font-size: 20px;
  margin: 0;
  margin-right: 20px; /* Add some spacing between buttons */

  a {
    text-decoration: none;
    color: inherit;
  }
`;

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const userId = user._id;

  const handleLogOut = () => {
    dispatch(removeUser());
    navigate("/login");
  };

  return (
    <NavbarWrapper>
      <BrandText>
        <Link to="/">Calorie Click</Link>
      </BrandText>
      <ButtonContainer>
        <TextLink>
          <Link to="/login" onClick={handleLogOut}>LogOut</Link>
        </TextLink>
        <TextLink>
          <Link to="/UserManual">User Manual</Link>
        </TextLink>
        <TextLink>
          <Link to={`/nutrientlog/${userId}`}>Past Log</Link>
        </TextLink>
      </ButtonContainer>
    </NavbarWrapper>
  );
}

export default Navbar;
