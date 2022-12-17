import GoogleMapReact from "google-map-react";
import { Spinner } from "components";
import { Container, MapMarker } from "./styles";

interface IMap {
  coords: {
    lat: number;
    lng: number;
  } | null;
  mapConfig: any;
  onMarkerDrag: (data: any) => void;
}

export const Map = (props: IMap) => {
  const { coords, mapConfig, onMarkerDrag } = props;

  return (
    (coords && (
      <Container>
        <GoogleMapReact
          bootstrapURLKeys={{ key: mapConfig?.apiKey }}
          defaultZoom={mapConfig?.defaultZoom}
          onDragEnd={onMarkerDrag}
          center={coords}
        >
          <MapMarker />
        </GoogleMapReact>
      </Container>
    )) || <Spinner text="Loading map..." />
  );
};
