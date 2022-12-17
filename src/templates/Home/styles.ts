import styled from "styled-components";

export const Container = styled.div`
  padding: 5%;
  width: auto;
  height: auto;
`;

export const Grid = styled.div`
  width: inherit;
  height: inherit;
  display: flex;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const WeatherInfoContainer = styled.div<{ isLoading?: boolean }>`
  width: 40%;
  height: auto;
  display: flex;
  justify-content: ${(props) => (props.isLoading ? "center" : "flex-start")};
  align-items: center;

  @media screen and (min-width: 1500px) {
    width: 50%;
    justify-content: flex-end;
    padding-right: 50px;
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
    height: 300px;
    margin-bottom: 5%;
  }

  @media screen and (max-width: 768px) {
    height: auto;
  }
`;

export const MapContainer = styled.div`
  width: 60%;
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 1500px) {
    width: 50%;
    justify-content: flex-start;
    padding-left: 50px;
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;
