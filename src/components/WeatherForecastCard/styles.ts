import styled from "styled-components";

export const Container = styled.div`
  background: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.mediumGray};
  font-family: ${(props) => props.theme.fonts.default};
  height: auto;
  width: 80%;

  @media screen and (min-width: 1500px) {
    max-width: 500px;
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
    display: flex;
  }

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

export const Headline = styled.h3`
  font-weight: 500;
  text-align: center;
`;

export const CityName = styled.h1`
  font-weight: 700;
  text-align: center;
  margin-bottom: 0;
`;

export const WeatherInfoContainer = styled.div`
  font-weight: 500;

  .primary-forecast-info {
    display: flex;
    align-items: center;
    justify-content: center;

    div {
      width: 100px;
      text-align: center;
    }
  }

  @media screen and (max-width: 1024px) {
    width: 60%;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const WeatherImage = styled.img``;

export const WeatherDescription = styled.div`
  text-align: center;

  h3 {
    margin: 0;
  }
`;

export const WeatherTemperature = styled.h1``;

export const WeatherTemperatureVariation = styled.div`
  text-align: center;

  h5 {
    font-weight: 400;
  }
`;
