import React from 'react';
import styled from 'styled-components';

import AryanGarg from '../Images/AryanGarg.png';
import SamarthPaliwal from '../Images/SamarthPaliwal.jpg';

const FooterWrapper = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
`;

const Contributor = styled.div`
  margin: 0 100px;
  padding: 0 100px;
  text-align: left;
`;

const Photo = styled.img`
  max-width: 100px;
  border-radius: 0%;
  padding-left: 25px;
`;

const Info = styled.div`
  display: inline-block;
  vertical-align: top;
  margin-left: 20px;
`;

const Name = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
`;

const RollNo = styled.p`
  font-size: 16px;
  margin: 10px 0;
`;

const Email = styled.p`
  font-size: 16px;
  margin: 10px 0;
`;

const Contribution = styled.p`
  font-size: 14px;
  margin: 10px 0;
`;

const LinkedInLink = styled.a`
  font-size: 14px;
  text-decoration: none;
  color: #fff;

  &:hover {
    text-decoration: underline;
  }
`;

function Footer() {
  return (
    <FooterWrapper>
      <Contributor>
        <Photo src={AryanGarg} alt="Aryan Garg Picture" />
        <Info>
          <Name>Aryan Garg</Name>
          <RollNo>Roll No: 1012103768</RollNo>
          <Email>Email: aryan.raj.garg@gmail.com</Email>
          <Contribution>Contribution: ML Model</Contribution>
          <LinkedInLink href="https://www.linkedin.com/in/aryangarg401/" target="_blank">
            LinkedIn Profile
          </LinkedInLink>
        </Info>
      </Contributor>
      <Contributor>
        <Photo src={SamarthPaliwal} alt="Samarth Paliwal Picture" />
        <Info>
          <Name>Samarth Paliwal</Name>
          <RollNo>Roll No: 102103775</RollNo>
          <Email>Email: samarthpaliwal3@gmail.com</Email>
          <Contribution>Contribution: Frontend and Backend</Contribution>
          <LinkedInLink href="https://www.linkedin.com/in/samarthpaliwal03/" target="_blank">
            LinkedIn Profile
          </LinkedInLink>
        </Info>
      </Contributor>
    </FooterWrapper>
  );
}

export default Footer;
