import styled from "styled-components";

export const Wrapper = styled.div`
  height: 80px;
  width: 100%;
  background: ${(props) => props.theme.colors.primaryBlue};
  display: flex;
  align-items: center;
`;

export const Container = styled.div`
  height: 42px;
  width: 90%;
  margin: auto auto;
  max-width: 1720px;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 1024px) {
    justify-content: center;
  }
`;

export const Logo = styled.div`
  height: inherit;
  width: 30%;
  background: transparent;
  color: ${(props) => props.theme.colors.white};
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: fantasy;
  font-size: 3vh;

  svg {
    margin-right: 10px;
    color: ${(props) => props.theme.colors.yellow};
  }

  @media screen and (max-width: 1520px) {
    font-size: 2.5vh;
  }

  @media screen and (max-width: 1230px) {
    font-size: 2vh;
  }

  @media screen and (max-width: 1024px) {
    width: auto;
    justify-content: center;
  }
`;
