import styled from "styled-components";
import { FaMapMarker } from "react-icons/fa";

export const MapMarker = styled(FaMapMarker)<{
  lat?: number;
  lng?: number;
  draggable?: boolean;
}>`
  fill: ${(props) => props.theme.colors.primaryBlue};
  width: 3em;
  height: 3em;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 800px;
`;
