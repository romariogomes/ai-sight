import React from "react";
import { RiSunCloudyLine } from "react-icons/ri";
import { Container, Logo, Wrapper } from "./styles";

export const Header = () => (
  <Wrapper>
    <Container>
      <Logo>
        <RiSunCloudyLine /> WEATHER CHECK
      </Logo>
    </Container>
  </Wrapper>
);
