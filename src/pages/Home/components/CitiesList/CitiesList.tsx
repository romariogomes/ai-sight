import { Card } from "components";
import { Position } from "pages/Home/types";
import { useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";

interface ICitiesListProps {
  handleCityClick: (coords: Position) => void;
}

export const CitiesList = ({ handleCityClick }: ICitiesListProps) => {
  const [selectedCity, setSelectedCity] = useState<string | undefined>();

  const cities = [
    { name: "Beijing", lat: 39.906217, lng: 116.3912757 },
    { name: "Buenos Aires", lat: -34.6075682, lng: -58.4370894 },
    { name: "Cairo", lat: 30.0443879, lng: 31.2357257 },
    { name: "Dakar", lat: 14.693425, lng: -17.447938 },
    { name: "Dubai", lat: 25.2653471, lng: 55.2924914 },
    { name: "Johannesburg", lat: -26.205, lng: 28.049722 },
    { name: "London", lat: 51.5085, lng: -0.1258 },
    { name: "New Delhi", lat: 28.6138954, lng: 77.2090057 },
    { name: "New York", lat: 40.7127281, lng: -74.0060152 },
    { name: "Paris", lat: 48.8588897, lng: 2.3200410217200766 },
    { name: "Rio", lat: -22.9110137, lng: -43.2093727 },
    { name: "Sydney", lat: -33.8698439, lng: 151.2082848 },
    { name: "Tokyo", lat: 35.6828387, lng: 139.7594549 },
  ];

  return (
    <Card>
      <h3 className="is-size-4 has-text-weight-semibold">Other cities</h3>
      <div className="mx-4">
        {cities.map(({ name, lat, lng }) => (
          <div
            className="is-flex is-align-items-center is-clickable my-2"
            onClick={() => {
              handleCityClick({ lat, lng });
              setSelectedCity(name);
            }}
          >
            {name}
            {selectedCity === name && (
              <CircleIcon
                className="ml-2"
                style={{ fontSize: 12, color: "blue" }}
              />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};
