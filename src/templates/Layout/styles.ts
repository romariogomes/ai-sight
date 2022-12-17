import styled from "styled-components";

export const Container = styled.div`
  background: ${(props) => props.theme.colors.lightGray};

  @media screen and (max-width: 768px) {
    height: 100vh;
  }
`;
