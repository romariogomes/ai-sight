import { Container, CitiesList, Headline, ListItem } from "./styles";

export const NearbyCities = (props: any) => {
  const { nearbyCities, onClickNearbyCity } = props;

  if (!nearbyCities || nearbyCities?.length === 0) return null;

  return (
    <Container>
      <Headline>Localidades próximas</Headline>
      <CitiesList>
        {nearbyCities?.map((item: any, index: number) => (
          <ListItem
            key={`${item?.cityName?.toLowerCase()}#${index}`}
            onClick={() => onClickNearbyCity(item)}
          >
            {item?.cityName}
          </ListItem>
        ))}
      </CitiesList>
    </Container>
  );
};
