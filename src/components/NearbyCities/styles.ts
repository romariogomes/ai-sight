import styled from "styled-components";

export const Container = styled.div`
  height: auto;
  font-size: 0.7em;
  color: ${(props) => props.theme.colors.mediumGray};
  font-family: ${(props) => props.theme.fonts.default};
  border-top: 2px solid ${(props) => props.theme.colors.lightGray};
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 10px;

  @media screen and (max-width: 1024px) {
    border-top: none;
    border-left: 2px solid ${(props) => props.theme.colors.lightGray};
    width: 40%;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    border-top: 2px solid ${(props) => props.theme.colors.lightGray};
    border-left: none;
  }
`;

export const Headline = styled.h2`
  text-align: center;
`;

export const CitiesList = styled.ul`
  list-style: none;
  column-count: 3;

  @media screen and (max-width: 1024px) {
    column-count: 2;
  }

  @media screen and (max-width: 768px) {
    column-count: 4;
    padding: 0;
  }
`;

export const ListItem = styled.li`
  margin: 5px 0;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }

  @media screen and (max-width: 1024px) {
    margin: 15px 0;
  }
`;
